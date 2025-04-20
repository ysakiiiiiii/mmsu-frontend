import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Store from "../pages/Store";
import Cart from "../pages/Cart";
import Favorites from "../pages/Favorites";
import User from "../pages/User";
import Admin from "../pages/Admin";

export const nav = [
  {
    path: "/",
    role: ["guest", "private"],
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
  },

  {
    path: "/store",
    role: ["guest", "private"],
    name: "Store",
    element: <Store />,
    isMenu: true,
    isPrivate: true,
  },

  {
    path: "/about",
    role: ["guest", "private"],
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },

  {
    path: "/login",
    role: ["guest"],
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },

  {
    path: "/admin",
    role: ["admin"],
    name: "Admin",
    element: <Admin />,
    isMenu: true,
    isPrivate: true,
  },
];

export const button = [
  {
    id: 1,
    element: <User />,
    path: "/user",
  },
  {
    id: 2,
    element: <Cart />,
    path: "/cart",
  },
  {
    id: 1,
    element: <Favorites />,
    path: "/favorites",
  },
];

export default nav;
