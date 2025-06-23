<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import About from "$lib/components/About.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";
    import LogoBar from "$lib/components/LogoBar.svelte";

    import LogoNedap from "$lib/images/companies/nedap_color.svg";
    import LogoBasetide from "$lib/images/companies/basetide_color.png";
    import LogoYer from "$lib/images/companies/yer_color.png";
    import LogoChipsoft from "$lib/images/companies/chipsoft_color.svg";
    import LogoING from "$lib/images/companies/ing_color.svg";
    import LogoHarvest from "$lib/images/companies/harvest_color.png";

    const logos = [
        {image: LogoNedap, name: "Nedap",url: "https://nedap.com/careers/students-at-nedap/"},
        {image: LogoChipsoft, name: "Chipsoft",url: "https://werkenbijchipsoft.nl/"},
        {image: LogoING, name: "ING",url: "https://www.ing.nl"},
        {image: LogoBasetide, name: "BaseTide",url:"https://basetide.com"},
        {image: LogoHarvest, name: "Harvest",url:"https://harvest.nl"},
        {image: LogoYer, name: "Yer",url:"https://www.yer.nl"}
    ]
       
</script>

<div id="wrapper" class="min-h-full flex flex-col">
    <Title />

    <LogoBar logos={logos}/>

    <Theme/>

    <About />

    <Accessibility />

    <Location />

</div>

