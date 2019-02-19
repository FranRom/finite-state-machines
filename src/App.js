import React, { Component } from "react";

import EditableInputFSM from "./components/EditableInputFSM";
import TrafficLightFSM from "./components/TrafficLightFSM";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>FINITE STATE MACHINES</h1>

        <div className="appContainer">
          <EditableInputFSM initialValue="Editable Input" />
          <br />
          <br />
          <h2>Traffic Lights</h2>
          <TrafficLightFSM />
        </div>
      </div>
    );
  }
}

export default App;
