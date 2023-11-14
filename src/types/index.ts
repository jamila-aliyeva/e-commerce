export default interface PaginationDataTypes {
  quantity: number;
  next: number;
  limit: number;
  page: number;
  total: number;
}

export default interface CartType {
  id: string;
  image: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}

export default interface FavauriteType {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  fav: boolean;
}
