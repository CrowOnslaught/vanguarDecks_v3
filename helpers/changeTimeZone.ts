export function changeTimeZone(date: string, timeZone: string) {
  return new Date(
    new Date(date).toLocaleString("en-US", {
      timeZone,
    })
  );
}
