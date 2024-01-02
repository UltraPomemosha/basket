<script setup lang="ts">
import Menu from "./Menu.vue";
import Order from "./Order.vue";
import Basket from "./Basket.vue";

import UamountBlock from "@/components/ui/UamountBlock.vue";
import Uselect from "@/components/ui/Uselect.vue";
import UbasketButton from "@/components/ui/UbasketButton.vue";

import { useSwitchPorsion } from "@/composables/useSwitchPorsion.ts";

import { reactive, ref, watch, computed } from "vue";
import type { Porsion } from "typings/global";
import { type Product } from "typings/interfaces/product";

const products: Product[] = reactive([
  {
    id: "title1",
    img: "",
    title: "title 1",
    description: "description 1",
    weight: 300,
    price: 200,
    defaultPrice: 200,
    amount: 0,
    totalPrice: 0,
    porsion: "small",
    isAddedToBasket: false,
  },
  {
    id: "title2",
    img: "",
    title: "title 2",
    description: "description 2",
    weight: 400,
    price: 300,
    defaultPrice: 300,
    amount: 0,
    totalPrice: 0,
    porsion: "small",
    isAddedToBasket: false,
  },
  {
    id: "title3",
    img: "",
    title: "title 3",
    description: "description 3",
    weight: 420,
    price: 400,
    defaultPrice: 400,
    amount: 0,
    totalPrice: 0,
    porsion: "small",
    isAddedToBasket: false,
  },
]);

const order = reactive({
  weight: 0,
  amount: 0,
  price: 0,
  service: 0,
  totalPrice: 0,
});

function countOrder() {
  const result = {
    weight: 0,
    amount: 0,
    price: 0,
    service: 0,
    totalPrice: 0,
  };

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    result.weight += product.weight * product.amount;
    result.amount += product.amount;
    result.price += product.totalPrice;
  }
  result.service = result.price / 10;
  result.totalPrice = result.price + result.service;

  order.weight = result.weight;
  order.amount = result.amount;
  order.price = result.price;
  order.service = result.service;
  order.totalPrice = result.totalPrice;
}

const basketProducts = ref<Product[]>([]);

const correctBasketProductLength = computed(
  () => basketProducts.value.length > 0
);

const isShowBasket = ref<boolean>(false);

function handleAmount(value: number, id: string) {
  const product = products.find((el) => el.id === id);
  const basketProduct = basketProducts.value.find((el) => el.id === id);
  if (product) {
    product.amount = value;
    useSwitchPorsion(product, basketProduct);
  }
  countOrder();
}

function handleSelectPorsion(value: Porsion, id: string) {
  const product = products.find((el) => el.id === id);
  const basketProduct = basketProducts.value.find((el) => el.id === id);
  if (product) {
    product.porsion = value;
    useSwitchPorsion(product, basketProduct);
  }
  countOrder();
}

function addProductToBasket(product: Product) {
  product.isAddedToBasket = true;
  basketProducts.value.push(product);
}

function removeFromBasket(id: string) {
  const product = products.find((el) => el.id === id);
  if (product) product.isAddedToBasket = false;
  basketProducts.value = basketProducts.value.filter((el) => el.id !== id);
}
</script>

<template>
  <UbasketButton class="show-basket" @click="isShowBasket = true" v-once
    >Открыть корзину</UbasketButton
  >
  <Menu>
    <article v-for="product in products" class="product" :key="product.id">
      <img :src="product.img" :alt="product.title" class="product-img" />
      <div class="product__info">
        <h2 class="product__title">{{ product.title }}</h2>
        <p class="product__description">{{ product.description }}</p>

        <p class="product__weight">{{ product.weight }}гр</p>
        <p class="product__price">{{ product.price }} р</p>
        <Uselect
          :key="product.id + 'select'"
          class="product__porsion"
          @update:change="handleSelectPorsion($event, product.id)"
          :porsion="product.porsion"
          :id="product.id" />
        <UamountBlock
          @update:amount="handleAmount($event, product.id)"
          class="product__amount"
          :amount="product.amount" />
        <p class="product__total-price">{{ product.totalPrice }} р</p>
      </div>
      <button
        v-show="!product.isAddedToBasket"
        @click="addProductToBasket(product)"
        class="product__add-to-basket product__button">
        Добавить в корзину
      </button>
      <button
        v-show="product.isAddedToBasket"
        @click="removeFromBasket(product.id)"
        class="product__add-to-basket product__button">
        Удалить из корзины
      </button>
    </article>
  </Menu>

  <Order :order="order" />

  <Basket
    :isEmpty="correctBasketProductLength"
    :price="order.price"
    v-if="isShowBasket">
    <UbasketButton class="unshow-basket" @click="isShowBasket = false" />
    <article
      v-for="product in basketProducts"
      class="basket-product"
      :key="product.id + '-basket'">
      <img :src="product.img" :alt="product.title" class="basket-product-img" />
      <div>
        <h2 class="basket-product__title">{{ product.title }}</h2>
        <p class="basket-product__description">{{ product.description }}</p>
      </div>
      <div class="basket-product__info">
        <p class="basket-product__weight">{{ product.weight }}гр</p>
        <p class="basket-product__price">{{ product.price }} р</p>
        <Uselect
          class="basket-product__porsion"
          @update:change="handleSelectPorsion($event, product.id)"
          :porsion="product.porsion"
          :id="product.id + '-basket'"
          height="32px"
          titleSize="18px"
          padding="4px" />
        <UamountBlock
          @update:amount="handleAmount($event, product.id)"
          class="basket-product__amount"
          :amount="product.amount"
          fontSise="16px"
          buttonSize="20px" />
        <p class="basket-product__total-price">{{ product.totalPrice }} р</p>

        <button
          @click="removeFromBasket(product.id)"
          class="basket-product__remove-from-basket basket-product__button">
          Удалить из корзины
        </button>
      </div>
    </article>
  </Basket>
</template>

<style lang="scss" scoped>
.show-basket {
  position: absolute;
  top: 5px;
  right: 30px;
}

.unshow-basket {
  margin: 10px 20px 10px auto;
}
</style>
