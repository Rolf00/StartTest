import React from 'react';
import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import {
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';

import InselConstants from './InselConstants';
import InselTableCellWidthResizer from './InselTableCellWidthResizer';

class InselTableHeader extends React.Component {
  constructor(props) {
    super(props)

    // props
    const {
      classes,
      settings,
      headers,
    } = this.props;
  
    // state
    this.state = {
      mainChecked: false,
      mainIndeterminated: false,
      mainCheckIcon: InselConstants.imgChkboxUnchecked,
      headerWidthList: this.setHeaderWidthList(),
    }
  }

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
    const { classes } = this.props;
    const { settings } = this.props;
    const { headers } = this.props;

    return(
      <TableHead className={classes.table_head}>
        <TableRow className={classes.table_head_row}>
          {headers.map((header, headerIndex) => {
            const isSelection = header.editType === 'selection';
            const isSelectionIcon = header.editType === 'selectionIcon';
            const isNoEdit = (!isSelection) && (!isSelectionIcon);
            const isButtonheader = (
                header.editType === 'btnEdit' ||
                header.editType === 'btnSave' ||
                header.editType === 'btnUndo' ||
                header.editType === 'btnDelete'
            );
            const hasHeaderMenu = header.hasHeaderMenu;
            const headerTitle = header.headerTitle;
            const isisResizable = header.isResizable;
            const headerMinWidth = header.minWidth;
            const headerHorizontalAlign = header.horizontalAlign;
            const newheaderWidth = isButtonheader ? header.width + 18 : header.width;
            const headerRowHeight = settings.initialHeaderHeight;

            return (
              <InselTableCellWidthResizer
                className={classes.table_head_cell}
                headers={this.props.headers}
                headerIndex={headerIndex}
                notResizable={!isisResizable}
                width={newheaderWidth}
                minWidth={headerMinWidth}
                horizontalAlign={headerHorizontalAlign}
                verticalAlign={'bottom'}
                height= {headerRowHeight}
                setWidth={(colwidth) => this.setState({colwidth: colwidth})}
                handleMouseDownRowEW={(e, headerIndex)=>this.props.handleMouseDownRowEW(e, headerIndex)}
                hasHeaderMenu={hasHeaderMenu}
                resizerBackgroundColor={this.props.settings.resizerEWBackgroundColor}>

              {isSelectionIcon &&
              <IconButton
                style={{ width: newheaderWidth, height: newheaderWidth }} 
                onClick={e => this.props.handleCheckboxClickHeader(e)}>
                <img 
                  src={this.state.mainCheckIcon}
                  style={{ width: header.width, height: header.width }} 
                />
              </IconButton>
              }
              {isNoEdit && headerTitle }
              </InselTableCellWidthResizer>
            );
          })}
        </TableRow>
      </TableHead>                
    );
  }
}

InselTableHeader.propTypes = {
  classes: PropTypes.object,  
};
  
export default withStyles(InselTableHeader, useStyles);