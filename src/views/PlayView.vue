<template>
  <main
    class="relateive mx-auto flex h-full w-full max-w-screen-lg flex-col items-center px-3 pb-32 pt-20"
  >
    <div id="play-container" class="h-full w-full bg-red-50">
      <div class="my-3 flex h-[10px] w-full items-center justify-center">
        <div class="timer-bar" :style="timerBarStyle" v-show="!gameOver"></div>
      </div>

      <div class="flex w-full flex-col items-center" v-show="!gameOver">
        <div
          v-for="(row, rowIndex) in colorGrid"
          :key="rowIndex"
          class="my-2 flex justify-center"
        >
          <div
            v-for="(item, colIndex) in row"
            :key="colIndex"
            class="mx-3 flex h-[20px] cursor-pointer items-center justify-center rounded-full transition-all"
            :style="{
              'background-color': item,
              width: circleDimensions,
              height: circleDimensions,
            }"
            @click="selectOption(rowIndex, colIndex)"
          >
            <span
              class="text-xs text-white"
              v-if="
                colIndex === randomCol && rowIndex === randomRow && development
              "
            >
              ...
            </span>
          </div>
        </div>
      </div>

      <div
        class="my-3 flex w-full items-center justify-center"
        v-show="!gameOver"
      >
        <span>{{ currentTurn }} / 30</span>
      </div>

      <div class="my-3 flex flex-col" v-show="gameOver">
        <p class="text-lg">Mode: {{ gameInfo.gameMode }}</p>
        <p class="text-md">
          Score: <span>{{ gameInfo.totalScore }}</span>
        </p>

        <n-divider />

        <n-collapse>
          <n-collapse-item title="Round Summary" name="1">
            <n-timeline size="large">
              <n-timeline-item
                v-for="(item, index) in gameInfo.rounds"
                :key="index"
                :type="getTimeLineType(item.result)"
                :title="`Round ${index + 1}`"
                :content="`Score: ${item.score}`"
              >
                <template #footer>
                  <div class="flex items-center justify-start">
                    <span class="text-sm">Colors: </span>
                    <div
                      class="ml-3 mr-1 h-[15px] w-[15px] rounded-md"
                      :style="{ backgroundColor: item.baseColor }"
                    />
                    <div
                      class="ml-1 h-[15px] w-[15px] rounded-md"
                      :style="{ backgroundColor: item.changedColor }"
                    />
                  </div>
                </template>
              </n-timeline-item>
            </n-timeline>
          </n-collapse-item>
        </n-collapse>
      </div>

      <div
        class="my-3 flex w-full items-center justify-center"
        v-if="development"
      >
        <span>{{ roundCode }}</span>
      </div>

      <div v-if="development">
        <n-button type="warning" dashed @click="renderGrid" size="large">
          Reset
        </n-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  NButton,
  NCollapse,
  NCollapseItem,
  NDivider,
  NTimeline,
  NTimelineItem,
} from "naive-ui";
import { v4 as uuidv4 } from "uuid";
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";

const rows = ref(10);
const cols = ref(5);

const randomRow = ref(-1);
const randomCol = ref(-1);

interface RoundInfoType {
  round: number;
  result: string;
  score: number;
  baseColor: string;
  changedColor: string;
}

interface GameInfoType {
  id: string;
  gameMode: string;
  totalScore: number;
  rounds: RoundInfoType[];
}

const gameInfo = ref<GameInfoType>({
  id: uuidv4(),
  gameMode: "Standard",
  totalScore: 0,
  rounds: [],
});

const colorGrid: Ref<any> = ref([]);
const baseColor = ref("000000");
const changedColor = ref("ffffff");

const timer: any = ref(null);
const timerInterval = ref(50);

const totalRounds = ref(30);

const currentTurn = ref(1);
const roundCode = ref("");
const gameOver = ref(true);

const currentDifficulty = ref("easy");

const development = process.env.NODE_ENV === `development`;

const timerBarStyle = ref({
  "background-color": "DarkOrange",
  width: "100%",
});

/**
 * Compute the dimensions of the circles
 */
const circleDimensions = computed(() => {
  if (currentDifficulty.value === "easy") {
    return "50px";
  } else if (currentDifficulty.value === "medium") {
    return "40px";
  } else {
    return "30px";
  }
});

const getTimeLineType = (result: string) => {
  if (result === "s-correct") {
    return "success";
  } else if (result === "s-wrong") {
    return "error";
  } else if (result === "no-time") {
    return "warning";
  } else {
    return "info";
  }
};

/** rgb to hex color conversion helper function */
const componentToHex = (c: number) => {
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
  if (baseColor + range <= 255 && baseColor - range >= 0) {
    const coinFlip = generateRandomNumber(2);
    if (coinFlip === 0) {
      return baseColor + range;
    } else {
      return baseColor - range;
    }
  } else if (baseColor + range > 255) {
    return baseColor - range;
  } else {
    return baseColor + range;
  }
};

/**
 * Keep track of the timer for the current round
 */
const startTimer = () => {
  timer.value = setInterval(() => {
    const timerWidth = parseInt(timerBarStyle.value.width);

    if (timerWidth > 0 && timerWidth <= 50) {
      timerBarStyle.value["background-color"] = "red";
    } else if (timerWidth > 50 && timerWidth <= 100) {
      timerBarStyle.value["background-color"] = "DarkOrange";
    }

    if (timerBarStyle.value.width === "0%") {
      const roundDetails = {
        round: currentTurn.value,
        score: 0,
        result: "",
        baseColor: baseColor.value,
        changedColor: changedColor.value,
      };

      roundCode.value = "no-time";
      roundDetails.result = "no-time";

      gameInfo.value.rounds.push(roundDetails);

      nextTurn();
    } else {
      timerBarStyle.value.width = `${timerWidth - 1}%`;
    }
  }, timerInterval.value);
};

/**
 * Reset the timer bar
 */
const resetTimer = () => {
  clearInterval(timer.value);

  timerBarStyle.value["background-color"] = "DarkOrange";
  timerBarStyle.value.width = "100%";
};

const recordGame = () => {
  const statisticsString = localStorage.getItem("statistics");
  const statistics = JSON.parse(statisticsString || "[]");

  statistics.push(gameInfo.value);

  localStorage.setItem("statistics", JSON.stringify(statistics));
};

const showFinalScore = () => {
  const finalScore = gameInfo.value.totalScore;
  const finalScoreElement = document.getElementById("final-score");

  if (finalScoreElement) {
    finalScoreElement.innerHTML = `Your final score is ${finalScore}`;
  }
};

/**
 * Check game state and run next turn functions
 */
const nextTurn = () => {
  resetTimer();

  currentTurn.value++;

  if (gameInfo.value.gameMode === "Standard") {
    if (currentTurn.value <= totalRounds.value) {
      if (currentTurn.value <= 10) {
        currentDifficulty.value = "easy";
        timerInterval.value = 50;
      } else if (currentTurn.value <= 20) {
        currentDifficulty.value = "medium";
        timerInterval.value = 40;
      } else {
        currentDifficulty.value = "hard";
        timerInterval.value = 30;
      }

      renderGrid();
    } else {
      gameInfo.value.rounds.forEach((round) => {
        gameInfo.value.totalScore += round.score;
      });

      roundCode.value = "game-over";
      gameOver.value = true;

      console.log(gameInfo.value);

      // recordGame();
      showFinalScore();
    }
  } else if (gameInfo.value.gameMode === "endless") {
    if (currentTurn.value <= 10) {
      currentDifficulty.value = "easy";
    } else if (currentTurn.value <= 20) {
      currentDifficulty.value = "medium";
    } else {
      currentDifficulty.value = "hard";
    }

    renderGrid();
  }
};

/**
 * Function to generate a colored grid to be displayed in the UI
 */
const renderGrid = () => {
  let baseColorArray = [0, 0, 0];

  let colorRange = 100;

  colorGrid.value = [];

  if (currentDifficulty.value === "easy") {
    rows.value = 3;
    cols.value = 3;

    colorRange = 50;
  }

  if (currentDifficulty.value === "medium") {
    cols.value = rows.value = 5;

    colorRange = 30;
  }

  if (currentDifficulty.value === "hard") {
    cols.value = rows.value = 6;

    colorRange = 15;
  }

  baseColorArray = [
    generateRandomNumber(255),
    generateRandomNumber(255),
    generateRandomNumber(255),
  ];

  baseColor.value = rgbToHex(
    baseColorArray[0],
    baseColorArray[1],
    baseColorArray[2]
  );

  const changedChannel = generateRandomNumber(3);

  baseColorArray[changedChannel] = modifyColor(
    baseColorArray[changedChannel],
    colorRange
  );

  changedColor.value = rgbToHex(
    baseColorArray[0],
    baseColorArray[1],
    baseColorArray[2]
  );

  randomRow.value = generateRandomNumber(rows.value);
  randomCol.value = generateRandomNumber(cols.value);

  for (let i = 0; i < rows.value; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols.value; j++) {
      if (i === randomRow.value && j === randomCol.value) {
        row.push(changedColor.value);
      } else {
        row.push(baseColor.value);
      }
    }
    colorGrid.value.push(row);
  }

  startTimer();
};

/**
 * Function to check if the user clicked on the correct circle
 * @param row Row of the circle
 * @param col Column of the circle
 */
const selectOption = (rowIndex: number, colIndex: number) => {
  // get round score
  const timerBarWidth = parseInt(timerBarStyle.value.width);

  const roundDetails = {
    round: currentTurn.value,
    score: timerBarWidth,
    result: "",
    baseColor: baseColor.value,
    changedColor: changedColor.value,
  };

  if (rowIndex === randomRow.value && colIndex === randomCol.value) {
    if (currentDifficulty.value === "easy") {
      roundDetails.score = timerBarWidth * 50;
    } else if (currentDifficulty.value === "medium") {
      roundDetails.score = timerBarWidth * 100;
    } else {
      roundDetails.score = timerBarWidth * 200;
    }
  } else {
    roundDetails.score = 0;
  }

  console.log(roundDetails.score);

  if (rowIndex === randomRow.value && colIndex === randomCol.value) {
    roundCode.value = "s-correct";
    roundDetails.result = "s-correct";
  } else {
    roundCode.value = "s-wrong";
    roundDetails.result = "s-wrong";
  }

  gameInfo.value.rounds.push(roundDetails);

  if (gameOver.value) {
    return;
  }

  nextTurn();
};

onMounted(() => {
  if (gameInfo.value.gameMode === "Standard") {
    totalRounds.value = 12;
    currentDifficulty.value = "easy";
    timerInterval.value = 50;
  } else if (gameInfo.value.gameMode === "endless") {
    totalRounds.value = -1;
    currentDifficulty.value = "easy";
  }

  // renderGrid();
});
</script>

<style scoped>
.timer-bar {
  height: 10px;
  background-color: DarkOrange;
  width: 100%;
  border-radius: 5px;

  -webkit-transition: background-color 0.4s ease-out;
  -moz-transition: background-color 0.4s ease-out;
  -o-transition: background-color 0.4s ease-out;
  transition: background-color 0.4s ease-out;
}
</style>
