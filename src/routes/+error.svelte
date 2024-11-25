<script lang="ts">
    import { page } from "$app/stores";
    import WordMark from "$lib/images/WordMark.png";
    import { base } from "$app/paths";
</script>

<div id="error_page" class="bg-bottom-backdrop h-screen w-screen flex flex-col justify-evenly items-center text-white">

    <div class="flex flex-col items-center gap-4 md:gap-6 text-3xl md:text-5xl">
        <h1 class="text-center">
            This page/action is sadly not available
        </h1>
        <h1>
            (anti-'vo)
        </h1>
    </div>

    <div class="flex flex-col items-center md:justify-center gap-2 text-2xl md:text-4xl">
        <h3 class="text-center">
            For the reason, see error context below:
        </h3>
        <h3>
            {$page.status}: {$page.error.message}
        </h3>
    </div>

    <div class="flex flex-col md:flex-row items-center gap-2 text-2xl md:text-4xl">
        <h3>
            Click to return to the home page:
        </h3>
        <a href="{base}/"><img src={WordMark} alt=""  class="h-12 md:h-20"></a>
    </div>
</div>
