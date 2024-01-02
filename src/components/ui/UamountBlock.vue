<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  "update:amount": [value: number];
}>();

interface Props {
  amount: number;
  buttonSize?: string;
  fontSize?: string;
}

const props = withDefaults(defineProps<Props>(), {
  buttonSize: "30px",
  fontSize: "20px",
});

const amount = ref(props.amount);

watch(
  () => props.amount,
  (newVal) => {
    amount.value = newVal;
  }
);

function decrementAmount(): void {
  amount.value--;
  emit("update:amount", amount.value);
}

function incrementAmount(): void {
  amount.value++;
  emit("update:amount", amount.value);
}
</script>

<template>
  <div class="amount">
    <button
      @click="decrementAmount"
      class="amount__remove"
      :disabled="props.amount < 1">
      -
    </button>
    <span>{{ props.amount }}</span>
    <button @click="incrementAmount" class="amount__add">+</button>
  </div>
</template>

<style lang="scss" scoped>
.amount {
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  & > * {
    text-align: center;
    vertical-align: middle;
    font-size: v-bind("$props.fontSize");
  }
  & > button {
    width: v-bind("$props.buttonSize");
    height: v-bind("$props.buttonSize");
    font-weight: bolder;
    user-select: none;
  }
}
</style>
