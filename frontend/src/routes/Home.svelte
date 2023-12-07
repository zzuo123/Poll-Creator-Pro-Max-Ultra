<script>
    import PollCreate from "./PollCreate.svelte";
</script>

<div class="container">
    <div class="d-flex justify-content-center my-5">
        <svg id="icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M384 31.1H64c-35.35 0-64 28.65-64 63.1v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64v-320C448 60.65 419.3 31.1 384 31.1zM96 144c0-8.875 7.125-16 16-16h128c8.875 0 16 7.125 16 16v32C256 184.9 248.9 192 240 192h-128C103.1 192 96 184.9 96 176V144zM192 368C192 376.9 184.9 384 176 384h-64C103.1 384 96 376.9 96 368v-32C96 327.1 103.1 320 112 320h64C184.9 320 192 327.1 192 336V368zM352 272C352 280.9 344.9 288 336 288h-224C103.1 288 96 280.9 96 272v-32C96 231.1 103.1 224 112 224h224C344.9 224 352 231.1 352 240V272z"/></svg>
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
    :root {
        --bs-body-bg-rgb: 33, 37, 41;
        --bs-primary-rgb: 13, 110, 253;
        /* --bd-accent-rgb: 25, 135, 84; */
        --bd-accent-rgb: 255, 228, 132;
        --bd-violet-rgb: 112.520718,44.062154,249.437846;
        --bd-pink-rgb: 214,51,132;
    }
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