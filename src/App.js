import React, { Component } from 'react';
import './styles/App.css';
import ToDoList from './Todolist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoList />
      </div>
    );
  }
}

export default App;
