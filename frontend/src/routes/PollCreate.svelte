<script>
    import { goto } from '$app/navigation';
    import { poll_list } from '$lib/store.js';
    import api from '$lib/api.js';
    let topic = "";
    let options = [{text:""}];
    function addOption() {
        options = [...options, {text:""}];
    }
    function removeOption(i) {
        options = options.filter((_, index) => index !== i);
    }
    async function generatePoll() {
        const newPollID = await api.createPoll(topic, options);
        if (newPollID === null) {
            alert("Error creating poll");
            return;
        }
        const newPoll = await api.getPoll(newPollID);
        if (newPoll === null) {
            alert(`Error fetching new poll ${newPollID}`);
            return;
        }   // add new poll to poll list store
        poll_list.update((polls) => [...polls, newPoll]);
        goto("/poll/" + newPollID + "/");
    }
</script>

<div class="modal fade" id="create-poll-modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h3 class="modal-title ml-5" id="ModalLabel">New Poll</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row justify-content-center">
            <div class="col-md-10 border rounded p-5">
                <form>
                  <div class="row my-3">
                    <div class="col-lg-3"><h4>Poll topic:</h4></div>
                    <div class="col-lg-9">
                        <input id="topic-box" class="form-control" type="text" placeholder="What is this poll about?" bind:value={topic}>
                    </div>
                  </div>
                  {#each options as option, i}
                    <div class="row my-3">
                    <div class="col-lg-3"><h4>Option {i+1}:</h4></div>
                    <div class="col-lg-7">
                        <input id="topic-box" class="form-control" type="text" placeholder="What is this option?" bind:value={option.text}>
                    </div>
                    <div class="col-lg-2"><button class="btn btn-danger" on:click={()=>removeOption(i)}>Delete</button></div>
                    </div>
                  {/each}
                  <button class="btn btn-secondary" on:click={addOption}>Add Option</button>
                </form>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary" on:click={generatePoll}>Generate Poll</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
