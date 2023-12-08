<script>
    import NavBar from './NavBar.svelte';
    import Home from './Home.svelte';
</script>

<div id="body">
<NavBar />
<Home />
</div>

<style>
    :root {
        --bs-body-bg-rgb: 33, 37, 41;
        --bs-primary-rgb: 13, 110, 253;
        --bd-accent-rgb: 255, 228, 132;
        --bd-violet-rgb: 112.520718,44.062154,249.437846;
        --bd-pink-rgb: 214,51,132;
    }
    #body {
        background: linear-gradient(180deg, rgba(var(--bs-body-bg-rgb), 0.01), rgba(var(--bs-body-bg-rgb), 1) 85%),radial-gradient(ellipse at top left, rgba(var(--bs-primary-rgb), 0.5), transparent 50%),radial-gradient(ellipse at top right, rgba(var(--bd-accent-rgb), 0.5), transparent 50%),radial-gradient(ellipse at center right, rgba(var(--bd-violet-rgb), 0.5), transparent 50%),radial-gradient(ellipse at center left, rgba(var(--bd-pink-rgb), 0.5), transparent 50%) !important;
        width: 100vw;
        /* height: calc(100vh - 56px); */
        height: 100vh;
        margin-top: 0;
    }
</style>