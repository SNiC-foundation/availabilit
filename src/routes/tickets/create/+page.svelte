<script lang="ts">
    import { goto } from '$app/navigation';
    import { apiUrl } from '$lib/config';

    // Form data
    let amount = 1;
    let association = '';
    
    // UI state
    let loading = false;
    let error = '';
    let success = '';

    async function handleSubmit() {
        loading = true;
        error = '';
        success = '';

        const ticketData = {
            amount: amount,
            association: association.trim()
        };

        try {
            const response = await fetch(apiUrl('/ticket'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(ticketData),
            });

            if (response.ok) {
                const result = await response.json();
                success = `Successfully created ${amount} ticket${amount !== 1 ? 's' : ''}!`;
                
                // Reset form
                amount = 1;
                association = '';
                
                // Optionally redirect to tickets list after a delay
                setTimeout(() => {
                    goto('/tickets');
                }, 2000);
            } else {
                const result = await response.json();
                error = Array.isArray(result) ? result.map(e => e.msg || e.message).join(', ') : (result.message || 'Failed to create ticket');
            }
        } catch (err) {
            error = "Network error occurred";
            console.error(err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-2xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Create Tickets</h1>
                <button 
                    on:click={() => goto('/tickets')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Tickets
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

            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                <div class="space-y-4">
                    <h2 class="text-xl font-semibold text-blue-whale">Ticket Information</h2>
                    
                    <div>
                        <label for="amount" class="block text-sm font-medium text-gray-700">Number of Tickets *</label>
                        <input 
                            type="number" 
                            id="amount"
                            bind:value={amount}
                            min="1"
                            max="100"
                            required 
                            disabled={loading}
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1"
                        />
                        <p class="text-xs text-gray-500 mt-1">Enter the number of tickets to create (1-100)</p>
                    </div>

                    <div>
                        <label for="association" class="block text-sm font-medium text-gray-700">Association</label>
                        <input 
                            type="text" 
                            id="association"
                            bind:value={association}
                            disabled={loading}
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Student association or organization"
                        />
                        <p class="text-xs text-gray-500 mt-1">Optional: Name of the student association or organization</p>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button 
                        type="button"
                        on:click={() => goto('/tickets')}
                        disabled={loading}
                        class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading || amount < 1}
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : `Create ${amount} Ticket${amount !== 1 ? 's' : ''}`}
                    </button>
                </div>
            </form>

            <!-- Information Box -->
            <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 class="text-sm font-medium text-blue-800 mb-2">ℹ️ Ticket Creation Info</h3>
                <ul class="text-sm text-blue-700 space-y-1">
                    <li>• Tickets will be automatically assigned unique codes</li>
                    <li>• Each ticket can be assigned to a user later</li>
                    <li>• Association field helps with event organization</li>
                    <li>• You can create multiple tickets at once for efficiency</li>
                </ul>
            </div>
        </div>
    </div>
</div>