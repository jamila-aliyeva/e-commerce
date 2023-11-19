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
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Pagination from "@mui/material/Pagination";
import DialogTitle from "@mui/material/DialogTitle";

import request from "@/server";

import "./style.scss";
import { useEffect, useState } from "react";
import useUsers from "@/store/admin/user";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const [selected, setSelected] = useState<null | string>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
  });

  const { users, total, getUsers, addUser, deleteUser } = useUsers();

  useEffect(() => {
    getUsers(page, search);
  }, [getUsers, page, search]);

  const handleUser = async () => {
    await addUser(formData, selected);
    handleClose();
    setSelected(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      password: "",
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);

    const { data } = await request.get(`user/${id}`);
    setFormData({
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      username: data?.username || "",
      phoneNumber: data?.phoneNumber || "",
      password: data?.password || "",
    });
  };

  return (
    <section className="categories-page">
      <div className="container">
        <div className="table__top">
          <h2>Foydalanuvchilar ({total})</h2>
          <div>
            <TextField
              id="standard-basic"
              label="Qidirish..."
              variant="standard"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(event)
              }
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleClickOpen}>
              Qo`shish
            </Button>
          </div>
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Familiyasi</TableCell>
                <TableCell align="right">Ismi</TableCell>
                <TableCell align="right">Foydalanuvchi nomi</TableCell>
                <TableCell align="right">Raqami</TableCell>
                <TableCell align="right">O`zgartirish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((el) => (
                <TableRow
                  key={el?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">{el?.firstName}</TableCell>
                  <TableCell align="right"> {el?.lastName}</TableCell>
                  <TableCell align="right"> {el?.username}</TableCell>
                  <TableCell align="right"> {el?.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(el?._id)}>
                      Tahrirlash
                    </Button>
                    <Button
                      style={{ marginLeft: "15px" }}
                      variant="contained"
                      onClick={() => deleteUser(el?._id)}>
                      O`chirish
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ textAlign: "center" }}>
          <Stack className="pagination" spacing={2}>
            <Pagination
              count={Math.ceil(total / 10)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="modal-title">
            Foydalanuvchi ma`lumotlari
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="firstName"
              label="Familiyasi"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="lastName"
              label="Ismi"
              type="text"
              fullWidth
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="username"
                label="Foydalanuchi nomi"
                type="text"
                fullWidth
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="phoneNumber"
                label="telefon raqam"
                type="text"
                fullWidth
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
            {selected === null ? (
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>bekor qilish</Button>
            <Button onClick={() => handleUser()}>
              {selected === null ? "Qo`shish" : "Saqlash"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default UsersPage;
