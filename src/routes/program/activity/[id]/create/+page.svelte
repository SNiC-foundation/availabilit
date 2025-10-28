<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import ActivityForm from '../../ActivityForm.svelte';

    // Get programPartId from URL
    $: programPartId = parseInt($page.params.id);

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
    <title>Create Activity - Program Part {programPartId}</title>
</svelte:head>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h1 class="text-3xl font-bold text-blue-whale">Create Activity</h1>
                    <p class="text-gray-600 mt-1">For Program Part #{programPartId}</p>
                </div>
                <button 
                    on:click={() => goto('/program')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Program
                </button>
            </div>

            <ActivityForm 
                {programPartId}
                isEdit={false}
                on:success={handleSuccess}
                on:cancel={handleCancel}
            />
        </div>
    </div>
</div>