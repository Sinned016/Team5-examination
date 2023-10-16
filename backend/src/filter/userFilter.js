import jwtUtil from "../util/jwtUtil.js";

// Verify that each request has a valid jwt token
function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == undefined) {
    res.status(400); // bad request
    res.send("Authorization header is missing");
  } else {
    const authToken = authHeader.replace("Bearer ", "");

    try {
      const payload = jwtUtil.verify(authToken);
      if (payload.role === "member") {
        next();
      }
    } catch (err) {
      res.status(403); // forbidden
      res.send(err.clientMessage);
    }
  }
}

export default { authorize };
