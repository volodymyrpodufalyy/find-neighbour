import io from 'socket.io-client';

const socket = io(window.location.origin.replace('3000','3003')); //на продакшн це потрібно переписати

export default socket;