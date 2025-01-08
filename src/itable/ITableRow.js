import React from 'react';
import { 
  TableRow, 
  } from '@mui/material';

import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';
  
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
import { useStyles } from './styles';

  
class ITableRow  extends React.Component {
  constructor(props) {
    super(props);

    // props
    const {
      settings,
      headers,
      rowInfoList,
      rowInfoIndex,
      primaryKey,
      oldRow,
      row
    } = this.props;

    this.state = { 
      rowEditing: rowInfoList[rowInfoIndex].editing,
      rowHeight: rowInfoList[rowInfoIndex].height,
      isHeightResizing: false,
      resizingInAction: false,
      rowInfoList: {...this.props.rowInfoList},
      row: {...this.props.row},
    }
  }

  componentDidMount() { 
  }

  componentDidUpdate() 
  {
    const {row} = this.props;
    const {rowInfoList} = this.props;

    if (row[this.props.primaryKey] !== this.state.row[this.props.primaryKey])
    {
      // we have to update, when a new ID was sent 
      this.setState({
        //rowInfoList: this.props.rowInfoList,
        //row: this.props.row,
        rowInfoList,
        row,
      });
    }
    else if (rowInfoList[this.props.rowInfoIndex].forceUpdate)
    {
      // we have to force an update, when the new id is the same as the old id
      rowInfoList[this.props.rowInfoIndex].forceUpdate = false;
      this.setState({
        //rowInfoList: this.props.rowInfoList,
        //row: this.props.row,
        rowInfoList,
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

    const newInfo = {...this.state.rowInfoList};
    if (newInfo[this.props.rowInfoIndex].state === IConst.rowStateUnchanged) 
      newInfo[this.props.rowInfoIndex].state = IConst.rowStateEdited;

    this.setState({
      rowInfoList: newInfo,
      row: newRow});
  }
  
  handleMouseDownRowNS(e)
  {
    // resizing row height
    let oldRowHeight = this.state.rowInfoList[this.props.rowInfoIndex].height;
    let mouseStart = e.clientY;

    const element = e.target;
    element.style.backgroundColor = IConst.colorResizerBackground;
    this.setState({isHeightResizing: true});
    this.state.resizingInAction = true;

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + oldRowHeight;
      this.state.rowInfoList[this.props.rowInfoIndex].height = newheight;
      this.setState({rowHeight: newheight});
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
    if (action === IConst.editType_ButtonEditRow)
    {
      // button EDIT for one row was clicked
      const newEditing = !this.state.rowEditing;
      this.state.rowInfoList[this.props.rowInfoIndex].editing = newEditing;
      this.setState({rowEditing: newEditing});
      if (!newEditing)
      {
        // editing was stopped, thus we update the main data 
        this.props.rowUpdate(
          this.state.rowInfoList[this.props.rowInfoIndex], this.state.row);
      }
    }
    if (action === IConst.editType_ButtonEdit)
    {
      // here we open a modal dialog
      this.handleEditModalDialog(this.state.row);
    }
    else if (action === IConst.editType_ButtonSave)
    {
      // now we can save one row
      this.state.rowInfoList[this.props.rowInfoIndex].editing = false;
      this.setState({rowEditing: false});
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
      this.state.rowInfoList[this.props.rowInfoIndex].editing = false;
      this.state.rowInfoList[this.props.rowInfoIndex].state = IConst.rowStateDeleted;
      this.setState({rowEditing: false});

      // editing was stopped, thus we update the main data 
      this.props.rowUpdate(
        this.state.rowInfoList[this.props.rowInfoIndex], this.state.row);
    }
  }

  handleUndoRow()
  {
    // we undo edited and deleted rows
    this.state.rowInfoList[this.props.rowInfoIndex].editing = false;
    this.setState({rowEditing: false});
    this.props.rowUndo(
      this.state.rowInfoList[this.props.rowInfoIndex], 
      this.state.row);
  }


  render()
  {
    const {row} = this.state;
    const {rowInfoList} = this.state;

    console.log("rowInfoList", rowInfoList);
    console.log("this.props.rowInfoIndex]", this.props.rowInfoIndex);

    const rowid = row[this.props.primaryKey];


    //console.log("his.state.rowInfoList", this.state.rowInfoList);

    // main row selection 
    const isRowSelected = rowInfoList[this.props.rowInfoIndex].selected;
    
    // get row height
    const rowHeight = rowInfoList[this.props.rowInfoIndex].height;

    // to get the background color for the row depending on its state
    const rowState = rowInfoList[this.props.rowInfoIndex].state;
    const isRowDeleted = rowState === IConst.rowStateDeleted;
    const isRowInserted = rowState === IConst.rowStateInserted;
    const isRowChanged = rowState === IConst.rowStateEdited || isRowDeleted || isRowInserted;
    const rowBackgroundColor =
      isRowSelected && isRowDeleted ? IConst.rowColorSelDeleted :
      isRowSelected && isRowChanged ? IConst.rowColorSelChanged :
      isRowSelected && isRowInserted ? IConst.rowColorSelInserted :
      isRowSelected ? IConst.rowColorSelected :
      isRowDeleted ? IConst.rowColorDeleted :
      isRowChanged ? IConst.rowColorChanged :
      isRowInserted ? IConst.rowColorInserted : "#FFFFFF";

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
        const isCurrentEditing = rowInfoList[this.props.rowInfoIndex].editing;
        const editing = 
          this.props.settings.alwaysActivateEditing || 
          isCurrentEditing;
        const saving = rowInfoList[this.props.rowInfoIndex].saving;
        const visible = header.isVisible;
        const verticalAlign = IUtils.getVerticalAlign(this.props.settings.rowsVerticalAlign);
        const horizontalAlign = IUtils.getHorizontalAlign(header.horizontalAlign);

        const editHeight = this.props.settings.editComponentHeight;

        if (visible) {
          return (
            <ITableCellHeightResizer
              key={`TableRow-row${rowid}.header${headerIndex}`}
              height={rowHeight}
              setHeight={(height) => this.setState({rowHeight: height})}
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
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                settings={this.props.settings}
                header={header}
                value = {isRowSelected}
                handleSelectionClickRow={() => this.props.handleSelectionClickRow(rowid)}
              />}

              {isTextfield && 
              <IFieldText
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
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
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
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
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
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
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
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
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
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
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header={header}
                value={value}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isSpecialButton &&
              <IFieldSpecialButton
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header = {header}
                rowid={rowid}
                handleSpecialButtonClick = {() => this.props.handleSpecialButtonClick(rowid, header.dataFieldName)}
              />}

              {isStateButton &&
              <IFieldStateButton
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                header = {header}
                rowid={rowid}
                value={value}
                handleStateButtonClick={() => this.props.handleStateButtonClick(rowid, header.dataFieldName)}
              />}

              {isGetter && 
              <IFieldText
                editing={editing}
                savingInProgressAll={this.props.savingInProgressAll}
                horizontalAlign={horizontalAlign}
                verticalAlign={verticalAlign}
                editHeight={editHeight}
                singleHorizontalAlign={header.horizontalAlign}
                header={header}
                value={value}
              />}

              {isRowEditButton &&
              <IFieldRowEditButton
                editing={editing}
                saving={saving}
                savingInProgressAll={this.props.savingInProgressAll}
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


