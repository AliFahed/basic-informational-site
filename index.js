const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  fs.readFile(filePath, (err, content) => {
    // if page not found
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
