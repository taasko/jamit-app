import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import EventList from "./Events/List";
import EventView from "./Events/View";
import ICal from "./Events/ICal";
import events from "./events.json";
import { getUpcomingEvents, getSortedEvents } from "./Events/event";

const sortedEvents = getSortedEvents(events);
const upcomingEvents = getUpcomingEvents(sortedEvents);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      handle: {
        crumb: "Koti",
      },

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "events",
          loader: () => ({ events }),
          handle: {
            crumb: "Tapahtumat",
          },
          children: [
            {
              path: "list",
              loader: () => ({ events: sortedEvents }),
              element: <EventList />,
              handle: {
                crumb: "Lista",
              },
            },
            {
              path: ":eventId",
              loader: ({ params }) => {
                const { eventId } = params;

                const event = events.find((e) => e.id === Number(eventId));

                return { event };
              },
              element: <EventView />,
              handle: {
                crumb: "Tutki",
              },
            },
            {
              path: "ical",
              loader: () => ({ events: upcomingEvents }),
              element: <ICal />,
              handle: {
                crumb: "iCal",
              },
            },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

export default function App() {
  return <RouterProvider router={router} />;
}
