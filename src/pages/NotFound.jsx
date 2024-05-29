import { useNavigate } from "react-router-dom";
import errorImg from "../assets/404.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
     <Helmet>
        <title>Page-Not-Found!</title>
        <meta
          name="description"
          content="Not found page"
        />
      </Helmet>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            color: "gray",
            fontWeight: "bold",
            textAlign: "center",
            my: "80px",
          }}
        >
          <Box>
            <img src={errorImg} alt="404 Error" />
            <Typography>Page not found</Typography>
            <Typography>
              Sorry, the page you are looking for could not be found or has been
              removed.
            </Typography>
            <Box>
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIosIcon /> back
              </Button>
              <Button onClick={() => navigate("/")}>
                <HomeIcon /> Home
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
