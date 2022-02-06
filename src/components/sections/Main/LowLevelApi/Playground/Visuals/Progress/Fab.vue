<script lang="ts">
import { computed, defineComponent, h} from "vue";
import Button from "../../../../../../Inputs/Button.vue";
import IconWrapper from "../../../../../../icons/IconWrapper.vue";
import Plus from "../../../../../../icons/Plus.vue";

export default defineComponent({
  name: "Fab",
  components: {
    Button,
    IconWrapper,
    Plus,
  },
  props: {
    iconClass: {
      type: Array,
      default: undefined,
    },
    primary:Boolean,
    tag:{
      type:String,
      default: 'div'
    }
  },
  setup(p) {
    const props = computed(() => p);

    return () => {
      return h(
        Button,
        {
          primary: props.value.primary,
          size: "sm",
          tag: props.value.tag,
          tabindex: "-1",
          class: [
            "w-[48px] h-[48px] clip-none",
          ],
        },
        {
          default: () => {
            return h(
              IconWrapper,
              {
                class: [
                  "text-xl transition-[transform,opacity] transform-gpu duration-200",
                  props.value.iconClass,
                ],
              },
              {
                default: () => h(Plus),
              }
            );
          },
        }
      );
    };
  },
});
</script>
