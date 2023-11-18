

interface orderCart {
  _id: string;
  product: {
    checked: boolean;
    sold: number;
    _id: string;
    title: string;
    price: number;
    description: string;
    image: {
      public_id: string;
      url: string;
    };
    quantity: number;
    category: {
      _id: string;
      name: string;
      image: {
        public_id: string;
        url: string;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  quantity: number;
}

export default interface OrderType {
  status: string;
  _id: string;
  userId: string;
  cart: orderCart[];
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
