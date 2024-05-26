import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FaMedium } from "react-icons/fa6";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuthCalls from "../hooks/useAuthCalls";

const actions = [
  { icon: <GitHubIcon />, name: "GitHub", url: "https://github.com/BecooOn" },
  {
    icon: <LinkedInIcon />,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/adem-bekci/",
  },
  { icon: <FaMedium />, name: "Medium", url: "https://medium.com/@becooOn" },
];

export default function Footer() {
  const { username } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const handleActionClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 0,
        left: 10,
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          height: 320,
          flexGrow: 1,
          position: "absolute",
          bottom: 25,
          left: 8,
          textAlign: "left",
        }}
      >
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleActionClick(action.url)}
            />
          ))}
          {username ? (
            <SpeedDialAction
              icon={<LogoutIcon />}
              tooltipTitle="Logout"
              onClick={() => logout()}
            />
          ) : (
            <Box sx={{ width: "40px", height: "56px" }}></Box>
          )}
        </SpeedDial>
      </Box>
      <Typography
        sx={{
          p: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100px",
          fontSize: "12px",
        }}
      >
        Copyright© Becoo, 2024
      </Typography>
    </Box>
  );
}
