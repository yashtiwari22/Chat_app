import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from "../Infobar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import ParticleBackground from '../Particle/Particle';

let socket;

const Chat=({location})=> {
    const [name,setName]=useState('');
    const [room, setRoom]=useState('');
    const [users,setUsers]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);

    const ENDPOINT='https://chat-appyash.herokuapp.com';
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);

        socket= io(ENDPOINT, {  
            cors: {
            origin: "https://chat-appyash.herokuapp.com",
            credentials: true
          }, transports : ['websocket'] });

        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},(error)=>{
            if(error)
            {
                alert(error);
            }
        }
        );

        console.log(socket);
        return ()=>{
            socket.disconnect();
            socket.off();
        }
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message',message=>{
            setMessages([...messages,message]);
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    },[messages]);


const sendMessage=(event)=>{
    event.preventDefault();
    if(message){
        socket.emit('sendMessage',message,()=> setMessage(''));
    }
}
console.log(message, messages,"dkfkfjd");
    return (
        
            <div className="outerContainer">
                <div className="container">
                    
                    <InfoBar room={room}/>
                    <Messages messages={messages} name={name}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

                </div>
                <TextContainer users={users}/>
            </div>
        )
}

export default Chat;
