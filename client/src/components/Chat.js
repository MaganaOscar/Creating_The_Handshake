import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
 
const Chat = () => {
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [socket] = useState(() => io(':8000'));
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
 
  useEffect(() => {
    console.log(messages)
    // we need to set up all of our event listeners
    // in the useEffect callback function
    socket.emit("Welcome", {test: 'has joined the chat'});

    socket.on("new_message_from_server", msg =>{
        console.log(msg);
        setMessages(prevMessages => {
            return [...prevMessages, msg];
        })
    }
    )
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
    return () => socket.disconnect(true);
  }, []);
  
  const handleUserSubmit = (e) => {
      e.preventDefault();
      setUser(e.target.user.value);
      socket.emit("new_message_from_client", {
        new: e.target.user.value});
  }

  const handleChatSubmit = (e) => {
        e.preventDefault();

        setMessages(prevMessages => {
            return [...prevMessages, {user: "You", message: e.target.msg.value} ]
        })
        socket.emit("new_message_from_client", {
            user: user,
            message: e.target.msg.value});

  }
  console.log(messages);
  return (
    <div>
        <h1>MERN CHAT</h1>
        <div>
        {
            user.length<1 ?
            <div>
                <h2>Get started right now!</h2>
                <br></br>
                <p>I want to start chatting with the name...</p>
                <form onSubmit={handleUserSubmit}>
                    <input placeholder="My name..." type="text" name="user"/>
                    <button>Start Chatting</button>
                </form>
            </div>:
            <div>
                
                {
                messages.map((message, idx) => {
                    return (
                        <div key={idx}>
                            {
                                message.new ?
                                <p>{message.new} has joined the chat</p>:
                                <div>
                                    <p>{message.user}:</p>
                                    <p>{message.message}</p>
                                </div>
                            }
                            
                        </div>
                    )
                })}
                <form onSubmit={handleChatSubmit}>
                    <input type="text" name="msg"/>
                    <button>Send</button>
                </form>
            </div>
        }
        </div>
    </div>
  );
}
 
export default Chat;
