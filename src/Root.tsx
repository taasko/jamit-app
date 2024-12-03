import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.tsx";
import Breadcrumbs from "./Nav/Breadcumbs.tsx";
import globalClasses from "./global.module.css";

export default function Root() {
  return (
    <div className={globalClasses.container}>
      <Nav />

      <hr />

      <Breadcrumbs />

      <Outlet />
    </div>
  );
}
