// query/index.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger.js';
import helper from './helper.js';

const port = process.env.PORT || 4003;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post("/polls", async (req, res) => {
    const newPoll = req.body;
    if (!helper.checkFields(newPoll, ["topic", "options"])) {
        res.status(400).json({ message: "poll missing required field (topic, options) or too many fields" });
        logger.error("POST /polls: incorrect field");
        return;
    }
    for (const option of newPoll.options) {
        if (!helper.checkFields(option, ["text"])) {
            res.status(400).json({ message: "vote missing required field (text) or too many fields" });
            logger.error("POST /polls: incorrect option field");
            return;
        }
    }
    const pollId = await helper.createPoll(newPoll);
    if (pollId === null) {
        res.status(500).json({ message: "error creating poll" });
        logger.error("POST /polls: error creating poll");
        return;
    }
    res.json({ message: "ok", id: pollId });
    logger.info(`POST /polls: Created poll ${newPoll.id}`);
});

app.get("/polls/all", async (req, res) => {
    let result = await fetch("http://polls:4001/polls");
    if (result.status !== 200) {
        res.status(500).json({ message: "error retrieving polls" });
        logger.error(`GET /polls: error retrieving polls (msg: ${result.message})`);
        return;
    }
    result = await result.json();
    for (let poll of result) {
        poll.options = await helper.convertVotes(poll.options);
        if (poll.options.includes(null)) {
            res.status(500).json({ message: "error retrieving votes" });
            logger.error(`GET /polls: error retrieving votes`);
            return;
        }
    }
    res.json(result);
    logger.info("GET /polls: Read all polls");
});

app.get("/polls/top/:count", async (req, res) => {
    let count = req.params.count;
    count = parseInt(count);
    if (isNaN(count)) {
        res.status(400).json({ message: "invalid count" });
        logger.error(`GET /polls/top: invalid count ${count}`);
        return;
    }
    let result = await fetch(`http://search:4004/search/top/${count}`);
    if (result.status !== 200) {
        res.status(500).json({ message: "error retrieving polls" });
        logger.error(`GET /polls: error retrieving polls (msg: ${result.message})`);
        return;
    }
    result = await result.json();
    res.json(result);
    logger.info(`GET /polls/top: Read top ${count} polls`);
});

app.delete("/polls/:id", async (req, res) => {
    const id = req.params.id;
    let result = await fetch(`http://polls:4001/polls/${id}`, {
        method: "DELETE",
    });
    result = await result.json();
    if (result.message !== "ok") {
        res.status(404).json({ message: `error deleting poll ${id}` });
        logger.error(`DELETE /polls/${id}: error deleting poll (msg: ${result.message})`);
        return;
    }
    res.json({ message: "ok" });
    logger.info(`DELETE /polls/${id}: Deleted poll ${id}`);
});

app.get("/polls/:id", async (req, res) => {
    // return specific poll with vote information
    const id = req.params.id;
    let result = await fetch(`http://polls:4001/polls/${id}`);
    if (result.status !== 200) {
        result = await result.json();
        res.status(404).json({ message: result.message });
        logger.error(`GET /polls/${id}: error retrieving poll (msg: ${result.message})`);
        return;
    }
    result = await result.json();
    const votes = await helper.convertVotes(result.options);
    if (votes.includes(null)) {
        res.status(500).json({ message: "error retrieving votes" });
        logger.error(`GET /polls: error retrieving votes`);
        return;
    }
    result.options = votes;
    res.json(result);
});

app.put("/polls/inc/:vid", async (req, res) => {
    // increment vote with id vid
    const vid = req.params.vid;
    let result = await fetch(`http://votes:4002/votes/inc/${vid}`, {
        method: "PUT",
    });
    if (result.status !== 200) {
        result = await result.json();
        res.status(404).json({ message: `error incrementing vote ${vid}` });
        logger.error(`PUT /polls/inc/${vid}: error incrementing vote (msg: ${result.message})`);
        return;
    }
    result = await result.json();
    res.json(result);
});

app.get("/polls/search/:term", async (req, res) => {
    const term = req.params.term;
    let result = await fetch(`http://search:4004/search/${term}`);
    if (result.status !== 200) {
        result = await result.json();
        res.status(404).json({ message: `error searching for ${term}` });
        logger.error(`GET /polls/search/${term}: error searching (msg: ${result.message})`);
        return;
    }
    result = await result.json();
    for (let poll of result) {
        poll.options = await helper.convertVotes(poll.options);
        if (poll.options.includes(null)) {
            res.status(500).json({ message: "error retrieving votes" });
            logger.error(`GET /polls: error retrieving votes`);
            return;
        }
    }
    res.json(result);
});

app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
});