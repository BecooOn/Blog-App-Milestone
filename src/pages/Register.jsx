import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import RegisterForm, { registerSchema } from "../components/auth/RegisterForm";
import { Formik } from "formik";
import useAuthCalls from "../hooks/useAuthCalls";
import logo from "../assets/logo.png";
import { Button } from "@mui/material";
import { accountQuestionStyle } from "../styles/globalStyles";

const Register = ({ setToggle }) => {
  const { register } = useAuthCalls();
  const handleRegister = () => {
    setToggle(false);
  };
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 1 }}
        sx={{ my: 6 }}
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
          sx={{
            border: "2px solid white",
            p: 4,
            backgroundColor: "#e4cbcb",
          }}
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              image: "",
              bio: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button sx={accountQuestionStyle} onClick={handleRegister}>
              Do you have an account?
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
