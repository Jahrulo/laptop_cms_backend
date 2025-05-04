import arc from "../config/arcjet.config.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await arc.protect(req, { requested: 1 });

    // if decision is denied
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: "Rate limit exceeded" });
      if (decision.reason.isBot())
        return res.status(403).json({ error: "Bot detected" });

      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (err) {
    console.log(`Arcjet Middleware Error: ${err}`);
    next(err);
  }
};

export default arcjetMiddleware;
