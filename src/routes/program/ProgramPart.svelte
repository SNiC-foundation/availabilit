<script lang="ts">
  import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/config";
  import Activity from "./Activity.svelte";
  import { onMount } from "svelte";

    export let part;
    export let activities;
    export let admin;
    let open = true;
    let user:any = undefined;

    async function loadUserProfile() {
        try {           
            const response = await fetch(apiUrl('/profile'), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                user = await response.json();
            } 
        } catch(e) {
            console.error(e)
        }
    }

    function formatTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    function getDuration(beginTime: string, endTime: string): string {
        const start = new Date(beginTime);
        const end = new Date(endTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.round(diffMs / (1000 * 60));
        
        if (diffMins < 60) {
            return `${diffMins} min`;
        } else {
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
        }
    }

    const isSubscribedToActivity = (user, activityId) => user?.subscriptions?.length && user.subscriptions.some(sub => sub.activity.id === activityId);
    let subscribedActivity: any = undefined;

    $: subscribedActivity = (user && user.subscriptions && activities)
        ? (activities.find((a: any) =>
                user.subscriptions.some((s: any) => s.activity?.id === a.activity?.id)
            )?.activity ?? undefined)
        : undefined;

    function handleActivitySubscribed(event) {
        const { activity } = event.detail;
        
        open = false;
        
        subscribedActivity = activity;
        
        loadUserProfile();
    }

    onMount(() => {
        loadUserProfile();
    });
</script>
<div class="flex flex-col shadow-md shadow-black/35 rounded-xl overflow-hidden">
<button on:click={() => open = !open} class="p-6 w-full flex rounded-t-xl items-center gap-8 bg-gray-100 hover:bg-gray-200 transition-colors">
        <div class="mr-auto">
            <div class="flex items-center space-x-4">
                <h3 class="text-lg font-medium text-gray-900">
                    {part.name}
                </h3>
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {getDuration(part.beginTime, part.endTime)}
                </span>
            </div>
            
            <div class="flex items-center space-x-6 text-sm text-gray-600">
                <div class="flex items-center space-x-1">
                    <span class="font-medium">Start:</span>
                    <span>{formatTime(part.beginTime)}</span>
                </div>
                <div class="flex items-center space-x-1">
                    <span class="font-medium">End:</span>
                    <span>{formatTime(part.endTime)}</span>
                </div>
            </div>
        </div>
        {#if subscribedActivity}
        <div class="bg-blue-whale px-4 py-2 rounded-full items-center text-white flex gap-2">
            <div class="flex gap-1 items-center">
                <i class="fa-solid fa-person-chalkboard"></i>
                <span class="max-w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                    {subscribedActivity.name}
                </span>
            </div>

            <div class="flex gap-1 items-center">
                <i class="fa-solid fa-location-dot"></i>
                <span class="max-w-32 overflow-hidden whitespace-nowrap text-ellipsis">
                    {subscribedActivity.location}
                </span>
            </div>
        </div>
        {/if}
        
        <i class={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
    </button>
{#if open}
<div class="flex gap-2 items-stretch bg-gray-300 p-2 rounded-b-xl">
    {#each activities as activity}
        <Activity 
            activity={activity.activity} 
            nrOfSubscribers={activity.nrOfSubscribers} 
            isSubscribed={isSubscribedToActivity(user,activity.activity.id)}
            on:activitySubscribed={handleActivitySubscribed}
        />
    {/each}
    {#if admin}
    <div class="flex items-center">
        <button class="size-16 bg-blue-whale text-white text-5xl rounded-full ml-2" on:click={() => goto(`/program/activity/${part.id}/create`)}>+</button>
    </div>
    {/if}
</div>
{/if}
</div>