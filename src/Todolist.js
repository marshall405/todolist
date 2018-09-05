import React from 'react';
import { ListOfItems } from './List';

// import Material-UI
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';

// import own css
import './styles/todolist.css';

export default class ToDoList extends React.Component {

  state = {
    list : [],
    currentValue : '',
    id : 0
  }

  addItem(item){
    const newList = [...this.state.list];
    let newId = this.state.id;
    const listItem = {
      text : item,
      complete : false,
      id : newId
    }
    newId += 1;
    newList.push(listItem);
    this.setState({ 
      list : newList,
      currentValue : '',
      id : newId
    });
  }
  handleOnChange(e){
    return this.setState({currentValue : e.target.value})
  }
  handleOnSubmit(e){
    e.preventDefault();
    const item = this.state.currentValue.trim();
    if(item){
      this.addItem(item.trim());
    }
  } 
  handleDeleteItem(listItem){
    const newList = this.state.list.slice();
    const index = this.state.list.indexOf(listItem);
    newList.splice(index, 1);
    this.setState({list : newList});
  }
  handleCompleteItem(id){
    const newList = this.state.list.map( listItem => {
      if(listItem.id === id){
        listItem.complete = listItem.complete === false ? true : false;
      }
      return listItem;
    });
    this.setState({
      list : newList
    })
  }
  handleEditItem(listItem){
    const changeItem = prompt(`Edit ${listItem.text}`, listItem.text);
    const newList = this.state.list.slice();
    const index = newList.indexOf(listItem);
    if(changeItem){
      if(changeItem.trim()){
        newList[index].text = changeItem.trim();
        this.setState({list : newList});
      }
    }
  }
  renderAddButton() {
    if(this.state.currentValue.trim()){
      return (
        <Button 
          className='add' 
          variant='contained' 
          size='small' 
          type='submit'
          style={{width: 30}}>
          <AddIcon />
        </Button>
      )
    }
    return null;
  }
  
  render(){
    return (
      <div className='listContainer'>
        
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          
        <TextField
          id="with-placeholder"
          label="To Do Item"
          // placeholder="add item"
          margin="normal"
          onChange={(e) => this.handleOnChange(e)} 
          value = {this.state.currentValue}
        />
          {/* only render add button when user starts typing */}
          {this.renderAddButton()}  
      
        </form>

        <ListOfItems
          editItem={this.handleEditItem.bind(this)} 
          deleteItem={this.handleDeleteItem.bind(this)} 
          completeItem={this.handleCompleteItem.bind(this)} 
          listItems={this.state.list}/>

      </div>
    );
  }
}