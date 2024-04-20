import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ical, { ICalCalendarMethod } from "ical-generator";
import { FestivalEvent } from ".";
import { eventToIcal } from "./event";
import classes from "./ICal.module.css";

type LoaderData = {
  events: FestivalEvent[];
};

type Query = {
  dateStart: string;
  dateEnd: string;
  hiddenIds: number[];
};

export default function ICal() {
  const { events } = useLoaderData() as LoaderData;

  events.sort((a, b) => a.startTime.localeCompare(b.startTime));

  const [query, setQuery] = useState<Query>({
    dateStart: "",
    dateEnd: "",
    hiddenIds: [],
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [event.target.id]: event.target.value });
  };

  const handleCheckboxToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { hiddenIds } = query;

    if (event.target.checked) {
      hiddenIds.push(parseInt(event.target.id));
    } else {
      hiddenIds = hiddenIds.filter((id) => id !== parseInt(event.target.id));
    }

    setQuery({ ...query, hiddenIds });
  };

  const handleDownload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calendar = ical({ name: "Jamit" }).method(ICalCalendarMethod.REQUEST);

    for (const event of filteredEvents) {
      calendar.createEvent(eventToIcal(event));
    }

    const fileContent = calendar.toString();
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "jamit-kalenteri.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const filteredEvents = events.filter((e) => {
    const { dateStart, dateEnd, hiddenIds } = query;

    return (
      !hiddenIds.includes(e.id) &&
      (!dateStart || e.startTime >= dateStart) &&
      (!dateEnd || e.startTime <= dateEnd)
    );
  });

  const { hiddenIds } = query;

  return (
    <>
      <h1>Generoi iCal</h1>

      <form onSubmit={handleDownload}>
        <div className={classes.inputGrid}>
          <label htmlFor="dateStart">Alkaen</label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            onChange={handleDateChange}
          />

          <label htmlFor="dateEnd">Päättyen</label>
          <input
            type="date"
            id="dateEnd"
            name="dateEnd"
            onChange={handleDateChange}
          />
        </div>

        <ul className={classes.icalEventUl}>
          {events.map((e) => (
            <li key={e.id}>
              <span
                className={
                  !filteredEvents.map((e) => e.id).includes(e.id)
                    ? classes.lineThrough
                    : ""
                }
              >
                {e.title}
              </span>

              <label>
                <input
                  type="checkbox"
                  id={e.id.toString()}
                  defaultChecked={hiddenIds?.includes(e.id)}
                  onChange={handleCheckboxToggle}
                ></input>
                Ei kiinnosta
              </label>
            </li>
          ))}
        </ul>

        <button>Lataa iCal-tiedosto</button>
      </form>
    </>
  );
}
