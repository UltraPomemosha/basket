<script setup lang="ts"></script>

<template>
  <section class="menu">
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-flow: row wrap;
  gap: 50px;

  padding: 30px 20px;

  background-color: #000;

  @media (width <= 694px) {
    justify-content: center;
  }
}
</style>
