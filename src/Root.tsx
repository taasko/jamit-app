import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.tsx";
import Breadcrumbs from "./Nav/Breadcumbs.tsx";

export default function Root() {
  return (
    <>
      <Nav />

      <hr />

      <Breadcrumbs />

      <Outlet />
    </>
  );
}
