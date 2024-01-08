const WebSocket = require("ws");
const { handleIncomingMessage, handleDraw, updateAdminClientCount } = require("./actions.js");

let clients = [];
const ACTIONS = {
    ADMIN: "admin",
    DRAW: "draw",
    CLIENT_COUNT_UPDATE: "clientCountUpdate",
};

function configureWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        clients.push(ws);
        updateAdminClientCount(wss, clients, WebSocket, ACTIONS);

        ws.on("close", () => {
            clients = clients.filter((client) => client !== ws);
            updateAdminClientCount(wss, clients, WebSocket, ACTIONS);
        });

        ws.on("message", (msg) => handleIncomingMessage(ws, msg, ACTIONS, wss)); // Passamos 'wss' como parâmetro aqui
    });
}

module.exports = { configureWebSocket };
