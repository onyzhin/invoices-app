export interface IProduct {
  createdAt: string;
  id: number;
  product_id?: number;
  name: string;
  price: number;
  quantity?: number | string;
  updatedAt: string;
}
