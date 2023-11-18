export default interface AllProductsType {
  sold: number;
  price: number;
  quantity: number;
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
}
