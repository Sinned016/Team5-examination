import jwtUtil from "../util/jwtUtil.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "iwillnottellyoufsfsfsfssfwrwrjwrojjhfsjfhsfj";

function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET_KEY); // verify signature and return payload
  } catch (err) {
    let error = new Error(); // custom verification error

    if (err.name == "JsonWebTokenError") {
      error.clientMessage = "Digital signing is invalid, request a new token";
      error.serverMessage = "Token verification failed";
    }
  }

  throw error;
}

// Verify that each request has a valid jwt token
function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == undefined) {
    res.status(400); // bad request
    res.send("Authorization header is missing");
  } else {
    const authToken = authHeader.replace("Bearer ", "");

    try {
      const payload = verifyJWT(authToken);

      res.locals.email = payload.email;
      next();
    } catch (err) {
      res.status(403); // forbidden
      res.send(err.clientMessage);
    }
  }
}

export default { authorize };
