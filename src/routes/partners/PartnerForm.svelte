<script lang="ts">
    import { goto } from "$app/navigation";
  import { apiUrl } from "$lib/config";

    export let id: number = -1;
    export let mode: 'edit' | 'create' = 'create';
    
    let name = '';
    let location = '';
    let specialization = '';
    let description = '';
    let url = '';
    let sponsorPackage = 'bronze';
    let selectedImage: File | null = null;

    import { onMount } from 'svelte';

    onMount(async () => {
        if (mode !== 'edit' || !id) return;
        loading = true;
        try {
            const res = await fetch(apiUrl(`/partner/${id}`), {
                credentials: 'include'
            });
            if (!res.ok) {
                console.warn('Failed to fetch partner:', res.status);
                return;
            }
            const data = await res.json();

            name = data.name ?? '';
            location = data.location ?? '';
            specialization = data.specialization ?? '';
            description = data.description ?? '';
            url = data.url ?? '';
            sponsorPackage = data.package ?? 'bronze';

            // Try to fetch partner logo/image
            let imageBlob: Blob | null = null;
            try {
                if (data.logoUrl) {
                    const imgRes = await fetch(data.logoUrl, { credentials: 'include' });
                    if (imgRes.ok) imageBlob = await imgRes.blob();
                } else {
                    const imgRes = await fetch(apiUrl(`/partner/${id}/logo`), { credentials: 'include' });
                    if (imgRes.ok) imageBlob = await imgRes.blob();
                }
            } catch (imgErr) {
                console.warn('Failed to fetch partner logo:', imgErr);
            }

            if (imageBlob) {
                const ext = imageBlob.type.split('/')[1] ?? 'jpg';
                selectedImage = new File([imageBlob], `partner-${id}.${ext}`, { type: imageBlob.type });
            } else {
                selectedImage = null;
            }
        } catch (err) {
            console.error('Error loading partner data:', err);
        } finally {
            loading = false;
        }
    });
    
    let loading = false;

    function handleImageSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files && files[0]) {
            selectedImage = files[0];
        }
    }

    // Sponsor packages (adjust based on your backend enum)
    const sponsorPackages = [
        { value: 'copper', label: 'Copper' },
        { value: 'bronze', label: 'Bronze' },
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
        { value: 'platinum', label: 'Platinum' }
    ];

    async function handleSubmit() {
        loading = true;

        const partnerData = {
            name: name.trim(),
            location: location.trim(),
            specialization: specialization.trim(),
            ...(description.trim() && { description: description.trim() }),
            url: url.trim(),
            package: sponsorPackage
        };

        try {
            const urlAPI = mode === 'edit' ? apiUrl(`/partner/${id}`) : apiUrl("/partner");
            const method = mode === 'edit' ? "PUT" : "POST";

            const response = await fetch(urlAPI, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(partnerData),
            });

            if (response.ok) {
                const result = await response.json();
                
                // Use the ID from the result for create mode, or the existing ID for edit mode
                const partnerId = mode === 'edit' ? id : result.id;
                
                if (selectedImage) { 
                    try {
                        const formData = new FormData();
                        formData.append('logo', selectedImage);

                        const imageResponse = await fetch(apiUrl(`/partner/${partnerId}/logo`), {
                            method: "PUT",
                            body: formData,
                            credentials: "include"
                        });

                        if (!imageResponse.ok) {
                            console.warn("Logo upload failed, but partner was saved");
                        }
                    } catch (imageErr) {
                        console.warn("Logo upload error:", imageErr);
                        // Don't fail the whole process if image upload fails
                    }
                }
                
                // Only reset form in create mode
                if (mode === 'create') {
                    name = '';
                    location = '';
                    specialization = '';
                    description = '';
                    url = '';
                    sponsorPackage = 'bronze';
                    selectedImage = null;
                }
                
                setTimeout(() => {
                    goto('/partners');
                }, 1000);
            } else {
                const result = await response.json();
                console.error("Failed to save partner:", result);
            }
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
            <h2 class="text-xl font-semibold text-blue-whale">Basic Information</h2>
            
            <div>
                <label for="logo" class="block text-sm font-medium text-gray-700">Company Logo</label>
                <input 
                    type="file" 
                    id="logo"
                    accept="image/*"
                    on:change={handleImageSelect}
                    disabled={loading}
                    class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {#if selectedImage}
                    <p class="text-sm text-gray-500 mt-1">Selected: {selectedImage.name}</p>
                {/if}
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Company Name</label>
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
                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
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
                <label for="url" class="block text-sm font-medium text-gray-700">Website URL</label>
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
        </div>

        <div class="space-y-4">
            <h2 class="text-xl font-semibold text-blue-whale">Company Details</h2>
            
            <div>
                <label for="specialization" class="block text-sm font-medium text-gray-700">Specialization</label>
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
                <label for="package" class="block text-sm font-medium text-gray-700">Sponsor Package</label>
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
            {loading ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Partner' : 'Create Partner')}
        </button>
    </div>
</form>