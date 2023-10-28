import { useEffect, useState } from 'react';
// import User from './components/User.jsx'
// import { LogicLayer } from './components/LogicLayer.jsx';
import ConnexionLayout from './components/ConnexionLayout.jsx';
import { AppLayout } from './components/AppLayout.jsx';
import Friends from './components/Friends.jsx';
import Rooms from './components/Rooms.jsx'
import io from 'socket.io-client';
import { Chat } from './components/Chat.jsx';

// const socket = io('http://localhost:3009');

const App = () => {



  const [isConnected, setIsConnected] = useState(false);
  const [name, setName] = useState("");

  const Comp = (data)=>{
    console.log(data)
    return (<h1>
      hello
    </h1>)
  }

  const data = {
    apple:"yes", 
    juice:"no"
  }

  return (
    <>
    <Comp {...data} /> 
      {/* <ConnexionLayout
        setIsConnected={setIsConnected}
        socket={socket}
        name={name}
        setName={setName}
      />
      {isConnected &&
        <AppLayout  >
          <Friends socket={socket} />
          <Chat socket={socket} author={name}/>
          <Rooms socket={socket} />
        </AppLayout>} */}

    </>


  );
}

export default App;