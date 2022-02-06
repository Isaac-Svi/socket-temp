import React, { useState } from 'react';
import { useHistory } from "react-router-dom"
import socket from '../Providers/SocketProvider'

function GameEntry() {
  const history = useHistory();
  const [username, setUserName] = useState("");

  const joinGame = (e) => {
    e.preventDefault()
    if (username !== "") {
      socket.emit("user", username, (players, user) => {
        //this replaces the useEffect
        console.log(players, "players from server")

        if (user.isAdmin) {
          history.push(`/level?drawer=${username}`)
        } else {
          history.push("/game")
        }
      })

    }
  }



  return <div>
    <div className="join-game-container">
      <form onSubmit={joinGame} >
        <p className='welcome-text'>Welcome to Draw & Guess Game</p>
        <div className='input-container'>
          <input className='game-entry-input' type="text" placeholder='Please type your username' name="username" value={username} onChange={(e) => setUserName(e.target.value)} />
          <button className='btn' >Start the Game</button>
        </div>

      </form>
    </div>
  </div>;
}

export default GameEntry;