import { useEffect, useState } from 'react';
import User from './components/User.jsx'
import { LogicLayer } from './components/LogicLayer.jsx';

function App() {

  const [name, setName] = useState("");

  return (
    <>
      {!name && <User event={setName} />}
      {name &&
        <LogicLayer name={name} event={setName} />
      }
    </>


  );
}

export default App;