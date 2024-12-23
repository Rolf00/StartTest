import React from 'react';
import { IconButton, TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import SwapVertIcon from '@mui/icons-material/SwapVert';     
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


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

  changeSortingClick = () =>
  {
    // change the sorting => ASC - DESC - none
    const sorting = this.props.headers[this.props.headerIndex].defaultSorting;
    const newsorting = 
      sorting === IConst.sortingASC ? IConst.sortingDESC :
      sorting === IConst.sortingDESC ? '' : IConst.sortingASC;
      this.props.headers[this.props.headerIndex].defaultSorting = newsorting;
    const newheaders = [...this.props.headers];
    this.props.setChangedHeaders(newheaders);
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

    const isSortable = this.props.headers[this.props.headerIndex].isSortable;
    const isSortedAscending = this.props.headers[this.props.headerIndex].defaultSorting ?
    this.props.headers[this.props.headerIndex].defaultSorting === IConst.sortingASC : false;
    const sorting = this.props.headers[this.props.headerIndex].defaultSorting;

    return (
      <TableCell 
        className={classes.table_head_cell} 
        key={`tablecell-header${headerIndex}`}
        //id="tablecell-${headerIndex}"
        //width={width}>
        >

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
              filters={this.props.filters}
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
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
            sx={{ width: '23px', height: '40px', borderRadius: '3px' }}
            onClick={() => this.changeSortingClick()}>
            {sorting === IConst.sortingASC && <ArrowUpwardIcon/>}
            {sorting === IConst.sortingDESC && <ArrowDownwardIcon/>}
            {sorting === '' && <SwapVertIcon/>}
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
          <IconButton 
            sx={{ width: '23px', height: '40px', borderRadius: '3px' }}
            onClick={() => this.changeSortingClick()}>
            {sorting === IConst.sortingASC && <ArrowUpwardIcon/>}
            {sorting === IConst.sortingDESC && <ArrowDownwardIcon/>}
            {sorting === '' && <SwapVertIcon/>}
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
              settings={this.props.settings}
              headers={this.props.headers}
              headerIndex={headerIndex}
              filters={this.props.filters}
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.props.setChangedFilters(newfilters)}
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

  