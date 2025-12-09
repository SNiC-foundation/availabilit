<script lang="ts">
    import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/config";
  import { isAdmin, isLoggedIn } from "$lib/stores/auth";
      import { createEventDispatcher } from 'svelte';

    export let activity
    export let nrOfSubscribers
    export let isSubscribed
    export let close = false

    const dispatch = createEventDispatcher();

    function truncateDescription(text: string, maxLength: number = 150): string {
        if (text.length <= maxLength) return text;
        if (close) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    const subscribe = async () => {
        try {
            const response = await fetch(apiUrl(`/activity/${activity.id}/subscribe`), {
                method: 'POST',
                credentials: 'include',
            });
            
            if (response.ok) {
                justSubscribed = true;
                
                dispatch('activitySubscribed', {
                    activity: activity,
                    activityId: activity.id
                });
            } else {
                console.error('Failed to subscribe to activity');
            }
        } catch (error) {
            console.error('Error subscribing to activity:', error);
        }
    }

    let justSubscribed = false;

    const subscriptionAvailable = activity.subscribe && activity.subscribe.maxParticipants && activity.subscribe.subscribers
    const subscribable = subscriptionAvailable &&
        !isNaN(Date.parse(activity.subscribe.subscriptionListOpenDate)) &&
        !isNaN(Date.parse(activity.subscribe.subscriptionListCloseDate)) &&
        new Date(activity.subscribe.subscriptionListOpenDate) <= new Date() &&
        new Date(activity.subscribe.subscriptionListCloseDate) > new Date();
</script>

<div class="p-6 pb-2">
        <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-semibold text-blue-whale leading-tight flex-1 mr-4 h-20">
                {activity.name}
            </h3>

            <div class="h-full flex gap-2 items-center">
                {#if $isAdmin}
                <button class="rounded-lg bg-blue-whale shadow shadow-black shadow-sm w-8 h-8" on:click={() => goto(`/program/activity/edit?id=${activity.id}`)}>
                    <i class="fa-solid fa-pencil text-picton-blue"></i>
                </button>
                {/if}

                <button class="rounded-lg bg-gray-100 duration-100 transition-all hover:bg-gray-50 hover:shadow-md w-8 h-8" on:click={() => close ? dispatch('close') : dispatch('expand')}>
                    {#if close}
                    <i class="fa-solid fa-times text-blue-whale"></i>
                    {:else}
                    <i class="fa-solid fa-expand text-blue-whale"></i>
                    {/if}
                </button>
            </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
            <div class="flex gap-2 items-center text-gray-600 whitespace-nowrap">
                <i class="fa-solid fa-location-dot"></i>
                <span class="text-sm font-medium">{activity.location}</span>
            </div>

            <div class="flex gap-2 items-center text-gray-600 whitespace-nowrap">
                <i class="fa-solid fa-user"></i>
                <span class="text-sm font-medium">{activity.speakers.map(speaker => speaker.name)}</span>
            </div>

            {#if activity?.recordingUrl}
            <a href="{activity.recordingUrl}" class="flex gap-2 items-center text-gray-600 whitespace-nowrap">
                <i class="fa-solid fa-link"></i>
            </a>
            {/if}

            {#if subscribable}
            <div class="flex gap-2 items-center text-gray-600 flex-shrink-0 whitespace-nowrap">
                <i class="fa-solid fa-users"></i>
                <span>{nrOfSubscribers} / {activity.subscribe.maxParticipants}</span>
            </div>
            {/if}
        </div>
        
    </div>

    <div class="px-6">
        <div class="text-gray-700 text-sm leading-relaxed mb-4">
            {truncateDescription(activity.description)}
        </div>

        <div class="flex items-center justify-between py-2 border-t border-gray-100">
            {#if subscriptionAvailable}
            {#if subscribable && $isLoggedIn} 
            <button on:click={subscribe} class="inline-flex shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700 items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white {isSubscribed || justSubscribed ? 'bg-green-600' : 'bg-blue-whale hover:bg-blue-whale-dark'} transition-colors duration-200" disabled={!subscribable}>
                <i class="fa-solid {isSubscribed || justSubscribed ? 'fa-check' : 'fa-plus'}"></i>
                
                {#if isSubscribed || justSubscribed}
                    Joined activity
                {:else}
                    Join Activity
                {/if}
            </button>
            {:else}
                {#if new Date(activity.subscribe.subscriptionListOpenDate) > new Date()}
                    <span class="text-xs">Activity subscription opens on { new Date(activity.subscribe.subscriptionListOpenDate)}</span>
                {:else if new Date(activity.subscribe.subscriptionListCloseDate) < new Date()}
                    <span class="text-xs">Activity subscription closed on { new Date(activity.subscribe.subscriptionListCloseDate)}</span>
                {:else}
                    <span class="text-xs">Log in to subscribe to an activity</span>
                {/if}

            {/if}
            {/if}
        </div>
    </div>