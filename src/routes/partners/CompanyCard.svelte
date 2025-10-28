<!-- filepath: /Users/matthias/Desktop/1 Projects/SNiC/website/availabilit/src/lib/components/SpeakerCard.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { staticUrl } from "$lib/config";
  import { marked } from "marked";
  import type { Company } from "./types";

    export let company: Company;
    export let admin: boolean;

    let showMore = false

    const editCompany = (id:number) => goto(`/partners/edit?id=${id}`)
</script>
<div class="flex flex-col md:flex-row items-stretch bg-gray-100 shadow-black/50 border border-gray rounded-3xl overflow-hidden transition-all duration-200 shadow-md w-full grow shrink-0 max-w-full">
    <div class="flex {showMore ? 'md:w-80' : 'md:w-60'} w-full h-40 md:h-auto bg-white items-center justify-center shrink-0 p-4 transition-width duration-200 border-b md:border-r md:border-b-0 border-gray relative">
        <img src={staticUrl(company.logoFilename)} alt="Logo {company.name}" class="md:w-full h-full md:h-auto object-contain"/>
        {#if admin}
            <button class="rounded-lg bg-blue-whale absolute top-2 right-2 shadow shadow-black shadow-lg w-8 h-8" on:click={() => editCompany(company.id)}>
                <i class="fa-solid fa-pencil text-picton-blue"></i>
            </button>
        {/if}
    </div>
    <div class="flex flex-col pt-3 w-full">
        <div class="flex items-center gap-2 px-6">
            <div class="bg-blue-whale px-6 py-2 pr-8 rounded-full flex flex-col leading-[75%]">
                <h2 class="text-2xl text-white whitespace-nowrap">{company.name}</h2>
            </div>
    
            <a href={company.url} class="bg-picton-blue no-underline rounded-full h-8 w-8 p-4 flex items-center justify-center text-blue-whale mr-4 hover:bg-blue-whale hover:text-picton-blue transition-all duration-200">
                <i class="fa-solid fa-fw fa-link"></i>
            </a>
        </div>
        <div class="px-3 md:px-6 py-3 prose prose-sm md:prose-base prose-headings:text-blue-whale prose-headings:m-0 prose-h1:text-2xl prose-ul:my-0 prose-p:mt-0 max-w-none ">
            <p class="text-ellipsis transition-all duration-200 {showMore ? 'h-50' : 'h-28 overflow-hidden line-clamp-4'}">{@html marked(company.description)}</p>
            {#if company.description && typeof company.description === 'string' && company.description.length > 0}
                <button on:click={() => showMore = !showMore} class="text-blue-500 mt-2">
                    {#if showMore} Show Less {:else} Show More {/if}
                </button>
            {/if}
            
        </div>
        <div class="flex flex-row flex-wrap bg-gray-100 gap-2 px-4 py-2 mt-auto">
        <span class="text-sm bg-aquamarine  px-3 py-1 rounded-full">{company.specialization}</span>
        </div>
    </div>
</div>