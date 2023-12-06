<script>
    import { poll_list as pl } from '$lib/store.js';
    export let header = "All Polls";
    let polls;
    pl.subscribe(value => {
        polls = value;
    });
    function delete_poll(id) {
        pl.update(value => {
            return value.filter(poll => poll.id !== id);
        });
    }
</script>

<h2>{header}</h2>
<div id="polls">
    <table>
        <tr><th>Poll #</th><th>Topic</th><th>Delete</th></tr>
        {#each polls as poll, i}
        <tr>
            <td>{i+1}</td>
            <td><a class="poll_list" href="/poll/{poll.id}/">{poll.topic}</a></td>
            <td><button on:click={() => delete_poll(poll.id)} class="delete-btn">🗑️</button></td>
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
    .delete-btn {
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
    }
</style>