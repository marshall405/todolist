import React, { Component } from 'react';

// import Material-UI
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
// import own css
import './styles/todolist.css';


export default class List extends React.Component {
  state = {
    list : [],
    currentValue : ''
  }
  handleOnChange(e){
    return this.setState({currentValue : e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    const newList = this.state.list.slice();
    newList.push(this.state.currentValue.trim());
    this.setState({ 
      list : newList,
      currentValue : ''
    });
    e.target.reset();
  }
  renderList() {
    return (
      <ul>
        { this.state.list.map((item, index) => {
            return (
             <ListItem key={index}> {item} <Checkbox /></ListItem>
            ) 
          })
        }
      </ul>
    )
  }
  render(){
    return (
      <div className='listContainer'>
        <h1> To Do List </h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <Input type='text' placeholder='add item' onChange={(e) => this.handleOnChange(e)} />
          
        </form>
        {this.renderList()}
      </div>
    );
  }
}