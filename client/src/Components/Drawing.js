import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import CanvasDraw from "react-canvas-draw";
import queryString from "query-string";
import socket from '../Providers/SocketProvider'

function Drawing({ location }) {
  const history = useHistory();
  const [word, setWord] = useState("");
  const [canvas, setBrush] = useState("#FCA5A5");

  const stageRef = React.useRef(null);

  useEffect(() => {
    const { word } = queryString.parse(location.search);
    setWord(word);
  }, [location.search]);

  const sendDrawingHandler = (e) => {
    e.preventDefault()

    const base64Image = stageRef.current.getDataURL();
    socket.emit("picture", base64Image)
    window.image = base64Image // <-- Make base64Image globally available
    history.push(`/game?word=${word}`)
  }

  return <div>

    <div className='drawing container'>
      <div className='word'>
        <p>Your are drawing {word}</p>
      </div>
      <div className='palette-div'>
        <label>Color Palette</label>
        <input
          style={{ background: { canvas } }}
          type="color"
          value={canvas}
          onChange={(event) => { setBrush(event.target.value); }} />
      </div>
      <CanvasDraw className='canvas' canvasWidth={600} canvasHeight={500} ref={stageRef} brushColor={canvas} />

      <button className='btn-send' onClick={() => { stageRef.current.undo(); }}>undo</button>
      <button className='btn-send' onClick={(e) => sendDrawingHandler(e)} >Send</button>

    </div>

  </div>;
}

export default Drawing;