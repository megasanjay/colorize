<template>
  <div id="play-container" class="h-full w-full bg-red-50">
    <div class="my-3 flex h-[10px] w-full items-center justify-center">
      <div
        class="h-[10px] bg-blue-400 transition-all"
        :style="timerBarStyle"
      ></div>
    </div>

    <div class="flex w-full flex-col items-center">
      <div
        v-for="row in colorGrid"
        :key="row"
        class="flex w-full justify-around"
      >
        <div
          v-for="item in row"
          :key="item"
          class="h-[20px] cursor-pointer rounded-full transition-all"
          :style="{
            'background-color': item,
            width: circleDimensions,
            height: circleDimensions,
          }"
        ></div>
      </div>
    </div>

    <div>
      <button
        class="rounded-full bg-blue-400 px-4 py-2 text-white"
        @click="renderGrid"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";

const activeColor = ref("red");
const rows = ref(10);
const cols = ref(5);
const gameMode = ref("easy");
const colorGrid: Ref<any> = ref([]);

const timerBarStyle = computed(() => {
  return {
    color: activeColor.value,
    width: "50%",
  };
});

const circleDimensions = computed(() => {
  if (gameMode.value === "easy") {
    return "50px";
  } else if (gameMode.value === "medium") {
    return "50px";
  } else {
    return "50px";
  }
});

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

/**
 * Converts an RGB color value to HEX string
 * @param r 0-255
 * @param g 0-255
 * @param b 0-255
 */
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

/**
 * Generate a random number between 0 and max
 * @param max Maximum value of the range - This number is not included
 */
const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 * Modify a number by a specified range
 * @param baseColor Number to modify
 * @param range Range to modify the number by
 */
const modifyColor = (baseColor: number, range: number) => {
  if (baseColor + range > 255) {
    return baseColor - range;
  } else if (baseColor - range < 0) {
    return baseColor + range;
  } else {
    const random = generateRandomNumber(2);
    if (random == 0) {
      return baseColor + range;
    } else {
      return baseColor - range;
    }
  }
};

const renderGrid = () => {
  let baseColorArray = [0, 0, 0];
  let baseColor = "000000";
  let changedColor = "FFFFFF";

  colorGrid.value = [];

  if (gameMode.value === "easy") {
    rows.value = 3;
    cols.value = 3;

    baseColorArray = [
      generateRandomNumber(255),
      generateRandomNumber(255),
      generateRandomNumber(255),
    ];

    baseColor = rgbToHex(
      baseColorArray[0],
      baseColorArray[1],
      baseColorArray[2]
    );

    const changedChannel = generateRandomNumber(3);

    baseColorArray[changedChannel] = modifyColor(
      baseColorArray[changedChannel],
      30
    );

    changedColor = rgbToHex(
      baseColorArray[0],
      baseColorArray[1],
      baseColorArray[2]
    );
  }

  if (gameMode.value === "medium") {
    rows.value = 5;
    cols.value = 5;
  }

  if (gameMode.value === "hard") {
    rows.value = 7;
    cols.value = 7;
  }

  const randomRow = generateRandomNumber(rows.value);
  const randomCol = generateRandomNumber(cols.value);

  for (let i = 0; i < rows.value; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols.value; j++) {
      if (i === randomRow && j === randomCol) {
        row.push(changedColor);
      } else {
        row.push(baseColor);
      }
    }
    colorGrid.value.push(row);
  }

  console.log(colorGrid.value);
};

onMounted(() => {
  // start game
  gameMode.value = "easy";
  renderGrid();
});
</script>
