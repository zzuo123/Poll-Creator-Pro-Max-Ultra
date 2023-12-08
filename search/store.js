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

export default {
    readAll,
};