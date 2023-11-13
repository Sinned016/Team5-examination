export function formatDateWithWeekday(dateString) {
    const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("sv-SE", options);
    const [weekday, datePart] = formattedDate.split(", ");
    const [year, month, day] = datePart.split("-");
    return `${weekday}, ${day}-${month}-${year}`;
}