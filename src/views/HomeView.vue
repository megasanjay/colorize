<script setup lang="ts">
import { RouterLink } from "vue-router";

import ButtonComponent from "@/components/ui/ButtonComponent.vue";
</script>

<template>
  <div class="flex flex-col">
    <Vue3Lottie
      animationLink="https://assets7.lottiefiles.com/packages/lf20_a2pfiv6m.json"
      :height="200"
      :width="200"
      direction="alternate"
      class="m-0 hidden"
    />

    <h1
      v-motion
      :initial="{ opacity: 0, y: 200 }"
      :enter="{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 100,
        },
      }"
      :variants="{ custom: { scale: 2 } }"
      :hovered="{
        backgroundSize: '150%',
      }"
      class="cursor-default bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text pb-8 text-7xl font-extrabold text-transparent hover:animate-gradientMove md:text-8xl"
    >
      Colorize
    </h1>

    <h2 class="pb-4 text-3xl font-bold">How to play?</h2>

    <p class="pb-2 text-xl font-medium">
      You will be shown a series of circles with colors. You have to select the
      one that is different from the rest. It's that simple :)
    </p>

    <p class="pb-8 text-lg font-medium">
      psst... There is also a timer to keep you on your toes...
    </p>

    <RouterLink to="/play">
      <div class="flex justify-center md:justify-start">
        <ButtonComponent text="Let's play" />
      </div>
    </RouterLink>
  </div>
</template>
