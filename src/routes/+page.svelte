<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import About from "$lib/components/About.svelte";
    import Theme from "$lib/components/Theme.svelte";
    import Committee from "$lib/components/Committee.svelte";
    import Accessibility from "$lib/components/Accessibility.svelte";
    import Location from "$lib/components/Location.svelte";
</script>

<div id="wrapper" class="min-h-full flex flex-col">
    <Title />

    <Theme/>

    <About />

    <Accessibility />

    <Location />

</div>

