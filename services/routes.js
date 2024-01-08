const express = require("express");
const path = require("path");

function configureRoutes(app) {
    const ACTIONS = {
        ADMIN: "admin",
        DRAW: "draw",
        CLIENT_COUNT_UPDATE: "clientCountUpdate",
    };

    const publicPath = path.join(__dirname, "..", "public");

    app.use("/public", express.static(publicPath));
    app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));
    app.get("/admin", (req, res) => res.sendFile(path.join(publicPath, "admin.html")));
}

module.exports = { configureRoutes };