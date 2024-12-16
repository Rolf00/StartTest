import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Box,
  ListItemSecondaryAction,
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";


/*
open={this.state.openManageColumns}
headers={this.state.headers}
arrangeColumns={(doIt, newlist) => this.arrangeColumns(doIt, newlist)}
*/

// fake data generator
const getItems1 = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    title: `item ${k}`,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
  }));

const headers = [
  { id: 0, title: "header 1", isVisible: true },
  { id: 1, title: "header 2", isVisible: true },
  { id: 2, title: "header 3", isVisible: false },
  { id: 3, title: "header 4", isVisible: false },
  { id: 4, title: "header 5", isVisible: true },
  { id: 5, title: "header 6", isVisible: false },
  { id: 6, title: "header 7", isVisible: true },
];

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    //id: `item-${headers[k].id}`,
    id: `item-${k}`,
    title: headers[k].title,
    headerId: headers[k].id,
    isVisible: headers[k].isVisible,
    secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
  height: "45px",
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});


class IHeaderManage extends React.Component {
  constructor(props) {
    super(props);

    const {
      open,
      headers,
    } = this.props;

    this.state = {
      //items: getItems(10)
      items: getItems(headers.length),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
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

  Click = () => {
    //alert(this.state.items[0].headerId);
  };

  onVisibilityChange = (e) => {
    const index = this.state.items.findIndex((i) => i.id === e);
    //alert(index);
    const newItems = this.state.items;
    newItems[index].isVisible = !newItems[index].isVisible;
    this.setState({ items: newItems });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const imgSize = 20;
    const imgMainSize = 30;
    return (
      <Box style={{ backgroundColor: "#dddddd" }}>
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
                          ContainerComponent="li"
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItemIcon>
                            <IconButton
                              onClick={(e) => this.onVisibilityChange(item.id)}
                            >
                              <img
                                //src={item.isVisible ? IConst.imgChkboxChecked  : IConst.imgChkboxUnchecked}
                                style={{ width: imgSize, height: imgSize }}
                              />
                            </IconButton>
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            secondary={item.secondary}
                          />
                          <ListItemSecondaryAction></ListItemSecondaryAction>
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
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", flex: 1, justifyContent: "flex-start" }}
          >
            <IconButton
              //className={classes.mainButtons}
              onClick={this.Click()}
            >
              <img
                //src={item.isVisible ? IConst.imgChkboxChecked  : IConst.imgChkboxUnchecked}
                style={{ width: imgMainSize, height: imgMainSize }}
              />
              Accept
            </IconButton>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <IconButton
              //className={classes.mainButtons}
              onClick={this.Click()}
            >
              Cancel
              <img
                //src={item.isVisible ? IConst.imgChkboxChecked  : IConst.imgChkboxUnchecked}
                style={{ width: imgMainSize, height: imgMainSize }}
              />
            </IconButton>
          </div>
        </div>
      </Box>
    );
  }
}

export default IHeaderManage;



