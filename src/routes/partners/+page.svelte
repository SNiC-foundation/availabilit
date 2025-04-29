<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
    import CompanyCard from "./CompanyCard.svelte";
    import TierHeader from "./TierHeader.svelte";
    import LogoNedap from "$lib/images/companies/nedap_color.svg";

    const Nedap = {
                name: "Nedap",
                tags: ["Digital Twin Technology","Healthcare","Livestock","Retail","Security"],
                shortDescription: "At Nedap, we believe in empowering people through technology. Our approach is simple: people first, then technology. As a high-tech company with over 1,000 employees worldwide, we create innovative solutions that change the way people work and live. From hardware and software to research and development, we are driven by a single purpose: to develop Technology for Life— solutions that have a tangible, positive impact on people's professional lives. This people- centered approach ensures that we not only respect the needs of individuals but also our planet. Our Create & Scale approach prioritizes organic growth by developing Digital Twin Technology and expanding adoption to meet evolving market demands. Through Technology for Life, we help people and organizations succeed in an ever changing world.",              
                extendedDescription: "With us, you will be part of a team that drives meaningful change. We do not just develop technology; we create solutions that improve people’s daily lives. Whether it is in Healthcare, Livestock, Retail or Security, your work will contribute to solutions that make a real impact in workplaces across the world. You will help people work more eTiciently, securely, and comfortably, empowering them to excel in what they do best and ultimately making their work more fulfilling. Looking for internships, graduation projects, or exciting career opportunities? Visit our website and learn how you can be part of a company that values innovation, growth, and sustainability.",              
                logo: LogoNedap,
                website: "https://www.nedap.com/en/"
            }

    const companies = {
        platinum: [
            Nedap
        ],
        gold: [
            Nedap,
            Nedap,
            Nedap,
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
      {#each Object.entries(companies) as [tier, tierCompanies]}
      <TierHeader tier={tier}/>
        <div class="flex items-center gap-4 flex-wrap justify-center">
            {#each tierCompanies as company}
            <CompanyCard
                name={company.name}
                image={company.logo}
                description={company.shortDescription}
                extendedDescription={company.extendedDescription}
                tags={company.tags}
                links={[{icon: "fa-solid fa-fw fa-link", url: company.website}]}
                />
        {/each}
        </div>
      {/each}
  </div>
  