<template>
  <HeaderComponent />

  <RouterView />

  <notifications />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import HeaderComponent from "./components/ui/HeaderComponent.vue";
</script>
