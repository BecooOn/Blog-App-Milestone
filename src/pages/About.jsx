import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import logo from "../assets/logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FaMedium } from "react-icons/fa6";
import { aTags, btnStyle } from "../styles/globalStyles";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
      <Card
        sx={{
          maxWidth: "500px",
          boxShadow: "0 0 20px black",
          p: 5,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CardMedia
            sx={{
              height: 140,
              width: 140,
              borderRadius: "50%",
              backgroundColor: "teal",
              border: "1px solid orange",
              outline: "2px solid orange",
              outlineOffset: "3px",
            }}
            image={logo}
            title="green iguana"
          />
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ borderBottom: "1px solid gray" }}
          >
            Becoo
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "center", gap: 2 }}
          >
            <a
              href="https://github.com/BecooOn"
              target="_blank"
              rel="noopener noreferrer"
              style={aTags}
            >
              <GitHubIcon sx={{ fontSize: "36px", color: "black" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/adem-bekci/"
              target="_blank"
              rel="noopener noreferrer"
              style={aTags}
            >
              <LinkedInIcon sx={{ fontSize: "36px", color: "blue" }} />
            </a>
            <a
              href="https://medium.com/@becooOn"
              target="_blank"
              rel="noopener noreferrer"
              style={aTags}
            >
              <FaMedium style={{ fontSize: "36px", color: "black" }} />
            </a>
          </Typography>
        </CardContent>
        <Box sx={{ textAlign: "center" }}>
          <Button size="small" sx={btnStyle} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button size="small" sx={btnStyle} onClick={() => navigate("/")}>
            Home
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
