import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { configureStore } from "./core";

const initial = {
  game: 1,
  gender: "man",
};

const reduce = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      state.gender = "women";
      break;
    case "decrement":
      state.game = action.payload;
      break;

    default:
      return state;
  }
  return state;
};
const { useStore, useSelector } = configureStore(initial, reduce);
function App() {
  const { state, dispatch } = useStore();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {state.gender + " "}
        {state.game}

        <button onClick={() => dispatch({ type: "increment" })}>
          increment
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
          decrement
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
