import jwt from "jsonwebtoken";
import * as env from "dotenv";
env.config();

function generate(email, role) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "Filmvisarna-App",
    subject: "send and receive access token",
    expiresIn: "45m",
  };

  let payload = {
    email: email,
    role: role,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, payloadOptions); //sign method sign on payload&secret key, also set expires time

  return token; // synchronous, return token as string
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY); // verify signature and return payload
  } catch (err) {
    let error = new Error(); // custom verification error

    if (err.name == "JsonWebTokenError") {
      error.clientMessage = "Digital signing is invalid";
      error.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      error.clientMessage = "Digital signing is invalid, request new token";
      error.serverMessage = "Token expired";
    }

    throw error;
  }
}

export default { generate, verify };
