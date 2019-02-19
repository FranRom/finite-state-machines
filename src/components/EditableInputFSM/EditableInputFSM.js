import React, { Component } from "react";

import Spinner from "../Spinner";

import "./EditableInputFSM.css";

class EditableInputFSM extends Component {
  state = {
    name: "display",
    machine: this.generateState("display", this.props.initialValue)
  };

  generateState(stateName, stateParam) {
    const previousState = this.state ? { ...this.state.machine } : {};

    switch (stateName) {
      case "display":
        return {
          processing: false,
          value: stateParam || previousState.value,
          editing: false,
          editValue: null,
          error: null
        };
      case "saving":
        return {
          processing: true,
          value: previousState.value,
          editing: true, // Keep the edit view until save is done
          editValue: previousState.editValue,
          error: null //Reset previous error
        };
      case "edit":
        return {
          processing: false,
          value: previousState.value,
          editing: true,
          editValue: stateParam,
          error: null
        };
      case "saveError":
        return {
          processing: false,
          value: previousState.value,
          editing: true,
          editValue: previousState.editValue,
          error: null
        };
      case "loading":
      default:
        return {
          processing: true,
          value: null,
          editing: false,
          editValue: null,
          error: null
        };
    }
  }

  goToState(stateName, stateParam) {
    this.setState({
      name: stateName,
      machine: this.generateState(stateName, stateParam)
    });
  }

  handleSubmit = e => {
    this.goToState("edit", e.target.value);
  };

  handleSave(valueToSave) {
    this.goToState("saving");

    //Simulate saving data
    setTimeout(() => this.goToState("display", valueToSave), 3000);
  }

  render() {
    console.log("STATE: ", this.state);
    const { processing, value, editing, editValue, error } = this.state.machine;

    if (processing) {
      return (
        <div className="wrapper">
          <p className="textFormat">Processing</p>
          <Spinner />
        </div>
      );
    } else if (editing) {
      return (
        <div className="wrapper">
          <input
            type="text"
            onChange={this.handleSubmit}
            value={editValue || value}
          />
          {error && <p>Error: {error}</p>}
          <button
            className="btn saveBtn"
            onClick={() => this.handleSave(editValue)}
          >
            <span role="img" aria-label="save-emoji">
              ✔️
            </span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <span className="textFormat">{value}</span>
          <button
            className="btn editBtn"
            onClick={() => this.goToState("edit", value)}
          >
            <span role="img" aria-label="edit-emoji">
              ✎
            </span>
          </button>
        </div>
      );
    }
  }
}

export default EditableInputFSM;
