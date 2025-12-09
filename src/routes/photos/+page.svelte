<script>
    import { onMount } from "svelte";

    const pictureURL = "https://www.inter-actief.utwente.nl/activities/7635/photos/"

    onMount(() => {
        if (window !== undefined) window?.location.replace(pictureURL)}
    )
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8 mt-16">
        Redirecting to pictures of SNiC 2025 AvailabilIT. If this does not work please manually go to this <a href="{pictureURL}" class="text-blue-whale hover:text-picton-blue">link</a>
    </div>
</div>