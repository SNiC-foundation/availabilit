<script lang="ts">
    import committeePicture from "$lib/images/committeePicture.png";
    import Member from "$lib/components/Member.svelte";
    import { base } from "$app/paths";

    const members = [
        {name: "Matthias Wentink", functions: ["Chairman", "Public Relations"], linkedin: "https://www.linkedin.com/in/matthias-wentink/", email: "chairman@availabilit.snic.nl"},
        {name: "Dilan van Oosten", functions: ["Commissioner of Logistics"], linkedin: "https://www.linkedin.com/in/dilanvanoosten/", email: "logistics@availabilit.snic.nl"},
        {name: "Danil Aliforenko", functions: ["Treasurer"], linkedin: "https://www.linkedin.com/in/danil-aliforenko-8a9187317/", email: "treasurer@availabilit.snic.nl"},
        {name: "Arda Koç", functions: ["Commissioner of External Affairs"], linkedin: "https://www.linkedin.com/in/ardakocm/", email: "arda@availabilit.snic.nl"},
        {name: "Mariska Frelier", functions: ["Commissioner of External Affairs"], linkedin: "https://www.linkedin.com/in/mariska-frelier/", email: "mariska@availabilit.snic.nl"},
        {name: "Bram Rutgers", functions: ["Commissioner of Speakers"],linkedin: "https://www.linkedin.com/in/bram-rutgers-81b318203/", email: "bram@availabilit.snic.nl"},
        {name: "Hayel Akel", functions: ["Commissioner of Speakers"], linkedin: "https://www.linkedin.com/in/hayel-akel-a10175233/", email: "hayel@availabilit.snic.nl"},
        {name: "Anne van Esch", functions: ["Association Board Representative"], linkedin: "https://www.linkedin.com/in/anne-van-eschaa/", email: "board@inter-actief.net"},
        {name: "Jarek Wiedemeijer", functions: ["Association Board Representative"], linkedin: "https://www.linkedin.com/company/i.c.t.s.v.-inter-actief/", email: "board@inter-actief.net"},
    ];
</script>

<div id="committee_section" class="p-8 max-w-full">
    <div id="title" class="flex flex-col items-center mb-5 md:ml-24 md:items-start">
        <h1 class="sectionTitle">Committee</h1>
        <p>This is the SNiC Committee 2025; <a href="{base}/" class="text-blue-whale"><i>AvailabilIT</i></a></p>
    </div>
    <div id="committee_picture">
        <img src={committeePicture} alt=""/>
        <p id="altText" class="pl-2 pt-1 text-xs md:text-[1rem]"><i>f.l.t.r</i> : {members[6].name}, {members[4].name}, {members[2].name}
            , {members[0].name}, {members[1].name},
            {members[3].name}, {members[5].name}</p>
    </div>


    <div id="members" class="container flex flex-col mt-16 lg:mt-28">
        <div id="member_row_one" class="memberRow">
            {#each members.slice(0, 3) as member}
                <Member member={member}/>
            {/each}
        </div>
        <div id="member_row_two" class="memberRow">
            {#each members.slice(3, 7) as member}
                <Member member={member}/>
            {/each}
        </div>
        <div id="member_row_three" class="memberRow">
            {#each members.slice(7) as member}
                <Member member={member}/>
            {/each}
        </div>

    </div>
</div>