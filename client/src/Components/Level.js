import React, { useEffect, useState } from 'react';
import ChoosingWord from './ChoosingWord';
import socket from '../Providers/SocketProvider'
import queryString from "query-string";

function Level({ location }) {
  const [name, setName] = useState("");

  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    const { drawer } = queryString.parse(location.search);
    setName(drawer);
  }, [location.search]);

  const handleSetDifficultyLevel = (e) => {
    //taking the buttons innerText value and assing it to a state
    setDifficultyLevel(e.target.innerText)
    //setting the difficulty level on serverside
    socket.emit("mode", e.target.innerText)
    setIsClicked(true);
  }

  return (
    <div className='level-container'>
      {!isClicked ? (
        <div>
          <div className='greeting'>
            <p>Hello, {name}! You are the drawer</p>
          </div>
          <div className='level-choosing'>
            <p>Please choose a difficulty level for your word</p>
            <div className='level-btn-container'>
              <button className='btn' onClick={(e) => handleSetDifficultyLevel(e)}>Easy</button>
              <button className='btn' onClick={(e) => handleSetDifficultyLevel(e)}>Medium</button>
              <button className='btn' onClick={(e) => handleSetDifficultyLevel(e)} >Hard</button>
            </div>
          </div>
        </div>
      ) : (
        <ChoosingWord difficultyLevel={difficultyLevel} name={name} setIsClicked={setIsClicked} />
      )
      }
    </div>
  )
}

export default Level;