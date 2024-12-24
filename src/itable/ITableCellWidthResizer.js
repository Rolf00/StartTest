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

// class for header cells, where the width of rhe 

class ITableCellWidthResizer extends React.Component {
  constructor(props) {
      super(props)

      /*
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
       */

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
    const sorting = this.props.headers[this.props.headerIndex].defaultSorting;
    const newsorting = 
      sorting === IConst.sortingASC ? IConst.sortingDESC :
      sorting === IConst.sortingDESC ? '' : IConst.sortingASC;

    const newheaders = [...this.props.headers];

    // we delete all older sortings and set a new one
    for (let h = 0; h < newheaders.length; h++) newheaders[h].defaultSorting = "";
    newheaders[this.props.headerIndex].defaultSorting = newsorting;
    this.props.setChangedHeaders(newheaders);
  }

  handleMouseDownRowEW = (e) => 
  {
    //TEST

    // resizing column width
    const mouseStart = e.clientX;
    //const colindex = index;
    const cellWidth = this.props.headers[this.props.headerIndex].width;
    
    
    const element = e.target;
    //const parentCell = e.target.parent.parent;
    //alert("e.target.parent.parent.key")

    element.style.backgroundColor = IConst.colorResizerBackground;

    const onMouseMoveRowEW = (e) => 
    {
      const newwidth = e.clientX - mouseStart + cellWidth;
      if (newwidth > this.props.headers[this.props.headerIndex].maxWidth &&
          newwidth !== this.props.headers[this.props.headerIndex].maxWidth)
      {
        //const newList2 = this.state.headers;
        //newList2[colindex].width = this.state.headers[colindex].maxWidth;
        //this.setState({headers : newList2});
        this.props.headers[this.props.headerIndex].width = this.props.headers[this.props.headerIndex].maxWidth;
        //parentCell.style.width = this.props.headers[this.props.headerIndex].maxWidth;

      }
      else
      if (newwidth < this.props.headers[this.props.headerIndex].minWidth &&
        newwidth !== this.props.headers[this.props.headerIndex].minWidth)
      {
        //const newList2 = this.state.headers;
        //newList2[colindex].width = this.state.headers[colindex].minWidth;
        //this.setState({headers : newList2});

        this.props.headers[this.props.headerIndex].width = this.props.headers[this.props.headerIndex].minWidth;
        //parentCell.style.width = this.props.headers[this.props.headerIndex].minWidth;

      }
      else
      if (newwidth < this.props.headers[this.props.headerIndex].maxWidth &&
          newwidth > this.props.headers[this.props.headerIndex].minWidth)
      {
        //const newList2 = this.state.headers;
        //newList2[colindex].width = newwidth;
        //this.setState({headers : newList2});
        this.props.headers[this.props.headerIndex].width = newwidth;
        //parentCell.style.width = newwidth;
        this.setState({headerWidth: newwidth});
      }
      else 
      {
        //console.log("onMouseUpRowEW no resizing possible");
      }
    }

    const onMouseUpRowEW = (e) => 
    {
      document.removeEventListener('mousemove', onMouseMoveRowEW);
      document.removeEventListener('mouseup', onMouseUpRowEW);
      document.body.style.userSelect = "auto"; 
      element.style.backgroundColor = 'transparent';

      //const newList2 = this.state.headers;
      //this.setState({headers : newList2});

    };    

    document.addEventListener('mousemove', onMouseMoveRowEW);
    document.addEventListener('mouseup', onMouseUpRowEW);    
    document.body.style.userSelect = "none";  


  }  

  render() 
  {

    const isSortable = this.props.headers[this.props.headerIndex].isSortable;
    const isSortedAscending = this.props.headers[this.props.headerIndex].defaultSorting ?
    this.props.headers[this.props.headerIndex].defaultSorting === IConst.sortingASC : false;
    const sorting = this.props.headers[this.props.headerIndex].defaultSorting;
    const hasHeaderMenu = this.props.headers[this.props.headerIndex].hasHeaderMenu;

    return (
      <TableCell 
        className={this.props.classes.table_head_cell} 
        key={`tablecell-header${this.props.headerIndex}`}
        //id="tablecell-${headerIndex}"
        width={this.state.headerWidth}
        >

        <div 
          style={{
            display: 'flex',
            width: '100%',
            height: this.props.settings.initialHeaderHeight,
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
            alignItems: this.props.verticalAlign, 
            textAlign: 'left',
            width: '25px',
            padding: '0px',
          }}>
            <ITableMenu
              headers={this.props.headers}
              headerIndex={this.props.headerIndex}
              filters={this.props.filters}
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
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
              setChangedHeaders={(newheaders) => this.props.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.props.setChangedFilters(newfilters)}
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

  