import React, { Component, RootRef } from "react";
//import { makeStyles } from "@mui/styles";
//import ReactDOM from "react-dom";
import {
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

//import RootRef from "@material-ui/core/RootRef";
//import RootRef from "@mui/material/RootRef";

// MUI API says:
//import RootRef from '@material-ui/core/RootRef';
//import { RootRef } from '@material-ui/core';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


import InboxIcon from "@mui/icons-material/Inbox";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';


const StyleDialogBackdrop = { style: { 
  backgroundColor: 'rgba(0, 0, 0, 0.2)'  
}};

const StyleDialogPaper = { style: { 
  borderRadius: '20px',
  backgroundColor: 'transparent', 
}};

const StyleDialogContent = {
  width: "360px",
  border: '3px solid #444444', // Set border color
  borderRadius: '20px',  
  backgroundColor: 'white',
};

const StyleDialogTitle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const StyleDialogInfo = {
  fontSize: "12px",
  paddingBottom: "10px",
};

const StyleButtons = {
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '6px',
  height: '45px',
  margin: '6px',
  backgroundColor: '#EEEEFF',
  border: '1px solid #CCCCFF',
  '&:hover': {
    backgroundColor: '#CCCCFF',
    border: '1px solid black',
  },
};

const DialogHeader = {
  fontSize: "12px",
  fontWeight: "bold",
};

const buttonRow = {
  height: "32px",
  width: "32px",
};

const column1 = {
  width: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

const column2 = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-start",
};

const column3 = {
  width: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const column4 = {
  width: "96px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};

const buttonLeft = {
  display: "flex",
  flex: 1,
  justifyContent: "flex-start",
  borderRadius: "4px",
  width: "120px",
  fontSize: "20px",
  fontWeight: "bold",
};


class IDialogSorting extends Component {
  constructor(props) {
    super(props);

    const { sortings, headers } = this.props;

    this.state = {
      //openSortingDialog: this.props.openSortingDialog,
      items: this.getItems(this.props.sortings, this.props.headers),
    };

    this.onDragEnd = this.onDragEnd.bind(this);

  }

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
    
  getItemStyle = (isDragging, draggableStyle, isSelected) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
    //  ...(isDragging && {
    //background: "rgb(235,235,235)",
    //}),
    background: isDragging ? "#ddddff" : isSelected ? "#ddffdd" : "#dddddd",
    padding: "0px",
    margin: "3px 0px",
    borderRadius: '6px',
  });
  
  getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? "white" : "lightblue",
    //background: "lightblue",
  });

  getItems = (sortings, headers) => {
    const newitems = [];
    for (let s = 0; s < sortings.length; s++) {
      const index = headers.findIndex(
        (h) => h.dataFieldName === sortings[s].orderByField
      );
      const oneSort = {
        id: `SortItem-${s}`,
        order: sortings[s].order,
        orderByField: sortings[s].orderByField,
        headerId: index === -1 ? -1 : headers[index].id,
        title: index === -1 ? "ERROR" : headers[index].headerTitle,
        isVisible: index === -1 ? false : headers[index].isVisible,
        selected: s === 0,
      };
      newitems.push(oneSort);
    }

    let keyIndex = newitems.length;
    for (let h = 0; h < headers.length; h++) {
      const index = newitems.findIndex((i) => i.headerId === headers[h].id);
      if (index === -1 && headers[h].isSortable) {
        // we only add more headers, when it is not in the sorting list already
        const oneSort = {
          id: `SortItem-${keyIndex}`,
          order: "",
          orderByField: headers[h].dataFieldName,
          headerId: headers[h].id,
          title: headers[h].headerTitle,
          isVisible: headers[h].isVisible,
          selected: false,
        };
        newitems.push(oneSort);
        keyIndex++;
      }
    }

    return newitems;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({ items });
  }

  clickVisibility(index) {
    const newlist = [...this.state.items];
    newlist[index].isVisible = !newlist[index].isVisible;
    this.setState({ items: newlist });
  }

  clickSelection(index) {
    const newlist = [...this.state.items];
    newlist.forEach((item) => {
      item.selected = false;
    });
    newlist[index].selected = true;
    this.setState({ items: newlist });
  }

  clickOrder(index) {
    const newlist = [...this.state.items];
    newlist[index].order =
      newlist[index].order === "asc"
        ? (newlist[index].order = "desc")
        : newlist[index].order === "desc"
        ? (newlist[index].order = "")
        : "asc";
    this.setState({ items: newlist });
  }

  keyDown(event) {
    // TODO
    //alert("keyUp");
    if (event.key === "Escape")
    {
      this.cancelChanges();
      event.key = null;
    }
    else if (event.key === "Enter")
    {
      this.saveChanges();
      event.key = null;
    }
    else if (event.key === "ArrowUp")
    {
      let index = this.state.items.findIndex(i => i.selected);
      if (index === -1) return;
      this.state.items[index].selected = false;
      index = index - 1;
      if (index < 0) index = this.state.items.length - 1;
      this.state.items[index].selected = true;
      const newlist = [...this.state.items];
      this.setState({items: newlist});
      event.key = null;
    }
    else if (event.key === "ArrowDown")
    {
      let index = this.state.items.findIndex(i => i.selected);
      if (index === -1) return;
      this.state.items[index].selected = false;
      index = index + 1;
      if (index > this.state.items.length - 1) index = 0;
      this.state.items[index].selected = true;
      const newlist = [...this.state.items];
      this.setState({items: newlist});
      event.key = null;
    }
  }

  saveChanges() 
  {
    // close the dialog with saving
    const newlist = [];
    for (let i = 0; i < this.state.items.length; i++)
    {
      if (this.state.items[i].order !== "")
      {
        const oneSort = { 
          order: this.state.items[i].order, 
          orderByField: this.state.items[i].orderByField };
        newlist.push(oneSort);
      }
    }

    this.props.setChangesSortings(newlist);
  }

  cancelChanges () 
  {
    // close the dialog without saving
    this.props.setChangesSortings(null);
  }
 
  
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() 
  {
    return (
      <Dialog 
        open={true} 
        onKeyUp={(e) => this.keyDown(e)}
        BackdropProps={StyleDialogBackdrop}
        PaperProps={StyleDialogPaper}>
        <DialogContent style={StyleDialogContent}>

          <Typography style={StyleDialogTitle}>Sorting of rows</Typography>
          <Typography style={StyleDialogInfo}>
            Define the sort order by drag and drop and click on order button to
            change ASC and DESC. Set the order to 'no order', if for
            this column no sorting is needed.
          </Typography>
          <Grid container>
            <Grid item style={column1}>
              <Typography style={DialogHeader}>Visible</Typography>
            </Grid>
            <Grid item style={column2}>
              <Typography style={DialogHeader}>Column</Typography>
            </Grid>
            <Grid item style={column3}>
              <Typography style={DialogHeader}>Order</Typography>
            </Grid>
            <Grid item style={column4}>
              <Typography style={DialogHeader}>By</Typography>
            </Grid>
          </Grid>

        

          <DragDropContext onDragEnd={this.onDragEnd}>
              
            <Droppable droppableId="droppable">

              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List style={this.getListStyle(snapshot.isDraggingOver)}>
                    {this.state.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            ContainerComponent="Grid"
                            ContainerProps={{ ref: provided.innerRef }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => this.clickSelection(index)}
                            style={this.getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.selected
                            )}
                          >
                            <Grid container style={{ padding: "0px" }}>
                              <Grid item style={this.column1}>
                                <IconButton
                                  style={this.buttonRow}
                                  onClick={() => this.clickVisibility(index)}
                                >
                                  {item.isVisible && <VisibilityOutlinedIcon />}
                                  {!item.isVisible && (
                                    <VisibilityOffOutlinedIcon />
                                  )}
                                </IconButton>
                              </Grid>
                              <Grid item style={this.column2}>
                                <Typography>{item.title}</Typography>
                              </Grid>
                              <Grid item style={this.column3}>
                                <IconButton
                                  style={this.buttonRow}
                                  onClick={() => this.clickOrder(index)}
                                >
                                  {item.order === "asc" && <ArrowUpwardIcon />}
                                  {item.order === "desc" && (
                                    <ArrowDownwardIcon />
                                  )}
                                  {item.order === "" && (
                                    <SwapVertOutlinedIcon />
                                  )}
                                </IconButton>
                              </Grid>
                              <Grid item style={this.column4}>
                                <Typography>
                                  {item.order === "asc"
                                    ? "ascending"
                                    : item.order === "desc"
                                    ? "descending"
                                    : "no order"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                </RootRef>
              )}
            </Droppable>

          </DragDropContext>

          <Grid container>
            <Grid item style={buttonLeft}>
              <IconButton style={StyleButtons}
                onClick={() => this.saveChanges()} >
                <DoneIcon style={{ color: "#00AA00"}} />
                Accept</IconButton>
            </Grid>
            <Grid item>
              <IconButton 
                style={StyleButtons}
                onClick={() => this.cancelChanges()}>
                <CloseIcon style={{ color: "#AA0000"}}/>
                Cancel</IconButton>
            </Grid>
          </Grid>
          
        </DialogContent>
      </Dialog>
    );
  }
}

export default IDialogSorting;