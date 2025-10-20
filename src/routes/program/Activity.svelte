<script lang="ts">
    export let activity: {
        name: string;
        location: string;
        description: string;
    };
    export let subscriptions: number = 0;

    // Function to truncate description if it's too long
    function truncateDescription(text: string, maxLength: number = 150): string {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    // Function to get subscription color based on number
    function getSubscriptionColor(count: number): string {
        if (count === 0) return 'bg-gray-100 text-gray-600';
        if (count < 10) return 'bg-blue-100 text-blue-700';
        if (count < 25) return 'bg-green-100 text-green-700';
        if (count < 50) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    }
</script>

<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden">
    <!-- Card Header -->
    <div class="p-6 pb-4">
        <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-semibold text-blue-whale leading-tight flex-1 mr-4">
                {activity.name}
            </h3>
            
            <!-- Subscription Badge -->
            <div class="flex-shrink-0">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {getSubscriptionColor(subscriptions)}">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                    {subscriptions} {subscriptions === 1 ? 'person' : 'people'}
                </span>
            </div>
        </div>
        
        <!-- Location -->
        <div class="flex items-center text-gray-600 mb-4">
            <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span class="text-sm font-medium">{activity.location}</span>
        </div>
    </div>

    <!-- Card Body -->
    <div class="px-6 pb-6">
        <!-- Description -->
        <div class="text-gray-700 text-sm leading-relaxed mb-4">
            {truncateDescription(activity.description)}
        </div>

        <!-- Footer Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center space-x-4">
                <!-- Popularity Indicator -->
                {#if subscriptions > 0}
                    <div class="flex items-center text-xs text-gray-500">
                        <div class="flex -space-x-1 mr-2">
                            {#each Array(Math.min(subscriptions, 3)) as _, i}
                                <div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">{i + 1}</span>
                                </div>
                            {/each}
                            {#if subscriptions > 3}
                                <div class="w-6 h-6 rounded-full bg-gray-400 border-2 border-white flex items-center justify-center">
                                    <span class="text-white text-xs">+</span>
                                </div>
                            {/if}
                        </div>
                        <span>
                            {#if subscriptions > 10}
                                Popular activity
                            {:else if subscriptions > 5}
                                Good interest
                            {:else if subscriptions > 0}
                                Some interest
                            {/if}
                        </span>
                    </div>
                {:else}
                    <div class="flex items-center text-xs text-gray-400">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Be the first to join!
                    </div>
                {/if}
            </div>
            
            <!-- Action Button -->
            <button class="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Join Activity
            </button>
        </div>
    </div>
</div>

<style>
    /* Custom hover animations */
    .hover\:shadow-lg:hover {
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
</style>