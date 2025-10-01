<script lang="ts">
    export let logos:{image:string,name:string,url:string}[];
    export let size:string= 'md'
    let containerWidth: number = 0;
    let trackWidth: number = 0;

    $: isOverflowing = containerWidth <= trackWidth + 100;

    const logoSize = size === 'md' ? 'h-8' : 'h-14'

</script>
{#if logos.length > 0}
<div class="overflow-hidden h-20 relative gradient-borders w-full {isOverflowing ? '' : 'flex justify-center'}" bind:clientWidth={containerWidth} style="--track-width: calc(-{trackWidth}px - 5rem);">
    <div class="flex flex-row items-center h-20 gap-20 w-max {isOverflowing  ? 'scroll-animation absolute' : 'pl-0'}">
        <div class="flex flex-row items-center gap-20" bind:clientWidth={trackWidth}>
            {#each logos as logo (logo.name)}
            <a href={logo.url} target="_blank" rel="noopener noreferrer">
                <img src={logo.image} class="{logoSize} object-contain" alt="Logo {logo.name}">
            </a>
            {/each}
        </div>
        {#if isOverflowing}
            <div class="flex items-center flex-row gap-20">
                {#each logos as logo (logo.name)}
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                    <img src={logo.image} class="{logoSize} object-contain" alt="Logo {logo.name}"/>
                </a>
                {/each}
            </div>
        {/if}
    </div>
</div>
{/if}


<style scoped>
    .gradient-borders::after {
        position: absolute;
        pointer-events: none;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(9,9,121,0) 15%, rgba(4,121,195,0) 85%, rgba(255,255,255,1) 100%);
    }

    .scroll-animation {
        animation: scroll 30s linear infinite;
    }

    @keyframes scroll {
        0% {
            transform: translateX(-0%);
        }
        100% {
            transform: translateX(var(--track-width));
        }
    }
</style>