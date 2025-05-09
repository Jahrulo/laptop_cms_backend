import arc from "../config/arcjet.config.js";
import { getClientIp } from "../utils/ipUtils.js";

const arcjetMiddleware = async (req, res, next) => {
  // Early return if headers already sent
  if (res.headersSent) return next();

  try {
    const clientIp = getClientIp(req);
    console.log("Resolved client IP:", clientIp);

    // Create a new request object with the IP set in the headers
    const arcjetRequest = {
      ...req,
      headers: {
        ...req.headers,
        "x-forwarded-for": clientIp,
        "x-real-ip": clientIp,
      },
      socket: {
        ...req.socket,
        remoteAddress: clientIp,
      },
    };

    const decision = await arc.protect(arcjetRequest, { requested: 1 });

    if (decision.isDenied()) {
      // Double-check headers before sending
      if (!res.headersSent) {
        const status = decision.reason.isRateLimit()
          ? 429
          : decision.reason.isBot()
          ? 403
          : 403;
        return res.status(status).json({
          error: decision.reason.isRateLimit()
            ? "Rate limit exceeded"
            : decision.reason.isBot()
            ? "Bot detected"
            : "Access denied",
        });
      }
      return;
    }

    next();
  } catch (err) {
    console.error("Arcjet error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default arcjetMiddleware;
