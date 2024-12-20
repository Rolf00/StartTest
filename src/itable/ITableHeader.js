import React from 'react';
import PropTypes, { func } from 'prop-types';
//import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import {
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

import IConst from './IConst';
import IUtils from './IUtils';
import ITableCellWidthResizer from './ITableCellWidthResizer';
import { useStyles } from './styles';


class ITableHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }

  componentWillUnmount() {
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
            //const headerHorizontalAlign = header.horizontalAlign;
            //const headerVerticalAlign = settings.rowsVerticalAlign;
            const newheaderWidth = 
              isSelectionHeader || isButtonHeader  ? header.width + 8 : header.width;

            const btnHoverWidth = settings.buttonSizeOnRowsHover;

            const headerRowHeight = settings.initialHeaderHeight;
            const imgWidth = settings.buttonSizeOnRows;

            const mainCheckIcon = 
              this.state.mainIndeterminated ? IConst.imgChkboxIndeterminate :
              this.state.mainChecked ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;

            // only show this column when it's defined as visible
            const visible = header.isVisible;

            const horizontalAlign = IUtils.getHorizontalAlign(header.horizontalAlign);
            const verticalAlign = IUtils.getVerticalAlign(settings.rowsVerticalAlign);

            if (visible) {
              return (
                <ITableCellWidthResizer
                  key={`ITableCellWidthResizer-headerindex${headerIndex}`}
                  headers={this.props.headers}
                  headerIndex={headerIndex}
                  notResizable={!isResizable}
                  width={newheaderWidth}
                  minWidth={headerMinWidth}
                  horizontalAlign={horizontalAlign}
                  verticalAlign={verticalAlign}
                  height= {headerRowHeight}
                  setWidth={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e, headerIndex)=>this.props.handleMouseDownRowEW(e, headerIndex)}
                  hasHeaderMenu={hasHeaderMenu}
                  HideColumn={() => this.props.HideColumn(headerIndex)}
                  SortColumn={(sortAscending) => this.props.SortColumn(headerIndex, sortAscending)}
                  FilterColumn={() => this.props.FilterColumn(headerIndex)}
                  >
                  {isSelectionHeader &&
                  <div
                    style={{ 
                      padding: '0px 0px 0px 7px', 
                      width: '100%', 
                      height: '100%',
                      display: 'flex',
                      flexGrow: 1,
                      justifyContent: horizontalAlign, 
                      alignItems: verticalAlign,
                    }}>
                  <Tooltip title="Select / Unselect all rows" arrow>
                  <IconButton
                    style={{ 
                      width: btnHoverWidth, 
                      height: btnHoverWidth }} 
                    onClick={(e) => this.props.handleCheckboxClickHeader(e)}>

                    {(!this.state.mainIndeterminated) && (this.state.mainChecked) &&
                    <CheckBoxIcon sx={{ color: IConst.iconColorGreen}}/>}

                    {(!this.state.mainIndeterminated) && (!this.state.mainChecked) &&
                    <CheckBoxOutlineBlankIcon sx={{ color: IConst.iconColorGreen}}/>}

                    {this.state.mainIndeterminated && 
                    <IndeterminateCheckBoxIcon  sx={{ color: IConst.iconColorGreen}}/>}

                  </IconButton>
                  </Tooltip>

                  </div>}

                  {!isSelectionHeader &&
                    <div
                      style={{ 
                        padding: '0px 0px', 
                        width: '100%', 
                        height: '100%',
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: horizontalAlign, 
                        alignItems: verticalAlign,
                      }}
                    >{headerTitle}
                    </div>
                  }
                </ITableCellWidthResizer>
              );
            }
          })}
        </TableRow>

        {/* 

        <div style={{ 
          display: 'block', position: 'absolute', 
          width: '320px', zIndex: 1, 
          background: 'white', color: 'black',
          display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
        <div style={{ padding: '10px' }}>Search value in data</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField label={"filder rows"}></TextField>
        <IconButton style={{ padding: '5px 15px', borderRadius: '6px'}}>Search</IconButton>
        </div>
        </div>
        */}

      </TableHead>     
      
      
    );
  }
}

ITableHeader.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableHeader, useStyles);

