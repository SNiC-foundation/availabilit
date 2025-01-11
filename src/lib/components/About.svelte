<script>
    import ContactInfo from "$lib/components/ContactInfo.svelte";
</script>

<div id="about_section" class="bg-gray-200 flex flex-col w-full content-around pt-[5vh]">


    <div id="text" class="container flex-col text-blue-whale p-8 gap-4 text-center md:text-left">
        <h1 class="text-blue-whale text-2xl md:text-5xl font-bold">About SNiC</h1>
        <div class="flex w-full flex-col content-between max-h-fit lg:max-h-[70vh] flex-wrap gap-4 text-blue-whale">
            <article class="lg:w-1/2">
                SNiC, Stichting Nationaal informatica Congres (which can be translated as the Foundation National
                informatics Congress), was established in December 2004. 9 study associations from cities in the
                Netherlands are affiliated. The aim of the foundation is to stimulate interest in information and
                communication technology, and to promote contact between students and the business world.
            </article>

            <article class="lg:w-1/2">
                Every year one of the associations of the foundation organizes a congress with an IT related subject. On
                November the
                25th in 2025, the congress will be organized by the study association <a
                    href="https://www.inter-actief.utwente.nl">I.C.T.S.V. Inter-<i>Actief</i></a>
                from the University of Twente in Enschede.
            </article>

            <article class="lg:w-1/2">
                Visitors are enthusiastic Computer Science and Artificial Intelligence bachelor and master students from
                all
                over the Netherlands. Over the past years the congress has grown considerably and we expect around 700
                visitors in 2025.
            </article>

            <article class="lg:w-1/2">
                Various talks have been held at the congress by speakers from both the business world and the academic
                world.
                The students are challenged to dive into a specific topic from different perspectives. We want to
                inspire
                them and invite them to think further than their current views.
            </article>

            <article class="lg:w-1/2">
                In addition, SNiC is a chance for students to speak with many companies during the breaks and the drink
                at
                the company fair, to connect with potential employers or to find a thesis or internship spot.
            </article>

            <article class="lg:w-1/2">
                At SNiC, we are dedicated to ensuring that our event is inclusive for all attendees. We strive to
                accommodate various needs and provide a welcoming environment for everyone. If you have any questions or
                specific accessibility requests, please do not hesitate to reach out to us. We are committed to making
                your experience as comfortable and enjoyable as possible.
            </article>

            <ContactInfo/>
        </div>
    </div>
</div>
