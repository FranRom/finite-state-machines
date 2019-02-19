import React, { Component } from "react";
import { Machine } from "xstate";

class TrafficLightFSM extends Component {
  state = {
    currentLight: "green"
  };
  machine = Machine({
    // Machine identifier
    id: "traffic-light",
    // Initial state
    initial: "green",
    states: {
      green: {
        on: {
          TIMER: "yellow"
        }
      },
      yellow: {
        on: {
          TIMER: "red"
        }
      },
      red: {
        on: {
          TIMER: "green"
        }
      }
    }
  });

  transition = () => {
    console.log("THIS: ", this, "Machine: ", this.machine);
    const nextState = this.machine.transition(this.state.currentLight, "TIMER")
      .value;
    this.setState({
      currentLight: nextState
    });
  };

  render() {
    const color = {
      red: "#CC0000",
      green: "#66CC00",
      yellow: "#CCC900"
    }[this.state.currentLight];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <button onClick={this.transition}>Transition</button>
        <div
          style={{
            margin: "10px",
            width: "100px",
            height: "100px",
            backgroundColor: color,
            borderRadius: "50%"
          }}
        />
        {`state: "${this.state.currentLight}"`}
      </div>
    );
  }
}

export default TrafficLightFSM;
