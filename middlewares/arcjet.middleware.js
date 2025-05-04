import arc from "../config/arcjet.config";
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await arc.protect(req, { requested: 1 });

    // if decision is denied
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
      }
    } else if (decision.results.some(isSpoofedBot)) {
      // Arcjet Pro plan verifies the authenticity of common bots using IP data.
      // Verification isn't always possible, so we recommend checking the decision
      // separately.
      // https://docs.arcjet.com/bot-protection/reference#bot-verification
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World" }));
    }
  } catch (err) {
    console.log(`Arcjet Middleware Error: ${err}`);
    next(err);
  }
};

export default arcjetMiddleware;
