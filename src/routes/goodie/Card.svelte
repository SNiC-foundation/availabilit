<script>
    export let title = "Card Title";
    export let text = "One line of descriptive text goes here.";
    export let icon = "Something"
    export let iconContainerClass = "bg-indigo-50 text-indigo-600";
</script>

<div class="flex flex-col w-full items-center gap-4 p-4 bg-white rounded-lg shadow-md transition-colors">
    <div class={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconContainerClass}`}>
        <i class="{icon}"></i>
    </div>

    <div class="text-sm font-semibold text-center text-gray-900">{title}</div>
    <div class="text-xs text-gray-500 text-center">{text}</div>
</div>