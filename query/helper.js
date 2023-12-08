const checkFields = (obj, fieldsList) => {
    // check if obj has all fields in fieldsList and only those fields
    if(Object.keys(obj).length !== fieldsList.length) {
        return false;
    }
    for (const field of fieldsList) {
        if (obj[field] === undefined || obj[field] === null) {
            return false;
        }
    }
    return true;
};

// generate unique id (credit to Prof. Richards for the following line)
const uid = () => String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, "");

const createVotes = async (pollId, options) => {
    // create votes for each option in options, then return list of vote ids
    const voteIds = [];
    for (const option of options) {
        const newVote = {
            id: uid(),
            text: option.text,
            votes: 0,
            pollId,
        };
        let result = await fetch("http://votes:4002/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVote),
        });
        result = await result.json();
        if (result.message !== "ok") {
            logger.error(`POST /polls: error creating vote (msg: ${result.message})`)
            return null;
        }
        voteIds.push(newVote.id);
    }
    return voteIds;
};

const createPoll = async (poll) => {
    // create poll and votes, then return poll id
    const pollId = uid();
    const voteIds = await createVotes(pollId, poll.options);
    if (voteIds === null) {
        logger.error("POST /polls: error creating poll");
        return null;
    }
    let result = await fetch("http://polls:4001/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: pollId,
            topic: poll.topic,
            options: voteIds,
            votes: 0,
        }),
    });
    result = await result.json();
    if (result.message !== "ok") {
        return null;
    }
    return pollId;
};

const convertVotes = async (options) => {
    return await Promise.all(options.map(async (option) => {
        let vote = await fetch(`http://votes:4002/votes/${option}`);
        if (vote.status !== 200) {
            logger.error(`GET /polls: error retrieving vote (msg: ${vote.message})`);
            return null;
        }
        vote = await vote.json();
        return vote;
    }));
};

export default {
    checkFields,
    createVotes,
    createPoll,
    convertVotes,
};