<template>
    <div class="decorate-title-text-editor">
        <div class="deco-component-title">{{ data.name }}</div>
        <div class="deco-control-group">
            <div class="deco-control-group__header">标题内容</div>
            <div class="deco-control-group__content">
                <input type="text" placeholder="请输入标题" v-model="data.value" @input="handleChangeValue" />
            </div>
        </div>
        <div class="deco-control-group">
            <div class="deco-control-group__header">描述内容</div>
            <div class="deco-control-group__content">
                <textarea type="text" placeholder="请输入要说明的文字，最多不超过 500 字" />
            </div>
        </div>
        <div class="decorate-divider"></div>
        <div class="deco-control-group">
            <div class="deco-control-group-container">
                <div class="deco-control-group__header">标题颜色</div>
                <div class="deco-control-group__content">
                    <input type="text" placeholder="请输入标题颜色" v-model="data.styles.color" @input="handleChangeValue" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        data: Object,
        handleChangeValue: Function
    })
</script>

<style scoped>
    .decorate-title-text-editor {
        margin: 0;
        padding: 0;
        border: 0;
        .deco-component-title {
            padding: 24px 16px;
            border-bottom: 1px solid #f2f4f6;
            margin-right: auto;
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            color: #323233;
            text-align: left;
        }
        .deco-control-group {
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            .deco-control-group__header {
                margin-right: 16px;
                font-size: 14px;
                color: #969799;
                line-height: 18px;
                white-space: nowrap;
            }
            .deco-control-group__content {
                margin-top: 10px;
                display: flex;
                textarea, input {
                    flex: 1;
                }
                textarea {
                    height: 54px;
                }
                input {
                    height: 32px;
                }
            }
        }
        .decorate-divider {
            height: 1px;
            padding: 12px 16px;
            background-clip: content-box;
            background-color: rgb(235, 237, 240);
            box-sizing: content-box;
        }
    }
</style>