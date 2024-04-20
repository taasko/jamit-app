import { Link, useLoaderData } from "react-router-dom";
import { FestivalEvent } from ".";

type LoaderData = {
  events: FestivalEvent[];
};

export default function List() {
  const { events } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>Tapahtumat</h1>

      <ul>
        {events.map((e) => (
          <li key={e.id}>
            <Link to={"/events/" + e.id}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
