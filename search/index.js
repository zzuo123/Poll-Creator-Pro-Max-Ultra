import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger.js';
import store from './store.js';

const port = process.env.PORT || 4004;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// search for polls with the top count votes
app.get("/search/top/:count", async (req, res) => {
    const count = parseInt(req.params.count);  // integer
    const pollList = await store.readAll();
    const topPolls = pollList.sort((a, b) => {
        return b.votes - a.votes;
    }).slice(0, count);
    // to save space, only send poll id, topic, and counts
    const result = topPolls.map((poll) => {
        return {id: poll.id, topic: poll.topic, votes: poll.votes}
    });
    res.json(result);
    logger.info(`GET /polls/top: Read top ${count} polls`);
});

// search for polls with a topic that contains the given string
app.get('/search/:topic', async (req, res) => {
    const topic = req.params.topic;
    const pollList = await store.readAll();
    const result = pollList.filter((poll) => {
        return poll.topic.toLowerCase().includes(topic.toLowerCase());
    });
    res.json(result);
    logger.info(`GET /search/${topic}: Read polls with topic ${topic}`);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    logger.info(`POST /events: received event ${event.type}`);
    res.json({ message: 'ok' });
});

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});