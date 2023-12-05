<script>
    import Polls from './Polls.svelte'
    import PollCreate from './PollCreate.svelte';
    import TopPolls from './TopPolls.svelte';
</script>

<div class="centered">
<h1>Poll Creator Pro Max</h1>
<hr style="width: 100%;">
<PollCreate />
<TopPolls count=3/>
<Polls />
</div>

<style>
    .centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>