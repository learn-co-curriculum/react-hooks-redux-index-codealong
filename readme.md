Displaying a list of items with redux
==============

With this lesson we'll finish up the last section by displaying our list of todos.  By the end of this lesson, you will be able to:

  * Display a list of elements

## Goal

We need to give users the ability to click on a specific Todo, and then for that todo to disappear.  To implement this, we will stick with our practice of not directly manipulating the dom, but instead updating the state of our store, and then using react to display the current list of todos.

## Deleting todos

Ok, so if you open the components/todos/Todos.js you can see how we are currently rendering todos.  Currently each todo is just a list element, but soon we will need a button for each todo as well.  This simple list element is now having its own appearance, and behavior, so let's make a Todo component where we can manage each todo.

If you look in the components/todos/ folder, you can see that we already have a file called Todo.js and some code already set up in there.  

All it does currently is render some text.  But we can move the code from our Todos.js file where we render out each li, and instead move that to the render function of our Todo component.  Then in the Todos component, instead of rendering out a 

Now completing this is not so bad.  We can access the list of todos inside the Todos component with a call to this.props.store.getState().todos.  So now, we just need to iterate through each todo in the list and create an li element for each one.  Go on and give it and give it a shot, I'll be waiting for you below.  

Ok, ready to see the code?

src/components/Todos.js

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

Boot up the react/redux app and give it a shot.  You should see a functioning application.  

## Cleanup

There's just a couple small items to clean up.

The first is that our form is still live updating below each time the user types something into the input.  Let's fix that by going to the CreateTodo.js file and removing the line {this.state.text}, towards the bottom of our render() function.

Ok, the next thing to fix is to ensure that each time we submit a todo, we clear out the input.  This is a little more complicated.  Ok, so remember that each time we submit a form, we call handleSubmit.  So now inside that handleSubmit function let's reset the *component's* state by changing our function to the following:

	handleSubmit(event){
	   	event.preventDefault()
   		this.setState({text: ''}) //new line
   	 	this.props.store.dispatch({type: 'ADD_TODO', payload: this.state})
	  } 

Ok, so this line is properly resetting the component's state to a blank string each time a user submits the form.  However, if you try submitting the form now, you won't see that input being reset.  This is because the input's value is not referencing that state.  But we can ensure that the input does reference the state by changing our render() method in the createTodo component to the following: 

	  render(){
	    return(
	      <div>
	        <form onSubmit={this.handleSubmit.bind(this)}>
	          <p>
	            <label>add todo</label>
					// we change the input below
	            <input type="text" value={this.state.text} onChange={this.handleChange.bind(this)}/> 
	          </p>
	          <input type="submit" />
	        </form>
	      </div>
      )
  	}
  
So as you can see the value of the input now directly corresponds to the component's state.  This is called a controlled component (see the references section below).  Now if you retry submitting the form in your react app, you will see everything working.

## Summary
Ok, so we got our Todos component working simply by accessing the state from the store, and then iterating through the list in the Todos.  

Note that through each code along, we are never updating the dom directly.  Instead, we use the redux pattern to have our store hold and update our state, and we then have react display that state.  For example, when we want to display our new todo component, we don't append new information to the dom at the end of the list.  Rather, we dispatch an action to update our store.  The react component Todos simply displays the current state, whatever it is.  And react knows to appropriately re-render.  So we are sticking with the react principle of declarative programming - simply display the list of todos - but don't worry about how to update that list on the react side.      

## References

[React Documentation - Controlled Components](https://facebook.github.io/react/docs/forms.html)