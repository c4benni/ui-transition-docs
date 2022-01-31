<template>
    <section
        class="mt-16 xs:px-[0.375rem] md:px-0 max-w-lg md:max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
    >
        <Card
            v-for="feature in features"
            :key="feature.title"
            :title="feature.title"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi molestiae nisi fugiat ex quam eveniet commodi ad reprehenderit non accusamus. Error consequuntur, beatae voluptatem sed illo voluptatibus distinctio atque quisquam.
        </Card>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from './Card.vue'

export default defineComponent({
    name: "Features",
    components: { Card },

    setup(){
        const feature = (title:string, body:string) =>({
            title,body
        })

        const features = [
            feature('60fps', ''),
            feature('Dynamic', ''),
            feature('Optimized', ''),
            feature('Open Source', '')
        ]

        return {
            features
        }
    }
})
</script>
