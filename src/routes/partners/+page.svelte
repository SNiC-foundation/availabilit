<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
    import CompanyCard from "./CompanyCard.svelte";
    import TierHeader from "./TierHeader.svelte";
    import LogoNedap from "$lib/images/companies/nedap_color.svg";
    import LogoYer from "$lib/images/companies/yer_color.png";
    import LogoBasetide from "$lib/images/companies/basetide_color.png";
    import LogoChipsoft from "$lib/images/companies/chipsoft_color.svg";
    import LogoING from "$lib/images/companies/ing_color.svg";
    import LogoHarvest from "$lib/images/companies/harvest_color.png";
    import LogoJaneStreet from "$lib/images/companies/janestreet_black.png";
    import {marked} from "marked";
    import type {Company} from "./types";

    const Nedap:Company = {
                name: "Nedap",
                show: true,
                tags: ["Healthcare","Livestock","Retail","Security"],
                shortDescription: marked("# Technology for Life \n At Nedap, we believe in empowering people through technology. Our approach is simple: people first, then technology. As a high-tech company with over 1,000 employees worldwide, we create innovative solutions that change the way people work and live. From hardware and software to research and development, we are driven by a single purpose: to develop Technology for Life— solutions that have a tangible, positive impact on people's professional lives. This people- centered approach ensures that we not only respect the needs of individuals but also our planet."),              
                extendedDescription: marked("Our Create & Scale approach prioritizes organic growth by developing Digital Twin Technology and expanding adoption to meet evolving market demands. Through Technology for Life, we help people and organizations succeed in an ever changing world. \n\n # Be the spark \n With us, you will be part of a team that drives meaningful change. We do not just develop technology; we create solutions that improve people’s daily lives. Whether it is in Healthcare, Livestock, Retail or Security, your work will contribute to solutions that make a real impact in workplaces across the world. You will help people work more eTiciently, securely, and comfortably, empowering them to excel in what they do best and ultimately making their work more fulfilling.\n\n Looking for internships, graduation projects, or exciting career opportunities? Visit our website and learn how you can be part of a company that values innovation, growth, and sustainability."),              
                logo: LogoNedap,
                website: "https://nedap.com/careers/students-at-nedap/"
            }

    const Yer:Company = {
                name: "Yer",
                show: true,
                tags: ["Career coaching","Training","Development"],
                shortDescription: marked("# Starting your career, made simple.\n *\"What do I want to do?\"* *\"Where do I even start?\"* *\"Am I experienced enough?\"* If these questions sound familiar, you're not alone. You don't have to figure it all out by yourself.\n\n At YER, we specialize in helping students and recent grads like you take the first confident steps into the working world. Whether you’re unsure about your direction or just need a bit of guidance, our consultants are here to help you find clarity—and real opportunities."), 
                extendedDescription: marked("**Here’s how we make starting your career simple:**\n\n - **Career coaching**\n Get practical advice, CV and LinkedIn feedback, and a personalized plan to move forward.\n - **Access to 3,000+** opportunities We connect you with real jobs, traineeships and projects at top companies in tech, engineering, finance, public sector and more.\n - **Training & development** Not quite there yet? No problem. We’ll help you build the skills you need to land the role you want—with coaching, mentoring and upskilling. \n - **Work that works for you** Whether you’re looking for a permanent job, a stepping stone or a project-based assignment, we tailor our approach to fit your goals.\n\n Since 1987, we’ve helped thousands of young professionals find their footing and grow into careers they love. Our consultants know the market inside out, and we’re here to guide you from “Where do I begin?” to “This is exactly where I’m meant to be.”\n\n **Let’s make your next move the right one.**"),
                logo: LogoYer,
                website: "https://www.yer.nl/"
    }

    const Harvest:Company = {
                name: "Harvest",
                show: true,
                tags: ["Career coaching","Training","Development"],
                shortDescription: marked("# Harvest – The Launchpad for the Next Generation of Tech Leaders \n Harvest is the premier training program for top technical talent in the IT sector. We support recent graduates with a technical master’s degree in kick-starting their careers. Our unique combination of working, learning, and personal growth ensures that you make an impact from day one at leading organizations, while receiving intensive guidance in both your professional and personal development."),
                extendedDescription: marked("At the heart of our program is quality. We select high potentials with a technical master’s background and train them to become the next generation of Software, Data, and Business Analyst specialists. This is achieved through an intensive masterclass program that emphasizes both technical depth and soft skills. Our trainers are seasoned experts with years of industry experience, and participants receive personal guidance from a coach, a technology officer, and experienced professionals from the field.\n\n What truly sets Harvest apart is our proven approach: 97% of our talents secure a permanent position at the company where they work during the program. Companies choose Harvest for our high standards and the immediate impact our talents deliver. \n\n Harvest is the only post-master program in the Netherlands specifically developed by and for technical graduates in software, data, and business analytics. The program is officially accredited by CPION, giving it the status of a certified post-master’s program—an acknowledgment of its academic level and content quality. \n\n Our location in Driebergen is more than just a workplace; it’s an inspiring environment where talent develops, ideas are born, friendships are formed, and careers take off. Harvest is for ambitious tech talents who want more than just a job—we offer a career with impact."),
                logo: LogoHarvest,
                website: "https://www.harvest.nl/"
    }

    

    const BaseTide:Company = {
                name: "BaseTide",
                show: false,
                tags: ["Engineering","IT","Consultancy"],
                shortDescription: marked("TODO"),
                extendedDescription: marked("TODO"),
                logo: LogoBasetide,
                website: "https://www.basetide.com/"
    }

    const Chipsoft:Company = {
                name: "Chipsoft",
                show: true,
                tags: ["Healthcare","IT"],
                shortDescription: marked("### Do you want to help improve the field of healthcare from behind the scenes? Check out what ChipSoft has to offer. \n As a leading supplier of healthcare IT, ChipSoft equips a large number of Dutch and Belgian healthcare facilities with efficient and innovative software solutions. Integrated solutions within a single system – HiX – enable healthcare professionals to provide the right care at the right time. \n\n"),
                extendedDescription: marked("From ChipSoft's offices in Amsterdam, Antwerp, Heerenveen, and Hoogeveen, passionate developers and IT support consultants with a heart for healthcare work on solutions aimed at reducing the administrative workload for care providers, improving cooperation between healthcare facilities, and promoting patient participation in their own care process. ChipSoft supports large (academic) hospitals, but also general practices, mental healthcare facilities, independent clinics, nursing and residential care homes, and homecare services. \n\n By using HiX as their comprehensive care solution, healthcare facilities of all sizes are well-equipped to meet the care needs of today and tomorrow, in which digital cooperation and data exchange between all parties involved in the care process are more important than ever. \n\n Are you eager to help improve the field of healthcare using smart IT solutions? Get in touch via recruitment@chipsoft.com"),
                logo: LogoChipsoft,
                website: "https://www.chipsoft.nl/"
    }
    const ING:Company = {
                name: "ING",
                show: false,
                tags: ["Finance","IT"],
                shortDescription: marked("TODO"),
                extendedDescription: marked("TODO"),
                logo: LogoING,
                website: "https://www.ing.nl/"
    }

    const JaneStreet:Company = {
                name: "Jane Street",
                show: true,
                tags: ["Finance","Trading","Technology"],
                shortDescription: marked("# Work where your mind matters \n Jane Street is a global trading firm with offices in New York, London, Hong Kong, Singapore, and Amsterdam. Our approach is rooted in technology and rigorous quantitative analysis, but our success is driven by our people. We look for smart people with curious minds from any background, with a passion for critical thinking and creative problem solving."),
                logo: LogoJaneStreet,
                website: "https://www.janestreet.com/join-jane-street/overview/"
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
            Harvest,
            BaseTide
        ],
        bronze: [
            JaneStreet
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
                <CompanyCard company={company}/>
            {/each}
        </div>
        {/if}
      {/each}
  </div>
  