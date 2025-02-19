<script>
    import WordMark from "$lib/images/WordMark.png";
    import SocialMediaButton from "./SocialMediaButton.svelte";
    import { base } from "$app/paths";
</script>

<div id="wrapper" class="w-full bg-blue-whale text-white">
    <div class="container justify-between items-center px-8 py-4 gap-8 flex-col md:flex-row">
        <div id="copyright" class="flex flex-col order-3 md:order-none md:w-80">
            <p><i class="fa-regular fa-copyright"></i> 2025 Copyright</p>
            <a href="https://snic.nl">Stichting Nationaal informatica Congres</a>
            </div>
    
        <div id="logo" class="order-1 md:order-none">
            <a href="{base}/" ><img src={WordMark} alt="" class="h-[5vh] w-auto sm:h-[10vh]"></a>
        </div>
    
        <div id="socials" class="flex flex-row items-center md:justify-end gap-4 order-2 md:order-none md:w-80">
            <SocialMediaButton icon="instagram" link="https://www.instagram.com/snic_sustainabilit/?igsh=bndjYzFqdGp1NmRl"/>
            <SocialMediaButton icon="linkedin" link="https://www.linkedin.com/company/snic-congress"/>
        </div>
    </div>
</div>
