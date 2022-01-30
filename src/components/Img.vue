<script lang="ts">
import { computed, defineComponent, h, ref, resolveComponent, watch } from 'vue'
import { undefinedProp } from '../utils/main'
import {Cloudinary} from 'cloudinary-core';
import Intersection from './Intersection.vue';

const cl = new Cloudinary({cloud_name: "c4benn", secure: true});

export default defineComponent({
    emits:['load-start', 'load-success', 'load-error'],
    props:{
        publicId: undefinedProp(String),
        src: undefinedProp(String),
        alt: undefinedProp(String),
        width: undefinedProp(Number),
        height: undefinedProp(Number),
        quality: undefinedProp([String || Number])
    },
    setup(p, {attrs, emit}) {
        const props = computed(()=>p);
        const loaded = ref(false);

        const intersected = ref(false);

        const getSrc = computed(()=>{
            const {publicId, src, height, width, quality} = props.value;

            if(publicId){
                return cl.url(`uiTransition/${publicId}`, {
                    transformation: [
                        {
                            height: '300',
                            width,
                            quality
                        }
                    ]
                })
            }
            return src;
        })

        const loadImage = ()=>{
            if(!intersected.value) return;

            loaded.value =false;

            emit('load-start')

            const img = new Image();

            const toggleLoaded = (val:boolean)=>{
                img.onerror = null;

                img.onload = null;

                loaded.value = val;

                emit(val ? 'load-success' : 'load-error')
            }

            img.onload = ()=>{
                toggleLoaded(true)
            }

            img.onerror = ()=>{
                toggleLoaded(false)
            }

            img.src = getSrc.value
        }

        watch(()=> getSrc.value,()=>{
            intersected.value = false;

            loadImage()
        })

        watch(()=> intersected.value,(n)=>{
            n && loadImage();
        })

        return ()=>{
            return h(Intersection,{
                disabled: intersected.value
            },{
                default:({isIntersecting, inactive}:
                {inactive: boolean; isIntersecting: boolean})=>{
                    !inactive && (intersected.value = isIntersecting);

                    return loaded.value ?
                        h('img',{
                            ...attrs,
                            src: getSrc.value,
                            alt: props.value.alt,
                            height: props.value.height,
                            width: props.value.width,
                            decoding: 'async',
                            crossorigin: 'anonymous',
                            'data-src-cache': props.value.publicId ? 
                                getSrc.value: undefined,
                        })
                        : h('div',{
                            ...attrs,
                            class: 'bg-card dark:bg-card-dark',
                            style:{
                                height: `${props.value.height}px`,
                                width: `${props.value.width}px`,
                            }
                        })
                }
            })
        }
    },
})
</script>
