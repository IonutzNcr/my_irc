import { useState } from 'react'



function User(props) {
  const [username, setUsername] = useState('');


  return (
    <div>
      <input
        type="text"
        placeholder="Choose a username"
        className="border-2 border-purple-400 rounded-md p-2 m-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          return props.event(username)
        }} >
        Nice coq, Bro</button>
    </div>
  )
}

export default User