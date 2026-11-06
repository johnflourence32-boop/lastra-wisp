
import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = Number(process.env.PORT) || 5001;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("Lastra Wisp Server is running!");
});

wisp.options.allow_private_ips = false;
wisp.options.allow_loopback_ips = false;
wisp.options.allow_direct_ip = false;
wisp.options.allow_udp_streams = false;

// Handle incoming Wisp WebSocket connections
server.on("upgrade", (req, socket, head) => {
  console.log("[Lastra] WebSocket upgrade:", req.url);

  socket.on("error", (err) => {
    console.error("[Lastra] Socket error:", err);
  });

  wisp.routeRequest(req, socket, head);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Lastra] Wisp listening on port ${PORT}`);
});
