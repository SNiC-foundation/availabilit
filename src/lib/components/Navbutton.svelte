<script lang="ts">
    export let text:string;
    export let section:string;

    function handleClick (event:any) {
		event.preventDefault()
		const link = event.currentTarget
		const anchorId = new URL(link.href).hash.replace('#', '')
		const anchor = document.getElementById(anchorId)
		window.scrollTo({
			top: anchor ? anchor.offsetTop - 64 : 0,
			behavior: 'smooth'
		})
	}
</script>

<a href="{section}" class="group relative text-white no-underline px-4 py-2 rounded-lg overflow-hidden hover:shadow-md" on:click={handleClick}>
    <span class="relative z-10 group-hover:text-aquamarine">{text}</span>
    <div id="background" class="absolute w-[200%] h-[200%] px-4 py-2 left-1/2 top-1/2 bg-black/5 scale-0 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all rounded-full duration-300"/>
</a>