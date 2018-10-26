// Core
import io from 'socket.io-client';

// Components
import { SOCKET_URL } from '../API';

export const socket = io(SOCKET_URL, {
    path: '/react/ws',
});