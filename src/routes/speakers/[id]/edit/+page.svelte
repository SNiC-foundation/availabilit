<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import { apiUrl } from '$lib/config';
    import SpeakerForm from '../../SpeakerForm.svelte';
    
    $: id = $page.params.id;

    onMount(async () => {
        await auth.requireAdmin();
    });

    async function deleteSpeaker() {
        if (!confirm('Are you sure you want to delete this speaker?')) return;

        try {
            const res = await fetch(apiUrl(`/speaker/${encodeURIComponent(id)}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            if (!res.ok) {
                const body = await res.text();
                throw new Error(body || res.statusText);
            }

            goto('/speakers');
        } catch (err) {
            alert('Failed to delete speaker: ' + err);
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Edit Speaker</h1>
                <div class="flex gap-2">
                    <button 
                    on:click={deleteSpeaker}
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Delete speaker
                </button>
                <button 
                    on:click={() => goto('/speakers')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Speakers
                </button>
                </div>
                
            </div>
            <SpeakerForm id={Number(id)} mode='edit' />
        </div>
    </div>
</div>