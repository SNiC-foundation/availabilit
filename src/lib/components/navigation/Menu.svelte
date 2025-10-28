<script lang="ts">
    import Navbar from "./Navbar.svelte";
    import { auth, isLoggedIn, isAdmin } from "$lib/stores/auth";

    import NavDropdown from "./NavDropdown.svelte";
    
    export let y_axis:number;
    export let height:number;

    let width:number;
    let showNavbar: boolean = true;

    $: showNavbar = width > 640;

    const allPages = [
        { text: "Home", route: "/" },
        { text: "Partners", route: "/partners" },
        { text: "Speakers", route: "/speakers" },
        { text: "Program", route: "/program" },
        { text: "Contact", route: "/contact" },
        { text: "Users", route: "/users", adminRequired: true },
        { text: "Tickets", route: "/tickets", adminRequired: true },
        { text: "Profile", route: "/profile", logInRequired: true },
        { text: "Log in", route: "/login", logInRequired: false },
        { text: "Register", route: "/register", logInRequired: false },
    ];

    $: pages = allPages.filter(page => {
        // If page requires admin and user is not admin -> hide
        if (page.adminRequired && !$isAdmin) return false;

        // If page requires logged-in user and user is not logged in -> hide
        if (page.logInRequired === true && !$isLoggedIn) return false;

        // If page explicitly should be shown only when logged out and user is logged in -> hide
        if (page.logInRequired === false && $isLoggedIn) return false;

        return true;
    });

</script>

<svelte:window bind:innerWidth={width} />

<NavDropdown scroll={y_axis} height={height} pages={pages}/>
<Navbar scroll={y_axis} height={height} pages={pages}/>
