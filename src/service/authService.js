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

const handleValidation = (password, email, setPasswordError, setEmailError) => {
  let formIsValid = true;
  if (email === "") {
    setEmailError("E-mail kan inte vara tom!");
  }

  if (password.length < 6) {
    formIsValid = false;
    setPasswordError("Lösenordet måste innehålla minst 6 tecken!");
    return false;
  }

  if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[a-z]/.test(password)) {
    formIsValid = false;
    setPasswordError("Stor bokstav, liten bokstav och siffra krävs för lösenord!");
    return false;
  }

  if (/\s/.test(password)) {
    formIsValid = false;
    setPasswordError("Lösenordet får inte innehålla mellanrum!");
    return false;
  } else {
    setPasswordError("");
    formIsValid = true;
  }

  return formIsValid;
};

const authService = { authenticate, register, handleValidation };
export default authService;
