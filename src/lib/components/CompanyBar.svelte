<script lang="ts">
    const logos:string[] = []
    let containerWidth: number;
    let trackWidth: number;
</script>

{#if logos.length > 3}
<div class="overflow-hidden h-20 relative gradient-borders w-full {containerWidth <= trackWidth ? '' : 'flex justify-center'}" bind:clientWidth={containerWidth}>
    <div class="flex flex-row gap-20 w-max {containerWidth < trackWidth ? 'scroll-animation absolute' : 'pl-0'}">
        <div class="flex flex-row gap-20" bind:clientWidth={trackWidth}>
            {#each logos as logo}
            <img src={logo} class="w-20 h-20"/>
            {/each}
        </div>
        {#if containerWidth < trackWidth}
            <div class="flex flex-row gap-20">
                {#each logos as logo}
                <img src={logo} class="w-20 h-20"/>
                {/each}
            </div>
        {/if}
    </div>
</div>
{/if}


<style scoped>
    .gradient-borders::after {
        position: absolute;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(9,9,121,0) 15%, rgba(4,121,195,0) 85%, rgba(255,255,255,1) 100%);
    }

    .scroll-animation {
        animation: scroll 60s linear infinite;
    }

    @keyframes scroll {
        0% {
            transform: translateX(-0%);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>