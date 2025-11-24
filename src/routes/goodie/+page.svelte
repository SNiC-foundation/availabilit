<script>
    import Goodie from "$lib/images/goodie.svg";
    import Card from "./Card.svelte"
</script>

<div id="landing_section"
     class="h-[98vh] overflow-hidden relative w-full bg-bottom-backdrop text-white flex items-center justify-center gap-[5vh]">
    <div class="flex gap-4 items-center flex-col md:flex-row">
        <img src={Goodie} alt="Image of the committee goodie of 2025" class="w-64 mx-auto md:m-0"/>
        <div class="flex flex-col items-center">
            <h3 class="text-4xl font-bold text-center">AvailabilIT NFC keychain</h3>
            <p class="max-w-md text-center text-xl font-light">
                This dandelion NFC keychain symbolises our idea of AvailabilIT. A single seed can drift, land, and grow into something bigger, just like a clever idea shared with the right people. Consider this your pocket-sized reminder that big things can start small. 
            </p>
        </div>
    </div>
</div>

<div class="container flex-col py-8">
    <h1 class="text-4xl font-bold text-blue-whale">What can you use it for?</h1>
    <p>In principle, you can use it to store any information up to X and pass this information to NFC compatible devices through touch. You can put information on there using an app like TODO. Some examples of how to use it include:</p>
    <div class="flex flex-col md:flex-row gap-4 mt-4 w-full">
        <Card iconContainerClass="bg-blue-300 text-blue-700" title="Contact details" icon="fa-solid fa-user" text="Put contact details like your phone number of e-mail address on there to use as 'business card'"/>
        <Card iconContainerClass="bg-cyan-300 text-cyan-700" title="Payment method" icon="fa-solid fa-money-bill" text="Some study associations allow payment through NFC. You can use this keychain as payment method."/>
        <Card iconContainerClass="bg-indigo-300 text-indigo-700" title="Home automation" icon="fa-solid fa-home" text="Integrating NFC into your home automation setup can allow for extra functionality in your smart home."/>
        <Card iconContainerClass="bg-purple-300 text-purple-700" title="Link sharing" icon="fa-solid fa-link" text="You can also just put a link on there of your own website or let's say your favourite synth-pop song from 1987."/>
    </div>
</div>

<style>
    #landing_section {
        border-bottom-left-radius: 100% 20%;
        border-bottom-right-radius: 100% 20%;
    }
</style>