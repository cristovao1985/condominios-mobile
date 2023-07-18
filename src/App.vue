<template>
  <div>
    <div class="text-center">
      <q-btn to="home" class="primary"> Acessar painel</q-btn>
    </div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  mounted() {},
});
</script>
