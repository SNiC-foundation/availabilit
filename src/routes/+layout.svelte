<script lang="ts">
    import "../app.css"
    import Footer from "$lib/components/Footer.svelte"
    import Menu from "$lib/components/navigation/Menu.svelte";
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';

    let y:number;
    let height:number;

    onMount(async () => {
        // Initialize auth state when the app loads
        await auth.init();
    });
</script>

<slot></slot>
<Menu y_axis={y} height={height} />
<Footer/>

<svelte:window bind:scrollY={y} bind:innerHeight={height} />