export type FestivalEvent = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  url: string;
  tickets: string;

  [key: string]: string;
};
