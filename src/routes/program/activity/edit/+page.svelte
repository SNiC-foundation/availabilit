<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';
    import { getUrlParamInt } from '$lib/util/searchParams';
    import { auth } from '$lib/stores/auth';
    import ActivityForm from '../ActivityForm.svelte';

    interface Activity {
        id: number;
        name: string;
        location: string;
        description?: string;
        recordingUrl?: string;
        image?: string;
        programPart: { id: number };
        speakers?: Array<{ id: number; name: string; title?: string }>;
        subscribe?: {
            maxParticipants: number;
            subscriptionListOpenDate: string;
            subscriptionListCloseDate: string;
        };
    }


    let activityId = 0;

    let activity: Activity | null = null;
    let loading = true;
    let error = '';

    onMount(async () => {
        await auth.requireAdmin();
        activityId = getUrlParamInt('id');
        await loadActivity();
    });

    async function loadActivity() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl(`/activity/${activityId}`), {
                credentials: 'include'
            });

            if (response.ok) {
                activity = await response.json();
            } else {
                error = response.status === 404 ? 'Activity not found' : 'Failed to load activity';
                console.error('Failed to fetch activity:', response.status);
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching activity:', err);
        } finally {
            loading = false;
        }
    }

    async function deleteActivity() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch(apiUrl(`/activity/${activityId}`), {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                goto('/program')
            } else {
                error = "Could not delete activity"
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error deleting activity:', err);
        } finally {
            loading = false;
        }
    }

    function handleSuccess(event: CustomEvent) {
        // Redirect after success
        setTimeout(() => {
            goto('/program');
        }, 2000);
    }

    function handleCancel() {
        goto('/program');
    }
</script>

<svelte:head>
    <title>Edit Activity - {activity?.name || 'Loading...'}</title>
</svelte:head>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-3xl font-bold text-blue-whale">Edit Activity</h1>
                    {#if activity}
                        <p class="text-gray-600 mt-1">{activity.name}</p>
                    {/if}
                </div>
                <div class="flex gap-2">
                    <button 
                    on:click={deleteActivity}
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete activity
                    </button>
                    <button 
                        on:click={() => goto('/program')}
                        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back to Program
                    </button>
                </div>
                
            </div>

            {#if loading}
                <div class="flex justify-center items-center py-16">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-whale mx-auto mb-4"></div>
                        <div class="text-gray-500 text-lg">Loading activity...</div>
                    </div>
                </div>
            {:else if error}
                <div class="bg-red-100 text-red-700 p-4 rounded">
                    {error}
                    <div class="mt-4">
                        <button 
                            on:click={loadActivity}
                            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            {:else if activity}
                <ActivityForm 
                    {activity}
                    programPartId={activity.programPart.id}
                    isEdit={true}
                    on:success={handleSuccess}
                    on:cancel={handleCancel}
                />
            {:else}
                <div class="text-center py-12">
                    <div class="text-gray-500 text-lg">Activity not found</div>
                    <p class="text-gray-400 mt-2">The activity you're looking for doesn't exist or has been deleted.</p>
                </div>
            {/if}
        </div>
    </div>
</div>
