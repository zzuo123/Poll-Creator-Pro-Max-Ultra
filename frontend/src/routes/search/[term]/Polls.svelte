<script>
    import { onMount} from 'svelte';
    import { page } from '$app/stores';
    import Card from '../../Card.svelte';
    import api from '$lib/api.js';
    export let term = "";
    $: header = `All polls containing search term: ${term}`;
    let polls = null;
    export async function reload(searchTerm) {
        polls = null;
        polls = await api.searchPolls(searchTerm);
    }
    onMount (async () => {
        polls = await api.searchPolls(term);
    });
    function delete_poll_local(event) {
        const id = event.detail.id;
        polls = polls.filter(p => p.id !== id);
    }
</script>

<div class="container">
    <h2 class="text-center mt-5 mb-5">{header}</h2>
    {#key polls}
    {#if polls === null}
        <h3 class="text-center mt-5 mb-5">Loading...</h3>
    {:else if polls.length === 0}
        <h3 class="text-center mt-5 mb-5">No poll term "{term}" can be found.</h3>
    {:else}
    <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {#each polls as poll, i}
            <Card poll={poll} on:delete_poll={delete_poll_local}/>
        {/each}
    </div>
    {/if}
    {/key}
</div>