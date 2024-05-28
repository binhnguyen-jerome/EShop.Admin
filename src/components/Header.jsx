import React from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useLocation, useNavigate } from "react-router-dom";
const Header = ({ title, subtitle, route }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const location = useLocation();
  const isCreateRoute = location.pathname.includes("create");
  const isEditRoute = location.pathname.includes("edit");
  return (
    <Box sx={{ mb: "20px" }}>
      <FlexBetween>
        <Box>
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={theme.palette.secondary[300]}>
            {subtitle}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            isCreateRoute || isEditRoute ? navigate(-1) : navigate(route)
          }
        >
          {isCreateRoute || isEditRoute ? "Back" : `Create ${title}`}
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default Header;
