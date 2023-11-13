export default interface LastProductsType {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: {
    url: string;
  };
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}


