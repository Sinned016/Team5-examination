export function formatDateWithWeekday(dateString) {
    const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("sv-SE", options);
    return formattedDate;
}