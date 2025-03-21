<script lang="ts">
    import Navbar from "./Navbar.svelte";

    import NavDropdown from "./NavDropdown.svelte";
    
    export let y_axis:number;
    export let height:number;

    let width:number;

</script>

<svelte:window bind:innerWidth={width} />


{#if width <= 640}
    <NavDropdown />
{:else}
    <Navbar scroll={y_axis} height={height}/>
{/if}
