"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import useCategories from "@/store/admin/categories";

const CaegoriesPage = () => {
  // const { category, getCategory } = useCategories();
  // console.log(category);

  // useEffect(() => {
  //   getCategory();
  // }, [getCategory]);

  return (
    <section>
      <div className="container">
        <TableContainer style={{ marginTop: "120px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Rasm</TableCell>
                <TableCell align="right">Nomi</TableCell>
                <TableCell align="right">Hodisalar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {category.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">{category?.name}</TableCell>
                  <TableCell align="right">{category?.image?.url}</TableCell>
                  <Button variant="outlined">Tahrirlash</Button>
                  <Button variant="contained">O'chirish</Button>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default CaegoriesPage;
