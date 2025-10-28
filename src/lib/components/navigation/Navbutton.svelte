<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let text:string;
    export let route:string;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click');
    }
</script>

<a href="{route}" class="group relative text-white no-underline px-4 py-2 rounded-lg overflow-hidden hover:shadow-md" on:click={handleClick}>
    <span class="relative z-10 group-hover:text-aquamarine">{text}</span>
    <div id="background" class="absolute w-[200%] h-[200%] px-4 py-2 left-1/2 top-1/2 bg-black/5 scale-0 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all rounded-full duration-300"/>
</a>