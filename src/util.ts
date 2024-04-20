export const dateFormat = (date: string) =>
  new Intl.DateTimeFormat("fi-FI").format(new Date(date));
