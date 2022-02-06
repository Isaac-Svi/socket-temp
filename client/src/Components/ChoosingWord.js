import React from 'react';
import { useHistory } from "react-router-dom"
import words from "../WordList.json"
import socket from '../Providers/SocketProvider'

function ChoosingWord({ difficultyLevel, name }) {
  const history = useHistory();
  const shuffledWords = words.sort(() => Math.random() - 0.5)

  const handleWord = (e) => {
    let wordText = e.target.innerText
    socket.emit("word", wordText)
    history.push(`/drawing?word=${wordText}`)
  }

  return <div className='word-choosing container'>
    <div>
      <p>{name} you have choosen {difficultyLevel} word as a level</p>
    </div>
    <div className='word'>
      <p>Please choose a word</p>
      {shuffledWords.splice(0, 5).map((item, i) => (
        <div key={i}>
          <div className='word-btn-container'>
            <button className='btn' onClick={(e) => handleWord(e)}>{item}</button>
          </div>
        </div>
      ))}
    </div>

  </div>;
}

export default ChoosingWord;