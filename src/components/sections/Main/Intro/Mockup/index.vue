<template>
  <IPhone>
    <MockupContent/>
  </IPhone>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IPhone from '../../../../Mockup/iPhone.vue'
import MockupContent from './Content.vue'

export default defineComponent({
    name: "Mockup",
    components: { IPhone, MockupContent },
})
</script>
