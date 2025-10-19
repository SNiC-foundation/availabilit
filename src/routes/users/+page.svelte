<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    interface Role {
        id: number;
        createdAt: string;
        updatedAt: string;
        version: number;
        name: string;
    }

    interface Ticket {
        id: number;
        createdAt: string;
        updatedAt: string;
        version: number;
        userId: number;
        association: string;
        code: string;
    }

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
        ticket: Ticket | null;
        roles: Role[];
        participantInfo: any;
    }

    let loading = true;
    let users: User[] = [];
    let error = '';

    onMount(async () => {
        await loadUsers();
    });

    async function loadUsers() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch('https://availabilit.ia.utwente.nl/api/user', {
                credentials: 'include'
            });

            if (response.ok) {
                users = await response.json();
                console.log(users)
            } else {
                error = response.status === 401 ? 'Unauthorized' : 'Failed to load users';
            }
        } catch (err) {
            error = 'Network error occurred';
            console.error('Error fetching users:', err);
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

    function getRoleNames(roles: Role[]): string {
        return roles.map(role => role.name).join(', ');
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-7xl mx-auto">
        {#if !error}
        <div class="bg-white rounded-lg shadow-md p-8 mt-16">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">User Management</h1>
                <button 
                    on:click={loadUsers}
                    disabled={loading}
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            {#if loading}
                <div class="flex justify-center items-center py-12">
                    <div class="text-gray-500">Loading users...</div>
                </div>
            {:else if users.length === 0}
                <div class="text-center py-12">
                    <div class="text-gray-500 text-lg">No users found</div>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User ID
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Roles
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket Code
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
                            {#each users as user}
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{user.id}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.name}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getRoleNames(user.roles)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        {#if user.ticket}
                                            <span title={user.ticket.code}>
                                                {formatCode(user.ticket.code)}
                                            </span>
                                        {:else}
                                            <span class="text-gray-400">No ticket</span>
                                        {/if}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.ticket?.association || 'N/A'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.dietaryWishes || 'None'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.needs || 'None'}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            {user.emailVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="mt-6 flex justify-between items-center">
                    <div class="text-sm text-gray-500">
                        Showing {users.length} user{users.length !== 1 ? 's' : ''}
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