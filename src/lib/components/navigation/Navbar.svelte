<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "$lib/components/navigation/Navbutton.svelte";
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import { auth } from "$lib/stores/auth";

    export let scroll:number;
    export let height:number;
    export let pages:any[];

    onMount(async () => {
        await auth.init();
    });
</script>
<nav class="navbar w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center hidden lg:flex" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container sm:px-8 justify-between items-center">
        <a href="{base}/" class="h-12"><img src={WordMark} alt="" class="h-full"></a>
        <div class="flex flex-row items-center sm:gap-4">
            {#each pages as page }
                <Navbutton text="{page.text}" route="{page.route}" />  
            {/each}
        </div>
    </div>
</nav>

<style>
    .navbar {
        border-bottom-left-radius: 50% 10px;
        border-bottom-right-radius: 50% 10px;
        overflow: hidden;
    }
</style>