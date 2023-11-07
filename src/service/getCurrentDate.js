export default function getCurrentDate() {
    const today = new Date();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}