<template>
    <div class="fl fl_jc_fs fl_ai_fs">
        <div class="edit_left">
            <template v-for="toolItem in toolLists" :key="toolItem.id">
                <Element
                    :addComponent="() => addComp(toolItem.componentName, toolItem.limit)"
                    :icon="toolItem.icon"
                    :name="toolItem.name"
                    :limit="toolItem.limit"
                    :amount="toolListsCount[toolItem.componentName]"
                />
            </template>
        </div>
        <div class="edit_main">
            <iframe id="preview_iframe" src="/preview" frameborder="0" class="edit_iframe" height="870" />
        </div>
        <div class="edit_right">
            <component
                :is="components[selectComponent.componentConfigName]"
                :data="selectComponent"
                :handleChangeValue="(e) => onChange(e)"
            />
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, toRaw } from 'vue'
    import remove from 'lodash/remove'
    import cloneDeep from 'lodash/cloneDeep'
    
    import configData, { toolLists, toolListsCount, componentMap } from '../store'
    import Element from './c-cpns/Element.vue'
    import TitleTextConfig from '@/pages/components/TitleText/TitleTextConfig.vue'
    import ImageConfig from '@/pages/components/Image/ImageConfig.vue'
    import CarouselConfig from '@/pages/components/Carousel/CarouselConfig.vue'

    let components = {
        TitleTextConfig,
        ImageConfig,
        CarouselConfig
    }

    let selectComponent = ref({})

    const addComp = (type, limit) => {
        // 增加组件时判断当前数量，不能超过总数量限制
        if (toolListsCount[type] >= limit) return;
        if (componentMap[type]) {
            // 生成唯一id
            const cid = s4() + s4()
            const cData = cloneDeep(componentMap[type])
            cData.id = cid
            configData.components.push(cData)
            // 传递给 iframe，更新 iframe 中的组件数组信息
            const iframe = document.getElementById('preview_iframe')
            iframe.contentWindow.postMessage({
                message: 'addComponent',
                data: cData
            })

            // 更新当前组件数量
            toolListsCount[type]++
        }
    }

    const deleteComp = (cid) => {
        remove(configData.components, (n) => n.id === cid)
    }

    // 生成随机 ID
    const s4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    onMounted(() => {
        window.addEventListener('message', (e) => {
            const { message, id } = e.data

            if (message === 'deleteComponent' && id) {
                deleteComp(id)
            }
            if (message === 'selectComponent' && id) {
                configData.components.forEach(item => {
                    if (item.id == id) {
                        selectComponent.value = item
                    }
                })
            }
        })
    })

    // TitleText 修改函数
    const onChange = (e) => {
        // selectComponent.value.value = e.target.value
        const iframe = document.getElementById('preview_iframe')
        iframe.contentWindow.postMessage({
            message: 'updateComponent',
            data: JSON.stringify(selectComponent.value)
        })
    }
</script>

<style lang="scss" scoped>
    .edit_left {
        width: 284px;
        height: 100vh;
    }
    .edit_main {
        position: relative;
        min-width: 400px;
        flex: 1;
        background-color: #f7f8fa;
        height: 100vh;
        .edit_iframe {
            width: 100%;
            background-color: #f9f9f9;
            position: absolute;
            top: 24px;
        }
    }
    .edit_right {
        width: 376px;
        height: 100vh;
    }
</style>