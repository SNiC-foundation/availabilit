<script lang="ts">
  import { goto } from "$app/navigation";
  import Activity from "./Activity.svelte";

    export let part;
    export let activities;
    export let admin;
    let open = true;

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
<button on:click={() => open = !open} class="p-6 w-full flex items-center justify-between hover:bg-gray-50 transition-colors">
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
        
        <i class={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
    </button>
{#if open}
<div class="flex gap-2 items-stretch bg-gray-300 p-2">
    {#each activities as activity}
        <Activity activity={activity.activity} subscriptions={activity.nrOfSubscribers}/>
    {/each}
    {#if admin}
    <div class="flex items-center">
        <button class="size-16 bg-blue-whale text-white text-5xl rounded-full ml-2" on:click={() => goto(`/program/activity/${part.id}/create`)}>+</button>
    </div>
    {/if}
</div>
{/if}