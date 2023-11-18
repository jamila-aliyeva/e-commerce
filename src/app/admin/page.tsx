import React from "react";
import Link from "next/link";
import Image from "next/image";
import './style.scss';
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

const DashboardPage = () => {
  return (
    <section className="dashbaord__page">
      <div className="container">
        <h2 className="dashboard__title" >Dashboard</h2>
        <h4 className="break">
          <Link href="/admin"><span>Dashboard | </span> </Link>
          <Link href="/"> Home </Link>
        </h4>
        <div className="orders__wrapper">
          <div className="orders__total">
          <Image 
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/purchase_order.png" 
              width={70} 
              height={70} 
              alt="Shop Image" 
            />
           <div className="dashboard__top">
           <h3>Barcha buyurtmalar</h3>
            <h1>83745</h1>
            </div> 
          </div>
          <div className="orders__total">
          <Image 
              src="data:image/png;base64,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" 
              width={70} 
              height={70} 
              alt="Shop Image" 
            />
           <div>
           <h3>Foydalanuvchilar</h3>
            <h1>83745</h1>
            </div> 
          </div>
          <div className="orders__total">
          <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQr_jHJvx476ONHWMBsjFjXYId0nvMxHJRcw&usqp=CAU" 
              width={70} 
              height={70} 
              alt="Shop Image" 
            />
           <div>
           <h3>Mahsulotlar</h3>
            <h1>83745</h1>
            </div> 
          </div>
        </div>
        <div>

          <div className="dashboard__form">
        <div className="recent__orders">
           <div className="orders__form">
            <h2>Hozirgi Buyurtmalar</h2>
            <TextField id="standard-basic" label="Qidirish..." variant="standard" />
           </div>
           <div className="form__wrapper">
           <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell>User</TableCell>
            <TableCell align="right">Buyurtma sanasi</TableCell>
            <TableCell align="right">Mahsulot</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>

           </div>
           
        </div>
        <div className="dashboard__bside">
          jkfgshfjdfhjhbjsd
        </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
