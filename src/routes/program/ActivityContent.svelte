<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let activity
    export let nrOfSubscribers
    export let close = false

    const dispatch = createEventDispatcher();

    function truncateDescription(text: string, maxLength: number = 150): string {
        if (text.length <= maxLength) return text;
        if (close) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    const subscriptionAvailable = activity.subscribe && activity.subscribe.maxParticipants && activity.subscribe.subscribers
</script>

<div class="p-6 pb-2">
        <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-semibold text-blue-whale leading-tight flex-1 mr-4 h-20">
                {activity.name}
            </h3>

            <div class="h-full flex gap-2 items-center">
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

            {#if subscriptionAvailable}
            <div class="flex gap-2 items-center text-gray-600 flex-shrink-0 whitespace-nowrap">
                <i class="fa-solid fa-users"></i>
                <span>{nrOfSubscribers} / {activity.subscribe.maxParticipants}</span>
            </div>
            {/if}
        </div>

    </div>

    <div class="px-6 pb-4">
        <div class="text-gray-700 text-sm leading-relaxed">
            {truncateDescription(activity.description)}
        </div>
    </div>
