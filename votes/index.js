import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Store from './store.js';
import logger from './logger.js';

const port = process.env.PORT || 4002;

const app = express();

let updatedPollVotes = {};  // cache and send later
let votesUpdated = false;   // has updatedPollVotes been updated?

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post('/votes', async (req, res) => {
    const newVote = req.body;
    const existing = await Store.readOne(newVote.id);
    if (existing !== null) {
        res.status(409).json({ message: `vote ${newVote.id} already exists` });
        logger.error(`POST /votes: vote ${newVote.id} already exists`);
        return;
    }
    await Store.writeOne(newVote);
    res.json({ message: 'ok' });
    logger.info(`POST /votes: Created vote ${newVote.id}`);
});

app.get('/votes/:id', async (req, res) => {
    const id = req.params.id;
    const vote = await Store.readOne(id);
    if (vote === null) {
        res.status(404).json({ message: `vote ${id} not found` });
        logger.error(`GET /votes/${id}: vote not found`);
        return;
    }
    res.json(vote);
    logger.info(`GET /votes/${id}: Read vote ${id}`);
});

app.put('/votes/inc/:id', async (req, res) => {
    // increment the vote by 1
    const id = req.params.id;
    let vote = await Store.readOne(id);
    if (vote === null) {
        res.status(404).json({ message: `vote ${id} not found` });
        logger.error(`GET /votes/${id}: vote not found`);
        return;
    }
    await Store.updateOne(id, { votes: 1});   // increment by 1
    vote = await Store.readOne(id); // read the updated vote (there might be concurrent updates)
    res.json(vote);
    if (!updatedPollVotes[vote.pollId]) {
        updatedPollVotes[vote.pollId] = 1;
    } else {
        updatedPollVotes[vote.pollId] += 1;
    }
    votesUpdated = true;
    logger.info(`PUT /votes/${id}: Updated vote ${id} to ${vote.votes} votes`);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    logger.info(`POST /events: received event ${event.type}`);
    if (event.type === 'DeletePoll') {
        await Store.deleteMany({ pollId: event.data.id });
        logger.info(`POST /events: deleted votes for poll ${event.data.id}`);
    }
    res.json({ message: 'ok' });
});

// send updated poll votes to query service if updated every second (ddos prevention)
async function sendUpdatedPollVotes() {
    if (!votesUpdated) {
        return; // only send if there are updates
    }
    try {
        let result = await fetch('http://localhost:4000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'UpdatedPollVotes',
                data: { updated: updatedPollVotes},
            }),
        });
        result = await result.json();
        if (result.message=== 'ok') {
            updatedPollVotes = {};
            votesUpdated = false;
            logger.info(`sendUpdatePolls: emitted UpdatePolls event`);
        } else {
            logger.error(`sendUpdatePolls: error sending UpdatePolls event`);
        }
    } catch (err) {
        logger.error(`sendUpdatePolls error: ${err}`);
    }
}

setInterval(sendUpdatedPollVotes, 1000);    // check and send vote update every second


app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});