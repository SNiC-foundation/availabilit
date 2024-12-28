<script lang="ts">
    import picture from "$lib/images/IMG_8972.jpg"

    export let member: {name: string, functions: string[]};

</script>


<div id="member" class="memberContainer">
    <div id="picture">
        <img src={picture} alt="Picture of {member.name}" />
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