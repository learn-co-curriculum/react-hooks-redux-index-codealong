import React, { Component } from 'react'

class Todos extends Component {

  render(){
    let todos = this.props.store.getState().todos.map(function(todo){
      return <li> {todo.text} </li>
    })
    return(
      <ul>
        {todos}
      </ul>
    )
  }
}

export default Todos;
