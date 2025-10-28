<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import PartnerForm from '../PartnerForm.svelte';

    onMount(async () => {
        await auth.requireAdmin();
    });
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Create Partner</h1>
                <button 
                    on:click={() => goto('/partners')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Partners
                </button>
            </div>

            <PartnerForm mode="create" />
        </div>
    </div>
</div>