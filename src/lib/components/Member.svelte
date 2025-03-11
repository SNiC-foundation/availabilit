<script lang="ts">
    export let member: {name: string, functions: string[], linkedin: string, email: string};

</script>


<div id="member" class="memberContainer">
    <div id="picture" class="w-fill h-44 overflow-hidden shrink-0 round-bottom">
        <img src={member.picture} alt="Picture of {member.name}" class="w-fill"/>
    </div>
    <div id="info" class="text-wrap text-center text-blue-whale h-full p-2">
        <h3 class="font-semibold">{member.name}</h3>
        <div id="functions" class="flex flex-col justify-center">
            <p class="text-lg">
        {#each member.functions as memberFunction, memberFunctionIndex}
            {memberFunction}
            {#if memberFunctionIndex !== member.functions.length - 1}
                &
            {/if}
        {/each}
    </p>
        </div>  
    </div>
    <div id="member_socials" class="flex flex-row gap-4 justify-center items-center w-full pb-2">
        <a href="{member.linkedin}">
            <i class="fa-brands fa-fw text-xl fa-linkedin text-blue-whale hover:text-aquamarine"/>
        </a>
        <a href="mailto:{member.email}">
            <i id="mail" class="fa-solid fa-fw fa-envelope text-blue-whale hover:text-aquamarine " />
        </a>
    </div>

</div>

<style scoped>
.round-bottom {
    border-bottom-left-radius: 100% 20%;
    border-bottom-right-radius: 100% 20%;
}
</style>