<script lang="ts">
    import ProgramPart from './ProgramPart.svelte';
    import Header from '$lib/components/Header.svelte';
    import { programParts, activities } from './data';
</script>
<Header title="Program"/>
<div id="program_section" class="container flex-col text-blue-whale gap-4 text-center md:text-left">
    {#if programParts.length === 0}
        <div class="text-center py-12">
            <div class="text-gray-500 text-lg">No program parts scheduled yet</div>
            <p class="text-gray-400 mt-2">Check back later for updates</p>
        </div>
    {:else}
        <div class="space-y-8 p-8">
            {#each programParts as part}
                <ProgramPart {part} activities={activities.filter((a) => a?.activity?.programPart?.id === part.id)}/>
            {/each}
        </div>
    {/if}
</div>
