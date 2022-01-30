<template>
  <Header />
  <Main/>
  <Footer />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "@vue/runtime-core";
import Button from "./components/Inputs/Button.vue";
import { themeMediaListener } from "./utils/theme";
import Header from "./components/sections/Header/index.vue";
import Footer from "./components/sections/Footer/index.vue";
import isTouchDevice from "./hooks/isTouchDevice";
import Main from "./components/sections/Main/index.vue";

export default defineComponent({
  name: "App",
  components: { Button, Header, Footer, Main },

  setup() {
    onBeforeMount(() => {
      themeMediaListener();

      const useIsTouchDevice = isTouchDevice();

      if (useIsTouchDevice.value.touchDevice) {
        (document.body || document.querySelector("body"))
        .addEventListener(
          "touchstart",
          () => {},
          {
            passive: true,
          }
        );
      }
    });
  },
});
</script>
