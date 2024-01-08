const express = require("express");
const http = require("http");
const routes = require("./services/routes.js");
const socket = require("./services/socket.js");

const app = express();
const server = http.createServer(app);

routes.configureRoutes(app);
socket.configureWebSocket(server);

const APP_PORT = process.env.PORT || 3000;

server.listen(APP_PORT, () =>
  console.log(`Servidor ouvindo a porta ${APP_PORT}!`)
);