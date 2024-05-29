import React from "react";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";
import logo from "../assets/logo.png";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Button } from "@mui/material";
import { accountQuestionStyle } from "../styles/globalStyles";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const { login } = useAuthCalls();
  const navigate = useNavigate();

  const handleLogin = async (values, actions) => {
    let savedPage = sessionStorage.getItem("activePage");
    //!sessionStorage'daki activePage değerinin geçerli olup olmadığını kontrol etmek için, eğer bu kontrol olmazsa 404 e gidiyor 
    savedPage = savedPage && savedPage !== "null" ? savedPage : "/";
    
    await login(values); 
    actions.resetForm();
    actions.setSubmitting(false);
  
    const lastClickedBlogId = sessionStorage.getItem("lastClickedBlogId");
    if (lastClickedBlogId) {
      navigate(`/detail/${lastClickedBlogId}`);
      sessionStorage.removeItem("lastClickedBlogId");
    } else {
      navigate(savedPage);
    }
  };

  return (
    <>
     <Helmet>
        <title>Blogla-Bakalim-Login</title>
        <meta
          name="description"
          content="Blogla-Bakalim'a giris yapin."
        />
      </Helmet>
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          p: 4,
        }}
      >
        <Grid item xs={12} mb={3} sx={{ alignContent: "center" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              gap: 1,
              justifyContent: "center",
              borderBottom: "3px solid gray",
              p: 2,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#e4cbcb",
              }}
            />
            <span>'s BLOG</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          sx={{ border: "2px solid white", p: 4, backgroundColor: "#e4cbcb" }}
        >
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
            component={(props) => <LoginForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              onClick={() => navigate("/register")}
              sx={accountQuestionStyle}
            >
              Do you have not an account?
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container></>
  );
};

export default Login;
