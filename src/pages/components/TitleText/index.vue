<template>
    <div :style="data.styles">{{data.value}}</div>
</template>

<script setup>
    defineProps({
        data: Object
    })
</script>

<style>

</style>