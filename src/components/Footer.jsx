import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FaMedium } from "react-icons/fa6";
import { Typography } from "@mui/material";

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
      <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.url)}
          />
        ))}
      </SpeedDial>
      <Typography
        sx={{
          p: 1,
          position: "absolute",
          bottom: 20,
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
