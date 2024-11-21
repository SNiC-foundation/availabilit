<script>
    import ContactInfo from "$lib/components/ContactInfo.svelte";
</script>

<div id="about_section" class="bg-gray-200 flex flex-col w-full content-around pt-[5vh]">


    <div id="text" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left">
        <h1 class="text-blue-whale text-2xl md:text-5xl font-bold">About SNiC</h1>
        <div class="flex w-full flex-col content-between max-h-fit lg:max-h-[70vh] flex-wrap gap-4 text-blue-whale">
        <article class="lg:w-1/2">
            SNiC, Stichting Nationaal informatica Congress (which can be translated as the Foundation National
            Informatics
            Congress), was established in December 2004. 10 study associations from cities in the Netherlands are
            affiliated.
            The aim of the foundation is to stimulate interest in knowledge of information and communication technology,
            and to promote contact between students and the business world.
        </article>

        <article class="lg:w-1/2">
            Every year one of the associations of the foundation organizes a congress with an IT related subject. On November the
            25th in 2025, the congress will be organized by the study association <a
                href="https://www.inter-actief.utwente.nl">I.C.T.S.V. Inter-<i>Actief</i></a>
            from the University of Twente in Enschede.
        </article>

        <article class="lg:w-1/2">
            Visitors are enthusiastic Computer Science and Artificial Intelligence bachelor and master student from all
            over
            the country. Over the past years the congress has grown considerably. Where in 2017 the congress was visited
            by 450 students, we expect around 700 visitors in 2025.
        </article>

        <article class="lg:w-1/2">
            Various talks have been held at the congress by speaker from both the business world and the academic world.
            The students are challenged to dive into a specific topic from different perspectives. We want to inspire
            them
            and invite them to think further than their current views.
        </article>

        <article class="lg:w-1/2">
            In addition, it is chance for students to speak with many companies during the breaks and the drinks at the
            company fair, to connect with potential employers or to find a thesis or internship spot.
        </article>

        <ContactInfo/>
        </div>
    </div>
</div>