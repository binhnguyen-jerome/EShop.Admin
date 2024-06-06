import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    flex: 0.5,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 0.5,
  },
  {
    field: "priceDiscount",
    headerName: "Discount",
    flex: 0.5,
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 0.5,
  },
];
const ProductGrid = ({
  products,
  handleDelete,
  handleEdit,
  navigateProductDetail,
}) => {
  return (
    <DataGrid
      rows={products}
      columns={[
        ...columns,
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          renderCell: (params) => (
            <>
              <Button
                variant="primary"
                sx={{ backgroundColor: grey[600] }}
                onClick={() => navigateProductDetail(params.row.id)}
              >
                See More
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEdit(params.row.id)}
                style={{ marginRight: 8, marginLeft: 8 }}
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
  );
};

export default ProductGrid;
