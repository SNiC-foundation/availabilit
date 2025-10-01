<!-- filepath: /Users/matthias/Desktop/1 Projects/SNiC/website/availabilit/src/lib/components/SpeakerCard.svelte -->
<script lang="ts">
  import type { Company } from "./types";

    export let company: Company;

    let showMore = false
</script>

{#if company.show}
<div class="flex flex-col md:flex-row items-stretch bg-gray-100 shadow-black/50 border border-gray rounded-3xl overflow-hidden transition-all duration-200 shadow-md w-full grow shrink-0 max-w-full">
    <div class="flex {showMore ? 'md:w-80' : 'md:w-60'} w-full h-40 md:h-auto bg-white items-center justify-center shrink-0 p-4 transition-width duration-200 border-b md:border-r md:border-b-0 border-gray">
        <img src={company.logo} alt="Logo {company.name}" class="md:w-full h-full md:h-auto object-contain"/>
    </div>
    <div class="flex flex-col pt-3 w-full">
        <div class="flex items-center gap-2 px-6">
            <div class="bg-blue-whale px-6 py-2 pr-8 rounded-full flex flex-col leading-[75%]">
                <h2 class="text-2xl text-white whitespace-nowrap">{company.name}</h2>
            </div>
    
            <a href={company.website} class="bg-picton-blue no-underline rounded-full h-8 w-8 p-4 flex items-center justify-center text-blue-whale mr-4 hover:bg-blue-whale hover:text-picton-blue transition-all duration-200">
                <i class="fa-solid fa-fw fa-link"></i>
            </a>
        </div>
        <div class="px-3 md:px-6 py-3 prose prose-sm md:prose-base prose-headings:text-blue-whale prose-headings:m-0 prose-h1:text-2xl prose-ul:my-0 prose-p:mt-0 max-w-none ">
            <p class="hyphens-auto ">{@html company.shortDescription}</p>
            <p class="text-gray-800 {showMore ? 'h-fit mt-6' : 'h-0'} overflow-auto transition-all duration-200 allow-keywords">{@html company.extendedDescription}</p>
            {#if company.extendedDescription && typeof company.extendedDescription === 'string' && company.extendedDescription.length > 0}
                <button on:click={() => showMore = !showMore} class="text-blue-500 mt-2">
                    {#if showMore} Show Less {:else} Show More {/if}
                </button>
            {/if}
            
        </div>
        <div class="flex flex-row flex-wrap bg-gray-100 gap-2 px-4 py-2 mt-auto">
            {#each company.tags as tag}
                <span class="text-sm bg-aquamarine  px-3 py-1 rounded-full">{tag}</span>
            {/each}
        </div>
    </div>
</div>
{/if}