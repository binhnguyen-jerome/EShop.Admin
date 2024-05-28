import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import { themeSettings } from "./theme";
import ProductList from "./pages/Product/ProductList";
import EditProduct from "./pages/Product/EditProduct";
import Dashboard from "./pages/DashBoard/Dashboard";
import CategoryList from "./pages/Category/CategoryList";
import CategoryForm from "./pages/Category/CategoryForm";
import SignIn from "./pages/Auth/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/categories/edit/:id" element={<CategoryForm />} />
                <Route path="/categories/create" element={<CategoryForm />} />
              </Route>
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
