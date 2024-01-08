const ACTIONS = {
    ADMIN: "admin",
    DRAW: "draw",
    CLIENT_COUNT_UPDATE: "clientCountUpdate",
};

function handleIncomingMessage(ws, msg, wss) {
    const data = JSON.parse(msg);
    const action = data.action;

    switch (action) {
        case ACTIONS.ADMIN:
            ws.isAdmin = true;
            break;
        case ACTIONS.DRAW:
            handleDraw(wss, data.code, ACTIONS);
            break;
        default:
            console.warn("Ação desconhecida:", action);
    }
}

function handleDraw(wss, confirmationCode, ACTIONS) {
    let participants = Array.from(wss.clients).filter(
        (client) => !client.isAdmin
    );
    const winner = participants[Math.floor(Math.random() * participants.length)];

    participants.forEach((client) => {
        let result = JSON.stringify({ status: "youlose" });
        if (client === winner) {
            result = JSON.stringify({ status: "youwin", code: confirmationCode });
        }
        client.send(result);
    });
}

function updateAdminClientCount(wss, WebSocket) {
    const clientCount = Array.from(wss.clients).filter(
        (client) => !client.isAdmin
    ).length;

    Array.from(wss.clients).forEach((client) => {
        if (client.isAdmin && client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    action: ACTIONS.CLIENT_COUNT_UPDATE,
                    count: clientCount,
                })
            );
        }
    });
}

module.exports = { handleIncomingMessage, handleDraw, updateAdminClientCount, ACTIONS };
