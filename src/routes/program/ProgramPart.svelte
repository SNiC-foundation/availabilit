<script lang="ts">
  import Activity from "./Activity.svelte";

    export let part;
    export let activities;

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
</script>
<div class="p-6 hover:bg-gray-50 transition-colors">
    <div class="flex items-start justify-between">
        <div class="flex-1">
            <div class="flex items-center space-x-4 mb-2">
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
        
        <div class="text-right text-sm text-gray-500">
            <div>ID: #{part.id}</div>
            <div class="mt-1">v{part.version}</div>
        </div>
    </div>
</div>
<div class="bg-gray-300">
    {#each activities as activity}
        <Activity activity={activity.activity} subscriptions={activity.nrOfSubscribers}/>
    {/each}
</div>