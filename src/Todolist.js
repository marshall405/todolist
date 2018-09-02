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

// NOTES
// disable click on item if completed!!!!!!!!




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
      this.addItem(item);
    }
  } 
  handleDelete(listItem){
    const newList = this.state.list.slice();
    const index = this.state.list.indexOf(listItem);
    newList.splice(index, 1);
    this.setState({list : newList});
  }
  handleDone(id){
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
  handleEdit(listItem){
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
  renderList() {

    return (
      <List>
        { 
          this.state.list.map(listItem => {
            return (
              
              <ListItem  
                divider={true} 
                key={listItem.id} >

                <ListItemText className={ listItem.complete ? 'complete' : ''} onClick={() => this.handleEdit(listItem)}> 
                  {listItem.text} 
                </ListItemText>
               
                <Button 
                  style={{ width: 30}} 
                  className={`done ${listItem.complete ? 'complete' : ''}`} 
                  onClick={() => this.handleDone(listItem.id)}>
                  <DoneIcon />
                </Button>

                <Button 
                  style={{width: 30}} 
                  className='delete' 
                  onClick={() => this.handleDelete(listItem)}>
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
    return (
      <div className='listContainer'>
        
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          
          <Input 
            type='text' 
            placeholder='add item' 
            onChange={(e) => this.handleOnChange(e)} 
            value = {this.state.currentValue}
            
          />
          
          {/* only render add button when user starts typing */}
          {this.renderAddButton()}  
      
        </form>
        {this.renderList()}
      </div>
    );
  }
}