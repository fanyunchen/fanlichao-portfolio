const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 3001);
const host = "127.0.0.1";
const siteDataPath = path.join(__dirname, "../frontend/public/site-data.json");

function readSiteData() {
  return JSON.parse(fs.readFileSync(siteDataPath, "utf8"));
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.url === "/api/health") {
    sendJson(res, 200, { ok: true, service: "portfolio-api" });
    return;
  }

  if (req.url === "/api/site-data") {
    sendJson(res, 200, readSiteData());
    return;
  }

  sendJson(res, 404, { error: "Not Found" });
});

server.listen(port, host, () => {
  console.log(`Backend running at http://${host}:${port}`);
});
