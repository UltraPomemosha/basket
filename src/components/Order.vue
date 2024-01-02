<script setup lang="ts">
interface Order {
  weight: number;
  amount: number;
  price: number;
  service: number;
  totalPrice: number;
}
const props = defineProps<{
  order: Order;
}>();
</script>

<template>
  <section class="order">
    <div class="order__container">
      <div class="order__block-wrapper">
        <h3 class="order__title" v-once>Ваш заказ</h3>
        <ul>
          <li class="order__position order__position_weight">
            Все (гр): {{ props.order.weight }}гр
          </li>
          <li class="order__position order__position_amount">
            Количество (шт): {{ props.order.amount }}шт
          </li>
          <li class="order__position order__position_price">
            Общая цена (р): {{ props.order.price }}р
          </li>
          <li class="order__position order__position_service">
            Услуга (10%): {{ props.order.service }}р
          </li>
        </ul>
      </div>
      <div class="order__block-wrapper">
        <p class="order__total-price">Итого: {{ props.order.totalPrice }}р</p>

        <button class="order__to-pay-button">Оплатить</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.order {
  &__container {
    padding: 10px 20px;
    display: flex;
    flex-flow: row nowrap;
    gap: 100px;
  }

  & * {
    color: green;
  }

  &__block-wrapper > *:nth-child(2) {
    margin-top: 20px;
  }

  &__total-price,
  &__title {
    font-size: 24px;
  }

  &__to-pay-button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 2px 20px;

    font-size: 20px;
    font-weight: 600;
    color: #fff;
    background-color: green;
  }
}

ul {
  & > .order__position {
    margin-left: 30px;
    list-style-type: disc;
    list-style-position: outside;
    font-size: 18px;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}

@media (width <= 498px) {
  .order {
    &__container {
      gap: 20px;
      flex-direction: column;
      align-items: center;
    }

    &__to-pay-button {
      margin-top: 10px !important;
    }
  }
}
</style>
