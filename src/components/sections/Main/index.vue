<template>
    <main
        :class="[
            'grid',
            classNames.surfaceBG,
            classNames.containerPadding
        ]"
    >
        <div
            :class="[
                'mx-auto',
                classNames.appMaxWidth,
            ]"
        >
            <Intro/>
            <Features/>
            <Customizable/>
            <Controllable/>
            <GroupsAndDelays/>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classNames from '../../../utils/classNames'
import Intro from './Intro/index.vue'
import Features from './Features/index.vue';
import Customizable from './Customizable/index.vue';
import Controllable from './Controllable/index.vue';
import GroupsAndDelays from './GroupsAndDelays/index.vue';

export default defineComponent({
    name: "Main",
    setup() {
        return {
            classNames
        };
    },
    components: { Intro, Features, Customizable, Controllable, GroupsAndDelays }
})
</script>
