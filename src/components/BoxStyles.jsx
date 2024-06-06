import React from "react";
import { Box, useTheme } from "@mui/material";

const BoxStyles = ({ children, ...props }) => {
  const theme = useTheme();

  const boxStyles = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderTop: "none",
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${theme.palette.secondary[200]} !important`,
    },
    "& .MuiDataGrid-root .MuiCheckbox-root": {
      color: `${theme.palette.secondary.main} !important`,
    },
    "& .MuiDataGrid-root .MuiCheckbox-root.Mui-checked": {
      color: `${theme.palette.grey[500]} !important`,
    },
  };

  return (
    <Box sx={boxStyles} {...props}>
      {children}
    </Box>
  );
};

export default BoxStyles;
