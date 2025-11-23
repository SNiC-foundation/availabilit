<script lang="ts">
    let latestScan:any = undefined

    const userEntries = ['email','name','dietaryWishes','needs']

    import { onMount } from 'svelte';
    import { apiUrl } from '$lib/config';
    import { isLoggedIn, isVolunteer } from '$lib/stores/auth';

    let code = '';
    let loading = false;
    let error = '';
    let inputEl: HTMLInputElement | null = null;

    // Focus the input on mount
    onMount(() => {
        inputEl?.focus();
        if (inputEl) inputEl.select();
    });

    async function doScan() {
        const scanned = code.trim();
        if (!scanned) return;
        loading = true;
        error = '';
        try {
            const res = await fetch(apiUrl(`ticket/${encodeURIComponent(scanned)}/scan`), {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                latestScan = data;
            } else {
                const text = await res.text();
                error = text || `Scan failed: ${res.status}`;
            }
        } catch (err) {
            console.error('Scan request failed', err);
            error = 'Network error during scan';
        } finally {
            loading = false;
            // refocus and select for next scan
            requestAnimationFrame(() => {
                inputEl?.focus();
                inputEl?.select();
            });
        }
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            void doScan();
        }
    }

    const formatLabel = (key: string): string => {
        if (!key) return ''
        const spaced = key
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase -> spaces
            .replace(/[_-]+/g, ' ') // snake_case or kebab-case -> spaces
            .trim()
        return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
    }
</script>

<svelte:head>
    <title>Reset Password - Availabilit</title>
</svelte:head>

<div class="min-h-screen bg-bottom-backdrop p-8 flex flex-row items-center gap-8">
     {#if $isLoggedIn && $isVolunteer}
    <div class="p-6 w-full rounded-lg bg-white shadow-md">
        <h1 class="font-bold text-2xl">Participant code</h1>
        <input
            bind:this={inputEl}
            bind:value={code}
            on:keydown={onKeydown}
            class="border rounded-xl border-blue-whale w-full p-2"
            placeholder="Scan code here and press Enter"
            disabled={loading}
        />
        {#if loading}
            <div class="text-sm text-blue-whale mt-2">Scanning…</div>
        {/if}
        {#if error}
            <div class="text-sm text-red-600 mt-2">{error}</div>
        {/if}
    </div>

    <div class="p-6 w-full rounded-lg bg-white shadow-md">
        <h1 class="font-bold text-2xl">Scanned participant</h1>
        {#if latestScan != undefined}
            {#if latestScan.user}
                {#each Object.entries(latestScan.user).filter((entry) => userEntries.includes(entry[0])) as userEntry}
                    <div class="flex justify-between">
                        <b class="font-medium">{formatLabel(userEntry[0])}</b>
                        <span>{userEntry[1]}</span>
                    </div>
                {/each}
            {/if}
        

        <div class="flex justify-between">
            <b class="font-medium">Scans</b>
            <span>{latestScan?.scans?.length ?? 0}</span>
        </div>

        <div class="flex justify-between">
            <b class="font-medium">Ticket printed</b>
            <span>{(latestScan?.user?.subscriptions?.length ?? 0) === 3 ? 'Yes' : 'No'}</span>
        </div>

        <div class="flex justify-between">
            <b class="font-medium">Association</b>
            <span>{latestScan?.association}</span>
        </div>
        {/if}
    </div>
    {:else}
        <div class="bg-red-100 text-red-700 p-4 rounded mt-12 text-center mx-auto">
            Unauthorized
        </div>
    {/if}
</div>