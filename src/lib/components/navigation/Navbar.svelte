<script lang="ts">
    import WordMark from "$lib/images/WordMark.png";
    import Navbutton from "$lib/components/navigation/Navbutton.svelte";
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import { isAdmin } from "$lib/util/auth";
    import { apiUrl } from "$lib/config";

    export let scroll:number;
    export let height:number;
    export let pages:any[];

    let loggedIn = false;
    let admin = false;

    onMount(async () => {
        try {
            const response = await fetch(apiUrl('/profile'), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                loggedIn = response.ok;
                const user = await response.json()
                admin = await isAdmin(user)
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    });
</script>
<nav class="navbar flex w-screen h-16 fixed top-0 z-10 backdrop-blur-md items-center" style="background: rgba(0,50,73,{Math.min(scroll / height,1)})">
    <div class="container sm:px-8 justify-between items-center">
        <a href="{base}/" class="h-12"><img src={WordMark} alt="" class="h-full"></a>
        <div class="flex flex-row items-center sm:gap-4">
            {#each pages as page }
                <Navbutton text="{page.text}" route="{page.route}" />        
            {/each}

            {#if loggedIn}
                {#if admin}
                    <Navbutton text="Users" route="/users" />
                    <Navbutton text="Tickets" route="/tickets" />        
                {/if}
                <Navbutton text="Profile" route="/profile" />        
            {:else}
                <Navbutton text="Log in" route="/login" />        
            {/if}
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