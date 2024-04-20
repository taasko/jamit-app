import { ICalEventData } from "ical-generator";
import { FestivalEvent } from ".";

export const eventToIcal = (event: FestivalEvent): ICalEventData => ({
  summary: event.title,
  description: event.description + "\n 🎫 Liput: " + event.tickets,
  start: event.startTime,
  end: event.endTime,
  location: event.location,
  url: event.url,
});
