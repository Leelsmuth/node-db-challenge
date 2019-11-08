const express = require("express");

const projectRouter = require("./routers/projectsRouter");
const resourceRouter = require("./routers/resourceRouter");
const taskRouter = require("./routers/taskRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

module.exports = server;