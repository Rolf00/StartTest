import React from "react";
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
      const {className, children } = this.props;
      const width = this.props.width;
      return (
        <TableCell
          className={className}
          style={{ 
            padding: 0,
            width: width,
          }}
        >
        <div style={{ 
          //display: 'flex', 
          //flexWrap: 'wrap',
          //flexDirection: 'row', 
          display: 'inline-block',
          height: '100%', 
          width: '100%', 
          margin: '0px', 
          padding: '0px'}}>
          <div style={{ 
            //display: 'flex', 
            //justifyContent: 'left',
            //float: 'left',
            //flex: '100%',
            display: 'inline-block',
            padding: '10px 10px 10px 10px',
            height: '100%', 
            width: '50%',
            backgroundColor: 'yellow',
            }}>
            {children}
          </div>
          <div
            onMouseDown={(e) => this.props.handleMouseDownRowEW(e)} 
            style={{
            //display: 'flex',
            //justifyContent: 'right',
            //flex: '5px',
            //float: 'right',
            display: 'inline-block',
            width: '15px',
            height: '100%',
            backgroundColor: '#999',
            cursor: 'col-resize',
            margin: '0px', 
            padding: '0px',
            }}>
          </div>
        </div>
        </TableCell>
      )
    }
  }
  
  export default InselTableCellWidthResizer;
  