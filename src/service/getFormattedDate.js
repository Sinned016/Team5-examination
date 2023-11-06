export default function getFormattedDate(date) {
    const today = new Date(date);
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // Adds zero before month and then picks out last two digits. november(11) -> 011 -> 11, janury(1) -> 01 -> 01 (instead of just 1)
    const year = today.getFullYear();
    const day = ("0" + today.getDate()).slice(-2); // Same as month, to avoid single digit dates.
    const weekday = today.getDay();
    const weekdayArray = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
    return `${weekdayArray[weekday]}, ${year}-${month}-${day}`;
}