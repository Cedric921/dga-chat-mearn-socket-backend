"use strict";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let io;
const socket_io_1 = require("socket.io");
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init: (httpServer) => {
        io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*',
            },
        });
        return io;
    },
    getIO: () => {
        if (!io)
            throw new Error('Socket not initialized');
        return io;
    },
};
