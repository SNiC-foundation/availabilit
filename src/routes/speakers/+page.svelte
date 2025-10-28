<script>
  import { goto } from "$app/navigation";
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { onMount } from "svelte";
  import { apiUrl, staticUrl } from "$lib/config";
  import { isAdmin } from "$lib/stores/auth";

  let loading = true;
  let error = '';

  /**
   * @type {string | any[]}
   */
  let speakers = [
    {
        "id": 10,
        "createdAt": "2025-10-28T16:00:35.296Z",
        "updatedAt": "2025-10-28T19:12:38.000Z",
        "version": 4,
        "name": "André Foeken",
        "title": "The work we do",
        "description": "the key question remains: how do you stand out? This talk invites you to:\n\ncarve out your own space — within companies, across your career, and beyond borders — to dream big and move fast,\nreflect on Europe’s place in the global tech scene and how we can shift the momentum,\nand explore the evolving role of AI and software development in shaping the future.\nYou’ll leave with a sharper sense of how to navigate your career in a world that doesn’t stand still — and how bold ideas, when acted on, can lead to real change.",
        "links": null,
        "tags": null,
        "type": "keynote",
        "imageFilename": "c83b7474-3ca7-4bd1-a650-04fd668e0315.jpeg"
    },
    {
        "id": 11,
        "createdAt": "2025-10-28T16:02:40.872Z",
        "updatedAt": "2025-10-28T16:07:50.000Z",
        "version": 4,
        "name": "CERN",
        "title": "We Tried Open-Source For 20 Years; Here’s What Happened",
        "description": "Pedro is the Head of conferencing technologies at CERN, and Ajob is a software engineer for the Indico team at CERN.\n\n\nThey will talk about the challenges and benefits of running an open-source project for a long time. This includes topics like their collaborations with organizations like the UN, struggles with funding, the returned benefits and more. Essentially, the good, the bad and the ugly of open source projects. CERN, is best known as the place where the web was invented and where the world’s largest particle accelerator, the Large Hadron Collider, pushes the boundaries of physics.\n\nBeyond groundbreaking science, CERN is also a pioneer in technology and open collaboration. From distributed computing to open-source software used by thousands of researchers and institutions worldwide, CERN shows how technology created for science can ripple far beyond the lab.",
        "links": null,
        "tags": null,
        "type": "keynote",
        "imageFilename": "4a821077-7ddf-4c77-9231-25d0170d974c.png"
    },
    {
        "id": 12,
        "createdAt": "2025-10-28T16:03:50.643Z",
        "updatedAt": "2025-10-28T16:03:51.000Z",
        "version": 2,
        "name": "Polylog",
        "title": "99% certainty is easy, 100% is hard",
        "description": "Polylog is a Youtube channel with 100K+ subscribers where they do deep dives into all kinds of topics in computer science, with an emphasis on algorithms.\n\n\nWhen designing algorithms, a lot of problems become much easier to solve (or even become possible to solve at all) if you give your algorithm access to randomness. This is counterintuitive: why should tossing a coin be helpful in a fundamental way? Starting from examples like quick sort, file checksums, and checking if equations hold, Polylog will build up an understanding of randomness, how it can help us fool the evil worst-case adversary, and where even coin flips can’t save us.\n\nIn the second half of the talk, they will discuss the behind-the-scenes aspect of making science education videos. What’s the process? What’s hard about it? How are animations made? How to get started?",
        "links": null,
        "tags": null,
        "type": "host",
        "imageFilename": "edc57903-f273-469c-a2cd-31a183c02d9b.jpeg"
    },
    {
        "id": 13,
        "createdAt": "2025-10-28T16:04:53.451Z",
        "updatedAt": "2025-10-28T16:04:53.000Z",
        "version": 2,
        "name": "Ruben and Jeroen",
        "title": "Leveraging data and tooling for intelligence and investigation",
        "description": "Two data scientists from the AMLC will present the process from intelligence to investigation using in-house tools and open-source technology.\n\n\nThey will show how their tools, the AMLC suite, supports this process and makes crucial data available within their organization.\n\nAt AMLC we contribute to FIOD’s intel position on money laundering and we support in developing leads into criminal investigations. This is a combined effort of our data scientists, using latest tools and technology, analysts and anti-money laundering experts.\n\nWe also research the latest innovations in the areas of Artificial Intelligence and Machine learning and how these technologies can help our data.",
        "links": null,
        "tags": null,
        "type": "host",
        "imageFilename": "ee98cd3a-f438-422c-85a7-769170d97de3.png"
    },
    {
        "id": 14,
        "createdAt": "2025-10-28T16:05:56.349Z",
        "updatedAt": "2025-10-28T16:05:56.000Z",
        "version": 2,
        "name": "Jeroen Wijenbergh",
        "title": "Securing Europe's Digital Backbone for Research and Education",
        "description": "GÉANT is an organization that collaborates with different National Research and Education Networks (NRENs) in Europe and beyond.\n\nTogether with these NRENs, they deliver a network for the research and education sector and provide various products and services. This presentation focuses on the services they provide to improve the network's security and maintain its availability.\n\nJeroen is a software developer in the Security: Products & Services team at GÉANT. This team develops security products internally and for the community. He works mainly on following projects: eduVPN, eduroam, Firewall on Demand and NeMo (anti DDoS).",
        "links": null,
        "tags": null,
        "type": "talk",
        "imageFilename": "fc5a54b6-8ddc-4ebe-9b0b-3cde4dc0c159.jpeg"
    },
    {
        "id": 15,
        "createdAt": "2025-10-28T16:32:23.233Z",
        "updatedAt": "2025-10-28T16:35:05.000Z",
        "version": 3,
        "name": "Ian and William",
        "title": "Neurodiversity, teachers and schooling",
        "description": "Overcoming the shortfalls in enabling successful partnership with the computing industry \n\nIan is an education consultant with Embecosm Ltd working with William on all matters related to how schools are learning to improve the opportunities that enable young people to engage with employment in the computing world. \n\nWilliam is the Head of AI at Embecosm, leading efforts in developing both AI tool chains as well as general AI technology. Working collaboratively with Ian, William is also responsible for Embecosms efforts to help schools and young people to engage with employment in the technology sector, and exploring how AI can play a beneficial role for schools.",
        "links": null,
        "tags": null,
        "type": "host",
        "imageFilename": "044f80eb-1a50-46c3-a80d-3ccdbb9c1624.png"
    }
];

async function getSpeakers() {
    try {
        const response = await fetch(apiUrl('/speaker'), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            speakers = await response.json();
        } else {
            
        }
    } catch (e) {
        console.error('Error loading speakers:', e);
    }
}

  onMount(async () => {
        await getSpeakers();
        loading = false;
    });
</script>
<Header title="Speakers"/>
<div id="speakers_section" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if $isAdmin}
        <button class="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" on:click={()=>goto('/speakers/create')}>
            Add Speaker
        </button>
    {/if}
    
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-whale"></div>
        </div>
    {:else if error}
        <div class="bg-red-100 text-red-700 p-4 rounded">
            {error}
        </div>
    {:else if speakers && speakers.length === 0}
        <p>We will display our speakers here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!</p>
    {:else if speakers && speakers.length > 0}
        <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
            {#each speakers as speaker, index}
                <SpeakerCard
                    id={speaker.id}
                    admin={$isAdmin}
                    title={speaker.title}
                    category={speaker.type}
                    image={staticUrl(`/speakers/${speaker.imageFilename}`)}
                    name={speaker.name}
                    description={speaker.description}
                    tags={speaker.tags || []}
                    links={speaker.links || []}
                    height={index}
                />
            {/each}
        </div>
    {/if}
</div>
