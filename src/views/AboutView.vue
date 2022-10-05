<template>
  <main
    class="relative mx-auto flex h-screen w-full max-w-screen-lg flex-col items-center justify-center px-3 pb-32 pt-20"
  >
    <ComingSoonVue />

    <h1 class="mt-4 text-4xl font-semibold">Coming soon...</h1>

    <RouterLink to="/" class="mt-4">
      <n-button type="primary" dashed size="large"> Go Home </n-button>
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";

import ComingSoonVue from "@/components/ComingSoon.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
