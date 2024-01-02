<script setup lang="ts">
const props = defineProps<{
  price: number;
  isEmpty: boolean;
}>();
</script>

<template>
  <section class="basket">
    <div class="basket__container">
      <slot></slot>

      <p v-show="isEmpty" class="basket__price">Итого: {{ props.price }}р</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.basket {
  position: fixed;
  overflow-y: scroll;
  top: 0;
  right: 0;

  width: 50vw;
  height: 100%;

  background-color: gray;
  border-left: 2px solid green;

  &__container {
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }

  &__price {
    margin: 20px 0 10px auto;
    padding: 5px 30px;
    width: max-content;
    background-color: #fff;
    font-size: 24px;
    font-weight: 600;
    color: green;
  }
}

@media (width <= 1300px) {
  .basket__container {
    display: grid;
    grid-template-columns: auto;
  }
}

@media (width <= 992px) {
  .basket {
    width: 100%;
  }
}
</style>
