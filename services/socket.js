const WebSocket = require("ws");
const { handleIncomingMessage, handleDraw, updateAdminClientCount, ACTIONS } = require("./actions.js");

let clients = [];

function configureWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        clients.push(ws);
        updateAdminClientCount(wss, WebSocket);

        ws.on("close", () => {
            clients = clients.filter((client) => client !== ws);
            updateAdminClientCount(wss, WebSocket);
        });

        ws.on("message", (msg) => handleIncomingMessage(ws, msg, wss)); // Passamos 'wss' como parâmetro aqui
    });
}

module.exports = { configureWebSocket };
