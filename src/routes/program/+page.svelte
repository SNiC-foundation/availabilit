<script lang="ts">
    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';
  import ProgramPart from './ProgramPart.svelte';

    interface ProgramPart {
        id: number;
        createdAt: string;
        updatedAt: string;
        version: number;
        name: string;
        beginTime: string;
        endTime: string;
    }

    let programParts: ProgramPart[] = [];
    let activities = []
    let loading = true;
    let error = '';

    onMount(async () => {
        await loadProgramParts();
        await loadActivities();
    });

    async function loadProgramParts() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl('/programpart'));

            if (response.ok) {
                programParts = await response.json();
            } else {
                error = response.status === 401 ? 'Unauthorized' : 'Failed to load program';
                console.error('Failed to fetch program parts:', response.status);
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching program parts:', err);
        } finally {
            loading = false;
        }
    }

    async function loadActivities() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl('/activity'));

            if (response.ok) {
                activities = await response.json();
                console.log(activities)
            } else {
                error = response.status === 401 ? 'Unauthorized' : 'Failed to load program';
                console.error('Failed to fetch program parts:', response.status);
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching program parts:', err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-6xl mx-auto">
        {#if !error}
        <div class="bg-white rounded-lg shadow-md p-8 mt-16">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Event Program</h1>
                <button 
                    on:click={loadProgramParts}
                    disabled={loading}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            {#if loading}
                <div class="flex justify-center items-center py-12">
                    <div class="text-gray-500">Loading program...</div>
                </div>
            {:else if programParts.length === 0}
                <div class="text-center py-12">
                    <div class="text-gray-500 text-lg">No program parts scheduled yet</div>
                    <p class="text-gray-400 mt-2">Check back later for updates</p>
                </div>
            {:else}
                <div class="space-y-8">
                    <div class="divide-y divide-gray-200">
                        {#each programParts as part}
                            <ProgramPart {part} activities={activities.filter((activity) => activity.activity.programPart.id === part.id)}/>
                        {/each}
                    </div>
                </div>

                <div class="mt-8 flex justify-between items-center text-sm text-gray-500">
                    <div>
                        Showing {programParts.length} program part{programParts.length !== 1 ? 's' : ''}
                    </div>
                    <div>
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>
            {/if}
        </div>
        {:else}
            <div class="bg-red-100 text-red-700 p-4 rounded mt-12 text-center">
                {error}
            </div>
        {/if}
    </div>
</div>