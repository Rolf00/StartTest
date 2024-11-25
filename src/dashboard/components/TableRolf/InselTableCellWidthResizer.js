import React from 'react';
import { TableCell } from "@mui/material";

class InselTableCellWidthResizer extends React.Component {
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

    /*
    handleMouseDownRowEW = e => {
        this.props.handleMouseDownRowEW
    }
        */

    render() 
    {
  
      function handleMouseEnter(e)
      {
        //e.target.style.backgroundColor = '#5555FF';
      }
    
      function handleMouseLeave(e)
      {
        //e.target.style.backgroundColor = 'transparent';
      }
   
    
      //const {value} = this.state;
      const {
        index,
        className, 
        children, 
        height, 
        width, 
        notResizable, 
        horizontalAlign, 
        verticalAlign } = this.props;

      const textResizer = notResizable ? '' : '&nbsp;';
      const verticalAlignText = 
        verticalAlign === 'center' ? 'center' : 
        verticalAlign === 'bottom' ? 'flex-end' : '';

      return (
        <TableCell
          className={className}
          style={{ 
            //width: width,
            height: 'auto',
            padding: 0,
          }}>
        
          <div style={{ 
            padding: 0,
            display: 'flex',
            //flexDirection: 'column',
            //justifyContent: 'flex-end',
            //minHeight: height, 
            height: '100%', 
            width: width,
            //width: '100%',

            }}>
            <div
              style={{
                flexGrow: 1, 
                backgroundColor: 'yellow', 
                minHeight: height, 
                textAlign: horizontalAlign,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: verticalAlignText,
                padding: 5,
                }}>
                <div>
                {children}
                </div>
            </div>
            <div 
              onMouseDown={(e) => this.props.handleMouseDownRowEW(e, index)} 
              style={{
              minHeight: height, 
              width: notResizable ? '0px' : '5px',
              padding: 0,
              backgroundColor: 'blue',
              cursor: 'col-resize',
            }}>{textResizer}
            </div>
          </div>
        </TableCell>
      )
    }
  }
  
  export default InselTableCellWidthResizer;
  