<script setup lang="ts">
import type { Porsion } from "typings/global";
import { computed, ref } from "vue";

const emit = defineEmits<{
  "update:change": [value: Porsion];
}>();

interface Props {
  porsion: Porsion;
  id: string;
  height?: string;
  titleSize?: string;
  padding?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: "42px",
  titleSize: "20px",
  padding: "10px",
});

const title = computed(() => {
  const isSmall = props.porsion === "small" ? "Маленькая" : "";
  const isMedium = props.porsion === "medium" ? "Средняя" : "";
  const isLarge = props.porsion === "large" ? "Большая" : "";
  return isSmall || isMedium || isLarge;
});

const isClose = ref<boolean>(false);

function handleChange(event: Event) {
  emit("update:change", (event.target as HTMLSelectElement).value as Porsion);
}
</script>

<template>
  <div class="porsion">
    <span class="porsion__title">Порция: </span>
    <div class="choice-wrapper">
      <details class="choice" :open="isClose">
        <summary
          class="choice__summary"
          @click.prevent.stop="isClose = !isClose">
          <span class="choice__title">{{ title }}</span>
          <div
            :style="[isClose ? 'transform: rotateZ(90deg)' : '']"
            class="choice__img" />
        </summary>

        <div class="choice__content">
          <input
            @input="handleChange"
            :value="'small'"
            :checked="props.porsion === 'small'"
            :name="props.id + 'porsion-radio'"
            :id="props.id + 'small'"
            type="radio" />
          <label class="choice__label" :for="props.id + 'small'"
            >Маленькая</label
          >

          <input
            @input="handleChange"
            :value="'medium'"
            :checked="props.porsion === 'medium'"
            :name="props.id + 'porsion-radio'"
            :id="props.id + 'medium'"
            type="radio" />
          <label class="choice__label" :for="props.id + 'medium'"
            >Средняя</label
          >

          <input
            @input="handleChange"
            :value="'large'"
            :checked="props.porsion === 'large'"
            :name="props.id + 'porsion-radio'"
            :id="props.id + 'large'"
            type="radio" />
          <label class="choice__label" :for="props.id + 'large'">Большая</label>
        </div>
      </details>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.porsion {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: v-bind("$props.titleSize");
    font-weight: 600;
    color: green;
  }

  .choice-wrapper {
    position: relative;
    width: 136px;
    height: v-bind("$props.height");
  }

  .choice {
    position: absolute;
    width: 100%;

    color: green;
    background-color: #fff;
    border: 1px solid green;
    border-radius: 25px;

    user-select: none;
    cursor: pointer;

    &__summary {
      width: 100%;
      padding: v-bind("$props.padding");
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
      gap: 10px;

      marker: none;
      cursor: pointer;
    }

    &__title {
      width: 100%;

      font-size: 18px;
    }

    &__img {
      width: 20px;
      height: 20px;
      cursor: pointer;

      background-image: url("@/assets/svg/select-icon.svg");
      background-repeat: no-repeat;
      background-size: cover;
      flex: 0 0 20px;
    }

    input[type="radio"] {
      display: none;

      &:checked + label {
        background-color: green;
        color: #fff;
      }
    }

    &__label {
      width: 100%;
      padding: 3px 10px;
      display: block;
      cursor: pointer;
      font-size: 18px;
      color: green;
      background-color: #fff;

      &:last-of-type {
        border-radius: 0 0 25px 25px;
      }
    }

    &[open] label:first-of-type {
      border-top: 1px solid green;
    }
  }
}
</style>
