<script lang="ts">
  import Committee from "$lib/components/Committee.svelte";
  import ContactInfo from "$lib/components/ContactInfo.svelte";
  import Header from "$lib/components/Header.svelte";


</script>
<Header title="Contact" />

<div class="container p-8 flex-col gap-4 md:flex-row">
    <div class="flex flex-col">
      <p class="mb-4 text-lg text-blue-whale">
        If you have any questions or need assistance, feel free to reach out to us using the contact information on the right. 
        Alternatively, you can contact us personally using the details provided below. We look forward to hearing from you!
      </p>
    </div>
    <ContactInfo/>
</div>

<Committee/>