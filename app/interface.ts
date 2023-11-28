export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  quantity: number;
}

export interface fullProduct {
  _id: string;
  image: any;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  details: string;
  quantity: number;
  price_id: string;
}