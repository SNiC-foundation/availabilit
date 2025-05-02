<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "$lib/components/navigation/Navbutton.svelte";
    import { base } from "$app/paths";

    export let scroll:number;
    export let height:number;
    export let pages:any[];


    let background:boolean = true;

    let isDropHome = false;

    let homeLeft:number|undefined;

    const dropHome = () => {
        isDropHome = !isDropHome;
        console.log("Clicked a nav button: ", isDropHome);
        homeLeft = document.getElementById('dropHomeButton')?.getBoundingClientRect().left;
    }
    
    // Styling of the dropdown for the home page
    $: dropHomeStyle = `display: ${isDropHome ? 'flex' : 'none'};
        left: ${homeLeft}px;
        top: ${(Math.max(64, Math.min(scroll / height, 1) * 64)) - 10}px;
        background: rgba(0,50,73,${Math.min(scroll / height,1)});`;

</script>

<nav class="navbar flex w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container sm:px-8 justify-between items-center">
        <a href="{base}/" class="h-12"><img src={WordMark} alt="" class="h-full"></a>
        <div class="flex flex-row items-center sm:gap-4">
            {#each pages as page }
                <Navbutton scroll={scroll} height={height} 
                    text="{page.text}" route="{page.route}" sections={page.sections} /> 
            {/each}
        </div>
    </div>

</nav>

<style>
    .navbar {
        border-bottom-left-radius: 50% 10px;
        border-bottom-right-radius: 50% 10px;
        overflow: hidden
    }

    
</style>