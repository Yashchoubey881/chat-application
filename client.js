const socket= io ('http://localhost:8000');
const doc=document.getElementById('messageBox');
const container=document.querySelector('.container');
const inp=document.getElementById('inp');
const audio=new Audio('sound.mp3');
const btn=document.getElementById('btn');
btn.addEventListener('mouseover',()=>{
    btn.style.backgroundColor='blue';
    
})
let data=prompt('Enter your name to join the chat');
socket.emit('user',data);
const append=(message,position)=>{
    const newContainer=document.createElement('div');
    newContainer.innerText=message;
    newContainer.classList.add('message');
    newContainer.classList.add(position);
    container.append(newContainer);
    if(position=='left')
    audio.play();

}
socket.on('new-user',data=>{
    append(`${data} joined the chat`,'right');
})
doc.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=inp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    inp.value='';

})
socket.on('recieve',(content)=>{
append(`${content.name}:${content.info}`,'left');
})
socket.on('leave',user=>{
    append(`${user} left the chat`,'left');
})