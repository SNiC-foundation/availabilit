<script>
  import SpeakerCard from "./SpeakerCard.svelte";

</script>
<!-- filepath: /Users/matthias/Desktop/1 Projects/SNiC/website/availabilit/src/lib/components/Speakers.svelte -->
<div id="speakers_section" class="container flex-col text-blue-whale py-8 gap-4 text-center md:text-left">
    We currently have no speakers to display. Please check back later for updates on our event speakers.

    <div class="flex flex-row flex-wrap gap-4 justify-center items-start">
        {#each Array(5) as _, i}
            <SpeakerCard
                    image="https://celerit.snic.nl/speakers/c96dc266-99f5-44d6-ba68-3823abb1de1c.png"
                    name="John Doe"
                    description="John Doe is a seasoned expert in technology and innovation. 
                    He has over 20 years of experience in the field."
                    extendedDescription="John Doe has been at the forefront of technological advancements, contributing to numerous groundbreaking projects that have shaped the industry. His expertise spans across various domains including artificial intelligence, machine learning, and blockchain technology. John has been a keynote speaker at several international conferences, sharing his insights and experiences with a global audience.

In addition to his technical prowess, John is also a thought leader in the field of innovation. He has authored multiple papers and articles on the subject, and his work is frequently cited by peers and professionals. John's passion for technology is matched by his commitment to mentoring the next generation of innovators, making him a respected figure in both academic and professional circles."
                    tags="{['Technology', 'Innovation', 'Philosophy']}"
                    height={i}
            />
        {/each}
    </div>
</div>