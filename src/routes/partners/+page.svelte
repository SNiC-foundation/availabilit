<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
  import TierHeader from "./TierHeader.svelte";

    const companies = {
        platinum: [
            {
                name: "Nedap",
                tags: [],
                shortDescription: "Nedap is a technology company that develops innovative solutions for various industries, including healthcare, retail, and security. They focus on creating smart technology that improves the quality of life and enhances business operations.",
                longDescription: "Nedap is a technology company that develops innovative solutions for various industries, including healthcare, retail, and security. They focus on creating smart technology that improves the quality of life and enhances business operations. Nedap's products include access control systems, inventory management solutions, and healthcare technology that enables better patient care.",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Nedap_logo.svg/2560px-Nedap_logo.svg.png",
                website: "https://www.nedap.com/en/"
            }
        ],
        gold: [

        ],
        silver: [

        ],
        bronze: [

        ]
    }
  </script>
  <Header title="Partners"/>
  <div id="partners_section" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
      We will display our partners here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!
      {#each Object.keys(companies) as tier}
      <TierHeader tier={tier}/>
      {/each}
  </div>
  