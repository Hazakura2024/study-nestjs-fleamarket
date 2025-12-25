export interface Item {
  id: string;
  name: string;
  price: number;
  // NOTE: 任意にしたいプロパティは?をつける
  description?: string;
  status: 'ON_SALE' | 'SOLD_OUT';
}
