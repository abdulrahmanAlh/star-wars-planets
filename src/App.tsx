import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useStore } from "./core";

const initial = 0;

const reduce = (state: number, action: any) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
function App() {
  const { state, dispatch } = useStore(initial, reduce);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {state}
        <button onClick={() => ({ type: "increment" })}>increment</button>
        <button onClick={() => dispatch({ type: "decrement" })}>
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
