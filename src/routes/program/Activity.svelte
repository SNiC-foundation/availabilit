<script lang="ts">
  import ActivityContent from "./ActivityContent.svelte";
  import { createEventDispatcher } from 'svelte';

    export let activity: {
        id:number;
        name: string;
        location: string;
        description: string;
        speakers: any;
        subscribe: any;
        recordingUrl: string;
    };
    export let nrOfSubscribers: number;
    export let isSubscribed: boolean;

    let expanded = false;

    const dispatch = createEventDispatcher();

    function handleActivitySubscribed(event) {
        dispatch('activitySubscribed', event.detail);
    }    
</script>

<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 w-full md:max-w-sm shrink-0">
    <ActivityContent {activity} {nrOfSubscribers} {isSubscribed} on:activitySubscribed={handleActivitySubscribed} on:expand={() => expanded = true}/>
</div>

{#if expanded}
<button class="fixed top-0 left-0 w-full h-full bg-black/60 cursor-default backdrop-blur-lg" on:click={() => expanded = false}></button>
<div class="fixed w-screen h-screen left-0 top-0 flex items-center justify-center">
    <div class="w-full md:max-w-3xl bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
    <ActivityContent {activity} {nrOfSubscribers} {isSubscribed} on:activitySubscribed={handleActivitySubscribed} close={true} on:close={() => expanded = false} />
        </div>
</div>
{/if}

<style>
    /* Custom hover animations */
    .hover\:shadow-lg:hover {
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
</style>