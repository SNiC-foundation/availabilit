<script lang="ts">
  import Activity from "./Activity.svelte";

    export let part;
    export let activities;
    let open = true;

    let sortedActivities: any[] = [];

    $: sortedActivities = activities
      ? [...activities].sort((a: any, b: any) => {
          const aMax = a?.activity?.subscribe?.maxParticipants ?? 0;
          const bMax = b?.activity?.subscribe?.maxParticipants ?? 0;
          return bMax - aMax;
        })
      : [];

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

    const isKeynote = activities.some(a => a.activity.speakers.some((speaker) => speaker.type === 'keynote'))
</script>
<div class="flex flex-col shadow-md shadow-black/35 rounded-xl overflow-hidden">
{#if isKeynote}
<button on:click={() => open = !open} class="py-4 px-6 w-full flex rounded-t-xl items-center gap-8 bg-gray-100 hover:bg-gray-200 transition-colors">
    <div class="mr-auto">
            <div class="flex items-center space-x-4">
                <h3 class="text-lg font-medium text-gray-900">
                    <b>{part.name}:</b> {activities?.[0].activity.name ?? ''}
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
<div class="flex gap-2 flex-col items-stretch bg-gray-100 py-2 px-6 rounded-b-xl">
    <div class="flex flex-wrap gap-3">
        <div class="flex gap-2 items-center text-gray-600 whitespace-nowrap">
            <i class="fa-solid fa-location-dot"></i>
            <span class="text-sm font-medium">{activities[0].activity.location}</span>
        </div>

        <div class="flex gap-2 items-center text-gray-600 whitespace-nowrap">
            <i class="fa-solid fa-user"></i>
            <span class="text-sm font-medium">{activities[0].activity.speakers.map(speaker => speaker.name)}</span>
        </div>
    </div>
    {activities[0].activity.description}
    <br/>
    <div class="pt-2 mt-2 border-t">
        <span class="text-xs">This is a keynote, you are automatically subscribed to this activity</span>
    </div>
</div>
{/if}
{:else}
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

        <i class={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
    </button>
{#if open}
<div class="flex gap-4 flex-col md:flex-row items-stretch bg-gray-300 p-4 rounded-b-xl overflow-auto">
    {#each sortedActivities as activity}
        <Activity
            activity={activity.activity}
            nrOfSubscribers={activity.nrOfSubscribers}
        />
    {/each}
</div>
{/if}
{/if}
</div>
