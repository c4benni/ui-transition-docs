<template>
    <div
        :class="[
            'mt-[-32px] pointer-events-auto isolate',
            {
                invisible: !expanded
            }
        ]"
    >
        <Img
            :public-id="src"
            :class="[
                'w-[calc(100%-32px)] h-[224px] mt-[16px] mx-auto rounded-[6px] shadow-xl object-cover',
            ]"
        />

        <div
            :class="[
                'w-[calc(100%-32px)] mx-auto text-[0.65em] grid justify-between grid-rows-2 gap-y-[4px]',
                classNames.paragraph
            ]"
        >
            <div
                class="elapsed-time fill-before"
            />

            <span
                class="row-start-2"
            >
                3:42
            </span>

            <span
                class="row-start-2"
            >
                -13:05
            </span>
        </div>

        <div
            :class="[
                    'whitespace-nowrap pl-[16px] mt-[8px] fill-after after:z-10 after:left-auto after:right-0 relative after:w-[32px] gradient-after'
                ]"
        >
            <p
                :class="[
                    'font-medium'
                ]"
            >
                {{title}}
            </p>

            <p
                :class="[
                    primaryColor
                ]"
            >
                The Daily Show With Trevor Noah: Ears Edition - 31st January 2022 
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { requiredProp, requiredStringProp } from '../../../../../../utils/main'
import Img from '../../../../../Img.vue'

export default defineComponent({
    name: "DrawerContent",
    props:{
        expanded:Boolean,
        src: requiredStringProp,
        classNames: requiredProp(Object),
        title: requiredStringProp,
        primaryColor: requiredStringProp
    },
    setup() {
    },
    components: { Img }
})
</script>

<style scoped lang="postcss">
    .elapsed-time{
        @apply w-full h-[2px] rounded-full col-start-1 col-end-3 self-end bg-paragraph/40 dark:bg-paragraph-dark/30 relative before:bg-paragraph dark:before:bg-paragraph-dark before:w-[28.28%] after:absolute after:w-[6px] after:h-[6px] after:rounded-full after:shadow after:bg-paragraph dark:after:bg-paragraph-dark after:z-10 after:top-[50%] after:translate-y-[-50%] after:left-[calc(28.28%-3px)] before:rounded-full;
    }

    .gradient-after::after{
        background-image: linear-gradient(to right, #ffffff00, #fff 70%);
    }

    .dark .gradient-after::after{
        background-image: linear-gradient(to right, #16161a00, #16161a 70%);
    }
</style>
