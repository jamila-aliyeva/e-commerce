"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import "./styel.scss";
import { useEffect } from "react";
import useProducts from "@/store/admin/products";

const ProductsPage = () => {
  const {
    total,
    active,
    data,
    selected,
    values,
    totalPage,
    setActive,
    getValues,
    handleCancel,
    addData,
    showModal,
    isModalOpen,
    handleEdit,
    handleDelete,
    getData,
  } = useProducts();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <section className="categories-page">
      <div className="container">
        <div className="table__top">
          <div>
            <TextField
              id="standard-basic"
              label="Searching"
              variant="standard"
            />
          </div>
          <div>
            <Button variant="contained">Qo`shish</Button>
          </div>
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rasmi</TableCell>
                <TableCell align="right">Nomi</TableCell>
                <TableCell align="right">Narxi</TableCell>
                <TableCell align="right">Sotildi</TableCell>
                <TableCell align="right">Haqida</TableCell>
                <TableCell align="right">O`zgartirish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {data.map((el) => (
            <TableRow
              key={el?.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right">
                {el?.image && el.image.url ? el.image?.url : "No Image"}
                No image
              </TableCell>
              <TableCell align="right">{el?.name}</TableCell>
              <TableCell align="right">
                <Button variant="outlined">Tahrirlash</Button>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(el?._id)}>
                  O`chirish
                </Button>
              </TableCell>
            </TableRow>
          ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default ProductsPage;
