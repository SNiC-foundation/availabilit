<script>
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { onMount } from "svelte";

  let admin = false;
  let loading = true;
  let error = '';

  async function loadUserProfile() {
        try {           
            const response = await fetch("https://availabilit.ia.utwente.nl/api/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const user = await response.json();
                admin = user && user.roles.map(role => role.name).includes('Admin')
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
        const response = await fetch("https://availabilit.ia.utwente.nl/api/speaker", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            speakers = await response.json();
            console.log(speakers)
        } else {
            speakers = [];
        }
    } catch (e) {
        console.error('Error loading speakers:', e);
        speakers = [];
        error = e;
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
            {#each speakers as speaker}
                <SpeakerCard
                    id={speaker.id}
                    admin={admin}
                    title={speaker.title}
                    image={speaker.imageFilename ? `https://availabilit.ia.utwente.nl/api/speaker/${speaker.id}/image` : ''}
                    name={speaker.name}
                    description={speaker.description}
                    tags={speaker.tags || []}
                    links={speaker.links || []}
                />
            {/each}
        </div>
    {/if}
</div>
