<script lang="ts">
    import picture from "$lib/images//committeeMembers/IMG_8972_rectangle.jpg"

    export let member: {name: string, functions: string[]};

</script>


<div id="member" class="memberContainer">
    <div id="picture">
        <img src={picture} alt="Picture of {member.name}" class="rounded-full h-[35vh]"/>
    </div>
    <div id="info" class="text-wrap text-center text-blue-whale">
        <h3 class="font-bold">{member.name}</h3>
        <div id="functions" class="h-[10vh] flex flex-col justify-center">
        {#if member.functions.length > 1}
            <h3><i>{member.functions[0]} & <br> {member.functions[1]}</i></h3>
        {:else}
            <h3><i>{member.functions[0]}</i></h3>
        {/if}
        </div>  
    </div>
    <div id="member_socials" class="flex flex-row justify-around w-1/2">
        <a href="https://www.linkedin.com/in/dilanvanoosten/">
            <i class="fa-brands text-xl fa-linkedin text-blue-whale hover:text-aquamarine"/>
        </a>
        <a href="mailto:logistics@avaulabilit.snic.nl">
            <i class="fa-solid fa-at text-blue-whale hover:text-aquamarine" />
        </a>
    </div>

</div>