<script>
    import { createEventDispatcher } from 'svelte';
    export let option;
    export let sum;
    $: percentage = sum === 0 ? 0 : Math.round(option.votes/sum*100);
    percentage += 10;   // for testing only
    const dispatch = createEventDispatcher();
    function handle_vote() {
        dispatch('vote', {id: option.id});
    }
</script>

<button on:click={handle_vote} style="--wid:{percentage}%">
    <div id="option-text">
        <span id="opt">{option.text}</span>
        : {option.votes} votes 
        ({percentage}%)
    </div>
</button>

<style>
    button {
        width: 100%;
        margin-bottom: 0.5em;
        position: relative;
        background: #545b5f;
        border: none;
	    padding: 0.5em 1em;
        outline: none;
        /* https://stackoverflow.com/questions/17353449/i-want-to-add-a-background-color-only-to-part-of-my-div */
        /* https://stackoverflow.com/questions/57174373/can-i-set-svelte-style-css-attribute-values-using-variables-passed-in-to-a-compo */
        background-image: linear-gradient(left, #039be5, #039be5 var(--wid), transparent var(--wid), transparent 100%);
        background-image: -webkit-linear-gradient(left, #039be5, #039be5 var(--wid), transparent var(--wid), transparent 100%)  
    }
    button:hover {
        cursor: pointer;
    }
    #option-text {
        z-index: 1;
        text-align: left;
        width: 100%;
        height: 100%;
        color: white;
        font-weight: bold;
    }
    #opt {
        font-size: 1.2em;
    }
</style>