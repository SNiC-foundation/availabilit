<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { apiUrl } from '$lib/config';

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
    let loading = true;
    let error = '';

    onMount(async () => {
        await loadProgramParts();
    });

    async function loadProgramParts() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl('/programpart'), {
                credentials: 'include'
            });

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

    function formatTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatDateTime(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    // Group program parts by date
    $: groupedProgram = programParts.reduce((groups, part) => {
        const date = new Date(part.beginTime).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(part);
        return groups;
    }, {} as Record<string, ProgramPart[]>);

    // Sort program parts within each day by begin time
    $: Object.keys(groupedProgram).forEach(date => {
        groupedProgram[date].sort((a, b) => 
            new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime()
        );
    });
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
                    {#each Object.keys(groupedProgram).sort() as date}
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <!-- Date Header -->
                            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h2 class="text-xl font-semibold text-gray-800">
                                    {formatDate(groupedProgram[date][0].beginTime)}
                                </h2>
                            </div>
                            
                            <!-- Program Parts for this date -->
                            <div class="divide-y divide-gray-200">
                                {#each groupedProgram[date] as part}
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
                                {/each}
                            </div>
                        </div>
                    {/each}
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