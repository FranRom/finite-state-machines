import React, { Component } from "react";

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

  async handleSubmit(e) {
    console.log("EEE: ", e.target.value);
    // const submit = await this.goToState("edit", e.target.value);
    // return submit;
    this.goToState("edit", e.target.value);
  }

  handleSave(valueToSave) {
    this.goToState("saving");

    //Simulate saving data
    setTimeout(() => this.goToState("display", valueToSave), 3000);
  }

  render() {
    console.log("STATE: ", this.state);
    const { processing, value, editing, editValue, error } = this.state.machine;

    if (processing) {
      return <p>Processing ...</p>;
    } else if (editing) {
      return (
        <div>
          <input
            type="text"
            onChange={this.handleSubmit}
            value={editValue || value}
          />
          {error && <p>Error: {error}</p>}
          <button onClick={() => this.handleSave(editValue)}>Save</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{value}</p>
          <button onClick={() => this.goToState("edit", value)}>Edit</button>
        </div>
      );
    }
  }
}

export default EditableInputFSM;
