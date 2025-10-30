<script lang="ts">
    import { goto } from '$app/navigation';
    import { apiUrl } from '$lib/config';
    import privacyPdf from '$lib/Privacy Policy SNiC 2025.pdf';

    // Form fields
    let token = ''; // Ticket code
    let email = '';
    let name = '';
    let dietaryWishes = '';
    let needs = '';
    let agreeToPrivacyPolicy = false;
    let studyProgram = '';
    let selectedLanguages: string[] = [];
    
    // UI state
    let loading = false;
    let error = '';
    let success = '';

    function toggleLanguage(language: string) {
        if (selectedLanguages.includes(language)) {
            selectedLanguages = selectedLanguages.filter(lang => lang !== language);
        } else {
            selectedLanguages = [...selectedLanguages, language];
        }
    }

    async function handleRegister() {
        loading = true;
        error = '';
        success = '';

        // Validate required fields
        if (!token.trim() || !email.trim() || !name.trim() || !agreeToPrivacyPolicy) {
            error = 'Please fill in all required fields and agree to the privacy policy';
            loading = false;
            return;
        }

        // Validate language selection
        if (selectedLanguages.length === 0) {
            error = 'Please select at least one language (Dutch or English)';
            loading = false;
            return;
        }

        const registrationData = {
            token: token.trim(),
            user: {
                email: email.trim(),
                name: name.trim(),
                dietaryWishes: dietaryWishes.trim() || "Not defined",
                needs: needs.trim() || "Not defined",
                agreeToPrivacyPolicy: agreeToPrivacyPolicy,
                languages: selectedLanguages.length > 0 ? selectedLanguages : undefined,
                participantInfo: {
                    studyProgram: studyProgram.trim() || undefined
                }
            }
        };

        try {
            const response = await fetch(apiUrl('/register'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                success = "Registration successful! Check your mailbox for a link to set a password";
                
                // Reset form
                token = '';
                email = '';
                name = '';
                dietaryWishes = '';
                needs = '';
                agreeToPrivacyPolicy = false;
                studyProgram = '';
                selectedLanguages = [];
                
                // Redirect to login after success
                setTimeout(() => {
                    goto('/login');
                }, 2000);
            } else {
                const result = await response.json();
                error = Array.isArray(result) ? result.map(e => e.msg || e.message).join(', ') : (result.message || 'Registration failed');
            }
        } catch (err) {
            error = "Network error occurred";
            console.error(err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8 flex flex-col items-center justify-center gap-4">
    <div class="p-6 w-full max-w-4xl rounded-lg bg-white shadow-md">
        <h1 class="text-2xl font-bold text-blue-whale mb-6">Register for Event</h1>
        
        {#if error}
            <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
            </div>
        {/if}

        {#if success}
            <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {success}
            </div>
        {/if}
        
        <form class="space-y-4" on:submit|preventDefault={handleRegister}>
            <!-- Ticket Code -->
            <div>
                <label for="token" class="block text-sm font-medium text-gray-700">Ticket Code *</label>
                <input 
                    type="text" 
                    id="token"
                    bind:value={token}
                    required 
                    disabled={loading}
                    class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your ticket code (e.g., ABC123XYZ)"
                />
                <p class="text-xs text-gray-500 mt-1">The unique code from your ticket</p>
            </div>

            <div class="flex gap-4 pt-4">
                <div class="w-full">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Full Name *</label>
                    <input 
                        type="text" 
                        id="name"
                        bind:value={name}
                        required 
                        disabled={loading}
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your full name"
                    />
                </div>

                <div class="mt-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input 
                        type="email" 
                        id="email"
                        bind:value={email}
                        required 
                        disabled={loading}
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div class="mt-4">
                    <label for="studyProgram" class="block text-sm font-medium text-gray-700">Study Program *</label>
                    <input 
                        type="text" 
                        id="studyProgram"
                        bind:value={studyProgram}
                        required
                        disabled={loading}
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Computer Science, Artificial intelligence"
                    />
                </div>
            </div>

            <div class="w-full">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Preferences & Requirements</h3>
                
                <div>
                    <label for="dietaryWishes" class="block text-sm font-medium text-gray-700">Dietary Requirements</label>
                    <input 
                        type="text" 
                        id="dietaryWishes"
                        bind:value={dietaryWishes}
                        disabled={loading}
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Vegetarian, Vegan, Gluten-free, None"
                    />
                    <p class="text-xs text-gray-500 mt-1">Let us know about any dietary restrictions</p>
                </div>

                <div class="mt-4">
                    <label for="needs" class="block text-sm font-medium text-gray-700">Special Needs</label>
                    <textarea 
                        id="needs"
                        bind:value={needs}
                        disabled={loading}
                        rows="2"
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any accessibility requirements or special assistance needed"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1">Optional: Accessibility or special assistance requirements</p>
                </div>

                <div class="mt-4">
                    <span class="block text-sm font-medium text-gray-700 mb-2">Languages *</span>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={selectedLanguages.includes('english')}
                                on:change={() => toggleLanguage('english')}
                                disabled={loading}
                                class="mr-2 rounded"
                            />
                            <span class="text-sm text-gray-700">English</span>
                        </label>
                        
                        <label class="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={selectedLanguages.includes('dutch')}
                                on:change={() => toggleLanguage('dutch')}
                                disabled={loading}
                                class="mr-2 rounded"
                            />
                            <span class="text-sm text-gray-700">Dutch</span>
                        </label>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Select all languages that you speak *</p>
                </div>
            </div>
            </div>
            <div class="border-t pt-4">
                <div class="flex items-start">
                    <input 
                        type="checkbox" 
                        id="privacy"
                        bind:checked={agreeToPrivacyPolicy}
                        required 
                        disabled={loading}
                        class="mt-1 mr-2"
                    />
                    <label for="privacy" class="text-sm text-gray-700">
                        I agree to the <a href={privacyPdf} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Privacy Policy</a>
                    </label>
                </div>
            </div>
            
            <button 
                type="submit" 
                class="w-full mt-6 p-3 bg-blue-whale text-white rounded-md hover:bg-blue-whale-dark disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !agreeToPrivacyPolicy || selectedLanguages.length === 0}
            >
                {loading ? 'Creating Account...' : 'Register'}
            </button>

            <div class="text-center mt-4">
                <p class="text-sm text-gray-600">
                    Already have an account? 
                    <a href="/login" class="text-blue-600 hover:underline">Sign in here</a>
                </p>
            </div>
        </form>
    </div>
</div>