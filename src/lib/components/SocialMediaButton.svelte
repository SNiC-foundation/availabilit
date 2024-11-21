<script lang="ts">
    export let link:string;
    export let icon:string;
</script>

<a href={link}>
    <i class="fa-brands text-xl fa-{icon} text-white hover:text-aquamarine"/>
</a>