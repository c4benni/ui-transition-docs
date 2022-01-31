<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  onBeforeMount,
  ref,
  watch,
} from "vue";
import { undefinedProp } from "../utils/main";
import { Cloudinary } from "cloudinary-core";
import Intersection from "./Intersection.vue";

const cl = new Cloudinary({ cloud_name: "c4benn", secure: true });

const stringOrNumberProp = undefinedProp([Number, String]);

let mounted = false;

export default defineComponent({
  emits: ["load-start", "load-success", "load-error"],
  props: {
    publicId: undefinedProp(String),
    src: undefinedProp(String),
    alt: undefinedProp(String),
    width: stringOrNumberProp,
    height: stringOrNumberProp,
    quality: stringOrNumberProp,
    loadingBackground: {
      type: String,
      default: "bg-card dark:bg-card-dark",
    },
  },
  setup(p, { attrs, emit }) {
    const props = computed(() => p);
    const loaded = ref(false);

    onBeforeMount(()=>{
      mounted = true;
    })

    const intersected = ref(false);

    const getSrc = computed(() => {
      const { publicId, src, height, width, quality } = props.value;

      if (publicId) {
        return cl.url(`uiTransition/${publicId}`, {
          transformation: [
            {
              height: "300",
              width,
              quality,
            },
          ],
        });
      }
      return src;
    });

    const loadImage = () => {
      if (!intersected.value) return;

      loaded.value = false;

      emit("load-start");

      const img = new Image();

      const toggleLoaded = (val: boolean) => {
        img.onerror = null;

        img.onload = null;

        loaded.value = val;
      };

      img.onload = () => {
        toggleLoaded(true);
      };

      img.onerror = () => {
        toggleLoaded(false);
      };

      img.src = getSrc.value;
    };

    watch(
      () => getSrc.value,
      () => {
        intersected.value = false;

        loadImage();
      }
    );

    watch(
      () => intersected.value,
      (n) => {
        n && loadImage();
      }
    );

    return () => {
      if (loaded.value && mounted) {
        return h("img", {
          ...attrs,
          src: getSrc.value,
          alt: props.value.alt,
          height: props.value.height,
          width: props.value.width,
          decoding: "async",
          crossorigin: "anonymous",
          "data-src-cache": props.value.publicId ? getSrc.value : undefined,
          onLoad: () => {
            requestAnimationFrame(() => emit("load-success"));
          },
          onError: () => {
            emit("load-error");
          },
        });
      }
      return h(
        Intersection,
        {
          disabled: intersected.value,
        },
        {
          default: ({
            isIntersecting,
            inactive,
          }: {
            inactive: boolean;
            isIntersecting: boolean;
          }) => {
            !inactive && (intersected.value = isIntersecting);

            return h("picture", {
              ...attrs,
              title: props.value.alt,
              class: props.value.loadingBackground,
              style: {
                height: `${props.value.height}px`,
                width: `${props.value.width}px`,
              },
            });
          },
        }
      );
    };
  },
});
</script>
