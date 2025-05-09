// import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
// import { ARCJET_KEY } from "./env.config.js";

// const arc = arcjet({
//   key: ARCJET_KEY,
//   characteristics: ["ip.src"], // Track requests by IP
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except the following
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
//       ],
//     }),
//     // Create a token bucket for rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode: "LIVE",
//       refillRate: 5, // Refill 5 tokens per interval
//       interval: 10, // Refill every 10 seconds
//       capacity: 10, // Bucket capacity of 10 tokens
//     }),
//   ],
// });

// export default arc;

import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.config.js";

const arc = arcjet({
  key: ARCJET_KEY,
  // Simplified characteristics to focus on IP
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default arc;
