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
import "./style.scss";


const CaegoriesPage = () => {
  // const { category, getCategory } = useCategories();
  // console.log(category);

  // useEffect(() => {
  //   getCategory();
  // }, [getCategory]);

  return (
    <section>
      <div className="container">
        <div className="table__top">
        <div >
        <TextField id="standard-basic" label="Searching" variant="standard" />
        </div>
          <div >
          <Button variant="contained">Qo`shish</Button>
        </div>
        </div>

        <TableContainer>
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
