<script lang="ts">
    import { goto } from '$app/navigation';

    let name = '';
    let location = '';
    let specialization = '';
    let shortDescription = '';
    let description = '';
    let url = '';
    let sponsorPackage = 'bronze'; // Default package
    

    let loading = false;
    let error = '';
    let success = '';

    const sponsorPackages = [
        { value: 'copper', label: 'Copper' },
        { value: 'bronze', label: 'Bronze' },
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
        { value: 'platinum', label: 'Platinum' }
    ];

    async function handleSubmit() {
        loading = true;
        error = '';
        success = '';

        const partnerData = {
            name: name.trim(),
            location: location.trim(),
            specialization: specialization.trim(),
            ...(shortDescription.trim() && { shortDescription: shortDescription.trim() }),
            ...(description.trim() && { description: description.trim() }),
            url: url.trim(),
            package: sponsorPackage
        };

        try {
            const response = await fetch("https://availabilit.ia.utwente.nl/api/partner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(partnerData),
            });

            if (response.ok) {
                const result = await response.json();
                success = "Partner created successfully!";
                
                // Reset form
                name = '';
                location = '';
                specialization = '';
                shortDescription = '';
                description = '';
                url = '';
                sponsorPackage = 'bronze';
                
                // Optionally redirect to partners list after a delay
                setTimeout(() => {
                    goto('/partners');
                }, 2000);
            } else {
                const result = await response.json();
                error = Array.isArray(result) ? result.map(e => e.msg || e.message).join(', ') : (result.message || 'Failed to create partner');
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
                            <label for="name" class="block text-sm font-medium text-gray-700">Company Name *</label>
                            <input 
                                type="text" 
                                id="name"
                                bind:value={name}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Partner company name"
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
                                placeholder="City, Country"
                            />
                        </div>

                        <div>
                            <label for="url" class="block text-sm font-medium text-gray-700">Website URL *</label>
                            <input 
                                type="url" 
                                id="url"
                                bind:value={url}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="https://company.com"
                            />
                        </div>

                        <div>
                            <label for="package" class="block text-sm font-medium text-gray-700">Sponsor Package *</label>
                            <select 
                                id="package"
                                bind:value={sponsorPackage}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                {#each sponsorPackages as pkg}
                                    <option value={pkg.value}>{pkg.label}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <!-- Company Details -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Company Details</h2>
                        
                        <div>
                            <label for="specialization" class="block text-sm font-medium text-gray-700">Specialization *</label>
                            <input 
                                type="text" 
                                id="specialization"
                                bind:value={specialization}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Software Development, AI, Consulting"
                            />
                        </div>

                        <div>
                            <label for="shortDescription" class="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea 
                                id="shortDescription"
                                bind:value={shortDescription}
                                disabled={loading}
                                rows="3"
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Brief description of the company (optional)"
                            ></textarea>
                        </div>

                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Full Description</label>
                            <textarea 
                                id="description"
                                bind:value={description}
                                disabled={loading}
                                rows="4"
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Detailed description of the company, its mission, and services (optional)"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button 
                        type="button"
                        on:click={() => goto('/partners')}
                        disabled={loading}
                        class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading || !name.trim() || !location.trim() || !specialization.trim() || !url.trim()}
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Partner'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>