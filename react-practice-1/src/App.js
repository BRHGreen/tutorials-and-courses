import React, { Component } from 'react';
import './App.css';

const  Container = (props) => {
  return (
    <div className={props.className}></div>
    )
  }

  const Button = (props) => {
    return (
      <button style={props.style} className={props.className} onClick={props.clickHandler}>{props.text}</button>
    )
  }


class App extends React.Component {

   click () {
    alert('Oh Hello')
  }

  render() {
    return (
      <div>
        <Container
          className='container'
          />

          <Button
            className='btn btn-blue'
            clickHandler={this.click}
            text={'Clickity Click'}
            />
      </div>
    )
  }
}

App.defaultProps = {
  text: 'This is some text',
  number: 19
}

export default App;
