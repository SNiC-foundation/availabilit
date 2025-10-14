<script>
    import { page } from '$app/stores';
    
    $: id = $page.params.id;
</script>

<div class="min-h-screen bg-bottom-backdrop p-8">
    <div class="max-w-4xl my-8 mx-auto">
        <div class="bg-white rounded-lg shadow-md p-8">
            <h1>Edit Speaker {id}</h1>
        </div>
    </div>
</div>