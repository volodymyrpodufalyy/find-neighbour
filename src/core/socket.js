import io from 'socket.io-client';

const socket = io('https://findneighour-backend-apis.herokuapp.com'); 

export default socket;