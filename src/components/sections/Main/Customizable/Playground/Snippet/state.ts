import { ref, watch } from "vue";

export type Snippet = "Scale" | "TranslateX" | "TranslateY" | "Rotate";

export type Tab = "App.vue" | "config.js";

export type CodeSnippets = {
  [key in Snippet]: {
    [key in Tab]?: string;
  };
};

export type VisualsState = {
  [key in Snippet]: boolean | number;
};

const getConfig = (arg: {
  configName: string;
  configDefaults: string;
  tFrom: string;
  tTo: string;
  defaultValuesComment: string;
}) => {
  const { configName, configDefaults, tFrom, tTo, defaultValuesComment } = arg;

  return {
    "config.js": `//set defaults as ${defaultValuesComment}~0${configName}: (${configDefaults}) => {~2return {~4from: {~6transform: \`${tFrom}\`,~6opacity: '{0}',~4},~4to: {~6transform: \`${tTo}\`,~6opacity: '{1}'~4}~2};~0}`,
  };
};

const overlayMarkup = (arg: {
  name: string;
  backdrop?: boolean;
  config?: string;
  configName: string;
  configDefaults: string;
  tFrom: string;
  tTo: string;
  onlyContent?: boolean;
  defaultValuesComment: string;
}) => {
  const {
    backdrop,
    name,
    config,
    configName,
    configDefaults,
    tFrom,
    tTo,
    onlyContent,
    defaultValuesComment,
  } = arg;

  const contentTab = (_onlyContent: string, _all: string) =>
    onlyContent ? _onlyContent : _all;

  const content = `<UiTransition config="${
    config || configName.replace(/'/g, "")
  }">${contentTab("~2", "~4")}<div v-if="open" class="content">${contentTab(
    "~4",
    "~6"
  )}<!-- ${name} content -->${contentTab("~2", "~4")}</div>${contentTab(
    "~0",
    "~2"
  )}</UiTransition/>`;

  return {
    "App.vue": onlyContent
      ? content
      : `<div class="${name}">${
          backdrop
            ? '~2<!-- fade is the default -->~2<UiTransition>~4<div v-if="open" class="backdrop"/>~2</UiTransition/>~0'
            : ""
        }~2${content}~0</div>`,
    ...getConfig({
      configName,
      configDefaults,
      tFrom,
      tTo,
      defaultValuesComment,
    }),
  };
};

export const snippets: CodeSnippets = {
  Scale: overlayMarkup({
    name: "dialog",
    backdrop: true,
    config: "scale(0.75, 1)",
    configName: "scale",
    configDefaults: "from = 1, to = 0",
    tFrom: "scale3d({${from}}, {${from}}, 1)",
    tTo: "scale3d({${to}}, {${to}}, 1)",
    defaultValuesComment: "0 & 1",
  }),
  TranslateX: overlayMarkup({
    name: "drawer",
    backdrop: true,
    configName: "'slide-x'",
    configDefaults: "from = '-100%', to = '0%'",
    tFrom: "translate3d({${from}}, 0, 0)",
    tTo: "translate3d({${to}}, 0, 0)",
    defaultValuesComment: "-100% & 0%",
  }),
  TranslateY: overlayMarkup({
    name: "toast",
    backdrop: true,
    configName: "'slide-y'",
    configDefaults: "from = '-100%', to = '0%'",
    tFrom: "translate3d(0, {${from}}, 0)",
    tTo: "translate3d(0, {${to}}, 0)",
    onlyContent: true,
    defaultValuesComment: "-100% & 0%",
  }),
  Rotate: {
    "App.vue": `<UiTransition config='rotate(45deg)'>~2<button :key="activeTab" class="fab">~4<!-- content -->~2</button>~0</UiTransition>`,
    ...getConfig({
      configName: "rotate",
      configDefaults: `from = '360deg', to = '0deg'`,
      defaultValuesComment: "360deg & 0deg",
      tFrom: "rotate({360deg})",
      tTo: "rotate({0deg})",
    }),
  },
};

export const activeSnippet = ref<Snippet>("Scale");

export const activeTab = ref<Tab>("App.vue");

const initialVisualsState = () => ({
  Scale: false,
  TranslateX: false,
  TranslateY: false,
  Rotate: 0,
});

export const visualsState = ref<VisualsState>(initialVisualsState());

watch(
  () => activeSnippet.value,
  () => {
    visualsState.value = initialVisualsState();
  }
);
