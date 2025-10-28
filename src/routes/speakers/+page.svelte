<script>
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { isAdmin } from "$lib/util/auth";
  import { onMount } from "svelte";
  import { apiUrl, staticUrl } from "$lib/config";

  let admin = false;
  let loading = true;
  let error = '';

  async function loadUserProfile() {
        try {           
            const response = await fetch(apiUrl('/profile'), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const user = await response.json();
                admin = isAdmin(user)
            } 
        } catch(e) {
            console.error(e)
        }
    }

  /**
   * @type {string | any[]}
   */
  let speakers = [];

async function getSpeakers() {
    try {
        const response = await fetch(apiUrl('/speaker'), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            speakers = await response.json();
        } else {
            speakers = [];
        }
    } catch (e) {
        console.error('Error loading speakers:', e);
        speakers = [];
    }
}

  onMount(async () => {
        await loadUserProfile();
        await getSpeakers();
        loading = false;
    });
</script>
<Header title="Speakers"/>
<div id="speakers_section" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if admin}
        <button class="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" on:click={()=>goto('/speakers/create')}>
            Add Speaker
        </button>
    {/if}
    
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-whale"></div>
        </div>
    {:else if error}
        <div class="bg-red-100 text-red-700 p-4 rounded">
            {error}
        </div>
    {:else if speakers && speakers.length === 0}
        <p>We will display our speakers here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!</p>
    {:else if speakers && speakers.length > 0}
        <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
            {#each speakers as speaker, index}
                <SpeakerCard
                    id={speaker.id}
                    admin={admin}
                    title={speaker.title}
                    image={staticUrl(`/speakers/${speaker.imageFilename}`)}
                    name={speaker.name}
                    description={speaker.description}
                    tags={speaker.tags || []}
                    links={speaker.links || []}
                    height={index}
                />
            {/each}
        </div>
    {/if}
</div>
