<template>
    <div class="com-item" @click="addComponent">
        <img class="com-item__icon" :src="icon" alt="">
        <div class="com-item__name">{{name}}</div>
        <div class="com-item__num"> {{amount}} / {{limit}}</div>
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: {
            type: String,
            required: true,
        },
        addComponent: {
            type: Function,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        }
    })
</script>

<style scoped>
    .com-item {
        position: relative;
        text-align: center;
        display: inline-block;
        width: 92px;
        height: 100px;
        font-size: 12px;
        margin-bottom: 8px;
        vertical-align: top;
        cursor: pointer;
        .com-item__icon {
            width: 40px;
            height: 40px;
            margin-top: 8px;
        }
        .com-item__name {
            color: #323233;
            line-height: 18px;
            font-size: 14px;
            margin-top: 4px;
        }
        .com-item__num {
            color: #7d7e80;
            line-height: 16px;
            margin-top: 4px;
        }
    }
</style>