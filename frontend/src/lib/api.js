// handle backend api calls
async function createPoll(topic, options) {
    const response = await fetch("http://localhost:4003/polls", {
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
    return result;
}

async function getPoll(id) {
    const response = await fetch(`http://localhost:4003/polls/${id}`);
    if (response.status !== 200) {
        return null;
    }
    const result = await response.json();
    return result;
}

async function vote(vid) {
    const response = await fetch(`http://localhost:4003/polls/inc/${vid}`, {
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

export default {
    createPoll,
    getPoll,
    vote,
}