import React from 'react';
import {useHistory} from "react-router-dom"

function GameOver() {
  const history=useHistory();

  const  handleRestart = () =>  {
    history.push("/")
  }
  return <div className='game-over'>
                <p>   You have finished the game
                you guessed the word correctly</p>
            
                <button className='btn' onClick= {
                  handleRestart
                }>Restart</button>
          
          </div>;
}

export default GameOver;