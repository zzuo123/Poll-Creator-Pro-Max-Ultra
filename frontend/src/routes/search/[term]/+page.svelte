<script>
    // frontend/src/routes/search/[term]/+page.svelte
    import { page } from '$app/stores'
    import Polls from './Polls.svelte';
    import NavBar from '../../NavBar.svelte';
    $: term = $page.params.term;
    let reload;
    async function handleSearch(event) {
        const searchTerm = event.detail.searchTerm;
        await reload(searchTerm);
    }
</script>

<NavBar on:search={handleSearch}/>
<Polls term={term} bind:reload={reload}/>