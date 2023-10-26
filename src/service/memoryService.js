/* 
Local memory storage service
handles communication with session and local storage
Stores values such as jwt token and other cachable data
*/

function saveLocalValue(ref, value) {
  value = JSON.stringify(value);
  localStorage.setItem(ref, value);
}

function getLocalValue(ref) {
  let value = localStorage.getItem(ref);
  return JSON.parse(value);
}

function clearLocalValue(ref) {
  localStorage.removeItem(ref);
}

const memoryService = { saveLocalValue, getLocalValue, clearLocalValue };
export default memoryService;
