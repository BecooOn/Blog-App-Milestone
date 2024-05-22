import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
import logo from "../assets/logo.png";
import LoginForm, { loginSchema } from "../components/auth/LoginForm";
import { Button } from "@mui/material";
import { accountQuestionStyle } from "../styles/globalStyles";

const Login = ({ setToggle }) => {
  const { login } = useAuthCalls(); //* login fonksiyonu oluşturduğumuz custom hooktan destr ettik
  const handleRegister = () => {
    setToggle(true);
  };
  return (
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
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button onClick={handleRegister} sx={accountQuestionStyle}>
              Do you have not an account?
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
