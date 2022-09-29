<template>
  <HeaderComponent />

  <main class="mx-auto flex w-full max-w-screen-lg flex-col px-3 pb-32 pt-20">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import HeaderComponent from "./components/ui/HeaderComponent.vue";
</script>
