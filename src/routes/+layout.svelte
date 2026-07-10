<script lang="ts">
    import "../app.css"
    import Footer from "$lib/components/Footer.svelte"
    import Menu from "$lib/components/navigation/Menu.svelte";

    let y:number;
    let height:number;
</script>

<slot></slot>
<Menu y_axis={y} height={height} />
<Footer/>

<svelte:window bind:scrollY={y} bind:innerHeight={height} />