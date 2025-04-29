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

<div class="flex items-stretch bg-gray-100 shadow-black/50 rounded-3xl overflow-hidden transition-all duration-200 shadow-md grow shrink-0 max-w-full">
    <div class="flex {showMore ? 'w-80' : 'w-60'}  bg-white items-center justify-center shrink-0 p-4 transition-width duration-200">
        <img src={image} alt="{name}" class="w-full object-cover"/>
    </div>
    <div class="flex flex-col pt-3">
        <div class="flex items-center gap-2 px-6">
            <div class="bg-blue-whale px-6 py-2 pr-8 rounded-full flex flex-col leading-[75%]">
                <h2 class="text-2xl text-white whitespace-nowrap">{name}</h2>
            </div>
    
            {#each links as link}
            <a href={link.url} class="bg-picton-blue no-underline rounded-full h-8 w-8 p-4 flex items-center justify-center text-blue-whale mr-4 hover:bg-blue-whale hover:text-picton-blue transition-all duration-200">
                <i class={link.icon}></i>
            </a>
            {/each}
        </div>
        <div class="px-6 py-3">
            <p class="text-black hyphens-auto">{description}</p>
            <p class="text-gray-800 {showMore ? 'h-fit mt-6' : 'h-0'} overflow-auto transition-all duration-200 allow-keywords">{extendedDescription}</p>
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
</div>