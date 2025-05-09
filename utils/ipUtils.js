// utils/ipUtils.js
export function getClientIp(req) {
  // Try all possible IP headers in order of reliability
  const ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    req.headers["x-real-ip"] || // Nginx/Load Balancer
    req.headers["x-forwarded-for"]?.split(",")[0].trim() || // Proxy chains
    req.connection?.remoteAddress || // Direct connection
    req.socket?.remoteAddress || // Socket connection
    req.ip || // Express default
    "127.0.0.1"; // Final fallback

  // Convert IPv6 localhost to IPv4 if needed
  return ip === "::1" ? "127.0.0.1" : ip;
}
