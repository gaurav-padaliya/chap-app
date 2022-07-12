const socket = io('http://localhost:8000');

let name = prompt("enter your name","user1");
var audio = new Audio('ting.mp3');
//dom variable
const container = document.querySelector(".container");
const msgInp = document.getElementById("msgInp");
const form = document.querySelector(".form");

const append = (message, position) => {
    const newElement  = document.createElement('div');
    newElement.classList.add(`${position}`);
    newElement.classList.add("chat");
    newElement.innerText  = message;
    container.append(newElement);
}

socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', (name) =>{
    append(`${name} joined the chat`, 'center')
    audio.play();
})

// If server sends a message, receive it
socket.on('recieve', data =>{
    append(`${data}`, 'left');
    audio.play();
})

// If a user leaves the chat, append the info to the container
socket.on('leave', name =>{
    append(`${name} left the chat`, 'center');
    audio.play();
})


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const msg = msgInp.value;
    append(`${name} : ${msg}`,'right');
    socket.emit('send', `${name} : ${msg}`);
    // audio.play();
    msgInp.value = "";
})

