import React from 'react';
import { IconButton, TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import SwapVertIcon from '@mui/icons-material/SwapVert';          

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

  SortColumn = () =>
    {
      // sorting : when not defined, we start with DESC
      /*
      const isSortedAscending = headers[headerIndex].defaultSorting ?
        headers[headerIndex].defaultSorting === IConst.sortingASC : false;
      const newIsSortedAscending = !isSortedAscending;
      this.props.SortColumn(headerIndex, newIsSortedAscending)
      */
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

    const isSortable = headers[headerIndex].isSortable;
    const isSortedAscending = headers[headerIndex].defaultSorting ?
      headers[headerIndex].defaultSorting === IConst.sortingASC : false;

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
          }}>
          {hasHeaderMenu && this.props.headerHorizontalAlign === IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_end', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>
            <ITableMenu
              headers={this.props.headers}
              headerIndex={headerIndex}
              HideColumn={() => this.props.HideColumn(headerIndex)}
              SortColumn={(isSortedAsc) => this.props.SortColumn(headerIndex, isSortedAsc)}
            ></ITableMenu>
          </div>}

          {isSortable && this.props.headerHorizontalAlign === IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_end', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>   
          <IconButton 
            stlye={{ borderRadius: '3px' }}
            //onClick={() => this.SortColumn()}
            >
          <SwapVertIcon sx={{ transform: isSortedAscending ? '' : 'scaleX(-1)' }}/>
          </IconButton>
          </div>}

          <div style={{
            display: 'flex',
            justifyContent: horizontalAlign, 
            alignItems: verticalAlign, 
            textAlign: 'left',
            flex: 1,
            padding: '5px',
          }}>{children}</div>

          {isSortable && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_start', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>   
          <IconButton sx={{ width: '23px', height: '40px', borderRadius: '3px' }}>
            <SwapVertIcon sx={{ transform: isSortedAscending ? '' : 'scaleX(-1)' }}/>
          </IconButton>
          </div>}

          {hasHeaderMenu && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>
            <ITableMenu
              headers={this.props.headers}
              headerIndex={headerIndex}
              HideColumn={() => this.props.HideColumn(headerIndex)}
              SortColumn={(isSortedAsc) => this.props.SortColumn(headerIndex, isSortedAsc)}
              FilterColumn={() => this.props.FilterColumn(headerIndex)}
              ></ITableMenu>
          </div>}

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

  