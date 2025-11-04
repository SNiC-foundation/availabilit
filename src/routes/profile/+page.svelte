<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth, user, isLoggedIn, isLoading } from '$lib/stores/auth';
    import QRCode from 'qrcode';

    let error = '';
    let qrCodeDataUrl = '';

    onMount(async () => {
        await auth.setUser();
    });

    // Generate QR code when user data is available
    $: if ($user?.ticket?.code) {
        generateQRCode($user.ticket.code);
    }

    async function generateQRCode(ticketCode: string) {
        try {
            qrCodeDataUrl = await QRCode.toDataURL(ticketCode, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#003249', // blue-whale color
                    light: '#FFFFFF'
                }
            });
        } catch (err) {
            console.error('Failed to generate QR code:', err);
        }
    }

    async function handleLogout() {
        try {
            await auth.logout();
            goto('/login');
        } catch (err) {
            error = "Failed to logout";
            console.error(err);
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-blue-whale">User Profile</h1>
                <button 
                    on:click={handleLogout}
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {#if $isLoading}
                <div class="flex justify-center items-center h-64">
                    <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-whale"></div>
                </div>
            {:else if error}
                <div class="bg-red-100 text-red-700 p-4 rounded">
                    {error}
                </div>
            {:else if $user}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Personal Information</h2>
                        
                        <div class="space-y-3">
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Name</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.name}</p>
                            </div>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Email</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.email}</p>
                            </div>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Email Verified</div>
                                <p class="mt-1 text-sm bg-gray-50 p-2 rounded">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {$user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        {$user.emailVerified ? 'Verified' : 'Not Verified'}
                                    </span>
                                </p>
                            </div>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Dietary Wishes</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.dietaryWishes || 'None'}</p>
                            </div>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Special Needs</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.needs || 'None'}</p>
                            </div>

                            <div>
                                <div class="block text-sm font-medium text-gray-700">Spoken languages</div>
                                <div class="flex flex-wrap gap-2 text-gray-900 bg-gray-50 p-2 rounded">
                                {#each $user.languages as language}
                                    <span class="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {language}
                                    </span>
                                {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    {#if $user.participantInfo}
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-blue-whale">Participant Information</h2>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Study Program</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.participantInfo.studyProgram}</p>
                            </div>
                        </div>
                    {/if}

                    {#if $user.partner}
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-blue-whale">Partner</h2>
                            
                            <div>
                                <div class="block text-sm font-medium text-gray-700">Company</div>
                                <p class="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{$user.partner.name}</p>
                            </div>
                        </div>
                    {/if}

                    {#if $user.ticket}
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-blue-whale">Ticket</h2>

                            
                                <div class="flex justify-center">
                                    <div class="bg-white p-4 rounded-lg shadow-sm border">
                                        {#if qrCodeDataUrl}
                                        <img 
                                            src={qrCodeDataUrl} 
                                            alt="QR Code for ticket {$user.ticket.code}"
                                            class="mx-auto"
                                        />
                                        {/if}
                                        <p class="mt-1 text-sm font-mono">{$user.ticket.code}</p>
                                        <p class="mt-1 text-sm ">{$user.ticket.association}</p>
                                    </div>
                                </div>
                        </div>
                    {/if}

                    {#if $user.roles && $user.roles.length > 0}
                        <div class="space-y-4">
                            <h2 class="text-xl font-semibold text-blue-whale">Roles</h2>
                            
                            <div class="flex flex-wrap gap-2">
                                {#each $user.roles as role}
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {role.name}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/if}

                    {#if $user.subscriptions && $user.subscriptions.length > 0}
                        <div class="space-y-4 md:col-span-2">
                            <h2 class="text-xl font-semibold text-blue-whale">Activity Subscriptions</h2>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {#each $user.subscriptions as subscription}
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <h3 class="font-medium text-gray-900">{subscription.activity.name}</h3>
                                        <p class="text-sm text-gray-600">{subscription.activity.location}</p>
                                        <p class="text-xs text-gray-500 mt-1">
                                            Max participants: {subscription.maxParticipants}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>