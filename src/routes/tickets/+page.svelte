<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    interface User {
        id: number;
        createdAt: string;
        updatedAt: string;
        version: number;
        email: string;
        name: string;
        emailVerified: boolean;
        dietaryWishes: string;
        needs: string;
        agreeToPrivacyPolicy: boolean;
        partnerId: number | null;
        participantInfo: any;
    }

    interface Ticket {
        id: number;
        createdAt: string;
        updatedAt: string;
        version: number;
        userId: number;
        association: string;
        code: string;
        user: User;
    }

    let tickets: Ticket[] = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        await loadTickets();
    });

    async function loadTickets() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch('https://availabilit.ia.utwente.nl/api/ticket', {
                credentials: 'include'
            });

            if (response.ok) {
                tickets = await response.json();
            } else {
                error = response.status === 401 ? 'Unauthorized' : 'Failed to load tickets';
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching tickets:', err);
        } finally {
            loading = false;
        }
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function formatCode(code: string): string {
        // Display only first 8 characters of the code for readability
        return code.substring(0, 8) + '...';
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-7xl mx-auto">
        {#if !error}
        <div class="bg-white rounded-lg shadow-md p-8 mt-16">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">Ticket Management</h1>
                <button 
                    on:click={loadTickets}
                    disabled={loading}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            {#if loading}
                <div class="flex justify-center items-center py-12">
                    <div class="text-gray-500">Loading tickets...</div>
                </div>
            {:else if tickets.length === 0}
                <div class="text-center py-12">
                    <div class="text-gray-500 text-lg">No tickets found</div>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket ID
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Association
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dietary Wishes
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Special Needs
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email Verified
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each tickets as ticket}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{ticket.id}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        <span title={ticket.code}>
                                            {formatCode(ticket.code)}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ticket.user.name}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ticket.user.email}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ticket.association || 'N/A'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ticket.user.dietaryWishes || 'None'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ticket.user.needs || 'None'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(ticket.createdAt)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {ticket.user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            {ticket.user.emailVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="mt-6 flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                        Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
                    </div>
                    <div class="text-sm text-gray-500">
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