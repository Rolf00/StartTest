import React from 'react';
import { TableCell } from "@mui/material";
import InselTableMenu from './InselTableMenu';

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

      //const {value} = this.state;
      const {
        headerIndex,
        headers,
        className, 
        children, 
        height, 
        width, 
        notResizable, 
        horizontalAlign, 
        verticalAlign,
        resizerBackgroundColor,
        hasHeaderMenu } = this.props;

      const verticalAlignText = 
        verticalAlign === 'center' ? 'center' : 
        verticalAlign === 'bottom' ? 'flex-end' : '';
      const reszBackgroundColor = resizerBackgroundColor ? resizerBackgroundColor : 'transparent';

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
            flexDirection: 'row',
            //flexDirection: 'column',
            //justifyContent: 'flex-end',
            //minHeight: height, 
            height: '100%', 
            width: width,
            //width: '100%',

            }}>

            {hasHeaderMenu && horizontalAlign == 'right' &&
              <div
              style={{
                flexGrow: 1, 
                minHeight: height, 
                maxWidth: 40,
                textAlign: horizontalAlign,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: verticalAlignText,
                padding: 0,
                }}>
                <InselTableMenu
                  headers={headers}
                  headerIndex={headerIndex}
                ></InselTableMenu> 
              </div>
            }

            <div
              style={{
                flexGrow: 1, 
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

            {hasHeaderMenu && 
              (horizontalAlign == 'left' || horizontalAlign == 'center') &&
              <div style={{ display: 'flex', flexDirection: 'column', minHeight: height, }}>
                <div 
                  style={{ 
                    flex: 1, 
                  }}></div>
                <div 
                  style={{
                    //minHeight: height, 
                    maxWidth: 40,
                    padding: 0,
                    //flexDirection: 'column',
                    justifyContent: verticalAlignText,
                    }}
                  >

                  
                  <InselTableMenu
                    headers={this.props.headers}
                    headerIndex={-1}
                    ></InselTableMenu>
                  
                </div>
              </div>
            }

            {(!notResizable) &&
            <div 
              onMouseDown={(e) => this.props.handleMouseDownRowEW(e, headerIndex)} 
              style={{
              minHeight: height, 
              width: '5px',
              padding: 0,
              backgroundColor: reszBackgroundColor,
              borderRightColor: 'black',
              borderRightStyle: 'solid',
              borderRightWidth: 1,
              cursor: 'col-resize',
            }}>
            &nbsp;
            </div>
            }
          </div>
        </TableCell>
    )
  }
}
  
export default InselTableCellWidthResizer;
  