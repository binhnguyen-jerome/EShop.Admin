import React, { useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useUsers } from "../../hook/user/useUsers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UserList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { users, loading, getUsers, deleteUser } = useUsers();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting this user.", "error");
      }
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="CUSTOMERS"
        subtitle="List of UserList"
        route="/users/create"
      />
      <Box
        mt="40px"
        height="75vh"
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
        }}
      >
        <DataGrid
          loading={loading || !users}
          getRowId={(row) => row.id}
          rows={users || []}
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
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Delete
                  </Button>
                </>
              ),
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default UserList;
