<script lang="ts">
    import SectionButton from "./SectionButton.svelte";

    export let text:string;
    export let route:string;
    export let sections:string[];

    export let scroll:number;
    export let height:number;

    const dropSectionsStyle = `;
        left: 600px;
        top: ${(Math.max(64, Math.min(scroll / height, 1) * 64)) - 10}px;
        background: rgba(0,50,73,${Math.min(scroll / height,1)});
        `;


</script>

<a href="{route}" id="dropHomeButton"
    class="group relative text-white no-underline px-4 py-2 rounded-lg overflow-hidden hover:shadow-md">
    <span class="relative z-10 group-hover:text-aquamarine">{text}</span>
    <div id="background" class="absolute w-[200%] h-[200%] px-4 py-2 left-1/2 top-1/2 bg-black/5 scale-0 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all rounded-full duration-300"/>
</a>

<div id="dropSections" class="flex-col items-start gap-3 py-[2vh] h-fit w-fit fixed z-20 size-8"
    style={dropSectionsStyle}>
    {#each sections as section}
        <SectionButton text="{section}" route="{route}/#{section}_section"/>
    {/each}
</div>
