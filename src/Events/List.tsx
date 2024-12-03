import { Link, useLoaderData } from "react-router-dom";
import { FestivalEvent } from ".";
import { getEventTitle, getPastEvents, getUpcomingEvents } from "./event";
import globalClasses from "../global.module.css";

type LoaderData = {
  events: FestivalEvent[];
};

const EventList = (events: FestivalEvent[]) => (
  <ul className={globalClasses.unstyledUl}>
    {events.map((e) => EventListItem(e))}
  </ul>
);

const EventListItem = (event: FestivalEvent) => (
  <li key={event.id}>
    <Link to={"/events/" + event.id}>{getEventTitle(event)}</Link>
  </li>
);

export default function List() {
  const { events } = useLoaderData() as LoaderData;

  const pastEvents = getPastEvents(events);
  const upcomingEvents = getUpcomingEvents(events);

  return (
    <>
      <h1>Tapahtumat</h1>

      <h2>Tulevat</h2>
      {EventList(upcomingEvents)}

      <h2>Menneet</h2>
      {EventList(pastEvents)}
    </>
  );
}
