import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Store from './store.js';
import logger from './logger.js';

const port = process.env.PORT || 4001;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post('/polls', async (req, res) => {
    const newPoll = req.body;
    const existing = await Store.readOne(newPoll.id);
    if (existing !== null) {
        res.status(409).json({ message: `poll ${newPoll.id} already exists` });
        logger.error(`POST /polls: poll ${newPoll.id} already exists`);
        return;
    }
    await Store.writeOne(newPoll);
    res.json({ message: 'ok' });
    logger.info(`POST /polls: Created poll ${newPoll.id}`);
});

app.get('/polls', async (req, res) => {
    const pollList = await Store.readAll();
    res.json(pollList);
    logger.info('GET /polls: Read all polls');
});

app.get("/polls/top/:count", async (req, res) => {
    const count = parseInt(req.params.count);  // integer
    const pollList = await Store.readAll();
    const topPolls = pollList.sort((a, b) => {
        return b.votes - a.votes;
    }).slice(0, count);
    // to save space, only send poll id and topic
    const result = topPolls.map((poll) => {
        return {id: poll.id, topic: poll.topic}
    });
    res.json(result);
    logger.info(`GET /polls/top: Read top ${count} polls`);
});


app.get('/polls/:id', async (req, res) => {
    const id = req.params.id;
    const poll = await Store.readOne(id);
    if (poll === null) {
        res.status(404).json({ message: `poll ${id} not found` });
        logger.error(`GET /polls/${id}: Poll not found`);
        return;
    }
    res.json(poll);
    logger.info(`GET /polls/${id}: Read poll ${id}`);
});

const emitDeleteEvent = async (id) => {
    try {
        await fetch('http://localhost:4000/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'DeletePoll', data: { id } })
        });
    } catch (err) {
        logger.error(`emitDeleteEvent error: ${err}`);
    }
}

app.delete('/polls/:id', async (req, res) => {
    const id = req.params.id;
    const poll = await Store.readOne(id);
    if (poll === null) {
        res.status(404).json({ message: `poll ${id} not found` });
        logger.error(`DELETE /polls/${id}: Poll not found`);
        return;
    }
    await Store.deleteOne(id);
    res.json({ message: 'ok' });
    emitDeleteEvent(id);
    logger.info(`DELETE /polls/${id}: Deleted poll ${id}`);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    logger.info(`POST /events: received event ${event.type}`);
    if (event.type === 'IncreaseVote') {
        await Store.updateOne(event.data.id, { votes: 1 });
        logger.info(`POST /events: increased vote for poll ${event.data.id}`);
    }
    res.json({ message: 'ok' });
});

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});