import jwtUtil from "../util/jwtUtil.js";

// Verify that each request has a valid jwt token
function authorize(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (authHeader == undefined) {
    res.status(400); // bad request
    res.json({ error: "Authorization header is missing" });
  } else {
    const authToken = authHeader.replace("Bearer ", "");

    try {
      const payload = jwtUtil.verify(authToken);
      if (payload.role === "member") {
        next();
      }
    } catch (err) {
      res.status(403); // forbidden
      res.json({ error: err.clientMessage });
    }
  }
}

export default { authorize };
