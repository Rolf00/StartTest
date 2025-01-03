import React, { useState } from 'react';

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

import { getNewSortingList } from './IUtilsSort';

// class for header cells, where the width of rhe 

class ITableCellWidthResizer extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
        headerWidth: props.headers[props.headerIndex].width,
      };
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
    const field = this.props.headers[this.props.headerIndex].dataFieldName;
    const index = this.props.sortings.findIndex(s => s.orderByField === field);
    const order = index === -1 ? '' : this.props.sortings[index].order;

    // we change the sorting like : ASC -> DESC -> none -> ASC
    const neworder = 
      order === IConst.sortingASC ? IConst.sortingDESC :
      order === IConst.sortingDESC ? '' : IConst.sortingASC;

    const newSortingList = getNewSortingList(this.props.sortings, neworder, field)
    this.props.setChangedSortings(newSortingList);
  }

  handleMouseDownRowEW = (e) => 
  {
    // resizing column width
    const mouseStart = e.clientX;
    //const colindex = index;
    const cellWidth = this.props.headers[this.props.headerIndex].width;
    const element = e.target;

    element.style.backgroundColor = IConst.colorResizerBackground;

    const onMouseMoveRowEW = (e) => 
    {
      const newwidth = e.clientX - mouseStart + cellWidth;
      if (newwidth > this.props.headers[this.props.headerIndex].maxWidth &&
          newwidth !== this.props.headers[this.props.headerIndex].maxWidth)
      {
        this.props.headers[this.props.headerIndex].width = this.props.headers[this.props.headerIndex].maxWidth;
      }
      else
      if (newwidth < this.props.headers[this.props.headerIndex].minWidth &&
        newwidth !== this.props.headers[this.props.headerIndex].minWidth)
      {
        this.props.headers[this.props.headerIndex].width = this.props.headers[this.props.headerIndex].minWidth;
      }
      else
      if (newwidth < this.props.headers[this.props.headerIndex].maxWidth &&
          newwidth > this.props.headers[this.props.headerIndex].minWidth)
      {
        this.props.headers[this.props.headerIndex].width = newwidth;
        this.setState({headerWidth: newwidth});
      }
      else 
      {
        // nothing to here 
      }
    }

    const onMouseUpRowEW = (e) => 
    {
      document.removeEventListener('mousemove', onMouseMoveRowEW);
      document.removeEventListener('mouseup', onMouseUpRowEW);
      document.body.style.userSelect = "auto"; 
      element.style.backgroundColor = 'transparent';
    };    

    document.addEventListener('mousemove', onMouseMoveRowEW);
    document.addEventListener('mouseup', onMouseUpRowEW);    
    document.body.style.userSelect = "none";  
  }  

  render() 
  {

    const isSortable = this.props.headers[this.props.headerIndex].isSortable;
    /*
    const isSortedAscending = this.props.headers[this.props.headerIndex].defaultSorting ?
      this.props.headers[this.props.headerIndex].defaultSorting === IConst.sortingASC : false;
      */

    const field = this.props.headers[this.props.headerIndex].dataFieldName;
    const index =  this.props.sortings.findIndex(s => s.orderByField === field);
    const sorting = index === -1 ? "" : this.props.sortings[index].order;

    const hasHeaderMenu = this.props.headers[this.props.headerIndex].hasHeaderMenu;

    return (
      <TableCell 
        className={this.props.classes.table_head_cell} 
        key={`tablecell-header${this.props.headerIndex}`}
        width={this.state.headerWidth}
        >

        <div 
          style={{
            display: 'flex',
            width: '100%',
            height: this.props.settings.initialHeaderHeight,
            padding: '0px',
            borderBottomColor: '#BBBBBB',
            borderBottomStyle: 'none',
            borderBottomWidth: '1px',
            padding: '0px',
          }}>
          {hasHeaderMenu && this.props.headerHorizontalAlign === IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_end', 
            alignItems: this.props.verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>
            <ITableMenu
              settings={this.props.settings}
              headers={this.props.headers}
              headerIndex={this.props.headerIndex}
              filters={this.props.filters}
              sortings={this.props.sortings}
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.props.setChangedFilters(newfilters)}
              setChangedSortings={(newsortings) => this.props.setChangedSortings(newsortings)}
              openDialogSorting={() => this.props.openDialogSorting()}
            ></ITableMenu>
          </div>}

          {isSortable && this.props.headerHorizontalAlign === IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_end', 
            alignItems: this.props.verticalAlign, 
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
            justifyContent: this.props.horizontalAlign, 
            alignItems: this.props.verticalAlign, 
            textAlign: 'left',
            flex: 1,
            padding: '5px',
          }}>{this.props.children}</div>

          {isSortable && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_start', 
            alignItems: this.props.verticalAlign, 
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
            alignItems: this.props.verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>
            <ITableMenu
              settings={this.props.settings}
              headers={this.props.headers}
              headerIndex={this.props.headerIndex}
              filters={this.props.filters}
              sortings={this.props.sortings}
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.props.setChangedFilters(newfilters)}
              setChangedSortings={(newsortings) => this.props.setChangedSortings(newsortings)}
              openDialogSorting={() => this.props.openDialogSorting()}
              ></ITableMenu>
          </div>}

          {(!this.props.notResizable) &&
          <div 
            className={this.props.classes.resizerEW}
            onMouseDown={(e) => this.handleMouseDownRowEW(e, this.props.headerIndex)} 
            >&nbsp;</div>}

        </div>
      </TableCell>
    )
  }
}
  
ITableCellWidthResizer.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableCellWidthResizer, useStyles);

  