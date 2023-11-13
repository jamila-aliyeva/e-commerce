export default interface PaginationDataTypes {
  next: number;
  limit: number;
  page: number;
  total: number;
}

interface CartType {
  product: string;
  quantity: number;
}
