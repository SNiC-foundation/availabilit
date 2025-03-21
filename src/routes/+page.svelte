<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import About from "$lib/components/About.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";

    let y:number;
    let height:number;
</script>

<Navbar scroll={y} height={height}/>

<div id="wrapper" class="min-h-full flex flex-col">

    <Title />

    <Theme/>

    <About />

    <Accessibility />

    <Location />

    <Footer />

</div>

<svelte:window bind:scrollY={y} bind:innerHeight={height} />