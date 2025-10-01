<script>
    import LogoBar from './LogoBar.svelte';

    import UFonds from '$lib/images/universities/ufonds.svg'
    import UTwente from '$lib/images/universities/utwente.png'
    import Radboud from '$lib/images/universities/radboud.png'
    import TUE from '$lib/images/universities/tue.svg'
    import RUG from '$lib/images/universities/rug.png'
    import Utrecht from '$lib/images/universities/utrecht.png'
    import Leiden from '$lib/images/universities/leiden.png'
</script>

<div id="accessibility_section" class="container  flex-col text-blue-whale p-8 gap-4 text-center md:text-left">
    <h2 class="text-blue-whale text-2xl text-center md:text-5xl font-bold">Affiliated universities</h2>
    <p class="text-center">Next to out sponsors, SNiC 2025 is made possible through the support of the following universities and funds:</p>
</div>

<LogoBar size="lg" logos="{[
    {name: 'Stichting Universiteitsfonds Twente', image: UFonds, url: 'https://www.utwente.nl/nl/ufonds/'},
    {name: 'University of Twente', image: UTwente, url: 'https://www.utwente.nl/'},
    {name: 'Radboud university', image: Radboud, url: 'https://www.ru.nl/en'},
    {name: 'Eindhoven university of technology', image: TUE, url: 'https://www.tue.nl/en/'},
    {name: 'University of Groningen', image: RUG, url: 'https://www.rug.nl/'},
    {name: 'Utrecht', image: Utrecht, url: 'https://www.uu.nl/'},
    {name: 'Leiden', image: Leiden, url: 'https://www.universiteitleiden.nl/'},
    ]}" />