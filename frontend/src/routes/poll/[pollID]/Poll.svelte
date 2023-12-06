<script>
    export let poll;
    import Option from './Option.svelte';
    import { poll_list as pl } from '$lib/store.js';    // temp fix
    import api from "$lib/api.js";
    async function handle_vote(event) {
        const option_id = event.detail.id;
        const updatedVote = await api.vote(option_id);
        if (updatedVote === null) {
            alert(`Error voting for option with id ${option_id}`)
        }
        pl.update((polls) => {
            const new_polls = polls.map((p) => {
                if (p.id === poll.id) {
                    const idx = p.options.findIndex(o => o.id === option_id);
                    p.options[idx].votes = updatedVote;
                }
                return p;
            });
            console.log(new_polls);
            return new_polls;
        });
    }
    $: sum = poll.options.reduce((acc, cur) => acc + cur.votes, 0);
</script>

<div class="centered">
    {#if poll.id === null}
        <h1>Poll not found</h1>
    {:else}
        <!-- display if poll exists -->
        <div id="poll">
            <h1>Poll: {poll.topic}</h1>
            {#each poll.options as option (option.id)}
                <Option option={option} sum={sum} on:vote={handle_vote}/>
            {/each}
        </div>
    {/if}
    <a href="/">&larr; Back to home</a>
</div>

<style>
    /* .centered {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #poll {
        width: 50vw;
        padding: 1em;
    }
    h1 {
        text-align: center;
        width: 100%;
    } */
</style>