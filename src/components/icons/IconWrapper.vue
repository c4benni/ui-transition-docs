<script lang="ts">
import { computed, defineComponent, h } from "vue";

export default defineComponent({
  name: "IconWrapper",

  props: {
    tag: {
      type: String,
      default: "span",
    },
  },

  setup(p, { slots, attrs }) {
    const props = computed(() => p);

    return () => {
      return h(props.value.tag,{
        ...attrs,
        class:'IconWrapper'
      },[slots.default?.()||null])
    };
  },
});
</script>

<style scoped>
.IconWrapper {
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
}

.IconWrapper > :deep(svg) {
  height: 1em;
  width: 1em;
  fill: currentColor;
  position: absolute;
}
</style>
