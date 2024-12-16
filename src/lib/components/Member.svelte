<script lang="ts">
    export let member: {name: string, functions: string[]};
</script>


<div id="member" class="memberContainer">
    <div id="picture">

    </div>
    <div id="info" class="text-wrap text-center text-blue-whale">
        <h3 class="font-bold">{member.name}</h3>
        {#if member.functions.length > 1}
            <h3><i>{member.functions[0]} & <br> {member.functions[1]}</i></h3>
        {:else}
            <h3><i>{member.functions[0]}</i></h3>
        {/if}
    </div>
    <div id="socials">

    </div>

</div>