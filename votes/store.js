import { MongoClient } from "mongodb";
import logger from "./logger.js";

// change to this to run inside of docker container
// const url = 'mongodb://admin:password@mongodb:27017';
const url = 'mongodb://admin:password@localhost:27017';
const client = new MongoClient(url);
const dbName = 'polls';

let votes;

// connect to the polls database and return the votes collection
const voteCollection = async () => {
    if (!votes) {
        await client.connect();
        const db = client.db(dbName);
        votes = db.collection('votes');
        logger.info('Store.voteCollection: connected to polls database (votes collection)');
    }
    return votes;
};

const readOne = async (id) => {
    // read a post specified by id
    try {
        const collection = await voteCollection();
        const doc = await collection.findOne({ id });
        logger.info(`Store.readOne: attempted to read vote ${id}`);
        return doc;
    } catch (err) {
        logger.error(`Store.readOne error: ${err}`);
    }
};

const writeOne = async (vote) => {
    // write a single vote entry
    try {
        const collection = await voteCollection();
        await collection.insertOne(vote);
        logger.info(`Store.writeOne: wrote vote ${vote.id}`);
    } catch (err) {
        logger.error(`Store.writeOne error: ${err}`);
    }
};

const deleteOne = async (id) => {
    try {
        const collection = await voteCollection();
        await collection.deleteOne({ id });
        logger.info(`Store.deleteOne: deleted vote ${id}`);
    } catch (err) {
        logger.error(`Store.deleteOne error: ${err}`);
    }
};

const deleteMany = async (query) => {
    try {
        const collection = await voteCollection();
        const res = await collection.deleteMany(query);
        logger.info(`Store.deleteMany: deleted votes matching ${query} (${res.deletedCount})`);
    } catch (err) {
        logger.error(`Store.deleteMany error: ${err}`);
    }
};

const updateOne = async (id, query) => {
    try {
        const collection = await voteCollection();
        await collection.updateOne({ id }, { $inc: query });
        logger.info(`Store.updateOne: updated vote ${id}`);
    } catch (err) {
        logger.error(`Store.updateOne error: ${err}`);
    }
};

export default {
    readOne,
    writeOne,
    deleteOne,
    deleteMany,
    updateOne,
};