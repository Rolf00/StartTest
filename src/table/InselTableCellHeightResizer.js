import React from "react";
import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";


class InselTableCellHeightResizer extends React.Component {
  constructor(props) {
      super(props)

      //this.state = { value: 0 }
  }

  componentDidMount() {
    //const {height} = this.props;
    //console.log("didMount", height);
  }
  
  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
   
  }

  render() 
  {
    
    //const {value} = this.state;
    const {
      id, 
      height, 
      className, 
      children,
      resizerBackgroundColor } = this.props;

    const reszBackgroundColor = resizerBackgroundColor ? resizerBackgroundColor : 'transaparent';
      
    return (
      <TableCell
        className={className}
        style={{ 
          padding: 0,
          height: height,
        }}
      >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        width: '100%', 
        margin: '0px', 
        padding: '0px'}}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'top',
          padding: '10px 10px 2px 10px',
          height: '100%', 
          padding: '5px',
          }}>
          {children}
        </div>
        <div
          onMouseDown={(e) => this.props.handleMouseDownRowNS(e, id)} 
          style={{
            marginBottom: 'auto',
            display: 'flex',
            justifyContent: 'bottom',
            width: '100%',
            height: '5px',
            paddingBottom: '3px',
            // TODO class 
            backgroundColor: reszBackgroundColor,
            borderBottomColor: 'black',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            cursor: 'row-resize',
            margin: '0px', 
            padding: '0px',
          }}
          >
        </div>
      </div>
      </TableCell>
    )
  }
}

export default InselTableCellHeightResizer;
