<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import { isLoggedIn, isAdmin, isVolunteer } from "$lib/stores/auth";

    import NavDropdown from "./NavDropdown.svelte";
    
    export let y_axis:number;
    export let height:number;

    let width:number;
    let showNavbar: boolean = true;

    $: showNavbar = width > 640;

    const pages = [
        { text: "Home", route: "/" },
        { text: "Partners", route: "/partners" },
        { text: "Speakers", route: "/speakers" },
        { text: "Program", route: "/program" },
        { text: "Contact", route: "/contact" },
    ];

</script>

<svelte:window bind:innerWidth={width} />

<NavDropdown scroll={y_axis} height={height} pages={pages}/>
<Navbar scroll={y_axis} height={height} pages={pages}/>
