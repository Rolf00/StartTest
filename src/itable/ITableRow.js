import React from 'react';
import { TableRow, } from '@mui/material';

import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import { useStyles } from '../AppStyles';
  
import IConst from './IConst';
import IUtils from './IUtils';
import ITableCellHeightResizer from './ITableCellHeightResizer';
import IFieldSelection from './IFieldSelection';
import IFieldText from './IFieldText';
import IFieldNumber from './IFieldNumber';
import IFieldDropDown from './IFieldDropDown';
import IFieldChipMenu from './IFieldChipMenu';
import IFieldCheckbox from './IFieldCheckbox';
import IFieldDate from './IFieldDate';
import IFieldSpecialButton from './IFieldSpecialButton';
import IFieldStateButton from './IFieldStateButton';
import IFieldRowEditButton from './IFieldRowEditButton';

  
class ITableRow  extends React.Component {
  constructor(props) {
    super(props);

    // props
    const {
      settings,
      headers,
      rowInfo,
      primaryKey,
      oldRow,
      row
    } = this.props;

    this.state = { 
      rowInfo: rowInfo,
      isHeightResizing: false,
      resizingInAction: false,
      row: {...this.props.row},
    }
  }

  componentDidMount() { 
  }

  componentDidUpdate() 
  {
    const {row} = this.props;
    const {rowInfo} = this.props;

    if (row[this.props.primaryKey] !== this.state.row[this.props.primaryKey])
    {
      // we have to update, when a new ID was sent 
      this.setState({
        rowInfo,
        row,
      });
    }
    else if (rowInfo.forceUpdate)
    {
      // we have to force an update, when the new id is the same as the old id
      rowInfo.forceUpdate = false;
      this.setState({
        rowInfo,
        row,
      });
    }
    else if (rowInfo !== this.state.rowInfo)
    {
      this.setState({
        rowInfo,
        row,
      });
    }
  }
  
  componentWillUnmount() { 
  }

  handleDataChange(value, field)
  {
    // change the row values and update row color and main buttons
    const newRow = {...this.state.row};
    newRow[field] = value;

    const newInfo = this.state.rowInfo;
    if (newInfo.state === IConst.rowStateUnchanged)
      newInfo.state = IConst.rowStateEdited;

    this.setState({
      rowInfo: newInfo,
      row: newRow});
  }
  
  handleMouseDownRowNS(e)
  {
    // resizing row height
    let oldRowHeight = this.state.rowInfo.height;
    let mouseStart = e.clientY;

    const element = e.target;
    element.style.backgroundColor = this.props.settings.resizerBackgroundColor;
    this.setState({isHeightResizing: true});
    this.state.resizingInAction = true;

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + oldRowHeight;
      const newInfo = this.state.rowInfo;
      newInfo.height = newheight;
      this.setState({rowInfo: newInfo});
    }

    const onMouseUpRowNS = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowNS);
      document.removeEventListener('mouseup', onMouseUpRowNS);
      document.body.style.userSelect = "auto";  
      element.style.backgroundColor = 'transparent';
      this.state.resizingInAction = false;
      this.setState({isHeightResizing: false});
    };    

    document.addEventListener('mousemove', onMouseMoveRowNS);
    document.addEventListener('mouseup', onMouseUpRowNS);  
    document.body.style.userSelect = "none";  
  }

  handleMouseEnterNS()
  {
    this.setState({isHeightResizing: true});
  }

  handleMouseLeaveNS()
  {
    if (!this.state.resizingInAction)
      this.setState({isHeightResizing: false});
  }

  handleEditModalDialog()
  {
    // modal dialog
    this.props.openModalDataDialog(this.state.row);
  }

  handleRowEditButtonClick(action)
  {
    //const infoIndex = this.getRowInfoListIndex();

    if (action === IConst.editType_ButtonEditRow)
    {
      // button EDIT for one row was clicked
      const newInfo =  this.state.rowInfo;
      newInfo.editing = !newInfo.editing;
      this.setState({rowInfo: newInfo});

      if (!newInfo.editing)
      {
        // editing was stopped, thus we update the main data 
        this.props.rowUpdate(newInfo, this.state.row);
      }
    }
    if (action === IConst.editType_ButtonEdit)
    {
      // here we open a modal dialog
      this.props.editRowModalDialog(this.state.row);

    }
    else if (action === IConst.editType_ButtonSave)
    {
      // now we can save one row
      const newInfo =  this.state.rowInfo;
      newInfo.editing = false;
      this.setState({rowInfo: newInfo});
      this.props.handleSaveOneRow(this.state.row);
    }
    else if (action === IConst.editType_ButtonUndo)
    {
      // button UNDO for one row was clicked
      this.handleUndoRow();
    }
    else if (action === IConst.editType_ButtonDelete)
    {
      // button DELETE for one row was clicked
      const newInfo =  this.state.rowInfo;
      newInfo.editing = false;
      newInfo.state = IConst.rowStateDeleted;;
      this.setState({rowInfo: newInfo});
      this.props.rowUpdate(newInfo, this.state.row);
    }
  }

  handleUndoRow()
  {
    // we undo edited and deleted rows
    const newInfo =  this.state.rowInfo;
    newInfo.editing = false;
    this.props.rowUndo(newInfo, this.state.row);
  }

  render()
  {
    const { classes } = this.props;
    const {row, rowInfo} = this.state;
    const rowid = row[this.props.primaryKey];

    // main row selection 
    const isRowSelected = rowInfo.selected;
    
    // get row height
    const rowHeight = rowInfo.height;

    // to get the background color for the row depending on its state
    const rowState = rowInfo.state;

    const isRowDeleted = rowState === IConst.rowStateDeleted;
    const isRowInserted = rowState === IConst.rowStateInserted;
    const isRowEdited = rowState === IConst.rowStateEdited;

    const rowBackgroundColor =
      isRowSelected && isRowDeleted ? this.props.settings.rowColorSelDeleted :
      isRowSelected && isRowEdited ? this.props.settings.rowColorSelChanged :
      isRowSelected && isRowInserted ? this.props.settings.rowColorSelInserted :
      isRowSelected ? this.props.settings.rowColorSelected :
      isRowDeleted ? this.props.settings.rowColorDeleted :
      isRowEdited ? this.props.settings.rowColorChanged :
      isRowInserted ? this.props.settings.rowColorInserted : "#FFFFFF";

    return (
      <TableRow
        height={rowHeight}
        style={{
          height: rowHeight,
          backgroundColor: rowBackgroundColor,
        }}
      >
      {this.props.headers.map((header, headerIndex) => {

        // edit types
        const isSelectionIcon = header.editType === IConst.editType_SelectionIcon;

        const isTextfield =
          header.editType === IConst.editType_Textfield ||
          header.editType === IConst.editType_TextfieldMultiline;

        const isNumber = 
          header.editType === IConst.editType_Integer ||
          header.editType === IConst.editType_Decimal;

        const isDropdown = header.editType === IConst.editType_Dropdown;
        const isCheckbox = header.editType === IConst.editType_Checkbox;
        const isDate = header.editType === IConst.editType_Date;
        const isChip = header.editType === IConst.editType_Chip;
        const isSpecialButton = header.editType === IConst.editType_SpecialButton;
        const isStateButton = header.editType === IConst.editType_StateButton;
        const isGetter = header.editType === IConst.editType_Getter;

        const isRowEditButton = 
          header.editType === IConst.editType_ButtonEditRow ||
          header.editType === IConst.editType_ButtonEdit ||
          header.editType === IConst.editType_ButtonSave ||
          header.editType === IConst.editType_ButtonUndo ||
          header.editType === IConst.editType_ButtonDelete;

        // checking about typos
        const typeFound = (
          isSelectionIcon || isTextfield || isNumber || isDropdown || 
          isCheckbox || isDate || isChip || isSpecialButton || isStateButton || 
          isGetter || isRowEditButton
        );

        const field = header.dataFieldName;
        let value = row[field];
        if (isGetter) value = eval(header.valueGetter);

        // enable / disbable the editing of one row
        // if "this.props.settings.alwaysActivateEditing" is TRUE, editing is always enabled
        const isCurrentEditing = rowInfo.editing;
        let editing = false;
        if (this.props.settings.neverActivateEditingWhenDisabled && !header.isEditable)
        {
          editing = false;
        }
        else 
        {
          editing = this.props.settings.alwaysActivateEditing || isCurrentEditing;
        }

        const saving = rowInfo.saving;
        const visible = header.isVisible;
        const verticalAlign = IUtils.getVerticalAlign(this.props.settings.rowsVerticalAlign);
        const horizontalAlign = IUtils.getHorizontalAlign(header.horizontalAlign);

        const editHeight = this.props.settings.editComponentHeight;

        if (visible) {
          return (
            <ITableCellHeightResizer
              key={`TableRow-row${rowid}.header${headerIndex}`}
              className={classes.itable_row_cell}
              height={rowHeight}
              isHeightResizing={this.state.isHeightResizing}
              resizerBackgroundColor={this.props.settings.resizerBackgroundColor}
              horizontalAlign={horizontalAlign}
              verticalAlign={verticalAlign}
              handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e)}
              // we dont want flickering all over each row
              //handleMouseEnterNS={(e)=>this.handleMouseEnterNS(e)}
              //handleMouseLeaveNS={(e)=>this.handleMouseLeaveNS(e)}
            >

              {isSelectionIcon &&
              <IFieldSelection
                classes={classes}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                settings={this.props.settings}
                header={header}
                value = {isRowSelected}
                handleSelectionClickRow={() => this.props.handleSelectionClickRow(rowid)}
              />}

              {isTextfield && 
              <IFieldText
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                editHeight={editHeight}
                singleHorizontalAlign={header.horizontalAlign}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isNumber &&
              <IFieldNumber
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                rowsVerticalAlign={this.props.settings.rowsVerticalAlign}
                editHeight={editHeight}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isDropdown &&
              <IFieldDropDown
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                rowsVerticalAlign={this.props.settings.rowsVerticalAlign}
                editHeight={editHeight}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isCheckbox &&
              <IFieldCheckbox
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                rowsVerticalAlign={this.props.settings.rowsVerticalAlign}
                settings={this.props.settings}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isDate &&
              <IFieldDate
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                rowsVerticalAlign={this.props.settings.rowsVerticalAlign}
                editHeight={editHeight}
                header={header}
                value={value}
                row={row}
                localization={this.props.settings.localization}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isChip &&
              <IFieldChipMenu
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isSpecialButton &&
              <IFieldSpecialButton
                classes={classes}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header = {header}
                rowid={rowid}
                handleSpecialButtonClick = {() => this.props.handleSpecialButtonClick(rowid, field)}
              />}

              {isStateButton &&
              <IFieldStateButton
                classes={classes}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header = {header}
                rowid={rowid}
                value={value}
                handleStateButtonClick={() => this.props.handleStateButtonClick(rowid, field)}
              />}

              {isGetter && 
              <IFieldText
                classes={classes}
                editing={editing}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                editHeight={editHeight}
                singleHorizontalAlign={header.horizontalAlign}
                header={header}
                value={value}
              />}

              {isRowEditButton &&
              <IFieldRowEditButton
                classes={classes}
                editing={editing}
                saving={saving}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                settings = {this.props.settings}
                rowId={rowid}
                rowState = {rowState}
                header = {header}
                handleRowEditButtonClick = {(action) => this.handleRowEditButtonClick(action)}
              />}

              {!typeFound && <span>TYPE ERROR</span>}  

            </ITableCellHeightResizer>
          );
        }
      })}
      </TableRow>  
    );
  }
}

ITableRow.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableRow, useStyles);

