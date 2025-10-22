<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';

    interface ResetPasswordRequest {
        token: string;
        newPassword: string;
    }

    // Form fields
    let newPassword = '';
    let confirmPassword = '';
    let token = '';
    
    // UI state
    let loading = false;
    let error = '';
    let success = '';
    let tokenValid = false;
    let checkingToken = true;

    // Password validation
    let passwordsMatch = true;
    let passwordValid = true;

    onMount(async () => {
        // Extract token from URL query parameters
        const urlToken = $page.url.searchParams.get('token');
        if (urlToken) {
            token = urlToken;
            await validateToken();
        } else {
            checkingToken = false;
        }
    });

    async function validateToken() {
        checkingToken = true;
        try {
            // You might want to validate the token with the backend first
            // For now, we'll assume any token in the URL is potentially valid
            if (token && token.length > 10) { // Basic token format check
                tokenValid = true;
            } else {
                error = 'Invalid reset token format';
                tokenValid = false;
            }
        } catch (err) {
            error = 'Failed to validate token';
            tokenValid = false;
        } finally {
            checkingToken = false;
        }
    }

    // Reactive validation
    $: passwordsMatch = newPassword == confirmPassword;
    $: passwordValid = newPassword.length >= 8; // Minimum 8 characters
    $: formValid = passwordsMatch && passwordValid && newPassword && confirmPassword && tokenValid;

    async function handleResetPassword() {
        loading = true;
        error = '';
        success = '';

        if (!passwordsMatch) {
            error = 'Passwords do not match';
            loading = false;
            return;
        }

        if (!passwordValid) {
            error = 'Password must be at least 8 characters long';
            loading = false;
            return;
        }

        if (!token) {
            error = 'No reset token available';
            loading = false;
            return;
        }

        const resetData: ResetPasswordRequest = {
            token: token,
            newPassword: newPassword
        };

        try {
            const response = await fetch(apiUrl('/reset-password'), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(resetData),
            });

            if (response.ok) {
                success = "Password reset successful! You can now log in with your new password.";
                
                // Clear form
                newPassword = '';
                confirmPassword = '';
                
                // Redirect to login after success
                setTimeout(() => {
                    goto('/login');
                }, 3000);
            } else {
                const result = await response.json();
                error = result.message || 'Failed to reset password. The token may be expired or invalid.';
            }
        } catch (err) {
            error = "Network error occurred";
            console.error(err);
        } finally {
            loading = false;
        }
    }

    // Reactive password strength values so the template updates automatically when newPassword changes
    let passwordStrengthColor: string = 'bg-gray-200';
    let passwordStrengthText: string = 'Enter a password';
    $: passwordStrengthColor = !newPassword ? 'bg-gray-200' : newPassword.length < 8 ? 'bg-red-200' : newPassword.length < 12 ? 'bg-yellow-200' : 'bg-green-200';
    $: passwordStrengthText = !newPassword ? 'Enter a password' : newPassword.length < 8 ? 'Too short (minimum 8 characters)' : newPassword.length < 12 ? 'Good' : 'Strong';
</script>

<svelte:head>
    <title>Reset Password - Availabilit</title>
</svelte:head>

<div class="min-h-screen bg-bottom-backdrop p-8 flex flex-col items-center justify-center">
    <div class="p-6 w-full max-w-md rounded-lg bg-white shadow-md">
        <h1 class="text-2xl font-bold text-blue-whale mb-6">Reset Password</h1>
        {#if checkingToken}
            <div class="flex justify-center items-center py-8">
                <div class="text-gray-500">Validating reset token...</div>
            </div>
        {:else if !tokenValid}
            <div class="text-center">
                <p class="text-gray-600 mb-4">
                    The password reset link is invalid or has expired.
                </p>
                <a 
                    href="/forgotPassword" 
                    class="text-blue-600 hover:underline"
                >
                    Request a new password reset
                </a>
            </div>
        {:else}
            {#if error}
                <div class="bg-red-100 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            {/if}

            {#if success}
                <div class="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {success}
                </div>
            {:else}
                <form class="space-y-4" on:submit|preventDefault={handleResetPassword}>
                    <!-- New Password -->
                    <div>
                        <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password *</label>
                        <input 
                            type="password" 
                            id="newPassword"
                            bind:value={newPassword}
                            required 
                            disabled={loading}
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your new password"
                        />
                        
                        <!-- Password Strength Indicator -->
                        {#if newPassword}
                            <div class="mt-2">
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all duration-300 {passwordStrengthColor}" style="width: {Math.min((newPassword.length / 12) * 100, 100)}%"></div>
                                </div>
                                <p class="text-xs mt-1 {passwordValid ? 'text-green-600' : 'text-red-600'}">
                                    {passwordStrengthText}
                                </p>
                            </div>
                        {/if}
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password *</label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            bind:value={confirmPassword}
                            required 
                            disabled={loading}
                            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm your new password"
                        />
                        
                        <!-- Password Match Indicator -->
                        {#if confirmPassword}
                            <p class="text-xs mt-1 {passwordsMatch ? 'text-green-600' : 'text-red-600'}">
                                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                        {/if}
                    </div>

                    <!-- Password Requirements -->
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <h4 class="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                        <ul class="text-xs text-gray-600 space-y-1">
                            <li class="{newPassword.length >= 8 ? 'text-green-600' : 'text-gray-600'}">
                                {newPassword.length >= 8 ? '✓' : '•'} At least 8 characters
                            </li>
                            <li class="{passwordsMatch && confirmPassword ? 'text-green-600' : 'text-gray-600'}">
                                {passwordsMatch && confirmPassword ? '✓' : '•'} Passwords must match
                            </li>
                        </ul>
                    </div>
                    
                    <button 
                        type="submit" 
                        class="w-full mt-6 p-3 bg-blue-whale text-white rounded-md hover:bg-blue-whale-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading || !formValid}
                    >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </button>

                    <div class="text-center mt-4">
                        <p class="text-sm text-gray-600">
                            Remember your password? 
                            <a href="/login" class="text-blue-600 hover:underline">Sign in here</a>
                        </p>
                    </div>
                </form>
            {/if}
        {/if}
    </div>
</div>