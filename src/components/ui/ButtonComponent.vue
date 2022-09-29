<template>
  <div>
    <a
      href="#_"
      class="group relative inline-flex items-center justify-start overflow-hidden rounded border border-gray-200 bg-gray-100 py-3 pl-4 pr-12 font-semibold text-indigo-600 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6"
    >
      <span
        class="absolute bottom-0 left-0 h-1 w-full bg-indigo-600 transition-all duration-150 ease-in-out group-hover:h-full"
      />
      <span
        class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
      >
        <svg
          class="h-5 w-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>
      <span
        class="absolute left-0 -translate-x-12 pl-2.5 duration-200 ease-out group-hover:translate-x-0"
      >
        <svg
          class="h-5 w-5 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>

      <span
        class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white"
      >
        {{ text }}
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
