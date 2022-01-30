<template>
      <div
        class="w-full h-full relative"
      >
            <!-- body -->
          <div class="pt-[24px] px-[8px]">

              <p
                :class="[
                    'font-bold text-[1.5em]',
                    classNames.headline,
                ]"
              >
                  Browse
              </p>

              <div>
                  <Img
                    public-id="intro-mockup/podcast/sneakernomics_xepupg.jpg"
                    :height="400"
                    :width="200"
                  />
              </div>

          </div>

          <!-- overlay -->

          <div class="absolute bottom-0 w-full h-full pb-[16px]">
              <!-- drawer -->
              <div
                class="h-[calc(100%-1rem)] bottom-[16px] absolute w-full translate-y-[calc(100%-96px)]"
              >

              </div>

              <!-- tabs -->
              <ul
                :class="[
                    'h-[48px] absolute bottom-[16px] w-full border-t-[0.75px] flex justify-around',
                    classNames.divideColor
                ]"
              >
                <IconWrapper
                    v-for="(icon, i) in navIcons"
                    :key="icon"
                    tag="li"
                    :class="[
                        'text-[19px]',
                        {
                            'opacity-70': i !== 0,
                            'text-blue-700 dark:text-blue-500': i ===0
                        }
                    ]"
                >
                    <Component :is="icon"/>
                </IconWrapper>
              </ul>
          </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconWrapper from '../../../../icons/IconWrapper.vue'
import PlayFilledIcon from '../../../../icons/PlayFilled.vue'
import CollectionsIcon from '../../../../icons/Collections.vue'
import SearchIcon from '../../../../icons/Search.vue'
import classNames from '../../../../../utils/classNames'
import Img from '../../../../Img.vue'

export default defineComponent({
    name: "MockupContent",
    components: { IconWrapper, PlayFilledIcon, CollectionsIcon, SearchIcon, Img },

    setup(){
      const navIcons = [
          'PlayFilledIcon',
          'CollectionsIcon',
          'SearchIcon'
      ]

      return {
          navIcons,
          classNames
      }
    }
})
</script>
