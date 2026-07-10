<script lang="ts" setup>
    import Header from "$lib/components/Header.svelte";
    import CompanyCard from "./CompanyCard.svelte";
    import TierHeader from "./TierHeader.svelte";
    import { onMount } from "svelte";
    import type { Company } from "./types";


    let companies: Record<string, Company[]> = {};
    const companiesWithTier = (tier:string,companyList:Company[]) => companyList.filter((company) => company.package == tier)

    async function loadCompanies() {
            const data = [{
        "id": 2,
        "createdAt": "2025-10-28T15:31:17.363Z",
        "updatedAt": "2025-10-28T19:11:42.000Z",
        "version": 4,
        "name": "Nedap",
        "location": "Groenlo, The Netherlands",
        "specialization": "Software Development",
        "shortDescription": null,
        "description": "# Technology for Life\nAt Nedap, we believe in empowering people through technology. Our approach is simple: people first, then technology. As a high-tech company with over 1,000 employees worldwide, we create innovative solutions that change the way people work and live. From hardware and software to research and development, we are driven by a single purpose: to develop Technology for Life— solutions that have a tangible, positive impact on people's professional lives. This people- centered approach ensures that we not only respect the needs of individuals but also our planet.\n\n\nOur Create & Scale approach prioritizes organic growth by developing Digital Twin Technology and expanding adoption to meet evolving market demands. Through Technology for Life, we help people and organizations succeed in an ever changing world.\n\n# Be the spark\nWith us, you will be part of a team that drives meaningful change. We do not just develop technology; we create solutions that improve people’s daily lives. Whether it is in Healthcare, Livestock, Retail or Security, your work will contribute to solutions that make a real impact in workplaces across the world. You will help people work more eTiciently, securely, and comfortably, empowering them to excel in what they do best and ultimately making their work more fulfilling.\n\nLooking for internships, graduation projects, or exciting career opportunities? Visit our website and learn how you can be part of a company that values innovation, growth, and sustainability.",
        "url": "https://nedap.com/",
        "package": "platinum",
        "logoFilename": "partners/b4fd3868-ea6e-47a2-af14-157bbee882a6.svg"
    },
    {
        "id": 3,
        "createdAt": "2025-10-28T15:39:47.666Z",
        "updatedAt": "2025-10-28T15:39:47.000Z",
        "version": 2,
        "name": "Chipsoft",
        "location": "Amsterdam",
        "specialization": "Healthcare",
        "shortDescription": null,
        "description": "## Do you want to help improve the field of healthcare from behind the scenes? Check out what ChipSoft has to offer.\nAs a leading supplier of healthcare IT, ChipSoft equips a large number of Dutch and Belgian healthcare facilities with efficient and innovative software solutions. Integrated solutions within a single system – HiX – enable healthcare professionals to provide the right care at the right time.\n\n\nFrom ChipSoft's offices in Amsterdam, Antwerp, Heerenveen, and Hoogeveen, passionate developers and IT support consultants with a heart for healthcare work on solutions aimed at reducing the administrative workload for care providers, improving cooperation between healthcare facilities, and promoting patient participation in their own care process. ChipSoft supports large (academic) hospitals, but also general practices, mental healthcare facilities, independent clinics, nursing and residential care homes, and homecare services.\n\nBy using HiX as their comprehensive care solution, healthcare facilities of all sizes are well-equipped to meet the care needs of today and tomorrow, in which digital cooperation and data exchange between all parties involved in the care process are more important than ever.\n\nAre you eager to help improve the field of healthcare using smart IT solutions? Get in touch via recruitment@chipsoft.com",
        "url": "https://www.chipsoft.com/nl-NL/",
        "package": "gold",
        "logoFilename": "partners/259e953a-3086-4580-90ae-0fda93d97365.svg"
    },
    {
        "id": 4,
        "createdAt": "2025-10-28T15:45:18.362Z",
        "updatedAt": "2025-10-28T15:45:18.000Z",
        "version": 2,
        "name": "Yer",
        "location": "Amsterdam",
        "specialization": "Secondment, recruitment, and selection",
        "shortDescription": null,
        "description": "# Starting your career, made simple.\n*\"What do I want to do?\" \"Where do I even start?\" \"Am I experienced enough?\"* If these questions sound familiar, you're not alone. You don't have to figure it all out by yourself.\n\nAt YER, we specialize in helping students and recent grads like you take the first confident steps into the working world. Whether you’re unsure about your direction or just need a bit of guidance, our consultants are here to help you find clarity—and real opportunities.\n\n\n**Here’s how we make starting your career simple:**\n\n* **Career coaching** Get practical advice, CV and LinkedIn feedback, and a personalized plan to move forward.\n* **Access to 3,000+ opportunities** We connect you with real jobs, traineeships and projects at top companies in tech, engineering, finance, public sector and more.\n* **Training & development** Not quite there yet? No problem. We’ll help you build the skills you need to land the role you want—with coaching, mentoring and upskilling.\n* **Work that works for you** Whether you’re looking for a permanent job, a stepping stone or a project-based assignment, we tailor our approach to fit your goals.\n\nSince 1987, we’ve helped thousands of young professionals find their footing and grow into careers they love. Our consultants know the market inside out, and we’re here to guide you from “Where do I begin?” to “This is exactly where I’m meant to be.”\n\n**Let’s make your next move the right one.**",
        "url": "https://www.yer.nl/",
        "package": "silver",
        "logoFilename": "partners/409c76dd-3913-4d91-bb37-318289f675cc.png"
    },
    {
        "id": 5,
        "createdAt": "2025-10-28T15:47:37.984Z",
        "updatedAt": "2025-10-28T15:47:38.000Z",
        "version": 2,
        "name": "Harvest",
        "location": "Driebergen-Rijsenburg",
        "specialization": "Career coaching",
        "shortDescription": null,
        "description": "# Harvest – The Launchpad for the Next Generation of Tech Leaders\nHarvest is the premier training program for top technical talent in the IT sector. We support recent graduates with a technical master’s degree in kick-starting their careers. Our unique combination of working, learning, and personal growth ensures that you make an impact from day one at leading organizations, while receiving intensive guidance in both your professional and personal development.\n\n\nAt the heart of our program is quality. We select high potentials with a technical master’s background and train them to become the next generation of Software, Data, and Business Analyst specialists. This is achieved through an intensive masterclass program that emphasizes both technical depth and soft skills. Our trainers are seasoned experts with years of industry experience, and participants receive personal guidance from a coach, a technology officer, and experienced professionals from the field.\n\nWhat truly sets Harvest apart is our proven approach: 97% of our talents secure a permanent position at the company where they work during the program. Companies choose Harvest for our high standards and the immediate impact our talents deliver.\n\nHarvest is the only post-master program in the Netherlands specifically developed by and for technical graduates in software, data, and business analytics. The program is officially accredited by CPION, giving it the status of a certified post-master’s program—an acknowledgment of its academic level and content quality.\n\nOur location in Driebergen is more than just a workplace; it’s an inspiring environment where talent develops, ideas are born, friendships are formed, and careers take off. Harvest is for ambitious tech talents who want more than just a job—we offer a career with impact.",
        "url": "https://harvest.nl/",
        "package": "silver",
        "logoFilename": "partners/a93af993-e4c1-4194-8009-88f4b9fe6e3a.png"
    },
    {
        "id": 6,
        "createdAt": "2025-10-28T15:49:33.105Z",
        "updatedAt": "2025-10-28T15:49:33.000Z",
        "version": 2,
        "name": "Jane Street",
        "location": "Amsterdam",
        "specialization": "Trading",
        "shortDescription": null,
        "description": "Jane Street is a global trading firm with offices in New York, London, Hong Kong, Singapore, and Amsterdam. Our approach is rooted in technology and rigorous quantitative analysis, but our success is driven by our people. We look for smart people with curious minds from any background, with a passion for critical thinking and creative problem solving.",
        "url": "https://www.janestreet.com/join-jane-street/overview/",
        "package": "bronze",
        "logoFilename": "partners/f622cc22-22fc-4191-80ae-6b130850b1b4.png"
    },
    {
        "id": 8,
        "createdAt": "2025-10-29T09:58:56.298Z",
        "updatedAt": "2025-11-19T20:29:34.078Z",
        "version": 2,
        "name": "BaseTide",
        "location": "Hoofddorp",
        "specialization": "Database consultancy",
        "shortDescription": null,
        "description": "BaseTide is a young company of senior database specialists who enjoy working together, sharing knowledge and conveying their enthusiasm for data. BaseTide supports its clients with expertise, projects and operational support across all major database platforms.\r\n\r\nOur services range from quick scans/audits and project support (for example for cloud migrations, performance optimisation and data architecture challenges) to proactive database management, including 24/7 support, retainer-based service packages and SLA-driven management.",
        "url": "https://www.basetide.com/",
        "package": "silver",
        "logoFilename": "partners/af767246-5fda-426f-9cb8-ade7d4affb44.png"
    },
    {
        "id": 9,
        "createdAt": "2025-10-29T10:03:09.563Z",
        "updatedAt": "2025-11-20T16:34:50.761Z",
        "version": 2,
        "name": "ING",
        "location": "Amsterdam",
        "specialization": "Banking",
        "shortDescription": null,
        "description": "International, innovative, sustainable and… orange!\r\n\r\nThat’s right, we’re talking about ING. The leading Dutch bank for digital banking.\r\n\r\nYou’ll know us through our mobile banking app that lets you carry out all your bank transactions yourself. Tech is the beating heart of ING\r\nwhere you deal with every aspect of the bank. For example, cyber security, software, or data engineering. This is the groundwork for many of our innovations. \r\n\r\nWe help our customers to stay one step ahead, in both their private and professional lives. The same goes for our own people, of course. Their wellbeing is our top priority. We make sure everyone can feel good about themselves and maintain a good work-life balance.\r\n\r\nWe’re an international bank operating in more than 40 countries. We work on a global scale, for tens of millions of customers.",
        "url": "https://careers.ing.com/en",
        "package": "gold",
        "logoFilename": "partners/6ae40461-9bbd-470e-bc96-b94943a34c61.svg"
    },
    {
        "id": 10,
        "createdAt": "2025-11-14T14:38:39.055Z",
        "updatedAt": "2025-11-14T14:38:39.000Z",
        "version": 2,
        "name": "Rabobank",
        "location": "Utrecht",
        "specialization": "Banking",
        "shortDescription": null,
        "description": "# Work on your own development & shape the world around you\nRabobank is an international, cooperative bank with Dutch origins. For more than 125 years, collaboration has been at the heart of everything we do. Today, we employ more than 49,000 colleagues in 35 countries. Our guiding principle is that together, we accomplish far more than we ever could individually.\n\n## Rabobank & IT; a bigger world than you think\nWith almost 10.000 employees working within our IT domain our tech department might be bigger than you initially think. In our bank IT is everywhere, from working on our online banking solutions, to helping our clients with satellite images and reducing IT’s global footprint. Join our colleagues to hear about how Rabo works on accessibility for everyone and why this is more challenging than you think.",
        "url": "https://rabobank.jobs/nl/",
        "package": "gold",
        "logoFilename": "partners/0d79a438-2c20-4f55-a063-62db2c456492.svg"
    },
    {
        "id": 11,
        "createdAt": "2025-11-18T09:23:17.370Z",
        "updatedAt": "2025-11-18T09:23:17.000Z",
        "version": 2,
        "name": "AIVD",
        "location": "Amsterdam",
        "specialization": "Nationale veiligheid",
        "shortDescription": null,
        "description": "De AIVD werkt met ruim 2.000 medewerkers aan de veiligheid van Nederland, door alert te zijn op risico's en gevaren. Uniek werk dat ons een grote verantwoordelijkheid en een sterke motivatie geeft om te voorkomen dat staten, organisaties of personen onze rechtsstaat tegenwerken, ondergraven of aanvallen.\n\nDe AIVD is er voor de veiligheid van alle Nederlanders. Hier werk je elke dag in hechte teams aan onderzoeken die erop zijn gericht dreigingen voor de nationale veiligheid te erkennen - en te duiden. Of je maakt deel uit van een andere unit of algemene afdeling, zoals juridische zaken, HR of unit ICT, en ondersteunt op die manier de organisatie in de uitvoering van haar taken.\n\nWelke baan je ook hebt bij de AIVD: in alle gevallen lever je vanuit jouw expertise een betekenisvolle bijdrage aan de bescherming van de Nederlandse democratische rechtsorde.\n\n_To be eligible to work at the AIVD, you need to have Dutch citizenship and excellent command of the Dutch language._",
        "url": "https://www.aivd.nl/onderwerpen/werken-bij-de-aivd",
        "package": "silver",
        "logoFilename": "partners/01691b41-3975-4b4e-8df5-fd0fe00b1247.svg"
    }
]
            const companyList: Company[] = data.map((company) => ({
                id: company.id,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt,
                name: company.name,
                location: company.location,
                specialization: company.specialization,
                description: company.description,
                package: company.package as Company["package"],
                logoFilename: company.logoFilename,
                url: company.url,
                show: true,
            }));

            companies = {
                platinum:  companiesWithTier('platinum', companyList),
                gold: companiesWithTier('gold', companyList),
                silver: companiesWithTier('silver', companyList),
                bronze: companiesWithTier('bronze', companyList),
            }
    }

    onMount(() => {
        void loadCompanies();
    });
  </script>
  <Header title="Partners"/>
  <div id="partners_section" class="container flex-col p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#each Object.entries(companies) as [tier, tierCompanies]}
    {#if tierCompanies.length > 0}
      <TierHeader tier={tier}/>
        <div class="flex items-center gap-4 flex-wrap justify-center">
            {#each tierCompanies as company}
                <CompanyCard company={company}/>
            {/each}
        </div>
        {/if}
      {/each}
  </div>
  