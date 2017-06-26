import React, { Component } from 'react';
import './App.css';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {count: 0}
  // }
  click(value) {
    alert('Clicked')
  }
  render() {
    return (
      <div>
        <Button clickHandler={this.click}
          />
      </div>
    )
  }
}

const Button = (props) => {
  <button onClick={props.clickHandler}>Click this</button>
}

export default App;
