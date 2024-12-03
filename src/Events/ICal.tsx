import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ical, { ICalCalendarMethod } from "ical-generator";
import { addYears, endOfYear, formatISO } from "date-fns";
import { FestivalEvent } from ".";
import { eventToIcal, getEventTitle } from "./event";
import classes from "./ICal.module.css";
import { dateFormat } from "../util.ts";
import globalClasses from "../global.module.css";

type LoaderData = {
  events: FestivalEvent[];
};

type Query = {
  dateStart: string;
  dateEnd: string;
  hiddenIds: number[];
};

const formatISODate = (date: Date = new Date()): string =>
  formatISO(date, { representation: "date" });

const endOfNextYear = endOfYear(addYears(new Date(), 1));

export default function ICal() {
  const { events } = useLoaderData() as LoaderData;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialQuery: Query = {
    dateStart: queryParams.get("dateStart") || formatISODate(),
    dateEnd: queryParams.get("dateEnd") || formatISODate(endOfNextYear),
    hiddenIds: queryParams.get("hiddenIds")?.split(",").map(Number) ?? [],
  };

  const [query, setQuery] = useState<Query>(initialQuery);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("dateStart", query.dateStart);
    params.set("dateEnd", query.dateEnd);
    if (query.hiddenIds.length > 0) {
      params.set("hiddenIds", query.hiddenIds.join(","));
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [query, navigate]);

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
    <div className={classes.ICal}>
      <h1>Generoi iCal</h1>

      <form onSubmit={handleDownload}>
        <div className={classes.inputGrid}>
          <label htmlFor="dateStart">Alkaen</label>
          <input
            type="date"
            id="dateStart"
            name="dateStart"
            value={query.dateStart}
            min={formatISODate()}
            onChange={handleDateChange}
          />

          <label htmlFor="dateEnd">Päättyen</label>
          <input
            type="date"
            id="dateEnd"
            name="dateEnd"
            value={query.dateEnd}
            max={formatISODate(endOfNextYear)}
            onChange={handleDateChange}
          />
        </div>

        <ul className={globalClasses.unstyledUl}>
          {events.map((e) => (
            <li key={e.id}>
              <span
                className={
                  !filteredEvents.find((ev) => ev.id === e.id)
                    ? globalClasses.lineThrough
                    : ""
                }
              >
                <Link to={"/events/" + e.id}>{getEventTitle(e)}</Link>
              </span>

              <br />

              <time>
                {dateFormat(e.startTime)} - {dateFormat(e.endTime)}
              </time>

              <br />

              <label>
                <input
                  type="checkbox"
                  id={e.id.toString()}
                  defaultChecked={hiddenIds?.includes(e.id)}
                  onChange={handleCheckboxToggle}
                />
                Ei kiinnosta
              </label>
            </li>
          ))}
        </ul>

        <button disabled={filteredEvents.length < 1}>
          Lataa iCal-tiedosto
        </button>
      </form>
    </div>
  );
}
