import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Authpages/Login";
import Home from "./Pages/Homepages/Homepage";
import Category from "./Pages/Category/CategoryList";
import Product from "./Pages/Products/ProductList";
import CategoryForm from "./Pages/Category/CategoryForm";
import ProductForm from "./Pages/Products/ProductForm";
import ForgotPassword from "./Pages/Authpages/ForgotPassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoutes>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoutes>
                <Product />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/add-category"
            element={
              <ProtectedRoutes>
                <CategoryForm />
              </ProtectedRoutes>
            }
          />
          <Route
            path="add-product"
            element={
              <ProtectedRoutes>
                <ProductForm />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
