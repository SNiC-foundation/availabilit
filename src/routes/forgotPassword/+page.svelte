<script lang="ts">
    import { apiUrl } from '$lib/config';
    
    let mailSent = false;
    let email = '';

    async function handleForgotPassword() {
        try {
            fetch(apiUrl('/forgot-password'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
            })
        } finally {
            mailSent = true
        }
    }
</script>

<div class="min-h-screen bg-bottom-backdrop p-8 flex flex-col items-center justify-center gap-4 md:flex-row">
    <div class="p-4 min-w-96 shrink-0 rounded-lg bg-gray-100">
        {#if mailSent}
        <h1 class="text-xl font-medium">E-mail sent!</h1>
        <p>If there is an account associated with this e-mail, a mail to reset your password has been sent. Be sure to also check your spam folder</p>
        {:else}
        <h1 class="text-xl font-medium">Forgot password</h1>
        
        <form class="flex flex-col gap-4 mt-4" on:submit|preventDefault={handleForgotPassword}>
            <label class="flex flex-col">
                <span class="mb-1">Email</span>
                <input 
                    type="email" 
                    bind:value={email}
                    required 
                    class="p-2 border rounded" 
                />
            </label>
            
            <button 
                type="submit" 
                class="p-2 bg-blue-whale text-white rounded hover:bg-blue-whale-dark disabled:opacity-50"
            >
                Send e-mail
            </button>
        </form>
        {/if}
    </div>
</div>

