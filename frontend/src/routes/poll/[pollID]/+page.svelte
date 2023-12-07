<script>
    import { page } from '$app/stores'
    import { poll_list as pl } from '$lib/store.js';
    import Poll from './Poll.svelte';
    import api from '$lib/api.js';
    import { onMount } from 'svelte';
    import NavBar from '../../NavBar.svelte';
    import { goto } from '$app/navigation';
    let pollID = $page.params.pollID;
    let poll = undefined;
    pl.subscribe(polls => {
        poll = polls.find(p => p.id === pollID);
    });
    async function updatePoll() {
        const newPoll = await api.getPoll(pollID);
        if (poll === undefined) {
            pl.update((polls) => [...polls, newPoll]);
        } else {
            pl.update((polls) => {
                return polls.map((p) => {
                    if (p.id === pollID) {
                        return newPoll;
                    }
                    return p;
                });
            });
        }
        poll = newPoll;
    }
    onMount(async () => {
        pollID = $page.params.pollID;
        updatePoll();
        // this is ran after script tag
    });
    function go_home() {
        goto("/");
    }
    function handle_top_poll_click(event) {
        pollID = event.detail.id;
        poll = undefined;
        updatePoll();
        goto("/poll/" + event.detail.id + "/");
    }
</script>

<NavBar on:topPollClick={handle_top_poll_click}/>
<div class="container">
{#if poll === undefined}
    <h1 class="text-center my-5">Fetching poll info from database...</h1>
    <div class="d-flex justify-content-center">
        <button class="btn btn-secondary" on:click={go_home}>Home Page</button>
    </div>
{:else}
        <Poll poll={poll} />
{/if}
</div>
