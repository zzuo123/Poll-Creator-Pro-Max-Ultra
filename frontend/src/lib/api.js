// frontend/src/lib/api.js
// handle backend api calls
async function createPoll(topic, options) {
    const response = await fetch("http://query:4003/polls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, options }),
    });
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    return result.id;
}

async function getPoll(id) {
    const response = await fetch(`http://query:4003/polls/${id}`);
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    return result;
}

async function vote(vid) {
    const response = await fetch(`http://query:4003/polls/inc/${vid}`, {
        method: "PUT",
    });
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    const votes = result.votes;
    if (votes === null) {
        return null;
    }
    return votes;
}

async function getAllPolls() {
    const response = await fetch("http://query:4003/polls/all");
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    return result;
}

async function deletePoll(id) {
    const response = await fetch(`http://query:4003/polls/${id}`, {
        method: "DELETE",
    });
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    return result;
}

async function getTopPolls(count = 3) {
    // by default get top 3 polls
    let result = await fetch(`http://query:4003/polls/top/${count}`);
    if (result.status !== 200) {
        logger.error(`GET /polls: error retrieving polls (msg: ${result.message})`);
        return null;
    }
    result = await result.json();
    return result;
};

async function searchPolls(term) {
    let result = await fetch(`http://query:4003/polls/search/${term}`);
    if (result.status !== 200) {
        logger.error(`GET /polls: error retrieving polls (msg: ${result.message})`);
        return null;
    }
    result = await result.json();
    return result;
}

export default {
    createPoll,
    getPoll,
    vote,
    getAllPolls,
    deletePoll,
    getTopPolls,
    searchPolls,
}