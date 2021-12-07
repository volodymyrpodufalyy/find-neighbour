import io from 'socket.io-client';

const socket = io('https://findneighbour-backend.herokuapp.com/'); //на продакшн це потрібно переписати

export default socket;