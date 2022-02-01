<template>
    <IPhone>
        <slot/>
    </IPhone>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IPhone from '../../../../Mockup/iPhone.vue'

export default defineComponent({
    name: "CustomizableMockup",
    setup() {
    },
    components: { IPhone }
})
</script>
