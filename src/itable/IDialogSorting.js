import React, { Component, forwardRef } from "react";
import PropTypes, { func } from 'prop-types';
import { withStyles } from 'tss-react/mui';
import {
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import StraightRoundedIcon from '@mui/icons-material/StraightRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useStyles } from '../ITableStyles.js';

import IConst from './IConst';

const StyleDialogBackdrop = { style: {
  backgroundColor: 'rgba(0, 0, 0, 0.2)'  
}};

const StyleDialogPaper = { style: { 
  borderRadius: '10px',
  backgroundColor: 'transparent', 
}};

const StyleDialogContent = {
  width: "420px",
  border: '2px solid #444444', // Set border color
  borderRadius: '10px',  
  backgroundColor: 'white',
};

const StyleDialogTitle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const StyleDialogInfo = {
  fontSize: "14px",
  paddingBottom: "10px",
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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle, isSelected) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
  //  ...(isDragging && {background: "rgb(235,235,235)", }),
  //background: isDragging ? "#ddddff" : isSelected ? "#ddffdd" : "#dddddd",
  background: isDragging ? "#ddffdd" : "#eeeeee",
  padding: "0px",
  margin: "2px 2px",
  borderRadius: '6px',
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? "white" : "lightblue",
  //background: "lightblue",
});

const ListItemWithRef = forwardRef((props, ref) => {
  return (
    <ListItem
      ref={ref} // Forwarded ref
      ContainerComponent="Grid"
      ContainerProps={{ ref }} // Forwarded ref for the ContainerProps
      {...props}
    >
      {props.children}
    </ListItem>
  );
});

// Forwarding ref to List component
const ListWithRef = forwardRef((props, ref) => {
  return (
    <List
      ref={ref} // Forwarded ref
      {...props}
    />
  );
});


class IDialogSorting extends Component {
  constructor(props) {
    super(props);

    const { sortings, headers } = this.props;

    this.state = {
      items: this.getItems(this.props.sortings, this.props.headers),
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getItems = (sortings, headers) => {
    const newitems = [];
    for (let s = 0; s < sortings.length; s++) {
      const index = headers.findIndex(h => h.dataFieldName === sortings[s].orderByField);
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
    if (!result.destination) { return; }

    const items = reorder(
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
      newlist[index].order === IConst.sortingASC ? (newlist[index].order = IConst.sortingDESC) : 
      newlist[index].order === IConst.sortingDESC ? (newlist[index].order = "") : IConst.sortingASC;
    this.setState({ items: newlist });
  }

  keyDown(event) {
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
    /*
    // TODO:
    // here we could add code to use the dialog only with keyboard
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
    */
  }

  saveChanges() 
  {
    // close the dialog with saving
    this.props.setChangedSortings(this.state.items, "dialog");
  }

  cancelChanges () 
  {
    // close the dialog without saving
    this.props.setChangedSortings(null, "");
  }
  
  

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {

    const { classes } = this.props;

    return (
      <Dialog 
        open={true} 
        //className={classes.idialog}
        onKeyUp={(e) => this.keyDown(e)}
        BackdropProps={StyleDialogBackdrop}
        PaperProps={StyleDialogPaper}
      >


        <DialogContent style={StyleDialogContent}>

          <Typography style={StyleDialogTitle}>Sorting of rows</Typography>
          <Typography style={StyleDialogInfo}>
            Define the sort order by dragging and droping and click the order button to
            change the sorting 'ascending' - 'descending' - 'no order'. Set the order to 'no order', if for
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
                  <ListWithRef 
                    ref={provided.innerRef} // Directly assign provided.innerRef to List
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps} // Ensure droppableProps are passed to List
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <ListItemWithRef
                            ref={provided.innerRef}
                            ContainerComponent="Grid"
                            ContainerProps={{ ref: provided.innerRef }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => this.clickSelection(index)}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              item.selected
                            )}
                          >
                            <Grid container style={{ padding: "0px" }}>
                              <Grid item style={column1}>
                                <IconButton
                                  style={buttonRow}
                                  onClick={() => this.clickVisibility(index)}>
                                  {item.isVisible && 
                                    <VisibilityRoundedIcon className={classes.iconButtonStyleGrey}/>}
                                  {(!item.isVisible) && 
                                    <VisibilityOffRoundedIcon className={classes.iconButtonStyleGrey} />}
                                </IconButton>
                              </Grid>
                              <Grid item style={column2}>
                                <Typography>{item.title}</Typography>
                              </Grid>
                              <Grid item style={column3}>
                                <IconButton
                                  style={buttonRow}
                                  onClick={() => this.clickOrder(index)}
                                >
                                  {item.order === IConst.sortingASC && 
                                    <StraightRoundedIcon className={classes.iconButtonStyleGrey}/>}
                                  {item.order === IConst.sortingDESC && 
                                    <StraightRoundedIcon className={classes.iconButtonStyleGrey_Rotate180}/>}
                                  {item.order === "" && 
                                    <HeightRoundedIcon className={classes.iconButtonStyleGrey} />}
                                </IconButton>
                              </Grid>
                              <Grid item style={column4}>
                                <Typography>
                                  {item.order === "asc"
                                    ? "ascending"
                                    : item.order === "desc"
                                    ? "descending"
                                    : "no order"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItemWithRef>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ListWithRef>
              )}
            </Droppable>
          </DragDropContext>

          <Grid container>
            <Grid item style={buttonLeft}>
              <IconButton className={classes.mainButtons}
                onClick={() => this.saveChanges()} >
                <DoneRoundedIcon className={classes.iconButtonStyleGreen} />
                Accept</IconButton>
            </Grid>
            <Grid item>
              <IconButton 
                className={classes.mainButtons}
                onClick={() => this.cancelChanges()}>
                <CloseRoundedIcon className={classes.iconButtonStyleRed}/>
                Cancel</IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

IDialogSorting.propTypes = { classes: PropTypes.object, };

export default withStyles(IDialogSorting, useStyles);

