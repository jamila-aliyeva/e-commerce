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
import { useEffect, useState } from "react";
import request from "@/server";
import { LIMIT } from "@/constants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Pagination from "@mui/material/Pagination";
import DialogTitle from "@mui/material/DialogTitle";
import AllProductsType from "@/types/all-products";
import Image from "next/image";

interface FormData {
  // _id: string;
  sold: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

interface Types {
  limit: number;
  search: string;
  page: number;
  category?: string;
}

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sorting, setSorting] = useState("");
  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<{ public_id: string; url: string }>({
    public_id: "",
    url: "",
  });

  const Sorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const [selected, setSelected] = useState<null | string>(null);

  const [formData, setFormData] = useState({
    sold: "",
    title: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await request.get("category");
      setCategories(categories);
    };
    getCategories();

    const getProducts = async () => {
      const params: Types = {
        page,
        limit: LIMIT,
        search,
      };
      if (category) {
        params.category = category;
      }

      try {
        const {
          data: { products, total },
        } = await request.get("product", { params });
        setProducts(products);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, [setCategories, setProducts, page, search, category]);

  const controlPages = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    imageData.append("file", file);
    const { data } = await request.post("upload", imageData);
    setPhoto(data);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      sold: "",
      title: "",
      description: "",
      image: "",
      price: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);

    const { data }: { data: Partial<typeof formData> } = await request.get(
      `product/${id}`
    );
    setFormData((prevData) => ({
      ...prevData,
      title: data?.title || "",
      price: data?.price || "",
      sold: data?.sold || "",
      description: data?.description || "",
    }));
  };

  const handleSave = async () => {
    if (selected === null) {
      await addProduct(formData);
    } else {
      await editProduct(selected, formData);
    }
    handleClose();
  };

  const addProduct = async (formData: FormData) => {
    try {
      await request.post("product", formData);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async (_id: string, formData: FormData) => {
    try {
      await request.put(`product/${_id}`, formData);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await request.delete(`product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section className="categories-page">
      <div className="container">
        <div className="table__top">
          <div>
            <TextField
              id="standard-basic"
              label="Qidirish.."
              variant="standard"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(event);
              }}
            />
          </div>
          <div>
            <select onChange={(e) => Sorting(e)} className="products__sort">
              <option value="">All</option>
              {categories?.map((category: { _id: string; name: string }) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
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
                <TableCell>Rasmi</TableCell>
                <TableCell align="right">Nomi</TableCell>
                <TableCell align="right">Narxi</TableCell>
                <TableCell align="right">Sotildi</TableCell>
                <TableCell align="right">Haqida</TableCell>
                <TableCell align="right">O`zgartirish</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: AllProductsType) => (
                <TableRow
                  key={product?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">
                    <Image
                      src={product?.image.url}
                      alt={product?.title}
                      height={50}
                      width={50}
                    />
                  </TableCell>
                  <TableCell align="right">{product?.title}</TableCell>
                  <TableCell align="right">{product?.price} $</TableCell>
                  <TableCell align="right">{product?.sold}</TableCell>
                  <TableCell align="right">{product?.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(product?._id)}>
                      Tahrirlash
                    </Button>
                    <Button
                      style={{ marginLeft: "15px" }}
                      variant="contained"
                      onClick={() => handleDelete(product?._id)}>
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
            Mahsulotlar ma`lumotlari
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <input
              className="upload-photo"
              placeholder="Upload an image"
              onChange={uploadPhoto}
              type="file"
            />
            {photo?.url ? (
              <div className="upload-photo-container">
                <Image alt="Image" fill src={photo?.url} />
              </div>
            ) : null}
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="title"
              label="Nomi"
              type="text"
              fullWidth
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="price"
              label="Narxi"
              type="text"
              fullWidth
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="sold"
                label="Sotildi"
                type="text"
                fullWidth
                value={formData.sold}
                onChange={(e) => handleInputChange("sold", e.target.value)}
              />
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="phoneNumber"
                label="Haqida"
                type="text"
                fullWidth
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Bekor qilish</Button>
            <Button onClick={handleSave}>
              {selected === null ? "Qo`shish" : "Saqlash"}
            </Button>
          </DialogActions>
        </Dialog>

        {total / LIMIT > 1 ? (
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(event, value) => controlPages(event, value)}
            boundaryCount={2}
          />
        ) : null}
      </div>
    </section>
  );
};

export default ProductsPage;
