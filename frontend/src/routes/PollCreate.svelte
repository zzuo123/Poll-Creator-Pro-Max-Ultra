<script>
    import { goto } from '$app/navigation';
    import { poll_list } from '$lib/store.js';
    import api from '$lib/api.js';
    export let header = "Create a Poll";
    let topic = "";
    let options = [];
    function addOption() {
        options = [...options, {text:""}];
    }
    function removeOption(i) {
        options = options.filter((_, index) => index !== i);
    }
    async function generatePoll() {
        const newPoll = await api.createPoll(topic, options);
        if (newPoll === null) {
            alert("Error creating poll");
            return;
        }
        poll_list.
        goto("/poll/" + newPoll.id + "/");
    }
</script>

<h2>{header}</h2>
<div id="form">
    <input id="topic-box" type="text" placeholder="Topic" bind:value={topic} />
    <br>
    {#each options as option, i}
        <input id="i" type="text" placeholder="Option {i + 1}" bind:value={option.text} />
        <button class="remove-btn" on:click={() => removeOption(i)}>🗑️</button>
        <br>
    {/each}
    <button on:click={addOption}>Add Option</button>
    <br>
    <button on:click={generatePoll}>Generate Poll</button>
</div>

<style>
    #form>*{
        font-size: 1.2em;
    }
    .remove-btn {
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
    }
</style>