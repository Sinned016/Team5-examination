import memoryService from "./memoryService.js";

/* helper function (not exported), used to parse local jwt token from localStorage */

function getLocalJWTData() {
  const localJWTToken = memoryService.getLocalValue("JWT_TOKEN");
  if (!localJWTToken) return;
  else {
    const tokenParts = localJWTToken.split("."); // 0 - jwt header, 1 - payload, 2 - signatur
    const payload = tokenParts[1];

    let payloadData = window.atob(payload);
    return JSON.parse(payloadData);
  }
}

function getUserEmail() {
  if (!getLocalJWTData()) return;
  else {
    return getLocalJWTData().email;
  }
}

function getUserRole() {
  if (!getLocalJWTData()) return;
  else {
    return getLocalJWTData().role;
  }
}

const buildPutFetchOptions = (body) => ({
  method: "PUT",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
  },
});

const buildGetFetchOptions = () => ({
  headers: {
    "Authorization": "Bearer " + memoryService.getLocalValue("JWT_TOKEN"),
  },
});

const performRequest = async (url, method, body) => {
  let options = undefined;

  if (method === "GET") {
    options = buildGetFetchOptions();
  } else if (method === "PUT") {
    options = buildPutFetchOptions(body);
  }

  return await fetch(url, options);
};

const getUserBookings = async (email) => {
  let resp = await performRequest(`/api/bookings/${email}`, "GET");
  let data = await resp.json();
  return data;
};

const bookSeats = async (id, bookingInformation) => {
  let resp = await performRequest(`/api/screening/${id}`, "PUT", bookingInformation);
  let data = await resp.json();
  return data;
};

const userService = {
  getUserEmail,
  getUserRole,
  getUserBookings,
  bookSeats,
};
export default userService;
