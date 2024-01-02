import type { Product } from "typings/interfaces/product";

export function useSwitchPorsion(product: Product, basketProduct?: Product){
  if(basketProduct){
    switch (product.porsion) {
      case "small":
        basketProduct.amount = product.amount;
        product.price = product.defaultPrice;
        product.totalPrice = product.defaultPrice * product.amount;
        basketProduct.price = product.price;
        basketProduct.totalPrice = basketProduct.defaultPrice * basketProduct.amount;
        break;
  
      case "medium":
        basketProduct.amount = product.amount;
        product.price = product.defaultPrice * 1.5;
        product.totalPrice = product.price * product.amount;
        basketProduct.price = product.price;
        basketProduct.totalPrice = basketProduct.price * basketProduct.amount;
        break;
  
      case "large":
        basketProduct.amount = product.amount;
        product.price = product.defaultPrice * 2;
        product.totalPrice = product.price * product.amount;
        basketProduct.price = product.price;
        basketProduct.totalPrice = basketProduct.price * basketProduct.amount;
        break;
    }
  }else{
    switch (product.porsion) {
      case "small":
        product.price = product.defaultPrice;
        product.totalPrice = product.defaultPrice * product.amount;
        break;
  
      case "medium":
        product.price = product.defaultPrice * 1.5;
        product.totalPrice = product.price * product.amount;
        break;
  
      case "large":
        product.price = product.defaultPrice * 2;
        product.totalPrice = product.price * product.amount;
        break;
    }
  }
  
}