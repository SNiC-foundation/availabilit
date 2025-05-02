<script lang="ts">
    import Navbar from "./Navbar.svelte";

    import NavDropdown from "./NavDropdown.svelte";
    
    export let y_axis:number;
    export let height:number;

    let width:number;
    let showNavbar: boolean = true;

    $: showNavbar = width > 640;

    let pages = [
        { 
            text: "Home", 
            route: "/", 
            sections: [
                "title",
                "theme",
                "about",
                "accessibility",
                "location"
            ] 
        },
        { 
            text: "Partners", 
            route: "/partners", 
            sections: [
                "platinum",
                "gold", 
                "silver",
                "bronze",
            ]
        },
        { 
            text: "Speakers", 
            route: "/speakers",
            sections: [
                "sociatal",
                "cybersec",
                "opensource"
            ]
        },
        { 
            text: "Contact", 
            route: "/contact", 
            sections: [
                "contact",
                "committee"
            ]
        }
    ];


</script>

<svelte:window bind:innerWidth={width} />


{#if !showNavbar}
    <NavDropdown scroll={y_axis} height={height} pages={pages}/>
{:else}
    <Navbar scroll={y_axis} height={height} pages={pages}/>
{/if}
