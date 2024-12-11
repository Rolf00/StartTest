import React from 'react';
import PropTypes, { func } from 'prop-types';
//import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import {
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';

import IConst from './IConst';
import ITableCellWidthResizer from './ITableCellWidthResizer';
import { useStyles } from './styles';


class ITableHeader extends React.Component {

  //constructor(props) {
  //  super(props)
  //}

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  // functions
  setHeaderWidthList()
  {
    let newlist = [];
    for (let i = 0; i < this.props.headers.length; i++)
    {
      newlist.push(this.props.headers[i].width);
    }
    return newlist;
  }

  render()
  {

    // props
    const {
      classes,
      settings,
      headers,
      mainChecked,
      mainIndeterminated,
    } = this.props;
  
    // state
    this.state = {
      mainChecked: mainChecked,
      mainIndeterminated: mainIndeterminated,
      headerWidthList: this.setHeaderWidthList(),
    }

    return (

      <TableHead className={classes.table_head}>
        <TableRow className={classes.table_head_row}>
          {headers.map((header, headerIndex) => {

            const isSelectionHeader = 
              header.editType === IConst.editType_SelectionIcon;

            const isButtonHeader = 
              header.editType === IConst.editType_ButtonEdit ||
              header.editType === IConst.editType_ButtonSave ||
              header.editType === IConst.editType_ButtonUndo ||
              header.editType === IConst.editType_ButtonDelete;

            const hasHeaderMenu = header.hasHeaderMenu;
            //const headerTitle = 
            //  isSelectionHeader || isButtonHeader ? "" : header.headerTitle;
            const headerTitle = header.headerTitle;

            const isResizable = header.isResizable;
            const headerMinWidth = header.minWidth;
            const headerHorizontalAlign = header.horizontalAlign;
            const newheaderWidth = 
              isSelectionHeader || isButtonHeader  ? header.width + 18 : header.width;
            const headerRowHeight = settings.initialHeaderHeight;
            const imgWidth = settings.buttonSizeOnRows;

            const mainCheckIcon = 
              this.state.mainIndeterminated ? IConst.imgChkboxIndeterminate :
              this.state.mainChecked ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;

            // only show this column when it's defined as visible
            const visible = header.isVisible;

            if (visible) {
              return (
                <ITableCellWidthResizer
                  headers={this.props.headers}
                  headerIndex={headerIndex}
                  notResizable={!isResizable}
                  width={newheaderWidth}
                  minWidth={headerMinWidth}
                  horizontalAlign={headerHorizontalAlign}
                  verticalAlign={'bottom'}
                  height= {headerRowHeight}
                  setWidth={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e, headerIndex)=>this.props.handleMouseDownRowEW(e, headerIndex)}
                  hasHeaderMenu={hasHeaderMenu}
                  resizerBackgroundColor={this.props.settings.resizerEWBackgroundColor}
                  HideColumn={() => this.props.HideColumn(headerIndex)}
                >
                  {isSelectionHeader &&
                  <IconButton
                    style={{ width: newheaderWidth, height: newheaderWidth }} 
                    onClick={(e) => this.props.handleCheckboxClickHeader(e)}>
                    <img 
                      src={mainCheckIcon}
                      style={{ 
                        width: imgWidth, 
                        height: imgWidth,
                        padding: '0px',
                      }} 
                      />
                  </IconButton>
                  }
                  {headerTitle}
                </ITableCellWidthResizer>
              );
            }
          })}
        </TableRow>
      </TableHead>                
    );
  }
}

ITableHeader.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableHeader, useStyles);

