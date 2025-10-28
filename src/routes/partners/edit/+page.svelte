<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { auth, isAdmin } from '$lib/stores/auth';
    import PartnerForm from '../PartnerForm.svelte';
    import { apiUrl } from '$lib/config';
    import { getUrlParamInt } from '$lib/util/searchParams';

    let id = 0;

    onMount(async () => {
        await auth.requireAdmin();
        id = getUrlParamInt('id');
    });

    async function deletePartner() {
        if (!confirm('Are you sure you want to delete this partner?')) return;

        try {
            const res = await fetch(apiUrl(`/partner/${encodeURIComponent(id)}`), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            if (!res.ok) {
                const body = await res.text();
                throw new Error(body || res.statusText);
            }

            goto('/partners');
        } catch (err) {
            alert('Failed to delete partner: ' + err);
        }
    }
</script>

{#if $isAdmin}
<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Edit Partner</h1>
                <div class="flex gap-2">
                    <button 
                    on:click={deletePartner}
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete partner
                    </button>
                    <button 
                        on:click={() => goto('/partners')}
                        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Back to Partners
                    </button>
                </div>
            </div>
            <PartnerForm mode="edit" {id} />
        </div>
    </div>
</div>
{/if}