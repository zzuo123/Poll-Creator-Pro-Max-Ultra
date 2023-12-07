<script>
  import PollCreate from "./PollCreate.svelte";
  import api from '$lib/api.js';
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let topPolls = [];
  onMount(async () => {
    console.log("getting top polls");
    if (topPolls.length > 0) {
      return;
    }
    topPolls = await api.getTopPolls(); // by default this will get the top 3 polls
  });
  function topPollClick(id) {
    dispatch('topPollClick', { id });
  }
</script>

<nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
  <div class="container-fluid">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <a class="navbar-brand" href="/">Poll Creator Pro Max Ultra</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/all">All Polls</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="." role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Top Polls
            </a>
            <ul class="dropdown-menu">
              {#each topPolls as poll}
                <li><a class="dropdown-item" href="/poll/{poll.id}" on:click={() => topPollClick(poll.id)}>{poll.topic}</a></li>
              {/each}
            </ul>
          </li>
          <li class="nav-item">
            <button class="nav-link" data-bs-toggle="modal" data-bs-target="#create-poll-modal">Create Poll</button>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button id="search" class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>

<PollCreate />

<style>
    .navbar {
        background-color: #6f2cf3 !important;
    }
    .nav-link {
        color: #dfebf7 !important;
    }
    .nav-link:hover {
        color: #ffffff !important;
    }
    #search{
      background-color: #212529;
      color: #ffffff;
    }
</style>