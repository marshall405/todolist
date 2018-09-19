import React, { Component } from 'react';
import './styles/App.css';
import ToDoList from './Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> To Do List </h1>
        <ToDoList />
      </div>
    );
  }
}

export default App;
