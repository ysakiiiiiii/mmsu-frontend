import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthWrapper";
import { nav, button } from "./navigation";
import NotFound from "../../pages/NotFound"; // Make sure this import exists

export const RenderRoutes = () => {
  const { user } = useContext(AuthContext);
  const userRole = user.isAuthenticated ? user.role : "guest";

  return (
    <Routes>
      {nav.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}

      {button.map((item) => (
        <Route key={item.id} path={item.path} element={item.element} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};