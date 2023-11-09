import { useEffect, useState } from 'react';
// import User from './components/User.jsx'
// import { LogicLayer } from './components/LogicLayer.jsx';
import ConnexionLayout from './components/ConnexionLayout.jsx';
import { AppLayout } from './components/AppLayout.jsx';
// import Friends from './components/Friends.jsx';
// import Rooms from './components/Rooms.jsx'
import io from 'socket.io-client';
import { Chat } from './components/Chat.jsx';
import { SideBar } from './components/SideBar.jsx';
import InfoBar from './components/InfoBar.jsx';
import { Header } from './components/Header.jsx';
import { ChatLayout } from './components/ChatLayout.jsx';
import { Footer } from './components/Footer.jsx';
import { Modal } from './components/Modal.jsx';


const socket = io('http://localhost:3009');

const App = () => {
  //FOR infobar component & sidebar componenet
  const [activeTab, setActiveTab] = useState('users');
  //for ???
  const [isConnected, setIsConnected] = useState(false);
  const [name, setName] = useState("");
  //direction vers la room par default
  const [inRoom, setInRoom] = useState("default");
  const [admin, setAdmin] = useState(false);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    socket.on("joined", (room, admin) => {
      console.log("joined inside joined", room)
      setInRoom(room)
      setAdmin(admin)
    })
    return () => {
      socket.off("joined")
    }
  }, [])

 

  return (
    <>

      <ConnexionLayout
        setIsConnected={setIsConnected}
        socket={socket}
        name={name}
        setName={setName}
        inRoom={inRoom}
      />
      {isConnected &&
        <AppLayout modal={modal}>
          <SideBar setInRoom={setInRoom} setIsConnected={setIsConnected} setName={setName} socket={socket} activeTab={activeTab} setActiveTab={setActiveTab} />
          <InfoBar socket={socket} activeTab={activeTab} author={name} room={inRoom} inRoom={inRoom} setInRoom={setInRoom} modal={modal} setModal={setModal} />

          <ChatLayout >
            <Header socket={socket} author = {name} setInRoom={setInRoom} inRoom={inRoom} />
            <Chat socket={socket} author={name} inRoom={inRoom} />
            <Footer socket={socket} author={name} inRoom={inRoom} />
          </ChatLayout>
        </AppLayout>}
      {modal && <Modal socket={socket} user={name} setModal={setModal} setInRoom={setInRoom} />}

    </>


  );
}

export default App;