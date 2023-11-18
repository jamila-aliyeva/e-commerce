"use client";

import "./style.scss";
import useCart from "@/store/user/cards";
import ClearIcon from "@mui/icons-material/Clear";
import CartType from "@/types";
import Link from "next/link";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartList = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cart, removeCart, setCart, OrderProduct } = useCart();

  let newCart: (CartType | null)[] = cart.map((product: CartType) => ({
    ...product,
  }));

  const increaseQuantity = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 0) + 1,
        };
      } else {
        return product;
      }
    }) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };

  const decrease = (id: string) => {
    newCart = newCart.map((product) => {
      if (product?.id === id) {
        const newCart = Math.max((product.quantity || 0) - 1, 0);
        if (newCart === 0) {
          return null;
        } else {
          return {
            ...product,
            quantity: newCart,
          };
        }
      } else {
        return product;
      }
    }) as (CartType | null)[];

    newCart = newCart.filter(Boolean) as (CartType | null)[];

    setCart(newCart.filter(Boolean) as CartType[]);
  };

  useEffect(() => {
    const newTotalPrice = newCart.reduce((acc, product) => {
      return acc + (product?.price || 0) * (product?.quantity || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [newCart]);

  return (
    <div className="table_wrapper">
      <div className="table__aside">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Rasm</TableCell>
                <TableCell align="right">Nomi</TableCell>
                <TableCell align="right">Narxi</TableCell>
                <TableCell align="right">Miqdori</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newCart?.map((product) => (
                <TableRow key={product?.id || ""}>
                  <TableCell align="right">
                    <Image
                      src={
                        product?.image ??
                        "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
                      }
                      height={60}
                      width={60}
                      alt={product?.title}
                      objectFit="contain"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {product?.title || "Mahsulot"} <br />{" "}
                    <strong>{product?.description}</strong>{" "}
                  </TableCell>
                  <TableCell align="right">
                    {product
                      ? product?.price * product?.quantity
                      : "Mavjud emas"}
                    $
                  </TableCell>
                  <TableCell align="right">{product?.quantity}</TableCell>
                  <TableCell align="right">
                    <div className="cart_btn">
                      <button onClick={() => decrease(product?.id || "")}>
                        <span>-</span>
                      </button>
                      <span>{product?.quantity || 0}</span>
                      <button
                        onClick={() => increaseQuantity(product?.id || "")}>
                        <span>+</span>
                      </button>
                      <button
                        className="delete_product"
                        onClick={() => removeCart(product?.id || "")}>
                        <ClearIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="table__bside">
        <div>
          <p>
            Umumiy Summa: <strong>{totalPrice}</strong> ${" "}
          </p>
          <div className="btn">
            {" "}
            <button onClick={OrderProduct}>Buyurtma qilish</button>
            <br />
            <Link href="/orders">
              {" "}
              <button
                style={{
                  marginTop: "10px",
                  backgroundColor: "yellow",
                  color: "black",
                }}>
                Buyurtmalarni ko`rish
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
