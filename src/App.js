import React, { Component } from "react";

import EditableInputFSM from "./components/EditableInputFSM";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>FINITE STATE MACHINE</h1>
        <div className="appContainer">
          <EditableInputFSM initialValue="Editable Input" />
        </div>
      </div>
    );
  }
}

export default App;
