import { ref, reactive } from 'vue'
import TitleText from '@/assets/text_title.svg'
import Image from '@/assets/image.svg'
import Carousel from '@/assets/carousel.svg'

export default reactive({
    id: '',
    setting: {
        title: '',
        desc: '',
        backgroundColor: '',
        category: ''
    },
    components: [],
})

export const toolLists = [
    {
        id: 'TitleText',
        name: '标题文本',
        componentName: 'TitleText',
        limit: 5,
        icon: TitleText
    },
    {
        id: 'Image',
        name: '图片',
        componentName: 'Image',
        limit: 50,
        icon: Image
    },
    {
        id: 'Carousel',
        name: '轮播',
        componentName: 'Carousel',
        limit: 10,
        icon: Carousel
    }
]

export const toolListsCount = reactive({
    TitleText: 0,
    Image: 0,
    Carousel: 0
})

export const componentMap =  {
    TitleText: {
        name: '标题文本',
        componentName: 'TitleText',
        componentConfigName: 'TitleTextConfig',
        value: '这里是标题文本！',
        styles: {
            textAlign: 'left',
            fontWeight: 'normal',
            color: '#333',
            backgroundColor: '#fff',
            padding: '16px'
        },
        is_splite_line: false,
        is_more: false,
        more_setting: {
            mode: 'mod1',
            url: "",
            text: '查看更多'
        }
    },
    Image: {
        name: '图片',
        componentName: 'Image',
        componentConfigName: 'ImageConfig',
        value: '',
        styles: {
            margin: '',
            borderRadius: '',
            boxShadow: ''
        }
    },
    Carousel: {
        name: '轮播',
        componentName: 'Carousel',
        componentConfigName: 'CarouselConfig',
        value: '',
    }
}