<script setup lang="ts"></script>

<template>
  <button class="basket-button" />
</template>

<style lang="scss" scoped>
.basket-button {
  display: block;
  width: 50px;
  height: 50px;

  background-image: url("@/assets/svg/basket-icon.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;

  @media (hover: hover) {
    & {
      scale: 1;
      transition: scale 0.3s linear;

      &:hover {
        scale: 1.1;
      }
    }
  }
}
</style>
