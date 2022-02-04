<template>
    <section
        class="w-full relative fill-before isolate before:-z-1 before:bg-[hsl(0,0%,99%)] dark:before:bg-[hsl(180,5%,6%)] before:w-screen before:left-[50%] before:translate-x-[-50%] before:border-y before:border-gray-300/40 dark:before:border-gray-700/20 pt-6 pb-[72px] xs:pb-[108px] md:pb-[124px] sm:pt-12 xs:px-[0.375rem] sm:px-0"
    >
        <FeatureIntro
            badge="Groups and delays"
            title="Do more with group, and delay props"
            subtitle="Tweak your animations to create the perfect timeline with the group, and delay props."
        />

        <Playground/>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FeatureIntro from '../FeatureIntro.vue'
import Playground from './Playground/index.vue'

export default defineComponent({
    name: "GroupsAndDelays",
    setup() {
    },
    components: { FeatureIntro, Playground }
})
</script>
