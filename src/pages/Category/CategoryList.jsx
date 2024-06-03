import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hook/category/useCategory";
import confirmDelete from "../../utils/confirmDelete";

//Columns for the grid table
const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Category Name",
    flex: 0.5,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
];
const CategoryList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/categories/edit/${id}`);
  };
  const { categories, loading, getCategories, deleteCategory } =
    useCategories();

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const handleDelete = async (id) => {
    await confirmDelete(id, deleteCategory);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Category"
        subtitle="List of Category"
        route="/categories/create"
      />
      <Button variant="contained" color="secondary">
        Delete Selected
      </Button>
      <Box
        height="70vh"
        mt={2}
        sx={{
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
        }}
      >
        {categories && !loading && (
          <DataGrid
            rows={categories}
            columns={[
              ...columns,
              {
                field: "actions",
                headerName: "Actions",
                flex: 0.5,
                renderCell: (params) => (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(params.row.id)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(params.row.id)}
                    >
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
        {loading && <CircularProgress color="success" />}
      </Box>
    </Box>
  );
};

export default CategoryList;
