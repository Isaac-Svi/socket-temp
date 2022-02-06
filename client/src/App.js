import { Switch, Route } from "react-router-dom";
import GameEntry from "./Components/GameEntry";
import Level from "./Components/Level";
import Game from "./Components/Game";
import Header from "./Components/Header";
import Drawing from './Components/Drawing';
import './App.css';
import GameOver from "./Components/GameOver";

function App() {
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path="/" component={GameEntry} />
        <Route exact path="/level" component={Level} />
        <Route exact path="/drawing" component={Drawing} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/gameover" component={GameOver} />
      </Switch>
    </div>
  );
}

export default App;