import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Nav />

      <hr />

      <Outlet />
    </>
  );
}
