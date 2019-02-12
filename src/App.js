import React, { Component } from "react";

import EditableInputFSM from "./components/EditableInputFSM";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <EditableInputFSM initialValue="Editable Input" />
        </header>
      </div>
    );
  }
}

export default App;
