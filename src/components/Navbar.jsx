import React,{useState,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";

const pages = ["Home", "About", "New blog"];
const settings = ["Profile", "My Blogs", "Logout"];
const loginSet = ["Login"];

function Navbar() {
  const { username, image } = useSelector((state) => state.auth);
  // console.log(username);
  // console.log(image);
  const { logout } = useAuthCalls();

  const [anchorElNav, setAnchorElNav] =useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePage = (page) => {
    // console.log(page);
    if (page.toLowerCase() === "home") {
      navigate("/");
    } else if (page.toLowerCase() === "about") {
      navigate("/about");
    } else if (page.toLowerCase() === "new blog") {
      //? Kullanıcı kontrolü için username
      if (username) {
        navigate("/new-blog");
      } else {
        navigate("/login");
      }
    }
  };

  const handleProfile = (setting) => {
    if (setting.toLowerCase() === "profile") {
      navigate("/profile");
    } else if (setting.toLowerCase() === "my blogs") {
      navigate("/my-blog");
    } else if (setting.toLowerCase() === "logout") {
      logout();
    } else if (setting.toLowerCase() === "login") {
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={logo}
              alt=""
              width="50px"
              style={{ borderRadius: "50%" }}
            />
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                px: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              's Blog
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handlePage(page);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handlePage(page);
                    handleCloseNavMenu();
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`${username} open settings`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {username ? (
                    <Avatar src={image} alt={username} />
                  ) : (
                    <Avatar />
                  )}
                </IconButton>
              </Tooltip>
              {username && <Typography>{username}</Typography>}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {username &&
                  settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleProfile(setting);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                {!username &&
                  loginSet.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleProfile(setting);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* //!navbar fixed olmasından kaynaklı boşluk açmak için */}
      <Box sx={{ height: "100px" }}></Box>
    </>
  );
}

export default Navbar;
