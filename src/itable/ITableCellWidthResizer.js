import React from 'react';
import { TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import IConst from './IConst';
import ITableMenu from './ITableMenu';
import { useStyles } from './styles';

// class for header cells, where the width of rhe 

class ITableCellWidthResizer extends React.Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() 
  {

    const {
      classes, 
      headers,
      headerIndex,
      children, 
      height, 
      notResizable, 
      horizontalAlign, 
      verticalAlign,
      hasHeaderMenu,
    } = this.props;


    return (
      <TableCell className={classes.table_head_cell} >
        <div 
          style={{
            display: 'flex',
            width: '100%',
            height: height,
            padding: '0px',
            borderBottomColor: 'black',
            borderBottomStyle: 'solid',
            borderBottomWidth: '1px',
            padding: '0px',
         }}
        >
          {hasHeaderMenu && this.props.headerHorizontalAlign === IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_end', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '40px',
            padding: '0px 1px',
          }}>
            <ITableMenu
              headers={this.props.headers}
              headerIndex={headerIndex}
              HideColumn={() => this.props.HideColumn(headerIndex)}
              SortColumn={(sortAscending) => this.props.SortColumn(headerIndex, sortAscending)}
            ></ITableMenu>
          </div>}

          <div style={{
            display: 'flex',
            justifyContent: horizontalAlign, 
            alignItems: verticalAlign, 
            textAlign: 'left',
            flex: 1,
            padding: '5px',
          }}>{children}</div>

          {hasHeaderMenu && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '40px',
            padding: '0px 1px',
          }}>
            <ITableMenu
              headers={this.props.headers}
              headerIndex={headerIndex}
              HideColumn={() => this.props.HideColumn(headerIndex)}
              SortColumn={(sortAscending) => this.props.SortColumn(headerIndex, sortAscending)}
              ></ITableMenu>
          </div>
          }

          {(!notResizable) &&
          <div 
            className={classes.resizerEW}
            onMouseDown={(e) => this.props.handleMouseDownRowEW(e, headerIndex)} 
          >&nbsp;</div>
          }

        </div>
      </TableCell>
    )
  }
}
  
ITableCellWidthResizer.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableCellWidthResizer, useStyles);

  