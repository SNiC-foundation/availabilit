<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "$lib/components/navigation/Navbutton.svelte";
    import { base } from "$app/paths";

    export let scroll:number;
    export let height:number;

    let isDropDown:boolean = false;

    const handleDropdown = () => {
        isDropDown = !isDropDown;
    }

    $: dropdownStyle = `display: ${isDropDown ? 'flex' : 'none'};
     top: ${(Math.max(64, Math.min(scroll / height, 1) * 64)) - 10}px;
     background: rgba(0,50,73,${Math.min(scroll / height,1)});`;
   
</script>

<nav class="navbar flex w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container justify-around items-center">
        <a href="{base}/" class="h-12"><img src="{WordMark}" alt="" class="h-full"></a>
        <button id=dropdown class="text-picton-blue" on:click={handleDropdown}>
            <!-- Switch between the icons -->
            {#if isDropDown}
                <i class="fa-solid fa-xmark"></i>
            {:else}
                <i class="fa-solid fa-bars"></i>
            {/if}
        </button>
    </div>
</nav>
<!-- Dropdown content -->
<div class="flex-col items-center gap-3 py-[2vh] h-fit w-full fixed z-20 size-10 "
         style={dropdownStyle}>
    <Navbutton text="Home" section="#landing_section" />
    <Navbutton text="Theme" section="#theme_section"  />
    <Navbutton text="About" section="#about_section"  />
    <Navbutton text="Accessibility" section="#accessibility_section" />
    <Navbutton text="Location" section="#location_section" />
</div>

<style>
    .navbar {
        border-bottom-left-radius: 50% 10px;
        border-bottom-right-radius: 50% 10px;
        overflow: hidden
    }

    #dropdown i {
        font-size: 5vw; 
    }
</style>

