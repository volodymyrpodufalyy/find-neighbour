import io from 'socket.io-client';

const socket = io('https://findneighbour-backend.herokuapp.com'); 

export default socket;