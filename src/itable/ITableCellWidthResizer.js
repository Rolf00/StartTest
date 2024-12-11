import React from 'react';
import { TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes, { func } from 'prop-types';

import ITableMenu from './ITableMenu';
import { useStyles } from './styles';

class ITableCellWidthResizer extends React.Component {
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
      classes, 
      headerIndex,
      headers,
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
      <TableCell className={classes.table_head_cell} >
        <div className={classes.resizerEW_Top} >

          {hasHeaderMenu && horizontalAlign == 'right' &&
          <div className={classes.resizerEW_Menu_Left}
            style={{
              minHeight: height, 
              textAlign: horizontalAlign,
              justifyContent: verticalAlignText,
            }}
          >
            <ITableMenu
              headers={headers}
              headerIndex={headerIndex}
              HideColumn={() => this.props.HideColumn(headerIndex)}
            ></ITableMenu> 
          </div>}

          <div
            className={classes.resizerEW_Caption}
            style={{
              minHeight: height, 
              textAlign: horizontalAlign,
              justifyContent: verticalAlignText,
            }}
          >
            <div>{children}</div>
          </div>

          {hasHeaderMenu && 
            (horizontalAlign == 'left' || horizontalAlign == 'center') &&
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: height, }}>
            <div style={{ flex: 1, }}></div>
            <div 
              className={classes.resizerEW_Menu_Right}
              style={{ justifyContent: verticalAlignText, }}
            >
              <ITableMenu
                headers={this.props.headers}
                headerIndex={headerIndex}
                HideColumn={() => this.props.HideColumn(headerIndex)}
                ></ITableMenu>
            </div>
          </div>
          }

          {(!notResizable) &&
          <div 
            className={classes.resizerEW}
            onMouseDown={(e) => this.props.handleMouseDownRowEW(e, headerIndex)} 
          >&nbsp;</div>}

        </div>
      </TableCell>
    )
  }
}
  
ITableCellWidthResizer.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableCellWidthResizer, useStyles);

  