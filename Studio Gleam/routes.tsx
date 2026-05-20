import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/pages/Home";
import { Portfolio } from "./components/pages/Portfolio";
import { Builder } from "./components/pages/Builder";
import { Checkout } from "./components/pages/Checkout";
import { Profile } from "./components/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "portfolio", Component: Portfolio },
      { path: "builder", Component: Builder },
      { path: "checkout", Component: Checkout },
      { path: "profile", Component: Profile },
    ],
  },
]);