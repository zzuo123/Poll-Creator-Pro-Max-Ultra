<script>
    import { page } from '$app/stores'
    import { poll_list as pl } from '$lib/store.js';
    import Poll from './Poll.svelte';
    import api from '$lib/api.js';
    const pollID = $page.params.pollID;
    let poll;
    pl.subscribe(polls => {
        poll = polls.find(p => p.id === pollID);
    });
    if (poll === undefined) {
        const res = api.getPoll(pollID);
        if (res !== null) {
            pl.update((polls) => [...polls, newPoll]);
        }
    }
    console.log(poll);
</script>

<div class="centered">
{#if poll === undefined}
    <h1>Poll not found</h1>
    <a href="/">&larr; Back to home</a>
{:else}
    <Poll poll={poll} />
{/if}
</div>

<style>
    .centered {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>