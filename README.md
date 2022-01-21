# Displaying a List of Items with Redux

## Learning Goals

- Display a list of elements from our Redux store

## Introduction

Our state is properly updating but we are not displaying these updates to the
user. We need a component that references the store and then uses the data from
the store to reference the list of Todos.

## Displaying Todos

The `CreateTodo` component is handling the creation side of things, so let's
make a new component where we'll be getting todos from the store. We'll call
this `TodosContainer` and connect it to Redux.

```jsx
// ./src/features/todos/TodosContainer.js
import React from "react";

function TodoContainer() {
  return <div>TodoContainer</div>;
}

export default TodoContainer;
```

We aren't worried about dispatching actions here, only getting state from Redux,
so we'll need to import `useSelector` and write a function to select the todos
from our store state:

```jsx
import React from "react";
import { useSelector } from "react-redux";

function TodoContainer() {
  const todos = useSelector((state) => state.todos.entities);

  console.log(todos);
  return <div>TodoContainer</div>;
}

export default TodoContainer;
```

We can confirm this is working by adding a log in out `TodosContainer` and then
adding `TodosContainer` to our `App` component so it will be rendered.

Now that we have a way to get data from Redux, we can create a component to
handle displaying our todos.

## Creating a Todo Component

To start, we'll have each todo rendered as a list item. Inside the
`./src/features/todos` folder, create a file `Todo.js`. Inside it, write a
component that returns an `li` displaying props:

```jsx
// ./src/features/todos/Todo.js
import React from "react";

function Todo({ text }) {
  return <li>{text}</li>;
}

export default Todo;
```

Next, we need to map over our todo objects and convert them to `Todo` components
in the `TodosContainer` component:

```jsx
// ./src/features/todos/TodosContainer.js
import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";

function TodoContainer() {
  const todos = useSelector((state) => state.todos.entities);

  const todoList = todos.map((todo, index) => <Todo key={index} text={todo} />);
  return <ul>{todoList}</ul>;
}

export default TodoContainer;
```

Now our TodosContainer is mapping over the todos it received from Redux, passing
the value of each todo into a child component, `Todo`. `Todo` in this case
doesn't have any Redux related code, and is a regular, functional component.

## Cleanup Todo Input

Each time we submit a todo, we want to clear out the input. Remember that each
time we submit a form, we call `handleSubmit` Inside that `handleSubmit`
function, let's reset the component's state by changing our function to the
following:

```js
// ./src/features/todos/CreateTodo.js

function handleSubmit(event) {
  event.preventDefault();
  dispatch(todoAdded(text));
  setText("");
}
```

That's it! We've got a working app that takes in form data and displays it on a
list.

## Conclusion

We got our `Todos` component working simply by accessing the state from the
store, and then iterating through the list in the `Todos` component.
