<!-- filepath: /Users/matthias/Desktop/1 Projects/SNiC/website/availabilit/src/lib/components/SpeakerCard.svelte -->
<script lang="ts">
    export let image: string;
    export let name: string;
    export let description: string;
    export let extendedDescription: string;
    export let tags: string[] = [];
    export let height: number = 0;
    export let links: {icon: string, url: string}[] = [];

    let showMore = false
</script>

<div class="bg-white shadow-black/50 rounded-3xl overflow-hidden transition-all duration-200 mb-24 {showMore ? 'w-96 -mb-60 shadow-2xl' : 'w-80 shadow-md'}" style="z-index: {10-height};">
    <img src={image} alt="{name}" class="h-60 w-full object-cover"/>
    <div class="flex items-center -translate-y-1/2">
        <div class="bg-blue-whale px-4 py-2 pr-8 rounded-r-full flex flex-col leading-[75%]">
            <span class="text-white font-thin">Keynote</span>
            <h2 class="text-2xl text-white whitespace-nowrap">{name}</h2>
        </div>

        {#each links as link, index}
        <a href={link.url} class="bg-picton-blue border-8 border-white rounded-full h-8 w-8 p-4 flex items-center justify-center text-blue-whale mr-4 hover:bg-blue-whale hover:text-picton-blue transition-all duration-200 {index === 0 ? 'ml-auto' : ''}">
            <i class={link.icon}></i>
        </a>
        {/each}
    </div>
    <div class="px-4 -mt-6 py-2">
        <p class="text-black hyphens-auto">{@html description}</p>
        <p class="text-gray-800 {showMore ? 'h-60' : 'h-0'} overflow-auto transition-all duration-200 allow-keywords">{@html extendedDescription}</p>
        <button on:click={() => showMore = !showMore} class="text-blue-500 mt-2">
            {#if showMore} Show Less {:else} Show More {/if}
        </button>
        
    </div>
    <div class="flex flex-row flex-wrap bg-gray-200 gap-2 px-4 py-2 mt-auto">
        {#each tags as tag}
            <span class="text-sm bg-aquamarine  px-3 py-1 rounded-full">{tag}</span>
        {/each}
    </div>
</div>