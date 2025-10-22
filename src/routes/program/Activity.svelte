<script lang="ts">
    export let activity: {
        name: string;
        location: string;
        description: string;
        speakers: any;
        subscribe: any;
    };

    console.log(activity.subscribe)

    function truncateDescription(text: string, maxLength: number = 150): string {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    const subscriptionAvailable = activity.subscribe && activity.subscribe.maxParticipants && activity.subscribe.subscribers
    const subscribable = subscriptionAvailable &&
        subscriptionAvailable &&
        !isNaN(Date.parse(activity.subscribe.subscriptionListOpenDate)) &&
        !isNaN(Date.parse(activity.subscribe.subscriptionListCloseDate)) &&
        new Date(activity.subscribe.subscriptionListOpenDate) <= new Date() &&
        new Date(activity.subscribe.subscriptionListCloseDate) > new Date();
</script>

<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden max-w-md">
    <div class="p-6 pb-4">
        <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-semibold text-blue-whale leading-tight flex-1 mr-4">
                {activity.name}
            </h3>
            
            {#if subscriptionAvailable}
            <div class="flex-shrink-0">
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    <i class="fa-solid fa-users"></i>
                    {activity.subscribe.subscribers.length} / {activity.subscribe.maxParticipants}
                </span>
            </div>
            {/if}
        </div>
        
        <div class="flex gap-3">
            <div class="flex gap-2 items-center text-gray-600 mb-4">
                <i class="fa-solid fa-location-dot"></i>
                <span class="text-sm font-medium">{activity.location}</span>
            </div>

            <div class="flex gap-2 items-center text-gray-600 mb-4">
                <i class="fa-solid fa-user"></i>
                <span class="text-sm font-medium">{activity.speakers.map(speaker => speaker.name)}</span>
            </div>
        </div>
        
    </div>

    <div class="px-6">
        <div class="text-gray-700 text-sm leading-relaxed mb-4">
            {truncateDescription(activity.description)}
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            {#if subscriptionAvailable}
            {#if subscribable} 
            <button class="inline-flex shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700 items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-whale hover:bg-blue-whale-dark transition-colors duration-200" disabled={!subscribable}>
                <i class="fa-solid fa-plus"></i>
                Join Activity
            </button>
            {:else}
                {#if new Date(activity.subscribe.subscriptionListOpenDate) > new Date()}
                    <span class="text-xs">Activity subscription opens on { new Date(activity.subscribe.subscriptionListOpenDate)}</span>
                {:else}
                    <span class="text-xs">Activity subscription closed on { new Date(activity.subscribe.subscriptionListCloseDate)}</span>
                {/if}
            {/if}
            {/if}
        </div>
    </div>

    <div class="px-6 py-2">
        
    </div>
</div>

<style>
    /* Custom hover animations */
    .hover\:shadow-lg:hover {
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
</style>