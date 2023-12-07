<script>
  import PollCreate from "./PollCreate.svelte";
  import api from '$lib/api.js';
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';
  import Icon from '$lib/assets/icon.svg';
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
      <a class="navbar-brand" href="/">
        <svg id="icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M384 31.1H64c-35.35 0-64 28.65-64 63.1v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320C448 60.65 419.3 31.1 384 31.1zM96 144c0-8.875 7.125-16 16-16h128c8.875 0 16 7.125 16 16v32C256 184.9 248.9 192 240 192h-128C103.1 192 96 184.9 96 176V144zM192 368C192 376.9 184.9 384 176 384h-64C103.1 384 96 376.9 96 368v-32C96 327.1 103.1 320 112 320h64C184.9 320 192 327.1 192 336V368zM352 272C352 280.9 344.9 288 336 288h-224C103.1 288 96 280.9 96 272v-32C96 231.1 103.1 224 112 224h224C344.9 224 352 231.1 352 240V272z"/></svg>
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
                <li><a class="dropdown-item" href="/poll/{poll.id}" on:click={() => topPollClick(poll.id)}>{poll.topic} ({poll.votes})</a></li>
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
    #icon{
      width: 25px;
      height: auto;
      margin-right: 1em;
      fill: #ffffff;
    }
</style>