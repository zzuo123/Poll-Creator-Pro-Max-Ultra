<script>
    import { poll_list as pl } from '$lib/store.js';
    export let count = 5;
    export let header = "Top " + count + " Polls";
    let polls;
    const count_votes = (poll) => {
        return poll.options.reduce((sum, option) => sum + option.votes, 0);
    };
    pl.subscribe(value => {
        polls = value;
        // sort by number of votes
        polls = [...polls].sort((a, b) => {
            return count_votes(b) - count_votes(a);
        });
        polls = polls.slice(0, count);
    });
</script>

<h2>{header}</h2>
<div id="top-polls">
    <table>
    <tr><th>Rank</th><th>Topic</th><th>Vote Count</th><th>Options</th></tr>
    {#each polls as poll, i}
        <tr>
            <td>{i+1}</td>
            <td><a class="poll_list" href="/poll/{poll.id}/">{poll.topic}</a></td>
            <td>{count_votes(poll)} votes</td>
            <td>
                <ul class="opt-lst">
                    {#each poll.options as option}
                    <li>{option.text} ({option.votes} votes)</li>
                    {/each}
                </ul>
            </td>
        </tr>
    {/each}
    </table>
</div>


<style>
    table {
        border-collapse: collapse;
        border: 1px solid black;
    }
    table > tr > td {
        border: 1px solid black;
        padding: 0.5em;
    }
    table > tr > th{
        border: 1px solid black;
        padding: 0.5em;
    }
    .opt-lst {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>