<script>
    import PollCreate from "./PollCreate.svelte";
</script>

<div class="container">
    <div class="d-flex justify-content-center my-5">
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7
            32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7
            0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7
            0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7
            0 32 14.3 32 32z"/></svg>
    </div>
    <h1 id="title" class="text-center mt-5">Poll Creator Pro Max Ultra</h1>
    <p id="desc" class="text-center mt-5">Create simple, fast and scalable polls with Poll Creator Pro Max Ultra</p>
    <div class="d-flex justify-content-center">
        <p id="long-desc" class="text-center">Poll Creator Pro Max Ultra utilizes the power of Docker container, MongoDB database, and Express.js server to provide a poll creation and hosting service that is scalable and minimizes downtime.</p>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-light mt-5" data-bs-toggle="modal" data-bs-target="#create-poll-modal">Create Poll</button>
    </div>
</div>
<PollCreate />

<style>
    @import url('https://fonts.googleapis.com/css2?family=Whisper&display=swap');
    #title {
        font-size: calc(1.5rem + 3vw);
        font-family: 'Whisper', cursive;
    }
    #icon {
        width: 100px;
        height: auto;
        /* fill: #6f2cf3; */
        fill: #ffffff;
    }
    #desc {
        font-size: calc(1rem + 0.5vh);

    }
    #long-desc {
        width: 70%;
    }
</style>