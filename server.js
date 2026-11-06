import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = process.env.PORT || 5001;

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

server.on("upgrade", (req, socket, head) => {
  if (req.url === "/wisp/") {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Lastra Wisp listening on ${PORT}`);
});
