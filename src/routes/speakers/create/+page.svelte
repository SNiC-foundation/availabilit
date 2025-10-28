<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import SpeakerForm from '../SpeakerForm.svelte';
    let error = '';
    let success = '';

    onMount(async () => {
        await auth.requireAdmin();
    });
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Create Speaker</h1>
                <button 
                    on:click={() => goto('/speakers')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Speakers
                </button>
            </div>

            {#if error}
                <div class="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            {/if}

            {#if success}
                <div class="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {success}
                </div>
            {/if}

            <SpeakerForm/>
        </div>
    </div>
</div>