Displaying a list of items with redux
==============

With this lesson we'll finish up the last section by displaying our list of todos.  By the end of this lesson, you will be able to:

  * Display a list of elements

## Goal

Our state is properly updating but we are not displaying these updates to the user.  We need a component that references the store and then uses the data from the store to reference the list of Todos.

## Displaying todos

Ok, so if you open the components/todos/Todos.js you can see how we are currently rendering todos.  

```javascript
// ./src/components/Todos.js

import React, { Component } from 'react';

class Todos extends Component {

  render() {

    const todos = this.props.store.getState().todos.map((todo, index) => {
      return <li key={index}>{todo.text}</li>
    });

    return(
      <ul>
        {todos}
      </ul>
    );
  }
};

export default Todos;
```

So above you can see that we have passed our store to the Todos component as a prop. Then we access the array of todos by calling store.getState(), and calling map to return an array of react elements, each of type li. 

## Refactoring into a Todo Component 

So each todo is just a list element, but soon we will need a button for each todo as well.  This simple list element is now having its own appearance, and behavior, so let's make a Todo component where we can manage each todo. Then, in our Todos component we will no longer have map return an array of li elements, but rather have it return an array of Todo components, and each Todo component will render the list element.  

That was a mouthful. Let's make the changes.  

If you open up the code, you'll see that inside the `./src/components/todos` folder, we have a file `Todo.js`.  Inside it we have a Todo component that currenly just renders a div.  Remember we want it to instead render out the li element that currently lives inside the map function in the Todos component.  Let's move it to our todo component.

```javascript
// ./src/components/todos/Todo.js

	import React, { Component } from 'react'

	class Todo extends Component {
	  render(){
	    return (
	      <li>{this.props.text}</li>
	    )
	  }
	}

	export default Todo
```

Now we need to call that component from our map function in the Todos component.  And we need to tell each individual Todo about the text that it is rendering.  So we change our Todos component to the following.

```javascript
// ./src/components/Todos.js 

import React, { Component } from 'react';
import Todo from './Todo'; /* code changed */

class Todos extends Component {

  render() {

    const todos = this.props.store.getState().todos.map((todo, index) => {
      return <Todo text={todo.text} key={index} /> /* code changed */
    });

    return(
      <ul>
        {todos}
      </ul>
    );
  }
};

export default Todos;
```
  
Alright, we just gave each list element its own component, and got our code back to working again. Sounds like a good refactoring. Boot up the React/Redux app by running `npm install && npm start` and give it a shot. You should see a functioning application. ~

## Cleanup

There's just a couple small items to clean up.

The first is that our CreateTodo Component's form is still live updating `{this.state.text}` below the input each time the user types something. Let's fix that by going to the `./src/components/CreateTodo.js` file and removing the line `{this.state.text}`, towards the bottom of our render() function.

```javascript
// ./src/components/CreateTodo.js

...

  render() {
    return(
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <p>
            <label>add todo</label>
            <input type="text" value={this.state.text} onChange={(event) => this.handleChange(event)} />
          </p>
          <input type="submit" />
        </form>
        /* code remove here */
      </div>
    );
  }

...

```

Ok, the next thing to fix is to ensure that each time we submit a todo, we clear out the input.  This is a little more complicated. Ok, so remember that each time we submit a form, we call handleSubmit. So now inside that handleSubmit function let's reset the *component's* state by changing our function to the following:

```javascript 
// ./src/components/CreateTodo.js

...

handleSubmit(event) {
	event.preventDefault();
	this.props.store.dispatch({
		type: 'ADD_TODO', todo: this.state,
	});
	this.setState({ 
		text: '',
	});
}

...
```

Ok, so this line is properly resetting the component's state to a blank string each time a user submits the form. However, if you try submitting the form now, you won't see that input being reset. This is because the input's value is not referencing that state. But we can ensure that the input does reference the state by changing our `render()` method in the `CreateTodo` component to the following:

```javascript 
// ./src/components/CreateTodo.js

...

render() {
	return(
		<div>
			<form onSubmit={(event) => this.handleSubmit(event)}>
				<p>
					<label>add todo</label>
					<input type="text" value={this.state.text} /* <- add value here */ onChange={(event) => this.handleChange(event)} /> 
				</p>
				<input type="submit" />
			</form>
		</div>
	);
}

...

```

So as you can see the value of the input now directly corresponds to the component's state.  This is called a controlled component (see the references section below). Now if you retry submitting the form in your react app, you will see everything working.

## Summary

Ok, so we got our `Todos` component working simply by accessing the state from the store, and then iterating through the list in the `Todos` component.  

Note that through each code along, we are never updating the DOM directly. Instead, we use the Redux pattern to have our store hold and update our state, and we then have React display that state. For example, when we want to display our new todo component, we don't append new information to the DOM at the end of the list. Rather, we dispatch an action to update our store. The React component `Todos` simply displays the current state, whatever it is. React always knows to appropriately re-render. So we are sticking with the React principle of declarative programming - simply display the list of todos - but don't worry about how to update that list on the React side.      

## References

[React Documentation - Controlled Components](https://facebook.github.io/react/docs/forms.html)
