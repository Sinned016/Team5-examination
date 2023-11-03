export default function getFormattedDate(date) {
    const today = new Date(date);
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const day = today.getDate();
    const weekday = today.getDay();
    const weekdayArray = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
    return `${weekdayArray[weekday]}, ${year}-${month}-${day}`;
}