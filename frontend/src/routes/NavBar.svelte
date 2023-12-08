<script>
  import PollCreate from "./PollCreate.svelte";
  import api from '$lib/api.js';
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { poll_list as pl } from '$lib/store.js';
  const dispatch = createEventDispatcher();
  let topPolls = [];
  let searchTerm = "";
  onMount(async () => {
    console.log("getting top polls");
    if (topPolls.length > 0) {
      return;
    } // this is expensive operation on the server, only do it when reload
    topPolls = await api.getTopPolls(); // by default this will get the top 3 polls
  });
  function topPollClick(id) {
    dispatch('topPollClick', { id });
  }
  function search(e) {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }
    dispatch('search', { searchTerm });
    goto(`/search/${searchTerm}`);
  }
  pl.subscribe(async (value) => {
    // get top polls again if one of the polls is deleted
    const all_poll_ids = value.map((poll) => poll.id);
    const top_poll_ids = topPolls.map((poll) => poll.id);
    const deleted_poll_id = top_poll_ids.filter((id) => !all_poll_ids.includes(id));
    if (deleted_poll_id.length > 0) {
      console.log("One of the top polls is deleted, getting top polls again");
      topPolls = await api.getTopPolls();
    }
  });
</script>

<nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
  <div class="container-fluid">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <a class="navbar-brand" href="/">
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32z"/></svg>
        Poll Creator Pro Max Ultra
      </a>
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
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" bind:value={searchTerm}>
          <button id="search" class="btn" type="submit" on:click={search}>Search</button>
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
    #search:hover{
      background-color: #198754;
    }
    #icon{
      width: 25px;
      height: auto;
      margin-right: 1em;
      fill: #ffffff;
    }
</style>