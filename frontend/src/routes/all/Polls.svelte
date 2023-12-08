<script>
    import { poll_list as pl } from '$lib/store.js';
    import { onMount } from 'svelte';
    import Card from '../Card.svelte';
    import api from '$lib/api.js';
    export let header = "All polls posted by all users:";
    let polls;
    onMount (async () => {
        const all_polls = await api.getAllPolls();
        pl.set(all_polls);
    });
    pl.subscribe(value => {
        polls = value;
    });
</script>

<div class="container">
    <h2 class="text-center mt-5 mb-5">{header}</h2>
    <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
    {#each polls as poll, i}
        <Card poll={poll}/>
    {/each}
    </div>
</div>