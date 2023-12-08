import { MongoClient } from "mongodb";
import logger from "./logger.js";

// change to this to run inside of docker container
const url = 'mongodb://admin:password@mongodb:27017';
// const url = 'mongodb://admin:password@localhost:27017';
const client = new MongoClient(url);
const dbName = 'polls';

let polls;

// connect to the polls database and return the polls collection
const pollCollection = async () => {
    if (!polls) {
        await client.connect();
        const db = client.db(dbName);
        polls = db.collection('polls');
        logger.info('Store.pollCollection: connected to polls database (polls collection)');
    }
    return polls;
};

const readAll = async () => {
    // read all polls
    try {
        const collection = await pollCollection();
        const docs = await collection.find({}).toArray();
        logger.info(`Store.readAll: read ${docs.length} polls`);
        return docs;
    } catch (err) {
        logger.error(`Store.readAll error: ${err}`);
    }
};

const readOne = async (id) => {
    // read a post specified by id
    try {
        const collection = await pollCollection();
        const doc = await collection.findOne({ id });
        logger.info(`Store.readOne: read poll ${id}`);
        return doc;
    } catch (err) {
        logger.error(`Store.readOne error: ${err}`);
    }
};

const writeOne = async (poll) => {
    // write a single poll
    try {
        const collection = await pollCollection();
        await collection.insertOne(poll);
        logger.info(`Store.writeOne: wrote poll ${poll.id}`);
    } catch (err) {
        logger.error(`Store.writeOne error: ${err}`);
    }
};

const deleteAll = async () => {
    // delete all polls
    try {
        const collection = await pollCollection();
        await collection.deleteMany({});
        logger.info('Store.deleteAll: deleted all polls');
    } catch (err) {
        logger.error(`Store.deleteAll error: ${err}`);
    }
};

const deleteOne = async (id) => {
    try {
        const collection = await pollCollection();
        await collection.deleteOne({ id });
        logger.info(`Store.deleteOne: deleted poll ${id}`);
    } catch (err) {
        logger.error(`Store.deleteOne error: ${err}`);
    }
};

const updateOne = async (id, query) => {
    try {
        const collection = await pollCollection();
        await collection.updateOne({ id }, { $inc: query });
        logger.info(`Store.updateOne: updated poll ${id}`);
    } catch (err) {
        logger.error(`Store.updateOne error: ${err}`);
    }
};

export default {
    readAll,
    readOne,
    writeOne,
    deleteAll,
    deleteOne,
    updateOne,
};