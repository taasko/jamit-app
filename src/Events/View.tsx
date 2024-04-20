import { useLoaderData } from "react-router-dom";
import { FestivalEvent } from ".";
import { dateFormat } from "../util";

type LoaderData = {
  event: FestivalEvent;
};

export default function View() {
  const { event } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>{event.title}</h1>

      <p>{event.location}</p>

      <time>
        {dateFormat(event.startTime)} - {dateFormat(event.endTime)}
      </time>

      <br />

      <a href={event.url}>{event.url}</a>

      <p>{event.description}</p>

      <p>
        🎫 Liput: <a href={event.tickets}>{event.tickets}</a>
      </p>
    </>
  );
}
