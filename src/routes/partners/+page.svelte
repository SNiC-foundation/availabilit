<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
    import CompanyCard from "./CompanyCard.svelte";
    import TierHeader from "./TierHeader.svelte";
    import LogoNedap from "$lib/images/companies/nedap_color.svg";
    import LogoYer from "$lib/images/companies/yer_color.png";
    import LogoBasetide from "$lib/images/companies/basetide_color.png";
    import LogoChipsoft from "$lib/images/companies/chipsoft_color.svg";
    import LogoING from "$lib/images/companies/ing_color.svg";
    import {marked} from "marked";

    const Nedap = {
                name: "Nedap",
                show: true,
                tags: ["Healthcare","Livestock","Retail","Security"],
                shortDescription: marked("# Technology for Life \n At Nedap, we believe in empowering people through technology. Our approach is simple: people first, then technology. As a high-tech company with over 1,000 employees worldwide, we create innovative solutions that change the way people work and live.\n\n From hardware and software to research and development, we are driven by a single purpose: to develop Technology for Life— solutions that have a tangible, positive impact on people's professional lives. This people- centered approach ensures that we not only respect the needs of individuals but also our planet. \n\n Our Create & Scale approach prioritizes organic growth by developing Digital Twin Technology and expanding adoption to meet evolving market demands. Through Technology for Life, we help people and organizations succeed in an ever changing world."),              
                extendedDescription: marked("# Be the spark \n With us, you will be part of a team that drives meaningful change. We do not just develop technology; we create solutions that improve people’s daily lives. Whether it is in Healthcare, Livestock, Retail or Security, your work will contribute to solutions that make a real impact in workplaces across the world. You will help people work more eTiciently, securely, and comfortably, empowering them to excel in what they do best and ultimately making their work more fulfilling.\n\n Looking for internships, graduation projects, or exciting career opportunities? Visit our website and learn how you can be part of a company that values innovation, growth, and sustainability."),              
                logo: LogoNedap,
                website: "https://nedap.com/careers/students-at-nedap/"
            }

    const Yer = {
                name: "Yer",
                show: false,
                tags: ["Career coaching","Training","Development"],
                shortDescription: marked("# Starting your career, made simple.\n *\"What do I want to do?\"* *\"Where do I even start?\"* *\"Am I experienced enough?\"* If these questions sound familiar, you're not alone. You don't have to figure it all out by yourself.\n\n At YER, we specialize in helping students and recent grads like you take the first confident steps into the working world. Whether you’re unsure about your direction or just need a bit of guidance, our consultants are here to help you find clarity—and real opportunities."), 
                extendedDescription: marked("**Here’s how we make starting your career simple:**\n\n - **Career coaching**\n Get practical advice, CV and LinkedIn feedback, and a personalized plan to move forward.\n - **Access to 3,000+** opportunities We connect you with real jobs, traineeships and projects at top companies in tech, engineering, finance, public sector and more.\n - **Training & development** Not quite there yet? No problem. We’ll help you build the skills you need to land the role you want—with coaching, mentoring and upskilling. \n - **Work that works for you** Whether you’re looking for a permanent job, a stepping stone or a project-based assignment, we tailor our approach to fit your goals.\n\n Since 1987, we’ve helped thousands of young professionals find their footing and grow into careers they love. Our consultants know the market inside out, and we’re here to guide you from “Where do I begin?” to “This is exactly where I’m meant to be.”\n\n **Let’s make your next move the right one.**"),
                logo: LogoYer,
                website: "https://www.yer.nl/"
    }

    const BaseTide = {
                name: "BaseTide",
                show: false,
                tags: ["Engineering","IT","Consultancy"],
                shortDescription: marked("TODO"),
                extendedDescription: marked("TODO"),
                logo: LogoBasetide,
                website: "https://www.basetide.com/"
    }

    const Chipsoft = {
                name: "Chipsoft",
                show: true,
                tags: ["Healthcare","IT"],
                shortDescription: marked("### Do you want to help improve the field of healthcare from behind the scenes? Check out what ChipSoft has to offer. \n As a leading supplier of healthcare IT, ChipSoft equips a large number of Dutch and Belgian healthcare facilities with efficient and innovative software solutions. Integrated solutions within a single system – HiX – enable healthcare professionals to provide the right care at the right time. \n\n"),
                extendedDescription: marked("From ChipSoft's offices in Amsterdam, Antwerp, Heerenveen, and Hoogeveen, passionate developers and IT support consultants with a heart for healthcare work on solutions aimed at reducing the administrative workload for care providers, improving cooperation between healthcare facilities, and promoting patient participation in their own care process. ChipSoft supports large (academic) hospitals, but also general practices, mental healthcare facilities, independent clinics, nursing and residential care homes, and homecare services. \n\n By using HiX as their comprehensive care solution, healthcare facilities of all sizes are well-equipped to meet the care needs of today and tomorrow, in which digital cooperation and data exchange between all parties involved in the care process are more important than ever. \n\n Are you eager to help improve the field of healthcare using smart IT solutions? Get in touch via recruitment@chipsoft.com"),
                logo: LogoChipsoft,
                website: "https://www.chipsoft.nl/"
    }
    const ING = {
                name: "ING",
                show: false,
                tags: ["Finance","IT"],
                shortDescription: marked("TODO"),
                extendedDescription: marked("TODO"),
                logo: LogoING,
                website: "https://www.ing.nl/"
    }

    const companies = {
        platinum: [
            Nedap
        ],
        gold: [
            Chipsoft,
            ING
        ],
        silver: [
            Yer,
            BaseTide
        ],
        bronze: [

        ]
    }
  </script>
  <Header title="Partners"/>
  <div id="partners_section" class="container flex-col p-8 gap-4 text-center md:text-left min-h-[100vh]">
      {#each Object.entries(companies) as [tier, tierCompanies]}
      {#if tierCompanies.filter(x => x.show).length > 0}
      <TierHeader tier={tier}/>
        <div class="flex items-center gap-4 flex-wrap justify-center">
            {#each tierCompanies as company}
            {#if company.show}
            <CompanyCard
                name={company.name}
                image={company.logo}
                description={company.shortDescription}
                extendedDescription={company.extendedDescription}
                tags={company.tags}
                links={[{icon: "fa-solid fa-fw fa-link", url: company.website}]}
                />
            {/if}
        {/each}
        </div>
        {/if}
      {/each}
  </div>
  