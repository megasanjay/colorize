<template>
  <header class="fixed top-0 z-10 w-full bg-white">
    <div
      class="relative mx-auto flex h-14 w-full max-w-screen-lg items-center justify-between"
    >
      <div class="fixed bottom-2 right-2 text-sm text-slate-500">
        v{{ version }}
      </div>
      <RouterLink to="/">
        <div
          class="flex cursor-pointer items-center justify-center pl-4 text-base font-bold transition-all hover:text-sky-500"
        >
          <Icon icon="arcticons:syska-smart-home" width="30" height="30" />
        </div>
      </RouterLink>

      <nav
        :class="{
          'debug-screens': development,
        }"
        class="relative pr-1"
      >
        <div class="flex">
          <ul class="hidden items-center justify-between space-x-4 md:flex">
            <li v-for="link in links" :key="link.href">
              <RouterLink :to="link.href">
                <span
                  class="cursor-pointer text-base font-medium transition-all hover:text-sky-600"
                >
                  {{ link.label }}
                </span>
              </RouterLink>
            </li>
          </ul>

          <div
            class="flex cursor-pointer items-center justify-center rounded-lg p-2 transition-all hover:bg-slate-100 hover:text-sky-500 md:hidden"
          >
            <Icon
              icon="bytesize:menu"
              width="25"
              height="25"
              @click="toggleSidebar"
            />
          </div>

          <div class="mx-4 !hidden w-[2px] bg-slate-400" aria-hidden></div>

          <a
            href="https://github.com/megasanjay"
            target="_blank"
            rel="noopener noreferrer"
            class="umami--click--github-profile-link mx-2 hidden items-center"
          >
            <div
              class="flex cursor-pointer items-center justify-center transition-all hover:text-sky-500"
            >
              <Icon icon="akar-icons:github-fill" width="25" height="25" />
            </div>
          </a>

          <a
            href="https://twitter.com/megasanjay"
            target="_blank"
            rel="noopener noreferrer"
            class="umami--click--twitter-profile-link mx-2 hidden items-center"
          >
            <div
              class="flex cursor-pointer items-center justify-center transition-all hover:text-sky-500"
            >
              <Icon icon="akar-icons:twitter-fill" width="25" height="25" />
            </div>
          </a>
        </div>

        <transition name="slide-fade" appear mode="out-in">
          <div class="fixed top-0 right-0 z-20" v-show="sidebarOpen">
            <ul
              className=" flex h-screen w-auto flex-col border border-r-2 bg-white px-2 text-right"
            >
              <div
                className="mr-2 mt-1 mb-2 flex cursor-pointer items-center justify-end pt-2 transition-all hover:text-sky-500"
                @click="toggleSidebar"
              >
                <Icon icon="ci:close-big" width="25" height="25" />
              </div>

              <li
                v-for="link in links"
                :key="link.href"
                class="cursor-pointer rounded-md px-3 py-2 text-base transition-all hover:bg-slate-100 hover:text-sky-600"
              >
                <RouterLink :to="link.href">
                  <span className=" "> {{ link.label }} </span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </transition>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { version } from "../../../package.json";
const links = [
  {
    href: "/leaderboard",
    label: "Leaderboard",
  },
  {
    href: "/statistics",
    label: "Statistics",
  },
];

const development = process.env.NODE_ENV === `development`;

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.15s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
