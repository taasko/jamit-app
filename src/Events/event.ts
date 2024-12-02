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

export const getUpcomingEvents = (events: FestivalEvent[]): FestivalEvent[] =>
  events.filter((event) => new Date(event.startTime) > new Date());

export const getPastEvents = (events: FestivalEvent[]): FestivalEvent[] =>
  events.filter((event) => new Date(event.endTime) < new Date());

export const getSortedEvents = (events: FestivalEvent[]): FestivalEvent[] =>
  events.sort((a, b) => a.startTime.localeCompare(b.startTime));

export const getEventTitle = (event: FestivalEvent): string =>
  event.title + " " + new Date(event.startTime).getFullYear();
