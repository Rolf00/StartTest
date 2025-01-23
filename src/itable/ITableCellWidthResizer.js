import React, { useState } from 'react';
import { IconButton, TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import StraightRoundedIcon from '@mui/icons-material/StraightRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';

import IConst from './IConst';
import ITableMenu from './ITableMenu';
import { useStyles } from './styles';
import { iconButtonStyleGrey, iconButtonStyleGrey_Rotate180 } from './IStyles';
import { getNewSortingList } from './IUtilsSort';


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
    const field = this.props.headers[this.props.headerIndex].dataFieldName;
    const index =  this.props.sortings.findIndex(s => s.orderByField === field);
    const sorting = index === -1 ? "" : this.props.sortings[index].order;
    const hasHeaderMenu = this.props.headers[this.props.headerIndex].hasHeaderMenu;

    return (
      <TableCell 
        className={this.props.classes.itable_head_cell} 
        key={`tablecell-header${this.props.headerIndex}`}
        width={this.state.headerWidth}
        minwidth={this.props.headers[this.props.headerIndex].minWidth}
        maxwidth={this.props.headers[this.props.headerIndex].maxWidth}
        >

        <div 
          style={{
            display: 'flex',
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
            justifyContent: 'center', 
            alignItems: this.props.verticalAlign, 
            width: '25px',
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
            width: '25px',
          }}>   
          <IconButton 
            sx={{ width: '25px', height: '40px', borderRadius: '3px' }}
            onClick={() => this.changeSortingClick()}>
            {sorting === IConst.sortingASC && <StraightRoundedIcon style={iconButtonStyleGrey}/>}
            {sorting === IConst.sortingDESC && <StraightRoundedIcon style={iconButtonStyleGrey_Rotate180}/>}
            {sorting === '' && <HeightRoundedIcon style={iconButtonStyleGrey}/>}
          </IconButton>
          </div>}

          <div style={{
            display: 'flex',
            justifyContent: this.props.horizontalAlign, 
            alignItems: this.props.verticalAlign, 
            height: '100%',
            flex: 1,
            padding: '0px 5px',
          }}>{this.props.children}</div>

          {isSortable && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex_start', 
            alignItems: this.props.verticalAlign, 
            width: '25px',
          }}>   
          <IconButton 
            sx={{ width: '25px', height: '40px', borderRadius: '3px' }}
            onClick={() => this.changeSortingClick()}>
            {sorting === IConst.sortingASC && <StraightRoundedIcon style={iconButtonStyleGrey}/>}
            {sorting === IConst.sortingDESC && <StraightRoundedIcon style={iconButtonStyleGrey_Rotate180}/>}
            {sorting === '' && <HeightRoundedIcon style={iconButtonStyleGrey}/>}
          </IconButton>
          </div>}

          {hasHeaderMenu && this.props.headerHorizontalAlign !== IConst.horizontalAlign_Right &&
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: this.props.verticalAlign, 
            width: '25px',
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
              handleOpenDialogSorting={() => this.props.handleOpenDialogSorting()}
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

  