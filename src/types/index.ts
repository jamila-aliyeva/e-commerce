export default interface PaginationDataTypes {
  quantity: number;
  next: number;
  limit: number;
  page: number;
  total: number;
}

interface CartType {
  id: string;
  image: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
}
