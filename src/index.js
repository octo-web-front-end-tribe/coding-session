import React, { Component } from 'react';
import ReactDom from 'react-dom';

class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = { message: 'Hello React!' }
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    )
  }
}

ReactDom.render(
  <HelloWorld />,
  document.getElementById('root')
)
