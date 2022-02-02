<script lang="ts">
import {
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  watch,
  computed,
  getCurrentInstance,
  h,
  defineComponent,
  PropType,
  VNode,
  RendererNode,
} from "@vue/runtime-core";
import useBreakpoint from "../hooks/useBreakpoints";
import { isHTML, nextAnimFrame } from "../utils/main";

interface IntersectionConfig {
  threshold?: number | number[];
  rootMargin?: string;
  root?: HTMLElement | null;
}

export interface Entry extends IntersectionObserverEntry {
  inactive?: boolean;
}

const defaultConfig: IntersectionConfig = {
  threshold: 0,
  rootMargin: "0px 0px 0px 0px",
  root: null,
};

export default defineComponent({
  name: "Intersection",

  props: {
    once: Boolean,
    disabled: Boolean,
    config: {
      type: Object as PropType<IntersectionConfig>,
      default: defaultConfig,
    },
  },

  emits: {
    "once-intersected": null,
  },

  setup(p, { emit, slots }) {
    const breakpoints = useBreakpoint();

    const props = reactive(p);

    const i = getCurrentInstance();

    const $vnode = reactive({ el: null as RendererNode | null });

    // @ts-ignore
    const el = computed(() => $vnode.el || i?.ctx?.$el || null);

    const data = reactive({
      isMounted: false,

      entry: {
        inactive: true,
      } as Entry,

      isIntersecting: false,
    });

    const observer = reactive({
      class: null as IntersectionObserver | null,
      async callback(entries: IntersectionObserverEntry[]) {
        for (let entry of entries) {
          const setPayload = () => {
            data.entry = entry;
            data.isIntersecting = entry.isIntersecting;
          };

          const callback = () => {
            if (props.once) {
              setPayload();
              if (data.isIntersecting) {
                methods.disconnect();
                this.class = null;
              }

              return;
            }

            setPayload();
          };

          await nextTick();

          callback();
        }
      },
    });

    data.isMounted = false;

    onMounted(() => {
      data.isMounted = true;
    });

    const methods = {
      async connect() {
        const elem = el.value;

        if (
          observer.class ||
          props.disabled ||
          !data.isMounted ||
          !isHTML(elem)
        ) {
          return;
        }

        let initialOptions = {
          ...defaultConfig,
          ...props.config,
        };

        let options = {
          ...initialOptions,
          threshold: /string|number/i.test(typeof initialOptions.threshold)
            ? // @ts-ignore
              parseFloat(initialOptions.threshold)
            : initialOptions.threshold,
        };

        await nextAnimFrame();

        if (!props.disabled) {
          nextTick(() => {
            observer.class = new IntersectionObserver(
              observer.callback,
              options
            );

            nextTick(() => {
              observer?.class?.observe(elem || el.value);
            });
          });
        }
      },
      async observe() {
        if (!data.isMounted) {
          return;
        }

        data.entry = {} as Entry;
        await nextTick();

        this.connect();
      },
      disconnect() {
        const elem = el.value;
        if (isHTML(elem)) {
          observer.class?.unobserve(elem || el.value);

          observer.class?.disconnect();

          nextTick(() => {
            observer.class = null;

            data.entry = { inactive: true } as Entry;
          });
        }
      },
      refresh() {
        this.disconnect();
        nextTick(() => {
          this.connect();
        });
      },
    };

    const payload = computed(() => {
      const entry = data.entry;

      if (entry.inactive || typeof entry.intersectionRatio == "undefined") {
        return {
          inactive: true,
          entries: {},
        };
      }

      return {
        isIntersecting: data.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        boundingClientRect: entry.boundingClientRect,
        intersectionRect: entry.intersectionRect,
        rootBounds: entry.rootBounds,
        target: entry.target,
        //   time: entry.time,
      };
    });

    watch(
      () => breakpoints.value.is,
      () => data.isMounted && methods.refresh()
    );
    watch(
      () => props.disabled,
      () => data.isMounted && methods.refresh()
    );
    watch(
      () => data.isMounted,
      (n) => {
        n && methods.refresh();
      }
    );
    watch(
      () => props.config,
      () => data.isMounted && methods.refresh()
    );
    watch(
      () => props.once,
      () => data.isMounted && methods.refresh()
    );

    onMounted(() => methods.observe());

    onActivated(() => methods.observe());

    onDeactivated(() => methods.disconnect());

    onBeforeUnmount(() => methods.disconnect());

    return () => {
      const slot = slots?.default?.(payload.value)?.[0];
      if (!slot) {
        return null;
      }

      return h(slot, {
        async onVnodeMounted(vnode: VNode) {
          $vnode.el = vnode.el;

          await nextAnimFrame();

          methods.connect();
          methods.observe();
        },
        onVnodeBeforeUnmount() {
          methods.disconnect();
        },
      });
    };
  },
});
</script>
