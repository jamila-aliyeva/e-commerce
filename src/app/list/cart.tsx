"use client";

import useCart from "@/store/cards";
import CartType from "@/types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const CartList = () => {
  const { cart, setCart } = useCart();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mahsulot</TableCell>
            <TableCell align="right">Narxi</TableCell>
            <TableCell align="right">Miqdori</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {newCart.map((row) => (
            <TableRow
              key={row?.image}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartList;
