import React from 'react';

// import Material-UI
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


// import own css
import './styles/todolist.css';


export default class ToDoList extends React.Component {

  state = {
    list : [],
    currentValue : '',
  }
  buttonStyle = {
    width: 30,
  }

  addItem(item){
    const { list } = this.state;
    const newList = [...list];
    newList.push(item);
    this.setState({ 
      list : newList,
      currentValue : ''
    });
  }
  handleOnChange(e){
    return this.setState({currentValue : e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    const item = this.state.currentValue.trim();
    if(item){
      this.addItem(item);
    }
    e.target.reset();
  } 
  handleDelete(index){
    const newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({list : newList});
  }
  handleDone(e, index){
    const button = e;

    button.parentNode.children[0].children[0].style.textDecoration = 'line-through';
    button.parentNode.children[1].children[0].style.color = 'green';
   
    console.log(button.parentNode);
    return;

  }
  handleEdit(index){
    const changeItem = prompt(`Edit ${this.state.list[index]}`);
    const newList = this.state.list.slice();
    if(changeItem){
      if(changeItem.trim()){
        newList[index] = changeItem.trim();
        this.setState({list : newList});
      }
    }
  }
  renderList() {
    return (
      <List>
        { 
          this.state.list.map((item, index) => {
            return (
              
              <ListItem 
                button={true} 
                divider={true} 
                key={index} 
              >

                <ListItemText> 
                  {item} 
                </ListItemText>
               
                <Button style={this.buttonStyle} className='done' onClick={(e) => this.handleDone(e.currentTarget, index)}>
                  <DoneIcon/>
                </Button>

                <Button style={this.buttonStyle} className='edit' onClick={() => this.handleEdit(index)}>
                  <EditIcon />
                </Button>

                <Button style={this.buttonStyle} className='delete' onClick={() => this.handleDelete(index)}>
                  <DeleteIcon/>
                </Button>
                
              </ListItem>
              
            ) 
          })
        }
      </List>
    )
  }

  render(){
    let AddButton = () => {
      if(this.state.currentValue.trim()){
        return (
          <Button 
            className='add' 
            variant='contained' 
            size='small' 
            type='submit'
            style={this.buttonStyle}
          >
            <AddIcon />
          </Button>
        )
      }
    }
    return (
      <div className='listContainer'>
        <h1> To Do List </h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          
          <Input 
            type='text' 
            placeholder='add item' 
            onChange={(e) => this.handleOnChange(e)} 
            style={{marginRight : 10}}
          />
          
          {/* only render add button when user starts typing */}
          {AddButton()}  
      
        </form>
        {this.renderList()}
      </div>
    );
  }
}