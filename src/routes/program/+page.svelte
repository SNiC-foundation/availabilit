<script lang="ts">
    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';
    import ProgramPart from './ProgramPart.svelte';
    import { auth, isAdmin, isLoggedIn } from '$lib/stores/auth';
    import Header from '$lib/components/Header.svelte';

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
    
    let loadingProgramParts = true;
    let loadingActivities = true;

    $: loading = loadingProgramParts || loadingActivities;

    onMount(async () => {
        // Initialize auth if not already done
        if (!$isLoggedIn) {
            await auth.init();
        }
        
        await loadProgramParts();
        await loadActivities();
    });

    async function loadProgramParts() {
        loadingProgramParts = true;
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
            loadingProgramParts = false;
        }
    }

    async function loadActivities() {
        loadingActivities = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl('/activity'));

            if (response.ok) {
                activities = await response.json();
            } else {
                error = response.status === 401 ? 'Unauthorized' : 'Failed to load activities';
                console.error('Failed to fetch activities:', response.status);
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching activities:', err);
        } finally {
            loadingActivities = false;
        }
    }
</script>
<Header title="Program"/>
<div id="program_section" class="container flex-col text-blue-whale gap-4 text-center md:text-left">
    {#if !error}
        {#if loading}
            <div class="flex justify-center items-center py-16">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-whale mx-auto mb-4"></div>
                    <div class="text-gray-500 text-lg">Loading program...</div>
                    <div class="text-gray-400 text-sm mt-2">
                        {#if loadingProgramParts}
                            Loading program parts...
                        {:else if loadingActivities}
                            Loading activities...
                        {/if}
                    </div>
                </div>
            </div>
        {:else if programParts.length === 0}
            <div class="text-center py-12">
                <div class="text-gray-500 text-lg">No program parts scheduled yet</div>
                <p class="text-gray-400 mt-2">Check back later for updates</p>
            </div>
        {:else}
            <div class="space-y-8 p-8">
                {#each programParts as part}
                    <ProgramPart {part} activities={activities.filter((activity) => activity.activity.programPart.id === part.id)} admin={$isAdmin}/>
                {/each}
            </div>
        {/if}
    {:else}
        <div class="bg-red-100 text-red-700 p-4 rounded mt-12 text-center">
            {error}
        </div>
    {/if}
</div>