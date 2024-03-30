<template>
    <div class="preview_content">
        <template v-if="configData.components.length > 0">
            <div
                v-for="comp in configData.components"
                :key="comp.componentName"
                @click="selectC(comp.id)" :class="{active: comp.id === currentCompId, 'com-item--title_text': true}"
                @mouseover="onMouseHover(comp.id)"
                @mouseleave="onMouseLeave()"
            >
                    <!-- <div>{{ item }}</div>
                    <button @click="deleteC(item)">双工通信，iframe删除</button> -->
                    <component :is="components[comp.componentName]" :data="comp"></component>
                    <div class="comp_widget" v-if="comp.id === currentCompId || comp.id === hoverId">
                        <div class="widget_name">{{comp.name}}</div>
                    </div>
                    <div class="comp_operate" v-if="comp.id === currentCompId">
                        <div>dsf</div>
                    </div>
            </div>
            
        </template>
    </div>
</template>

<script setup>
    // iframe 与外面是隔离的，不会响应外面数据的变化，需要用 postMessage 传递数据
    import { onMounted, ref, toRaw } from 'vue'
    import remove from 'lodash/remove'

    import configData from './store'
    import TitleText from '@/pages/components/TitleText/index.vue'
    import Image from '@/pages/components/Image/index.vue'
    import Carousel from '@/pages/components/Carousel/index.vue'

    let components = {
        TitleText,
        Image,
        Carousel
    }

    let currentCompId = ref('')
    let hoverId = ref('')

    let parent = null
    onMounted(() => {
        window.addEventListener('message', (e) => {
            parent = e.source
            // message 用来标记是增加组件还是其他的删除或者修改操作
            let { message, data } = e.data

            if (message === 'addComponent') {
                configData.components.push(data)
            }

            if (message === 'updateComponent') {
                data = JSON.parse(data)
                configData.components.forEach((item, index) => {
                    if (item.id === data.id) {
                        configData.components[index] = {...data}
                    }
                })
            }
        })
    })

    const onMouseHover = (id) => {
        hoverId.value = id
    }
    const onMouseLeave = (id) => {
        hoverId.value = ''
    }

    const deleteC = (item) => {
        remove(configData.components, (n) => n.id === item.id)
        parent.postMessage({ message: 'deleteComponent', id: item.id })
    }

    const selectC = (id) => {
        currentCompId.value = id
        // 需要把选择的组件的 id 传递出去
        parent.postMessage({ message: 'selectComponent', id: id})
    }
</script>

<style scoped>
    .preview_content {
        width: 375px;
        margin: 0 auto;
        height: 100%;
        background-color: #fff;
    }
    .active {
        border: 1px blue solid;
    }
    .com-item--title_text {
        position: relative;
        .comp_widget {
            position: absolute;
            left: -106px;
            width: 80px;
            top: 0;
            background: #fff;
            border-radius: 2px;
            ::before {
                content: " ";
                position: absolute;
                top: 12px;
                right: -7px;
                width: 0;
                height: 0;
                border-top: 7px solid transparent;
                border-left: 7px solid #e0e0e0;
                border-bottom: 7px solid transparent;
            }
            ::after {
                content: " ";
                position: absolute;
                top: 13px;
                right: -6px;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-left: 7px solid #fff;
                border-bottom: 6px solid transparent;
            }
            .widget_name {
                padding: 4px 7px;
                box-sizing: border-box;
                border: 1px solid #e0e0e0;
                font-size: 14px;
                height: 36px;
                line-height: 28px;
            }
        }
        .comp_operate {
            position: absolute;
            top: 0;
            right: -40px;
            width: 38px;
            height: 208px;
            background: #fff;
            box-shadow: 0 2px 8px 0 rgba(200,201,204,.5);
            border-radius: 2px;
            padding: 2px 0;
            box-sizing: border-box;
        }
    }
</style>