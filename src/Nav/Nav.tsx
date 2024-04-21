import { Link } from "react-router-dom";
import classes from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={classes.Nav}>
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
  );
}
