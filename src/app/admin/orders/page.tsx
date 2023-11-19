"use client";

import { useEffect, useState } from "react";
import request from "@/server";
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
import currentTime from "@/utils/date";
import OrderType from "@/types/orders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const { data } = await request.post(`payment/${id}`);
      toast.success("BUyurtmangiz tasdiqlandi!");
      setUpdate(!update);
    } catch (error) {
      toast.error("Xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("payment");
        console.log(data);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [update]);

  return (
    <section style={{ marginTop: "120px" }}>
      <div className="container">
        <h2>Buyurtmalar ({orders?.length})</h2>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Buyurtama Idsi</TableCell>
                <TableCell align="right">Izoh</TableCell>
                <TableCell align="right">Holati</TableCell>
                <TableCell align="right">Tasdiq</TableCell>
                <TableCell align="right">Sanasi</TableCell>
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
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => confirmOrder(el?._id)}>
                      Tasdiqlash
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => deleteOrder(el?._id)}>
                      Bekor qilish
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
