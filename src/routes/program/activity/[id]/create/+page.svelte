<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';

    interface ActivityParams {
        name: string;
        location: string;
        programPartId: number;
        description?: string;
        recordingUrl?: string;
        image?: string;
        speakerIds?: number[];
        subscribe?: {
            maxParticipants: number;
            subscriptionListOpenDate: string;
            subscriptionListCloseDate: string;
        };
    }

    interface Speaker {
        id: number;
        name: string;
        title?: string;
    }

    // Get programPartId from URL
    $: programPartId = parseInt($page.params.id);

    // Form fields
    let name = '';
    let location = '';
    let description = '';
    let recordingUrl = '';
    let image = '';
    let selectedSpeakerIds: number[] = [];
    let selectedImage: File | null = null;

    // Subscription fields
    let enableSubscription = false;
    let maxParticipants = 20;
    let subscriptionOpenDate = '';
    let subscriptionOpenTime = '';
    let subscriptionCloseDate = '';
    let subscriptionCloseTime = '';

    // UI state
    let loading = false;
    let error = '';
    let success = '';
    let speakers: Speaker[] = [];
    let loadingSpeakers = false;

    onMount(async () => {
        await loadSpeakers();
    });

    async function loadSpeakers() {
        loadingSpeakers = true;
        try {
            const response = await fetch(apiUrl('/speaker'), {
                credentials: 'include'
            });
            if (response.ok) {
                speakers = await response.json();
            } else {
                console.warn('Failed to load speakers:', response.status);
            }
        } catch (err) {
            console.error('Error loading speakers:', err);
        } finally {
            loadingSpeakers = false;
        }
    }

    function handleImageSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files && files[0]) {
            selectedImage = files[0];
        }
    }

    function toggleSpeaker(speakerId: number) {
        if (selectedSpeakerIds.includes(speakerId)) {
            selectedSpeakerIds = selectedSpeakerIds.filter(id => id !== speakerId);
        } else {
            selectedSpeakerIds = [...selectedSpeakerIds, speakerId];
        }
    }

    async function handleSubmit() {
        loading = true;
        error = '';
        success = '';

        // Validate subscription dates if enabled
        if (enableSubscription) {
            if (!subscriptionOpenDate || !subscriptionOpenTime || !subscriptionCloseDate || !subscriptionCloseTime) {
                error = 'Please fill in all subscription date and time fields';
                loading = false;
                return;
            }

            const openDateTime = new Date(`${subscriptionOpenDate}T${subscriptionOpenTime}`);
            const closeDateTime = new Date(`${subscriptionCloseDate}T${subscriptionCloseTime}`);

            if (openDateTime >= closeDateTime) {
                error = 'Subscription close date must be after open date';
                loading = false;
                return;
            }

            if (maxParticipants <= 0) {
                error = 'Maximum participants must be greater than 0';
                loading = false;
                return;
            }
        }

        const activityData: ActivityParams = {
            name: name.trim(),
            location: location.trim(),
            programPartId: programPartId,
            ...(description.trim() && { description: description.trim() }),
            ...(recordingUrl.trim() && { recordingUrl: recordingUrl.trim() }),
            ...(image.trim() && { image: image.trim() }),
            ...(selectedSpeakerIds.length > 0 && { speakerIds: selectedSpeakerIds })
        };

        // Add subscription data if enabled
        if (enableSubscription) {
            activityData.subscribe = {
                maxParticipants: maxParticipants,
                subscriptionListOpenDate: `${subscriptionOpenDate}T${subscriptionOpenTime}:00.000Z`,
                subscriptionListCloseDate: `${subscriptionCloseDate}T${subscriptionCloseTime}:00.000Z`
            };
        }

        try {
            const response = await fetch(apiUrl('/activity'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(activityData),
            });

            if (response.ok) {
                const result = await response.json();
                success = "Activity created successfully!";

                // Handle image upload if an image was selected
                if (selectedImage && result.id) {
                    try {
                        const formData = new FormData();
                        formData.append('image', selectedImage);

                        const imageResponse = await fetch(apiUrl(`/activity/${result.id}/image`), {
                            method: "PUT",
                            body: formData,
                            credentials: "include"
                        });

                        if (!imageResponse.ok) {
                            console.warn("Image upload failed, but activity was created");
                        }
                    } catch (imageErr) {
                        console.warn("Image upload error:", imageErr);
                    }
                }
                
                // Reset form
                name = '';
                location = '';
                description = '';
                recordingUrl = '';
                image = '';
                selectedSpeakerIds = [];
                selectedImage = null;
                enableSubscription = false;
                maxParticipants = 20;
                subscriptionOpenDate = '';
                subscriptionOpenTime = '';
                subscriptionCloseDate = '';
                subscriptionCloseTime = '';
                
                // Redirect after success
                setTimeout(() => {
                    goto('/program');
                }, 2000);
            } else {
                const result = await response.json();
                error = Array.isArray(result) ? result.map(e => e.msg || e.message).join(', ') : (result.message || 'Failed to create activity');
            }
        } catch (err) {
            error = "Network error occurred";
            console.error(err);
        } finally {
            loading = false;
        }
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Basic Information -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Basic Information</h2>
                        
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Activity Name *</label>
                            <input 
                                type="text" 
                                id="name"
                                bind:value={name}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter activity name"
                            />
                        </div>

                        <div>
                            <label for="location" class="block text-sm font-medium text-gray-700">Location *</label>
                            <input 
                                type="text" 
                                id="location"
                                bind:value={location}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Room A101, Main Hall, Online"
                            />
                        </div>

                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea 
                                id="description"
                                bind:value={description}
                                disabled={loading}
                                rows="4"
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe the activity, its goals, and what participants will learn..."
                            ></textarea>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Subscription Options</h2>
                        
                        <!-- Enable Subscription Toggle -->
                        <div class="flex items-center space-x-3">
                            <input 
                                type="checkbox" 
                                id="enableSubscription"
                                bind:checked={enableSubscription}
                                disabled={loading}
                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label for="enableSubscription" class="text-sm font-medium text-gray-700">
                                Enable participant subscriptions
                            </label>
                        </div>

                        {#if enableSubscription}
                            <!-- Max Participants -->
                            <div>
                                <label for="maxParticipants" class="block text-sm font-medium text-gray-700">Maximum Participants *</label>
                                <input 
                                    type="number" 
                                    id="maxParticipants"
                                    bind:value={maxParticipants}
                                    min="1"
                                    max="1000"
                                    required={enableSubscription}
                                    disabled={loading}
                                    class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="20"
                                />
                                <p class="text-xs text-gray-500 mt-1">Maximum number of people who can subscribe</p>
                            </div>

                            <!-- Subscription Open Date/Time -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Subscription Opens *</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <input 
                                            type="date" 
                                            bind:value={subscriptionOpenDate}
                                            required={enableSubscription}
                                            disabled={loading}
                                            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">Date</p>
                                    </div>
                                    <div>
                                        <input 
                                            type="time" 
                                            bind:value={subscriptionOpenTime}
                                            required={enableSubscription}
                                            disabled={loading}
                                            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">Time</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Subscription Close Date/Time -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Subscription Closes *</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <input 
                                            type="date" 
                                            bind:value={subscriptionCloseDate}
                                            required={enableSubscription}
                                            disabled={loading}
                                            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">Date</p>
                                    </div>
                                    <div>
                                        <input 
                                            type="time" 
                                            bind:value={subscriptionCloseTime}
                                            required={enableSubscription}
                                            disabled={loading}
                                            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p class="text-xs text-gray-500 mt-1">Time</p>
                                    </div>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">When subscription registration closes</p>
                            </div>
                        {/if}
                    </div>

                    <!-- Speakers Selection -->
                    <div class="space-y-4 md:col-span-2">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold text-blue-whale">Speakers</h2>
                            {#if loadingSpeakers}
                                <span class="text-sm text-gray-500">Loading speakers...</span>
                            {/if}
                        </div>
                        
                        {#if speakers.length > 0}
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {#each speakers as speaker}
                                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 {selectedSpeakerIds.includes(speaker.id) ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedSpeakerIds.includes(speaker.id)}
                                            on:change={() => toggleSpeaker(speaker.id)}
                                            disabled={loading}
                                            class="mr-3"
                                        />
                                        <div>
                                            <div class="font-medium text-sm">{speaker.name}</div>
                                            {#if speaker.title}
                                                <div class="text-xs text-gray-500">{speaker.title}</div>
                                            {/if}
                                        </div>
                                    </label>
                                {/each}
                            </div>
                            
                            {#if selectedSpeakerIds.length > 0}
                                <p class="text-sm text-gray-600">
                                    Selected {selectedSpeakerIds.length} speaker{selectedSpeakerIds.length !== 1 ? 's' : ''}
                                </p>
                            {/if}
                        {:else if !loadingSpeakers}
                            <p class="text-gray-500 italic">No speakers available</p>
                        {/if}
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button 
                        type="button"
                        on:click={() => goto('/program')}
                        disabled={loading}
                        class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading || !name.trim() || !location.trim()}
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Activity'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>