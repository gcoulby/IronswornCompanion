import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onReset, counters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sml m-2">
          Reset
        </button>
        {counters.map((counter) => (
          <li>
            <Counter
              key={counter.id}
              counter={counter}
              onDelete={onDelete}
              onIncrement={onIncrement}
            />
          </li>
        ))}
      </div>
    );
  }
}

export default Counters;
