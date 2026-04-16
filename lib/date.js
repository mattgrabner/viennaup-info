export function toDateLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(date);
}

export function toTimeRange(start, end) {
  return `${start?.slice(0, 5) || ""} - ${end?.slice(0, 5) || ""}`;
}
