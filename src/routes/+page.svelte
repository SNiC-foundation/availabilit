<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import About from "$lib/components/About.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";
    import CompanyBar from "$lib/components/CompanyBar.svelte";

    import LogoNedap from "$lib/images/companies/nedap_color.svg";
    import LogoBasetide from "$lib/images/companies/basetide_color.png";
    import LogoYer from "$lib/images/companies/yer_color.png";
    import LogoChipsoft from "$lib/images/companies/chipsoft_color.svg";
    import LogoING from "$lib/images/companies/ing_color.svg";
    import LogoHarvest from "$lib/images/companies/harvest_color.png";

    const logos = [
        {image: LogoNedap, name: "Nedap"},
        {image: LogoChipsoft, name: "Chipsoft"},
        {image: LogoING, name: "ING"},
        {image: LogoBasetide, name: "BaseTide"},
        {image: LogoHarvest, name: "Harvest"},
        {image: LogoYer, name: "Yer"}
    ]
       
</script>

<div id="wrapper" class="min-h-full flex flex-col">
    <Title />

    <CompanyBar logos={logos}/>

    <Theme/>

    <About />

    <Accessibility />

    <Location />

</div>

