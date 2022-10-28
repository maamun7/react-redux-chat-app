import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
});

export default socket;
