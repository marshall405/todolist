import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

export class ListOfItems extends React.Component {

    render() {
        return (
            <List> {this.props.listItems.map(listItem => {
                return (
                    <ListItem  
                        divider={true} 
                        key={listItem.id} >

                        <ListItemText style={ {pointerEvents : listItem.complete ? 'none' : 'auto'}}className={ listItem.complete ? 'complete' : ''} onClick={() => this.props.editItem(listItem)}> 
                            {listItem.text} 
                        </ListItemText>
                    
                        <Button 
                        style={{ width: 30}} 
                        className={`done ${listItem.complete ? 'complete' : ''}`} 
                        onClick={() => this.props.completeItem(listItem.id)}
                        disableFocusRipple={true}>
                            <DoneIcon />
                        </Button>

                        <Button 
                        style={{width: 30}} 
                        className='delete' 
                        onClick={() => this.props.deleteItem(listItem)}>
                            <DeleteIcon/>
                        </Button>
                        
                    </ListItem>
                
                ) 
                })
            }
            </List>
        )
    }
}

