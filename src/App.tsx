import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root";
import ErrorPage from "./ErrorPage";
import EventList from "./Events/List";
import EventView from "./Events/View";
import ICal from "./Events/ICal";

import events from "./events.json";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: "events",
          loader: () => ({ events }),
          children: [
            {
              path: "list",
              loader: () => ({ events }),
              element: <EventList />,
            },
            {
              path: ":eventId",
              loader: ({ params }) => {
                const { eventId } = params;

                const event = events.find((e) => e.id === Number(eventId));

                return { event };
              },
              element: <EventView />,
            },
            {
              path: "ical",
              loader: () => ({ events }),
              element: <ICal />,
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
