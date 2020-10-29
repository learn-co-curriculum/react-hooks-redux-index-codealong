# Displaying a List of items with Redux

## Objectives

With this lesson we'll finish up what we worked on the in the forms code along
by displaying our list of todos. By the end of this lesson, you will be able to:

* Display a list of elements from our __Redux__ store

## Goal

Our state is properly updating but we are not displaying these updates to the
user. We need a component that references the store and then uses the data from
the store to reference the list of Todos.

## Displaying todos

The `CreateTodo` component is handling the creation side of things, so let's
make a new component where we'll be getting todos from the store. We'll call
this `TodosContainer` and connect it to __Redux__.


```js
// ./src/components/todos/TodosContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux'

class TodosContainer extends Component {

  render() {
    return(
      <div></div>
    );
  }
};

export default connect()(TodosContainer);
```

Now, we aren't worried about dispatching actions here, only getting state from
__Redux__, so we'll need to write out a `mapStateToProps()` function and include
it as an argument for `connect()`:

```js
...
const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodosContainer);
```

We can confirm this is working by adding a log in the render of TodosContainer
and then adding TodosContainer to our App component so it will be rendered.

Now that we have a way to get data from __Redux__, we can create a presentational
component to handle displaying our todos.

## Creating a Presentational Todo Component

To start, we'll have each todo rendered as a list item. Inside the
`./src/components/` folder, create a file `Todo.js`. Inside it, write a
functional component that returns an `li` displaying props:

```js
// ./src/components/todos/Todo.js

import React from 'react'

const Todo = props => {
  return (
    <li>{props.text}</li>
  );
};

export default Todo;
```

Now we need to call that component from a map function in the
__TodosContainer__ component:

```js
// ./src/components/todos/TodosContainer.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Todo from './Todo'

class TodosContainer extends Component {

  renderTodos = () => this.props.todos.map((todo, id) => <Todo key={id} text={todo} />)

  render() {
    return(
      <div>
        {this.renderTodos()}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodosContainer);


```

Now our TodosContainer is mapping over the todos it received from __Redux__,
passing the value of each todo into a child component, Todo. Todo in this case
doesn't have any __Redux__ related code, and is a regular, functional component.

## Cleanup Todo Input

Each time we submit a todo, we want to clear out the input. Ok, so remember that
each time we submit a form, we call __handleSubmit__. Inside that
__handleSubmit__ function let's reset the *component's* state by changing our
function to the following:

```js
// ./src/components/todos/CreateTodo.js

...

handleSubmit = event => {
  event.preventDefault();
  this.props.addTodo(this.state)
  this.setState({
    text: '',
  })
}


...
```

That's it! We've got a working app that takes in form data and displays it on a
list.

## Summary

Ok, so we got our __Todos__ component working simply by accessing the state from
the store, and then iterating through the list in the __Todos__ component.

## References

- [React Documentation - Controlled Components](https://facebook.github.io/react/docs/forms.html)
