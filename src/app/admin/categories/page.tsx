"use client";

import * as React from "react";
import request from "@/server";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Pagination from "@mui/material/Pagination";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import Image from "next/image";
import useCategory from "@/store/admin/categories";
import "./style.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CaegoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<{ public_id: string; url: string }>({
    public_id: "",
    url: "",
  });
  const [selected, setSelected] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: categories,
    total,
    getData: getCategories,
    deleteCategory,
    addCategory,
  } = useCategory();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const [formData, setFormData] = useState({
    name: "",
    image: {},
  });

  const handleClickOpen = () => {
    setOpen(true);
    setPhoto({ public_id: "", url: "" });
    setFormData({
      name: "",
      image: {},
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    imageData.append("file", file);
    const { data } = await request.post("upload", imageData);
    setPhoto(data);
  };

  const handleCategory = async () => {
    formData.image = photo;
    await addCategory(formData, selected);
    handleClose();
    setSelected(null);
  };

  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);
    const { data } = await request.get(`category/${id}`);
    setPhoto({ public_id: data?.image.public_id, url: data?.image.url });
    setFormData({
      name: data?.name || "",
      image: data?.image.url || "",
    });
  };

  return (
    <section className="categories-page">
      <div className="container">
        <div className="table__top">
          <div>
            {/* <TextField
              id="standard-basic"
              label="Searching"
              variant="standard"
            /> */}
            <h2>Barcha Kategoriyalar ({categories?.length})</h2>
          </div>
         
          <div>
            <Button onClick={handleClickOpen}>Qo`shish</Button>
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
              {categories.map((el) => (
                <TableRow
                  key={el?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">
                    <Image
                      width={60}
                      height={60}
                      src={el?.image.url}
                      alt={el?.name}
                    />
                  </TableCell>
                  <TableCell align="right">{el?.name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(el?._id)}>
                      Tahrirlash
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => deleteCategory(el?._id)}>
                      O`chirish
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="modal-title">
            Kategoriya ma`lumotlari
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={(e) => handleInputChange("Nomi", e.target.value)}
            />
            <input
              className="upload-photo"
              placeholder="Rasm yuklang"
              onChange={uploadPhoto}
              type="file"
            />
            {photo?.url ? (
              <div className="upload-photo-container">
                <Image alt="Image" width={60} height={60} src={photo?.url} />
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Bekor qilish</Button>
            <Button onClick={() => handleCategory()}>
              {selected === null ? "Qo`shish" : "Saqlash"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default CaegoriesPage;
