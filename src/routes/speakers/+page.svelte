<script>
  import Header from "$lib/components/Header.svelte";
  import SpeakerCard from "$lib/components/SpeakerCard.svelte";
  import { marked } from "marked";
  /**
   * @type {string | any[]}
   */
  const speakers = [
    // {
    //     image: "https://celerit.snic.nl/speakers/c96dc266-99f5-44d6-ba68-3823abb1de1c.png",
    //     name: "John Doe",
    //     description: marked("**John Doe** is a seasoned expert in technology and innovation. He has over 20 years of experience in the field."),
    //     extendedDescription: "John Doe has been at the forefront of technological advancements, contributing to numerous groundbreaking projects that have shaped the industry. His expertise spans across various domains including artificial intelligence, machine learning, and blockchain technology. John has been a keynote speaker at several international conferences, sharing his insights and experiences with a global audience.",
    //     tags: ['Technology', 'Innovation', 'Philosophy'],
    //     links: [
    //         {icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/johndoe/"},
    //         {icon: "fa-brands fa-twitter", url: "https://twitter.com/johndoe"}
    //     ]
    // }
  ]
</script>
<Header title="Speakers"/>
<div id="speakers_section" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left min-h-[100vh]">
    {#if speakers.length === 0}
    We will display our speakers here soon! Be sure to follow us on Instagram and LinkedIn to stay up to date with the latest news!

    {:else}
    <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
        {#each speakers as speaker, i}
            <SpeakerCard
                    image="{speaker.image}"
                    name="{speaker.name}"
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
