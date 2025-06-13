import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home.tsx"),


  route("products", "pages/product/ListPage.tsx"),
  route("product/:productId", "pages/product/DetailPage.tsx"),
  route("cart", "pages/cart/CartPage.tsx"), 
  route("login", "pages/auth/LoginPage.tsx"),
  route("admin-login", "pages/auth/AdminLoginPage.tsx"),


] satisfies RouteConfig;

