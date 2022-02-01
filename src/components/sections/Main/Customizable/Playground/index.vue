<template>
  <div
    class="grid md:grid-flow-col md:gap-x-6 pt-6 md:pt-12"
  >
      <Mockup 
        v-if="!breakpoint.isMobile"
        class="h-[calc(100vh-56px)] max-h-[600px] w-[312px]">
          <Visuals/>
      </Mockup>

      <div>
          code
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useBreakpoint from '../../../../../hooks/useBreakpoints'
import Mockup from './Mockup.vue'
import Visuals from './Visuals/index.vue'

export default defineComponent({
    name: "CustomizablePlayground",
    setup() {
        const breakpoint = useBreakpoint();

        return {
            breakpoint
        }
    },
    components: { Mockup, Visuals }
})
</script>
