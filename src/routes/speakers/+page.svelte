<script>
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { staticUrl } from "$lib/config";

  const speakers = [
    {
      id: 10,
      name: "André Foeken",
      title: "The work we do",
      type: "keynote",
      imageFilename: "2984f780-470c-4114-bb1d-35523659ed43.jpeg",
      description: "Whether you’re thinking of building your own company, joining an existing one, or forging your own unique path, the key question remains: **how do you stand out?** This talk invites you to:\n\ncarve out your own space — within companies, across your career, and beyond borders — to dream big and move fast, reflect on Europe’s place in the global tech scene and how we can shift the momentum, and explore the evolving role of AI and software development in shaping the future. You’ll leave with a sharper sense of how to navigate your career in a world that doesn’t stand still — and how bold ideas, when acted on, can lead to real change.",
      tags: [],
      links: [],
    },
    {
      id: 11,
      name: "CERN",
      title: "We Tried Open-Source For 20 Years; Here’s What Happened",
      type: "keynote",
      imageFilename: "4a821077-7ddf-4c77-9231-25d0170d974c.png",
      description: "Pedro is the Head of conferencing technologies at CERN, and Ajob is a software engineer for the Indico team at CERN.\n\n\nThey will talk about the challenges and benefits of running an open-source project for a long time. This includes topics like their collaborations with organizations like the UN, struggles with funding, the returned benefits and more. Essentially, the good, the bad and the ugly of open source projects. CERN, is best known as the place where the web was invented and where the world’s largest particle accelerator, the Large Hadron Collider, pushes the boundaries of physics.\n\nBeyond groundbreaking science, CERN is also a pioneer in technology and open collaboration. From distributed computing to open-source software used by thousands of researchers and institutions worldwide, CERN shows how technology created for science can ripple far beyond the lab.",
      tags: [],
      links: [],
    },
    {
      id: 12,
      name: "Polylog",
      title: "99% certainty is easy, 100% is hard",
      type: "talk",
      imageFilename: "edc57903-f273-469c-a2cd-31a183c02d9b.jpeg",
      description: "Polylog is a Youtube channel with 100K+ subscribers where they do deep dives into all kinds of topics in computer science, with an emphasis on algorithms.\n\n\nWhen designing algorithms, a lot of problems become much easier to solve (or even become possible to solve at all) if you give your algorithm access to randomness. This is counterintuitive: why should tossing a coin be helpful in a fundamental way? Starting from examples like quick sort, file checksums, and checking if equations hold, Polylog will build up an understanding of randomness, how it can help us fool the evil worst-case adversary, and where even coin flips can’t save us.\n\nIn the second half of the talk, they will discuss the behind-the-scenes aspect of making science education videos. What’s the process? What’s hard about it? How are animations made? How to get started?",
      tags: [],
      links: [],
    },
    {
      id: 13,
      name: "Ruben and Jeroen",
      title: "Leveraging data and tooling for intelligence and investigation",
      type: "talk",
      imageFilename: "ee98cd3a-f438-422c-85a7-769170d97de3.png",
      description: "Two data scientists from the AMLC will present the process from intelligence to investigation using in-house tools and open-source technology.\n\n\nThey will show how their tools, the AMLC suite, supports this process and makes crucial data available within their organization.\n\nAt AMLC we contribute to FIOD’s intel position on money laundering and we support in developing leads into criminal investigations. This is a combined effort of our data scientists, using latest tools and technology, analysts and anti-money laundering experts.\n\nWe also research the latest innovations in the areas of Artificial Intelligence and Machine learning and how these technologies can help our data.",
      tags: [],
      links: [],
    },
    {
      id: 14,
      name: "Jeroen Wijenbergh",
      title: "Securing Europe's Digital Backbone for Research and Education",
      type: "talk",
      imageFilename: "fc5a54b6-8ddc-4ebe-9b0b-3cde4dc0c159.jpeg",
      description: "GÉANT is an organization that collaborates with different National Research and Education Networks (NRENs) in Europe and beyond.\n\nTogether with these NRENs, they deliver a network for the research and education sector and provide various products and services. This presentation focuses on the services they provide to improve the network's security and maintain its availability.\n\nJeroen is a software developer in the Security: Products & Services team at GÉANT. This team develops security products internally and for the community. He works mainly on following projects: eduVPN, eduroam, Firewall on Demand and NeMo (anti DDoS).",
      tags: [],
      links: [],
    },
    {
      id: 15,
      name: "Ian and William",
      title: "Neurodiversity, teachers and schooling",
      type: "talk",
      imageFilename: "044f80eb-1a50-46c3-a80d-3ccdbb9c1624.png",
      description: "Overcoming the shortfalls in enabling successful partnership with the computing industry \n\nIan is an education consultant with Embecosm Ltd working with William on all matters related to how schools are learning to improve the opportunities that enable young people to engage with employment in the computing world. \n\nWilliam is the Head of AI at Embecosm, leading efforts in developing both AI tool chains as well as general AI technology. Working collaboratively with Ian, William is also responsible for Embecosms efforts to help schools and young people to engage with employment in the technology sector, and exploring how AI can play a beneficial role for schools.",
      tags: [],
      links: [],
    },
    {
      id: 17,
      name: "Aleksas and Tom",
      title: "Accessibility at Scale: Lessons from Rabobank's Design System",
      type: "talk",
      imageFilename: "bc35cb75-3f71-4a68-b039-d47f18fdd963.png",
      description: "What does it really mean to make digital products accessible, and how do you ensure accessibility when your organization runs a vast ecosystem of applications?\n\nIn this talk, Aleksas and Tom will give a crash course in digital accessibility, explaining what it is, why it matters, and how Rabobank puts it into practice.\n\nCreating one simple button might seem easy, but designing it to meet the needs of a diverse audience introduces new challenges, especially at scale. Aleksas and Tom will share how Rabobank’s Design System team and Accessibility team work together to address these challenges, build inclusive interfaces, and maintain accessibility across their digital infrastructure. Expect real-world examples and practical insights.\n\nAleksas is a Design System Engineer & Accessibility Advocate at Rabobank with a passion for building inclusive products from the component level up.\n\nTom is a Digital Accessibility Subject Matter Expert at Rabobank, empowering teams to create inclusive digital experiences through guidance, community building, and knowledge sharing.",
      tags: [],
      links: [],
    },
    {
      id: 18,
      name: "Stijn and Victoria",
      title: "Attacker vs. Defender — the full story behind modern cyberattacks",
      type: "talk",
      imageFilename: "bedb6b10-e3ce-4d5b-a2af-61c616c69f7e.png",
      description: "In this talk, Victoria from ING’s Security Defence Centre and Stijn from the Red Team take you behind the scenes of how large organizations defend themselves against real cyber threats. Together they’ll walk through the main stages of a modern cyberattack and show how attackers and defenders see the same incident from completely different perspectives.",
      tags: [],
      links: [],
    },
    {
      id: 19,
      name: "Glenn ten Cate",
      title: "Code quality & strategies and how they impact availability",
      type: "talk",
      imageFilename: "634b650a-8bfe-4a9d-81fa-551582a2b869.jpeg",
      description: "When working on a project, time and resources are always limited. This means you’ll have to make choices. Glenn will discuss the decisions developers face in such situations and how these choices affect the availability and reliability of software systems.\n\nGlenn has been passionate about cybersecurity since childhood. Together with his brother, he created the OWASP Security Knowledge Framework, an open-source Python-Flask web application to train developers in writing secure code by design. He also served on the OWASP board of directors. Over the years, Glenn has gained extensive experience in cybersecurity within the banking sector. Today, he works as a Senior Cybersecurity Instructor at the Linux Foundation.",
      tags: [],
      links: [],
    },
    {
      id: 20,
      name: "Willem Pino",
      title: "How SaaS Empowers the Next Generation of Businesses",
      type: "talk",
      imageFilename: "6da2aa3c-49cd-4666-8a86-b110416644e1.png",
      description: "From clunky payment systems to seamless checkout, fintech has come a long way. Yet payments are still far from solved. Beneath the surface lie deep structural challenges, fragmented infrastructure, limited transparency, and systems that continue to favor large corporations.  In this talk, Willem Pino, founding engineer at Rootline, previous experience at Adyen, shares his journey from building financial systems at leading fintechs to creating a platform designed to solve these complex problems and make financial technology accessible to everyone, not just Big Tech.  He will explore how Software-as-a-Service (SaaS) architectures are enabling startups and platforms to take back control, embed payments directly into their products, and unlock a new wave of open, democratized financial innovation.",
      tags: [],
      links: [],
    },
    {
      id: 21,
      name: "Roxie Muller",
      title: "Nedap Business case: How AI Is Transforming Farming",
      type: "talk",
      imageFilename: "d86d695b-77e4-496b-b828-8b946eba9324.png",
      description: "What happens when you bring revolutionary high-tech innovation into the world of farming?\n\nAt Nedap Livestock, we use sensors and data to help farmers gain truly relevant, actionable insights into their animals and transform the barn into a connected ecosystem.\n\nDuring this business case, Roxie Muller, Head of Expansion at Nedap Livestock, will demonstrate how technology is transforming the industry and how ever-increasing AI capabilities can reshape professional livestock farming. These innovations help meet global demands while addressing labor shortages and raising the standard of animal well-being.\n\nExpect an inspiring and interactive session where the current and future state of technology will be discussed. Participate in a conversation about how cows and technology can interact to shape the next generation of agritech innovation.\n\nCurious? Sign up for this business case and join the conversation at SNiC 2025!",
      tags: [],
      links: [],
    },
    {
      id: 22,
      name: "Matthijs and Tom",
      title: "How MPC makes insights available, without sharing sensitive data",
      type: "talk",
      imageFilename: "d86a9986-91c0-41b7-8e9e-93af24fa2e89.png",
      description: "Matthijs and Tom from Roseman Labs will introduce the audience to the world of Multi-Party Computation (MPC), explaining in broad terms how this groundbreaking technology enables data collaboration without compromising privacy.\r\n\r\nThey will then highlight two real-world applications that demonstrate the power of MPC in practice. The first use case comes from the City of Rotterdam, where MPC made it possible to perform privacy-friendly data analyses — an achievement that earned the city the 2024 Privacy Award.\r\n\r\nThe second example focuses on how the Dutch National Cyber Security Centre (NCSC) leverages Roseman Labs’ MPC software to protect sensitive data in the ever-evolving cybersecurity landscape.\r\n\r\nTo conclude, Roseman Labs will dive deeper into the technology running behind their software, and how they deploy it in a secure and resilient way.",
      tags: [],
      links: [],
    },
  ];
</script>
<Header title="Speakers"/>
<div id="speakers_section" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if speakers.length === 0}
        <p>We will display our speakers here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!</p>
    {:else}
        <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
            {#each speakers as speaker, index}
                <SpeakerCard
                    title={speaker.title}
                    category={speaker.type}
                    image={staticUrl(`/speakers/${speaker.imageFilename}`)}
                    name={speaker.name}
                    description={speaker.description}
                    tags={speaker.tags || []}
                    links={speaker.links || []}
                    height={speakers.length - index}
                />
            {/each}
        </div>
    {/if}
</div>
