<script lang="ts">
    const members = [
        {name: "Matthias Wentink", functions: ["Chairman", "Public Relations"]},
        {name: "Dilan van Oosten", functions: ["Commissioner of Logistics"]},
        {name: "Danil Aliforenko", functions: ["Treasurer"]},
        {name: "Arda Koç", functions: ["Commissioner of External Affairs"]},
        {name: "Mariska Frelier", functions: ["Commissioner of External Affairs"]},
        {name: "Bram Rutgers", functions: ["Commissioner of Speakers"]},
        {name: "Hayel Akel", functions: ["Commissioner of Speakers"]},
        {name: "Anne van Esch", functions: ["Association Board Responsible"]},
        {name: "Jarek Wiedemeijer", functions: ["Association Board Responsible"]},
    ];
</script>

<div id="committee_section">
    <h1 class="sectionTitle">Committee</h1>

    <div id="committee_picture"></div>

    <div id="members_pictures" class="container">
        {#each members as member}
            <div class="member">
                <div class="member_picture"></div>
                <div class="member_info">
                    <h2>{member.name}</h2>
                    <ul>
                        {#each member.functions as fun}
                            <li>{fun}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        {/each}

    </div>
</div>