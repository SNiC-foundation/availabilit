<script lang="ts">
    import Member from "$lib/components/Member.svelte";

    import Matthias from "$lib/images/committeeMembers/Matthias.png";
    import Dilan from "$lib/images/committeeMembers/Dilan.png";
    import Danil from "$lib/images/committeeMembers/Danil.png";
    import Arda from "$lib/images/committeeMembers/Arda.jpeg";
    import Mariska from "$lib/images/committeeMembers/Mariska.png";
    import Bram from "$lib/images/committeeMembers/Bram.png";
    import Hayel from "$lib/images/committeeMembers/Hayel.png";

    const members = [
        {name: "Matthias Wentink", functions: ["Chairman", "PR"], linkedin: "https://www.linkedin.com/in/matthias-wentink/", email: "chairman@availabilit.snic.nl", picture: Matthias},
        {name: "Danil Aliforenko", functions: ["Treasurer"], linkedin: "https://www.linkedin.com/in/danil-aliforenko-8a9187317/", email: "treasurer@availabilit.snic.nl", picture: Danil},
        {name: "Dilan van Oosten", functions: ["Logistics"], linkedin: "https://www.linkedin.com/in/dilanvanoosten/", email: "logistics@availabilit.snic.nl", picture: Dilan},
        {name: "Arda Koç", functions: ["External Affairs"], linkedin: "https://www.linkedin.com/in/ardakocm/", email: "arda@availabilit.snic.nl", picture: Arda},
        {name: "Mariska Frelier", functions: ["External Affairs"], linkedin: "https://www.linkedin.com/in/mariska-frelier/", email: "mariska@availabilit.snic.nl", picture: Mariska},
        {name: "Bram Rutgers", functions: ["Speakers"],linkedin: "https://www.linkedin.com/in/bram-rutgers-81b318203/", email: "bram@availabilit.snic.nl", picture: Bram},
        {name: "Hayel Akel", functions: ["Speakers"], linkedin: "https://www.linkedin.com/in/hayel-akel-a10175233/", email: "hayel@availabilit.snic.nl", picture: Hayel},
        // {name: "Anne van Esch", functions: ["Association Board Representative"], linkedin: "https://www.linkedin.com/in/anne-van-eschaa/", email: "board@inter-actief.net"},
        // {name: "Jarek Wiedemeijer", functions: ["Association Board Representative"], linkedin: "https://www.linkedin.com/company/i.c.t.s.v.-inter-actief/", email: "board@inter-actief.net"},
    ];
</script>

<div id="committee_section" class="p-8 max-w-full">
    <h1 class="sectionTitle text-center mb-8">Committee</h1>

    <div id="members" class="container flex flex-col flex-wrap gap-4 sm:flex-row lg:gap-12 justify-center">
        {#each members as member}
            <Member member={member}/>
        {/each}
    </div>
</div>