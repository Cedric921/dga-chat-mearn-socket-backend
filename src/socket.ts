// eslint-disable-next-line @typescript-eslint/no-explicit-any
let io: any;
import { Server } from 'socket.io';

export = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	init: (httpServer: any) => {
		io = new Server(httpServer, {
			cors: {
				origin: '*',
			},
		});
		return io;
	},
	getIO: () => {
		if (!io) throw new Error('Socket not initialized');
		return io;
	},
};
