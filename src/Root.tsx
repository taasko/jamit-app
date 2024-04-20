import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>/</Link>
          </li>
          <li>
            <Link to={"/events/list"}>Event list</Link>
          </li>
          <li>
            <Link to={"/events/ical"}>iCal</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </>
  );
}
