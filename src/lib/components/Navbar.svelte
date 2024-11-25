<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "./Navbutton.svelte";
    import { base } from "$app/paths";

    export let scroll:number;
    export let height:number;

    let background:boolean;
    background = true;
</script>
<nav class="navbar flex w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container px-8 justify-between items-center">
        <a href="{base}/" class="h-12"><img src={WordMark} alt="" class="h-full"></a>
        <div class="flex flex-row gap-4">
            <Navbutton text="Home" section="#landing_section"/>
            <Navbutton text="Theme" section="#theme_section"/>
            <Navbutton text="About" section="#about_section"/>
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