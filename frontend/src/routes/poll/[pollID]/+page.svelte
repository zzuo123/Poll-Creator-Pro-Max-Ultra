<script>
    import { page } from '$app/stores'
    import { poll_list as pl } from '$lib/store.js';
    import Poll from './Poll.svelte';
    const pollID = $page.params.pollID;
    let poll;
    pl.subscribe(polls => {
        poll = polls.find(p => p.id === pollID);
    });
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