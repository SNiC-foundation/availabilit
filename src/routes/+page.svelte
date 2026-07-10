<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import About from "$lib/components/About.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";
    import LogoBar from "$lib/components/LogoBar.svelte";
    import Universities from "$lib/components/Universities.svelte";

    import { staticUrl } from "$lib/config";

    // Partner logos shown in the scrolling logo bar, ordered by tier.
    const partners: {name:string, url:string, logoFilename:string}[] = [
        { name: "Nedap", url: "https://nedap.com/", logoFilename: "partners/b4fd3868-ea6e-47a2-af14-157bbee882a6.svg" },
        { name: "Chipsoft", url: "https://www.chipsoft.com/nl-NL/", logoFilename: "partners/259e953a-3086-4580-90ae-0fda93d97365.svg" },
        { name: "ING", url: "https://careers.ing.com/en", logoFilename: "partners/6ae40461-9bbd-470e-bc96-b94943a34c61.svg" },
        { name: "Rabobank", url: "https://rabobank.jobs/nl/", logoFilename: "partners/0d79a438-2c20-4f55-a063-62db2c456492.svg" },
        { name: "AIVD", url: "https://www.aivd.nl/onderwerpen/werken-bij-de-aivd", logoFilename: "partners/01691b41-3975-4b4e-8df5-fd0fe00b1247.svg" },
        { name: "BaseTide", url: "https://www.basetide.com/", logoFilename: "partners/af767246-5fda-426f-9cb8-ade7d4affb44.png" },
        { name: "Harvest", url: "https://harvest.nl/", logoFilename: "partners/a93af993-e4c1-4194-8009-88f4b9fe6e3a.png" },
        { name: "Yer", url: "https://www.yer.nl/", logoFilename: "partners/409c76dd-3913-4d91-bb37-318289f675cc.png" },
        { name: "Jane Street", url: "https://www.janestreet.com/join-jane-street/overview/", logoFilename: "partners/f622cc22-22fc-4191-80ae-6b130850b1b4.png" },
    ];

    const logos = partners.map((partner) => ({
        image: staticUrl(partner.logoFilename),
        name: partner.name,
        url: partner.url
    }));
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

