import React, { Component, RootRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";

//import RootRef from "@material-ui/core/RootRef";
//import RootRef from "@mui/material/core/RootRef";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import InboxIcon from "@material-ui/icons/Inbox";
//import EditIcon from "@material-ui/icons/Edit";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const dialogContent = {
  width: "320px",
}

const DialogTitle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const DialogInfo = {
  fontSize: "14px",
  paddingBottom: "10px",
}

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
  width: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
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
  //  ...(isDragging && {
  //background: "rgb(235,235,235)",
  //}),
  background: isDragging ? "lightblue" : isSelected ? "#aaffaa" : "#ddffdd",
  padding: "0px",
  margin: "3px 0px"
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? "white" : "lightblue",
  //background: "lightblue",
});

export default function ISortingDialog (props)
{

/*
class ISortingDialog extends Component {
  constructor(props) {
    super(props);

    const { sortings, headers } = this.props;

    this.state = {
      openSortingDialog: this.props.openSortingDialog,
      items: this.getItems(this.props.sortings, this.props.headers),
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }
    */

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
        isVisible: index === -1 ? "ERROR" : headers[index].isVisible,
        selected: true,
      };
      newitems.push(oneSort);
    }

    let keyIndex = newitems.length;
    for (let h = 0; h < headers.length; h++) {
      const index = newitems.findIndex((i) => i.headerId === headers[h].id);
      if (index === -1) {
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

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <Dialog open={true}>
        <DialogContent style={dialogContent}>
          <Typography style={DialogTitle}>Sorting of rows</Typography>
          <Typography style={DialogInfo}>
            Define the sort order by drag and drop and click on order button to change ASC and DESC.
            Leave the order by field asc/desc empty, if for this column no sorting is needed.
          </Typography>
          <Grid container>
            <Grid item style={column1}><Typography style={DialogHeader}>Visible</Typography></Grid>
            <Grid item style={column2}><Typography style={DialogHeader}>Column</Typography></Grid>
            <Grid item style={column3}><Typography style={DialogHeader}>Order</Typography></Grid>
            <Grid item style={column4}><Typography style={DialogHeader}>By</Typography></Grid>
          </Grid>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <List style={getListStyle(snapshot.isDraggingOver)}>
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
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            item.selected
                          )}
                        >
                          <Grid container style={{ padding: '0px'}}>
                          <Grid item style={column1}>
                            <IconButton style={buttonRow}>
                              {item.isVisible && <VisibilityOutlinedIcon />}
                              {!item.isVisible && <VisibilityOffOutlinedIcon />}
                            </IconButton>
                          </Grid>
                          <Grid item style={column2}>
                            <Typography>{item.title}</Typography>
                          </Grid>
                          <Grid item style={column3}>
                            <IconButton style={buttonRow}>
                              {item.order === 'asc' && <ArrowUpwardIcon />}
                              {item.order === 'desc' && <ArrowDownwardIcon />}
                              {item.order === '' && <SwapVertOutlinedIcon />}
                            </IconButton>
                          </Grid>
                          <Grid item style={column4}>
                            <Typography>{item.order}</Typography>
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

        </DialogContent>
      </Dialog>
    );
  }
}

//export default ISortingDialog;
