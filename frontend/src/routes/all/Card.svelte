<script>
    import { goto } from '$app/navigation';
    import { poll_list as pl } from '$lib/store.js';
    import api from '$lib/api.js';
    export let poll;
    async function delete_poll() {
        const result = await api.deletePoll(poll.id);
        console.log(result);
        if (result === null) {
            alert("Error deleting poll");
            return;
        }
        pl.update(value => {
            return value.filter(p => p.id !== poll.id);
        });
    }
    function view_poll() {
        goto("/poll/" + poll.id + "/");
    }
</script>


<div class="col">
  <div class="card text-bg-secondary">
    <div class="card-body">
      <h5 class="card-title">Topic: {poll.topic}</h5>
      <ul>
      {#each poll.options as option, i}
        <li class="card-text">Option {i+1} ({option.votes} votes) : {option.text}</li>
      {/each}
      </ul>
      <button on:click={view_poll} class="btn btn-primary">View Poll</button>
      <button on:click={async () => await delete_poll(poll.id)} class="btn btn-danger">Delete Poll</button>
    </div>
  </div>
</div>
  

<!-- <p>{i+1}</p>
<p><a class="poll_list" href="/poll/{poll.id}/">{poll.topic}</a></p>
<button on:click={async () => await delete_poll(poll.id)} class="delete-btn">🗑️</button> -->