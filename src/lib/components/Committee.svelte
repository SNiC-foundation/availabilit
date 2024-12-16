<script lang="ts">
    import committeePicture from "$lib/images/committeePicture.png";
    import Member from "$lib/components/Member.svelte";
    import { base } from "$app/paths";

    const members = [
        {name: "Matthias Wentink", functions: ["Chairman", "Public Relations"]},
        {name: "Dilan van Oosten", functions: ["Commissioner of Logistics"]},
        {name: "Danil Aliforenko", functions: ["Treasurer"]},
        {name: "Arda Koç", functions: ["Commissioner of External Affairs"]},
        {name: "Mariska Frelier", functions: ["Commissioner of External Affairs"]},
        {name: "Bram Rutgers", functions: ["Commissioner of Speakers"]},
        {name: "Hayel Akel", functions: ["Commissioner of Speakers"]},
        {name: "Anne van Esch", functions: ["Association Board Representative"]},
        {name: "Jarek Wiedemeijer", functions: ["Association Board Representative"]},
    ];
</script>

<div id="committee_section" class="p-8 max-w-full">
    <div id="title" class="flex flex-col gap-3 items-center mb-5 md:ml-24 md:items-start">
        <h1 class="sectionTitle">Committee</h1>
        <p>This is the SNiC Committee 2025; <a href="{base}/" class="text-blue-whale"><i>AvailabilIT</i></a></p>
    </div>
    <div id="committee_picture">
        <img src={committeePicture} alt=""/>
        <p id="altText" class="pl-2 pt-1 text-xs md:text-[1rem]"><i>f.l.t.r</i> : {members[6].name}, {members[4].name}, {members[2].name}
            , {members[0].name}, {members[1].name},
            {members[3].name}, {members[5].name}</p>
    </div>


    <div id="members" class="container flex flex-col">
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