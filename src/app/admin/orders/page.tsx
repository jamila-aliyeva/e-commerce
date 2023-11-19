"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import request from "@/server";
import currentTime from "@/utils/date";
import OrderType from "@/types/orders";

const DELIVERED = "DELIVERED";
const UNDELIVERED = "UNDELIVERED";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);


  const [statusFilter, setStatusFilter] = useState("");

  const deleteOrder = async (id: string) => {
    try {
      const { data } = await request.put(`payment/${id}`);
      setUpdate(!update);
      toast.success("Buyurtma bekor qilindi!");
    } catch (err) {
      console.log(err);
      toast.error("Buyurtma bekor qilinmadi!");
    }
  };

  const confirmOrder = async (id: string) => {
    try {
      const { data } = await request.post(`payment/${id}`);
      toast.success("Buyurtmangiz tasdiqlandi!");
      setUpdate(!update);
    } catch (error) {
      toast.error("Xatolik");
    } finally {
    }
  };

  //getting orders

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await request.get("payment");
        setOrders(data);
      } finally {
      }
    };
    getOrders();
  }, [update]);

  const filteredOrders = statusFilter
    ? orders.filter((order: OrderType) => order.status === statusFilter)
    : orders;

  return (
    <section style={{ marginTop: "120px" }}>
      <div className="container">
        <h2>Buyurtmalar ({orders?.length})</h2>

        {/* <div>
          <Button variant="outlined" onClick={() => handleStatusFilter("")}>
            Hammasi
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleStatusFilter(DELIVERED)}>
            Yetkazib berildi
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleStatusFilter(UNDELIVERED)}>
            Yetkazilmadi
          </Button>
        </div> */}
        {/* <select onChange={(e) => OrderedSorting(e)} className="products__sort">
          <option value="">Default</option>
          <option value="delevered">Yetkazilgan</option>
          <option value="undelevered">Yetkazilmagan</option>
        </select> */}

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Buyurtama Idsi</TableCell>
                <TableCell align="right">Izoh</TableCell>
                <TableCell align="right">Sanasi</TableCell>
                <TableCell align="right">Holati</TableCell>
                <TableCell align="right">Tasdiq</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((el: OrderType) => (
                <TableRow
                  key={el?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{el?._id}</TableCell>
                  <TableCell align="right">
                    {el?.comment || "Izoh yo`q"}
                  </TableCell>
                  <TableCell align="right">
                    {currentTime(el?.createdAt)}
                  </TableCell>
                  <TableCell align="right">{el?.status}</TableCell>
                  <TableCell
                    align="right"
                    style={{ display: "flex", gap: "15px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => confirmOrder(el?._id)}>
                      confirm
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => deleteOrder(el?._id)}>
                      cencel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default OrdersPage;
