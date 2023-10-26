const buildFetchOptions = (body) => ({
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-Type": "application/json",
  },
});

const performRequest = async (url, body) => {
  const options = buildFetchOptions(body);
  let resp = await fetch(url, options);

  return resp;
};

async function authenticate(credential) {
  let resp = await performRequest("/api/login", credential);

  return resp;
}

async function register(credential) {
  let resp = await performRequest("/api/register", credential);

  return resp;
}

const authService = { authenticate, register };
export default authService;
