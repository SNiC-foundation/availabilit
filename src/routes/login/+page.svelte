<script lang="ts">
    import { goto } from '$app/navigation';
    import { apiUrl } from '$lib/config';

    let email = '';
    let password = '';
    let rememberMe = false;
    let loading = false;
    let error = '';

    async function handleLogin() {
        loading = true;
        error = '';
        
        try {           
            const response = await fetch(apiUrl('/login'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe
                }),
            });

            if (response.ok) {
                goto('/profile')
            }
        } catch (err) {
            console.error("🚨 Network error:", err);
            error = "Network error occurred";
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8 flex flex-col items-center justify-center gap-4 md:flex-row">
    <div class="p-4 min-w-96 shrink-0 rounded-lg bg-gray-100">
        <h1 class="text-xl font-medium">Login</h1>
        
        {#if error}
            <div class="mt-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
            </div>
        {/if}
        
        <form class="flex flex-col gap-4 mt-4" on:submit|preventDefault={handleLogin}>
            <label class="flex flex-col">
                <span class="mb-1">Email</span>
                <input 
                    type="email" 
                    bind:value={email}
                    required 
                    class="p-2 border rounded" 
                    disabled={loading}
                />
            </label>
            
            <label class="flex flex-col">
                <span class="mb-1">Password</span>
                <input 
                    type="password" 
                    bind:value={password}
                    required 
                    class="p-2 border rounded" 
                    disabled={loading}
                />
            </label>
            
            <label class="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    bind:checked={rememberMe}
                    disabled={loading}
                />
                <span>Remember me</span>
            </label>
            
            <button 
                type="submit" 
                class="mt-4 p-2 bg-blue-whale text-white rounded hover:bg-blue-whale-dark disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <button type="button" on:click={(event) => goto('/forgotPassword')}>Forgotten password?</button>
        </form>
    </div>
</div>