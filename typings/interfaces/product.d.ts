import type { Porsion } from "../global";

export interface Product {
  id: string;
  img: string;
  title: string;
  description: string;
  weight: number;
  price: number;
  defaultPrice: number;
  amount: number;
  totalPrice: number;
  porsion: Porsion;
  isAddedToBasket: boolean;
}