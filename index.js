/**
 * @fileOverview The main function; deploys the server.
 */
const http = require("http");

const app = require("./app");
const server = http.createServer(app);
const routes = require("./routes");

app.use(routes);

server.listen(app.get("port"), function () {
  console.log("listening on port: " + app.get("port"));
});

server.setTimeout(0);

