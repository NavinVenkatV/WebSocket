import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const[message, setMessage] = useState("");
  const[sendMessage, setSendMessage] = useState("")

  useEffect(()=>{
    const newSocket = new WebSocket('ws://localhost:8080')
    newSocket.onopen = ()=>{
      console.log("Connected")
      newSocket.send("Hello server")
      setSocket(newSocket)
    }
    newSocket.onmessage = (event) => {
      setMessage(event.data);
    };
    
  },[])

  if(!socket){
    return <div>
      Wait for the websocket connection.....
    </div>
  }
  return (
    <>
      <input onChange={(e)=>{setSendMessage(e.target.value)}}></input>
      <button onClick={()=>{
        socket.send(sendMessage)
      }}>Send</button>
      {message}
    </>
  )
}

export default App
