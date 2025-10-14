<script lang="ts">
  import { goto } from "$app/navigation";


    export let id: number;
    export let image: string;
    export let admin: boolean;
    export let name: string;
    export let title: string;
    export let small: boolean = false;
    export let category: string = "Talk";
    export let description: string;
    export let tags: string[] = [];
    export let height: number = 0;
    export let links: {icon: string, url: string}[] = [];

    let showMore = false

    const editSpeaker = (id) => goto(`${id}/edit`)
</script>

<div class="bg-white shadow-black/50 rounded-3xl overflow-hidden transition-all flex flex-col md:min-h-148 duration-200 md:mb-24 {showMore ? 'md:w-112 -mb-60 shadow-2xl' : 'w-full md:w-80 shadow-md'}" style="z-index: {10-height};">
    <div class="relative">
        {#if admin}
            <button class="rounded-lg bg-blue-whale absolute top-2 right-2 shadow shadow-black shadow-lg w-8 h-8" on:click={editSpeaker(name)}>
                <i class="fa-solid fa-pencil text-picton-blue"></i>
            </button>
        {/if}
        <img src={image} alt="{name}" class="h-60 w-full object-cover"/>
    </div>
    <div class="flex items-center -translate-y-1/2">
        <div class="bg-blue-whale px-4 py-2 pr-8 rounded-r-full flex flex-col items-start leading-[75%]">
            <span class="text-white font-thin">{category}</span>
            <h2 class="text-2xl text-white whitespace-nowrap">{name}</h2>
        </div>

        {#each links as link, index}
        <a href={link.url} class="bg-picton-blue no-underline border-8 border-white rounded-full h-8 w-8 p-4 flex items-center justify-center text-blue-whale mr-2 hover:bg-blue-whale hover:text-picton-blue transition-all duration-200 {index === 0 ? 'ml-auto' : ''}">
            <i class={link.icon}></i>
        </a>
        {/each}
    </div>
    <div class="px-4 -mt-6 py-2">
        {#if small}
            <h4 class="font-bold">{title}</h4>
        {:else}
            <h2 class="font-bold">{title}</h2>
        {/if}
        <div class="overflow-auto prose prose-sm md:prose-base prose-headings:text-blue-whale prose-headings:m-0 prose-h1:text-2xl prose-ul:my-0 prose-p:mt-0 prose-p:mb-2">
            <p class="text-ellipsis transition-all duration-200 {showMore ? 'h-60' : 'h-28 overflow-hidden line-clamp-4'}">{@html description}</p>
        </div>
        <button on:click={() => showMore = !showMore} class="text-blue-500 mt-auto">
            {#if showMore} Show Less {:else} Show More {/if}
        </button>
        
    </div>
    <div class="flex flex-row flex-wrap bg-gray-100 gap-2 px-4 py-2 mt-auto">
        {#each tags as tag}
            <span class="text-sm bg-aquamarine  px-3 py-1 rounded-full">{tag}</span>
        {/each}
    </div>
</div>