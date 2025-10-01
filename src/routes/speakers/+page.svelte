<script>
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { marked } from "marked";
  import Polylog from "$lib/images/speakers/polylog.jpg"
  import Jeroen from "$lib/images/speakers/jeroen.jpg"
  import Andre from "$lib/images/speakers/andre.jpg"

  /**
   * @type {string | any[]}
   */
  const speakers = [
    {
        image: Andre,
        name: "André Foeken",
        title: "The work we do",
        category: "Keynote",
        description: marked("In this talk, André Foeken — CTO at Nedap Healthcare, shares his perspective on a tech industry in constant motion, and what that means for the next generation of engineers, founders, and creators."),
        extendedDescription: marked("Whether you’re thinking of building your own company, joining an existing one, or forging your own unique path, the key question remains: *how do you stand out?*\n This talk invites you to: \n * carve out your own space — within companies, across your career, and beyond borders — to dream big and move fast, \n * reflect on Europe’s place in the global tech scene and how we can shift the momentum, \n * and explore the evolving role of AI and software development in shaping the future. \n\n You’ll leave with a sharper sense of how to navigate your career in a world that doesn’t stand still — and how bold ideas, when acted on, can lead to real change."),
        tags: ['Tech industry'],
        links: [
            {icon: "fa-solid fa-globe", url: "https://dreet.je/"},
            {icon: "fa-solid fa-globe", url: "https://nedap.com/"},
        ]
    },
    {
        image: Polylog,
        name: "Polylog",
        title: "99% certainty is easy, 100% is hard",
        description: marked("Polylog is a Youtube channel with 100K+ subscribers where they do deep dives into all kinds of topics in computer science, with an emphasis on algorithms."),
        extendedDescription: marked("When designing algorithms, a lot of problems become much easier to solve (or even become possible to solve at all) if you give your algorithm access to randomness. This is counterintuitive: why should tossing a coin be helpful in a fundamental way? Starting from examples like quick sort, file checksums, and checking if equations hold, Polylog will build up an understanding of randomness, how it can help us fool the evil worst-case adversary, and where even coin flips can’t save us. \n\n In the second half of the talk, they will discuss the behind-the-scenes aspect of making science education videos. What’s the process? What’s hard about it? How are animations made? How to get started?"),
        tags: ['Algorithms', 'Science education'],
        links: [
            {icon: "fa-brands fa-youtube", url: "https://www.youtube.com/@PolylogCS"},
        ]
    },
    {
        image: Jeroen,
        name: "Jeroen Wijenbergh",
        smallTitle: true,
        title: "Securing Europe's Digital Backbone for Research and Education",
        description: marked("GÉANT is an organization that collaborates with different National Research and Education Networks (NRENs) in Europe and beyond."),
        extendedDescription: marked("Together with these NRENs, they deliver a network for the research and education sector and provide various products and services. This presentation focuses on the services they provide to improve the network's security and maintain its availability. \n\n Jeroen is a software developer in the Security: Products & Services team at GÉANT. This team develops security products internally and for the community. He works mainly on following projects: eduVPN, eduroam, Firewall on Demand and NeMo (anti DDoS)."),
        tags: ['Network security'],
    },
    


  ]
</script>
<Header title="Speakers"/>
<div id="speakers_section" class="container text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if speakers.length === 0}
    We will display our speakers here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!

    {:else}
    <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
        {#each speakers as speaker, i}
            <SpeakerCard
              small="{speaker.smallTitle}"
              image="{speaker.image}"
              name="{speaker.name}"
              category="{speaker.category}"
              title="{speaker.title}"
              description="{speaker.description}"
              extendedDescription="{speaker.extendedDescription}"
              tags="{speaker.tags}"
              height={i}
              links={speaker.links}
            />
        {/each}
    </div>
    {/if}
</div>
