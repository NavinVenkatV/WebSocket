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
    return ()=>{
      socket?.close()
    }
    
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

// //backend
// import express from 'express'
// import { WebSocketServer } from 'ws'

// const app = express()
// const httpServer = app.listen(8080)

// const wss = new WebSocketServer({ server: httpServer });

// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });

//   ws.send('Hello! Message From Server!!');
// });