<script lang="ts">
    import { goto } from '$app/navigation';

    let name = '';
    let title = '';
    let description = '';
    let links: { url: string; icon: string }[] = [{ url: '', icon: '' }];
    let tags: string[] = [''];
    let type = 'talk';
    let selectedImage: File | null = null;
    
    let loading = false;
    let error = '';
    let success = '';

    const speakerTypes = [
        { value: 'keynote', label: 'Keynote Speaker' },
        { value: 'talk', label: 'Workshop Speaker' },
        { value: 'host', label: 'Panel Speaker' },
    ];

    function addLink() {
        links = [...links, { url: '', icon: '' }];
    }

    function removeLink(index: number) {
        links = links.filter((_, i) => i !== index);
    }

    function addTag() {
        tags = [...tags, ''];
    }

    function removeTag(index: number) {
        tags = tags.filter((_, i) => i !== index);
    }

    function handleImageSelect(event) {
        const files = event.target.files;
        if (files && files[0]) {
            selectedImage = files[0];
    }
}

    async function handleSubmit() {
    loading = true;
    error = '';
    success = '';

    // Filter out empty links and tags
    const filteredLinks = links.filter(link => link.url.trim() && link.icon.trim());
    const filteredTags = tags.filter(tag => tag.trim());

    const speakerData = {
        name: name.trim(),
        title: title.trim(),
        description: description.trim(),
        ...(filteredLinks.length > 0 && { links: filteredLinks }),
        ...(filteredTags.length > 0 && { tags: filteredTags }),
        type
    };

    try {
        // Step 1: Create the speaker first
        const response = await fetch("https://availabilit.ia.utwente.nl/api/speaker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(speakerData),
        });

        if (response.ok) {
            const result = await response.json();
            
            // Step 2: Upload image if one was selected
            if (selectedImage) { // Add this variable to track selected image
                try {
                    const formData = new FormData();
                    formData.append('logo', selectedImage);

                    const imageResponse = await fetch(`https://availabilit.ia.utwente.nl/api/speaker/${result.id}/image`, {
                        method: "PUT",
                        body: formData,
                        credentials: "include"
                    });

                    if (!imageResponse.ok) {
                        console.warn("Image upload failed, but speaker was created");
                    }
                } catch (imageErr) {
                    console.warn("Image upload error:", imageErr);
                    // Don't fail the whole process if image upload fails
                }
            }

            success = "Speaker created successfully!";
            
            // Reset form
            name = '';
            title = '';
            description = '';
            links = [{ url: '', icon: '' }];
            tags = [''];
            type = 'KEYNOTE';
            selectedImage = null; // Reset image
            
            setTimeout(() => {
                goto('/speakers');
            }, 1000);
        } else {
            const result = await response.json();
            error = Array.isArray(result) ? result.map(e => e.msg || e.message).join(', ') : (result.message || 'Failed to create speaker');
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
                <h1 class="text-3xl font-bold text-blue-whale">Create Speaker</h1>
                <button 
                    on:click={() => goto('/speakers')}
                    class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Back to Speakers
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
                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Basic Information</h2>
                        
                        <div>
                            <input 
                                type="file" 
                                accept="image/*"
                                on:change={handleImageSelect}
                            />
                        </div>

                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                type="text" 
                                id="name"
                                bind:value={name}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Speaker's full name"
                            />
                        </div>

                        <div>
                            <label for="type" class="block text-sm font-medium text-gray-700">Speaker Type</label>
                            <select 
                                id="type"
                                bind:value={type}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            >
                                {#each speakerTypes as speakerType}
                                    <option value={speakerType.value}>{speakerType.label}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h2 class="text-xl font-semibold text-blue-whale">Talk</h2>
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                            <input 
                                id="title"
                                bind:value={title}
                                required 
                                disabled={loading}
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Talk title"
                            />
                        </div>

                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Bio/Description</label>
                            <textarea 
                                id="description"
                                bind:value={description}
                                required 
                                disabled={loading}
                                rows="6"
                                class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Speaker's biography, background, and expertise..."
                            ></textarea>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold text-blue-whale">Links</h2>
                            <button 
                                type="button"
                                on:click={addLink}
                                disabled={loading}
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                            >
                                Add Link
                            </button>
                        </div>
                        
                        {#each links as link, index}
                            <div class="flex gap-2">
                                <input 
                                    type="url" 
                                    bind:value={link.url}
                                    disabled={loading}
                                    class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://example.com"
                                />
                                <input 
                                    type="text" 
                                    bind:value={link.icon}
                                    disabled={loading}
                                    class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Link icon"
                                />
                                {#if links.length > 1}
                                    <button 
                                        type="button"
                                        on:click={() => removeLink(index)}
                                        disabled={loading}
                                        class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                                    >
                                        ×
                                    </button>
                                {/if}
                            </div>
                        {/each}
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-semibold text-blue-whale">Tags</h2>
                            <button 
                                type="button"
                                on:click={addTag}
                                disabled={loading}
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                            >
                                Add Tag
                            </button>
                        </div>
                        
                        {#each tags as tag, index}
                            <div class="flex gap-2">
                                <input 
                                    type="text" 
                                    bind:value={tags[index]}
                                    disabled={loading}
                                    class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tag name (e.g., AI, Technology, Innovation)"
                                />
                                {#if tags.length > 1}
                                    <button 
                                        type="button"
                                        on:click={() => removeTag(index)}
                                        disabled={loading}
                                        class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                                    >
                                        ×
                                    </button>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button 
                        type="button"
                        on:click={() => goto('/speakers')}
                        disabled={loading}
                        class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={loading || !name.trim() || !description.trim()}
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Speaker'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>