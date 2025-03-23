<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "$lib/components/navigation/Navbutton.svelte";
    import { base } from "$app/paths";

    export let scroll:number;
    export let height:number;


</script>

<nav class="navbar flex w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container justify-around items-center">
        <a href="{base}/" class="h-12"><img src="{WordMark}" alt="" class="h-full"></a>
        <div id=dropdown class="text-picton-blue"><i class="fa-solid fa-bars"></i></div>

</nav>


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

