import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import queryString from "query-string";
import GameOver from './GameOver';
import socket from '../Providers/SocketProvider'

function Game({ location }) {
  const { word: queryWord } = queryString.parse(location.search);
  console.log(queryWord, "query")

  const [image, setImage] = useState(window.image || "")
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [word, setWord] = useState(queryWord || "")
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //adding event listerners with socket.on, useEffect create event listeners
    socket.on("picture", setImage)
    socket.on("word", setWord)
    socket.on("welcome", receiveMessage);
    socket.on("message", receiveMessage);

    return () => {
      //remove event listeners when components remounts I will not have more than one
      //specifiying the function name is setImage1 and event is picture//
      socket.off("picture", setImage)
      socket.off("word", setWord)
      socket.off("welcome", receiveMessage);
      socket.off("message", receiveMessage);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", currentMessage)
    setCurrentMessage("")

    if (currentMessage === word || currentMessage === queryWord) {
      history.push("/gameover")
      setIsFinished(true)
    }
  }

  const goToHomePage = () => {
    history.push("/")
  }

  const receiveMessage = (message) => {
    setMessageList((list) => [...list, message]);
  }

  return <div className='game-container'>

    {!image ? (
      <div className='waiting-container'>
        <p className='waiting-text'>Waiting for drawer to send the picture</p>
        <p className='waiting-text'>Thank you for your patience</p>
        <div className='loader'></div>
      </div>) : (
      <>
        {!isFinished ? (<div className='game-views' >
          <div className='image-container'>
            <div className='title'>
              <h2>Here is Drawer's Picture</h2>
            </div>
            <img alt="" src={image}></img>
          </div>

          <div className="chatContainer">
            <h2>ChatBox</h2>
            <div className="chat">
              {messageList.map((msg, i) => (
                <li key={i}> {msg}</li>
              ))}
            </div>
            <form className='form-wrapper' onSubmit={submitHandler}>

              <input className='chatbox-input' placeholder='Please type your guesses in capital letters' autoComplete="off" type="text" value={currentMessage} onChange={(event) => {
                setCurrentMessage(event.target.value);
              }} />
              <button className='btn-guess' >Send</button>
              <button onClick={goToHomePage} className='btn-guess' >Go to home Page</button>

            </form>
          </div>
        </div>) : (<GameOver />)}


      </>)}



  </div>;
}

export default Game;