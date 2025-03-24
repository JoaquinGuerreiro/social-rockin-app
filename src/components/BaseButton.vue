<script>

export default {
    name: 'BaseButton',
    props: {
        color: {
            type: String,
            default: 'blue',
        },
    },
}
</script>

<template>
    <button 
        type="submit" 
        class="transition py-2 px-4 rounded text-white bg-red-700 hover:bg-red-500 focus:bg-red-500 active:bg-red-900"
    >
        <slot>Enviar</slot>
    </button>
</template>