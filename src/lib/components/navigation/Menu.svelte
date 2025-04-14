<script lang="ts">
    import Navbar from "./Navbar.svelte";

    import NavDropdown from "./NavDropdown.svelte";
    
    export let y_axis:number;
    export let height:number;

    let width:number;
    let showNavbar: boolean = true;

    $: showNavbar = width > 640;

    let pages = [
        { text: "Home", route: "/" },
        { text: "Partners", route: "/partners" },
        { text: "Speakers", route: "/speakers" },
        { text: "Contact", route: "/contact" },
    ];

</script>

<svelte:window bind:innerWidth={width} />


{#if !showNavbar}
    <NavDropdown scroll={y_axis} height={height} pages={pages}/>
{:else}
    <Navbar scroll={y_axis} height={height} pages={pages}/>
{/if}
