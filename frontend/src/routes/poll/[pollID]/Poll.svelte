<script>
    export let poll;
    import Option from './Option.svelte';
    import { goto } from '$app/navigation';
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
    function go_home() {
        goto("/");
    }
    $: sum = poll.options.reduce((acc, cur) => acc + cur.votes, 0);
</script>

{#if poll.id === null}
    <h1 class="text-center mt-5">Poll not found</h1>
{:else}
    <!-- display if poll actually exists -->
    <h1 class="text-center mt-5">Poll: {poll.topic}</h1>
    {#each poll.options as option (option.id)}
        <div class="my-4">
            <Option option={option} sum={sum} on:vote={handle_vote}/>
        </div>
    {/each}
{/if}

<div class="d-flex justify-content-center">
    <button class="btn btn-secondary" on:click={go_home}>Home Page</button>
</div>
