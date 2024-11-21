<script lang="ts">
    import { onMount } from 'svelte';
    import type { AnimationItem } from 'lottie-web';
    import logo from '$lib/images/no_background_snic_presents.png';
    import animationData from '$lib/animations/logoAnimation.json'

    let animation: AnimationItem | null = null;
    let container: HTMLElement;
    let displayImage: boolean = false;

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

<div id="landing_section" class="h-[98vh] w-full bg-bottom-backdrop text-white flex items-center justify-center gap-[5vh]">

    <div bind:this={container} id="logo" class="w-screen max-w-screen-md flex items-center justify-center cursor-pointer">
        {#if displayImage}
            <img src={logo} alt="AvailabilIT logo" class="w-fit">
        {/if}
    </div>

    <div id="infoText" class="absolute bottom-16 w-full text-center text-xl sm:text-2xl lg:text-4xl font-medium">
        <h3>Tuesday 25th of November, 2025</h3>
    </div>

</div>

<style>
    #landing_section {
        border-bottom-left-radius: 100% 20%;
        border-bottom-right-radius: 100% 20%;
    }
</style>