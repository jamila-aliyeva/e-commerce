"use client";

// import * as React from 'react';
import React, { useEffect, useState } from "react";
import Children from "@/types/children";
import Usertype from "@/types/user";
import { useRouter } from "next/navigation";
import useAuth from "@/store/auth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { USER_DATA_STATE, TOKEN } from "@/constants";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard({ children }: Children) {
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role !== 1) {
        router.push("/");
      }
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router, user?.role]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [currentUser, setCurrentUser] = useState<Usertype | null>(null);
  const logout = () => {
    localStorage.removeItem(USER_DATA_STATE);
    Cookies.remove(TOKEN);
    setIsAuthenticated(currentUser);
    setOpenModal(false);
    toast.info("You are logged out");
    router.push("/");
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Tasdiqlash</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Chiqishni xohlaysizmi?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yo`q</Button>
          <Button onClick={logout} autoFocus>
            Ha
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", position: "fixed", inset: "0" }}>
        <CssBaseline />
        <AppBar className="app_bar" position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            {/* <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Vodiy Perfum
            </Typography> */}
            <IconButton color="inherit">
              <Badge badgeContent={1} color="success">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className="dashboard-sidebar"
          style={{ backgroundColor: "#F67449" }}
          variant="permanent"
          open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <Link
                className="dashboard-link"
                href="/admin"
                style={{ display: "flex", padding: "8px 16px" }}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" style={{ color: "black" }} />
              </Link>
              <Link
                className="dashboard-link"
                href="/admin/users"
                style={{ display: "flex", padding: "8px 16px" }}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Foydalanuvchilar"
                  style={{ color: "black" }}
                />
              </Link>

              <Link
                className="dashboard-link"
                href="/admin/categories"
                style={{ display: "flex", padding: "8px 16px" }}>
                <ListItemIcon>
                  <ClassIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Kategoriyalar"
                  style={{ color: "black" }}
                />
              </Link>
              <Link
                className="dashboard-link"
                href="/admin/products"
                style={{ display: "flex", padding: "8px 16px" }}>
                <ListItemIcon>
                  <ProductionQuantityLimitsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Mahsulotlar"
                  style={{ color: "black" }}
                />
              </Link>
              <Link
                className="dashboard-link"
                href="/admin/orders"
                style={{ display: "flex", padding: "8px 16px" }}>
                <ListItemIcon>
                  <BookmarkBorderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Buyurtmalar"
                  style={{ color: "black" }}
                />
              </Link>
            </React.Fragment>
            <ListItemButton onClick={handleClickOpen}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Chiqish" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "theme.palette.grey[100]"
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <div className="container">{children}</div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
