<script lang="ts">
    import { onMount } from 'svelte';
    import type { AnimationItem } from 'lottie-web';
    import logo from '$lib/images/no_background_snic_presents.png';
    import animationData from '$lib/animations/logoAnimation.json'
    import Bokeh from './Bokeh.svelte';

    let animation: AnimationItem | null = null;
    let container: HTMLElement;
    let displayImage: boolean = false;
    let bokehAmount: number = 20;
    let scroll: number;

    onMount(() => {
        (async () => {
            try {
                const lottie = await import('lottie-web');

                animation = lottie.default.loadAnimation({
                    container,
                    renderer: 'svg',
                    animationData: animationData,
                    loop: false,
                    autoplay: true
                });

                container.addEventListener('click', () => {
                    if (animation) {
                        animation.goToAndPlay(0, true);
                    }
                });
            } catch (error) {
                displayImage = true
                console.error('Error loading animation:', error);
            }

            return () => {
                if (animation) {
                    animation.destroy();
                }
            };
        })();
    });
</script>


<div id="landing_section"
     class="h-[98vh] overflow-hidden relative w-full bg-bottom-backdrop text-white flex items-center justify-center gap-[5vh]">
    <div bind:this={container} id="logo"
         class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-screen-md cursor-pointer z-10 p-4"
         style="top:{50+scroll/30}%; opacity:{(100-scroll/5) / 100}">
        {#if displayImage}
            <img src={logo} alt="AvailabilIT logo" class="w-fit">
        {/if}
    </div>

    <div id="infoText"
         class="absolute bottom-16 w-full text-center text-xl sm:text-2xl lg:text-4xl font-medium text-aquamarine">
        <h3>Tuesday 25th of November, 2025</h3>
    </div>

    {#each Array.from({length: bokehAmount + 1}) as _, index}
        <Bokeh x={Math.round(100/bokehAmount) * index} size={25 + Math.random() * 100} speed={Math.random()}/>
    {/each}

</div>

<style>
    #landing_section {
        border-bottom-left-radius: 100% 20%;
        border-bottom-right-radius: 100% 20%;
    }
</style>

<svelte:window bind:scrollY={scroll}/>