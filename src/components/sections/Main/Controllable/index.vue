<template>
    <section
        class="w-full relative fill-before isolate before:-z-1 before:bg-[hsl(0,0%,100%)] dark:before:bg-[hsl(180,5%,5%)] before:w-screen before:left-[50%] before:translate-x-[-50%] before:border-y before:border-gray-300/40 dark:before:border-gray-700/20 pt-6 pb-[72px] xs:pb-[108px] md:pb-[124px] sm:pt-12 xs:px-[0.375rem] sm:px-0"
    >
        <FeatureIntro
            badge="Controllable"
            title="You are in full control"
            subtitle="Transitioning elements must not enter, or leave the viewport to be transitioned! UiTransition provides an easy way to change animate elements dynamically in response to states changes."
        />

        <Playground/>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FeatureIntro from '../FeatureIntro.vue'
import Playground from './Playground/index.vue'

export default defineComponent({
    name: "Controllable",
    setup() {
    },
    components: { FeatureIntro, Playground }
})
</script>
