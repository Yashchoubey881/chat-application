const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const person = {};
io.on('connection', (socket) => {
    socket.on('user', (data) => {

        console.log('user name is',data);
        socket.broadcast.emit('new-user', data)
        person[socket.id] = data;
       
        })
        socket.on('send', (message) => {
            socket.broadcast.emit('recieve', { info: message, name: person[socket.id] });
    })
    socket.on('disconnect',(message)=>{
      socket.broadcast.emit('leave',person[socket.id]);
      delete person[socket.id];
    })
})
