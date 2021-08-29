<template>
  <Chessehc/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chessehc from "./components/Chessehc.vue";

export default defineComponent({
  name: "App",
  components: {
    Chessehc,
  },
});
</script>
