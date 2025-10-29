<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import About from "$lib/components/About.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";
    import LogoBar from "$lib/components/LogoBar.svelte";
    import Universities from "$lib/components/Universities.svelte";

    import { onMount } from 'svelte';
    import { apiUrl, staticUrl } from "$lib/config";

    let logos: {image:string, name:string, url: string}[] = [];

    onMount(async () => {
        try {
            const res = await fetch(apiUrl('/partner'));
            if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
            const partners = await res.json();

            const tierOrder = {
                platinum: 0,
                gold: 1,
                silver: 2,
                bronze: 3
            };

            partners.sort((a, b) => {
                const aTier = tierOrder[a.package]
                const bTier = tierOrder[b.package]
                if (aTier !== bTier) return aTier - bTier;
                return (a.name || '').localeCompare(b.name || '');
            });

            logos = partners.map((partner) => ({
                image: staticUrl(partner.logoFilename),
                name: partner.name,
                url: partner.url
            }));
        } catch (err) {
            console.error('Failed to load partner logos', err);
        }
    });
       
</script>

<div id="wrapper" class="min-h-full flex flex-col">
    <Title />

    <LogoBar logos={logos}/>

    <Theme/>

    <About />

    <Universities />

    <Accessibility />

    <Location />

</div>

