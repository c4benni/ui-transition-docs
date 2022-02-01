<script lang="ts">
import { computed, defineComponent, h, onBeforeMount, ref, watch } from "vue";
import { undefinedProp } from "../utils/main";
import { Cloudinary } from "cloudinary-core";
import Intersection from "./Intersection.vue";
import { DynamicObject } from "../types";

const cl = new Cloudinary({ cloud_name: "c4benn", secure: true });

const stringOrNumberProp = undefinedProp([Number, String]);

let mounted = false;

// store loaded src as object for faster lookup
const loadedSrc: DynamicObject<number> = {};

export default defineComponent({
  emits: ["animationend", "load-start", "load-success", "load-error"],
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

    onBeforeMount(() => {
      mounted = true;
    });

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
        loaded.value = val;
      };

      img.decoding = "async";

      img.src = getSrc.value;

      img
        .decode()
        .then(() => {
          toggleLoaded(true);
        })
        .catch(() => {
          toggleLoaded(false);
        });
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
      if (mounted && (loadedSrc[getSrc.value] || loaded.value)) {
        return h("img", {
          ...attrs,
          src: getSrc.value,
          alt: props.value.alt,
          height: props.value.height,
          width: props.value.width,
          decoding: "async",
          crossorigin: "anonymous",
          "data-src-cache": props.value.publicId ? getSrc.value : undefined,
          class: [{ "fade-appear": !loadedSrc[getSrc.value] }],
          onAnimationend: (e: AnimationEvent) => {
            emit("animationend", e);
            loadedSrc[getSrc.value] = 1;
          },
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
          config: {
            rootMargin: "72px 0px",
          },
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

            return h("div", {
              ...attrs,
              "aria-label": props.value.alt,
              title: "loading image",
              class: [
                "inline-block pointer-events-none",
                props.value.loadingBackground,
              ],
              style: {
                height: props.value.height
                  ? `${props.value.height}px`
                  : undefined,
                width: props.value.width ? `${props.value.width}px` : undefined,
              },
            });
          },
        }
      );
    };
  },
});
</script>
