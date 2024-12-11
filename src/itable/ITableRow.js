import React from 'react';
import { TableRow, } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import PropTypes, { func } from 'prop-types';
  
import IConst from './IConst';
import ITableCellHeightResizer from './ITableCellHeightResizer';
import IFieldSelection from './IFieldSelection';
import IFieldText from './IFieldText';
import IFieldNumber from './IFieldNumber';
import IFieldDropDown from './IFieldDropDown';
import IFieldChipMenu from './IFieldChipMenu';
import IFieldCheckbox from './IFieldCheckbox';
import IFieldDate from './IFieldDate';
import IFieldSpecialButton from './IFieldSpecialButton';
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
      rowIndex,
      oldRow,
      row
    } = this.props;

    // state
    this.state = { 
      rowEditing: false,
      rowHeight: rowInfoList[rowIndex].height,
      row: row 
    };
  }

  componentDidMount() {
  }
    
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }

  handleDataChange(value, field)
  {
    // change the row values and update row color and main buttons
    const newRow = this.state.row;
    newRow[field] = value;
    this.setNewRowState_Edit()
    this.setState({row: newRow});
    // update main buttons SAVE and UNDO in ITable
    this.props.setMainButtonState();
  }

  setNewRowState_Edit()
  {
    // set the row state
    const oldState = this.props.rowInfoList[this.props.rowIndex].state;
    if (oldState === IConst.rowStateUnchanged)
      this.props.rowInfoList[this.props.rowIndex].state = IConst.rowStateEdited;
  }

  handleMouseDownRowNS(e)
  {
    // resizing row height
    let mouseStart = e.clientY;
    let oldRowHeight = this.props.rowInfoList[this.props.rowIndex].height;
    const element = e.target;
    element.style.backgroundColor = IConst.colorResizerBackground;

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + oldRowHeight;
      this.props.rowInfoList[this.props.rowIndex].height = newheight;
      this.setState({rowHeight: newheight});
    }

    const onMouseUpRowNS = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowNS);
      document.removeEventListener('mouseup', onMouseUpRowNS);
      document.body.style.userSelect = "auto";  
      element.style.backgroundColor = 'transparent';
    };    

    document.addEventListener('mousemove', onMouseMoveRowNS);
    document.addEventListener('mouseup', onMouseUpRowNS);  
    document.body.style.userSelect = "none";  
  }

  handleEditModalDialog()
  {
    // TODO modal dialog
    alert("Edit in a dialog is not implemented yet.")
  }

  handleRowEditButtonClick(action)
  {
    if (action === IConst.editType_ButtonEditRow)
    {
      // button EDIT for one row was clicked
      const newEditing = !this.state.rowEditing;
      this.setState({rowEditing: newEditing})
    }
    if (action === IConst.editType_ButtonEdit)
    {
      // here we open a modal dialog
      this.handleEditModalDialog(this.state.row);
    }
    else if (action === IConst.editType_ButtonSave)
    {
      // button SAVE for one row was clicked
      alert("SAVE one row to the DB is not implemented yet.")
    }
    else if (action === IConst.editType_ButtonUndo)
    {
      // button UNDO for one row was clicked
      this.handleUndoRow();
    }
    else if (action === IConst.editType_ButtonDelete)
    {
      // button DELETE for one row was clicked
      this.handleDeleteRow();
    }
  }

  restoreOldData()
  {
    // restore the old data
    const oldRow = this.props.oldRow;
    let newRow = this.state.row;
    const keys = Object.keys(oldRow);
    for (let f = 0; f < keys.length; f++)
    {
      const field = keys[f];
      newRow[field] = oldRow[field];
    }


    this.setState({row: newRow});

    // update main buttons SAVE and UNDO in ITable
    this.props.setMainButtonState();
  }

  handleUndoRow()
  {
    // button UNDO for one row was clicked
    const oldState = this.props.rowInfoList[this.props.rowIndex].state;

    if (oldState === IConst.rowStateEdited)
    {
      // row was edited, thus we restore the old values
      this.props.rowInfoList[this.props.rowIndex].state = IConst.rowStateUnchanged;
      // restore the old data
      this.restoreOldData();
    }
    else if (oldState === IConst.rowStateInserted)
    {
      // row was inserted, thus we remove it from the data list
      this.props.handleUndoInsertedRows(this.props.rowIndex);
    }
    else if (oldState === IConst.rowStateDeleted)
    {
      // row was deleted, thus we restore the old values
      this.props.rowInfoList[this.props.rowIndex].state = IConst.rowStateUnchanged;
      // restore the old data
      this.restoreOldData();
    }
  }

  handleDeleteRow()
  { 
    // mark a row as deleted
    this.props.rowInfoList[this.props.rowIndex].state = IConst.rowStateDeleted;
    // update main buttons SAVE and UNDO in ITable
    this.props.setMainButtonState();
  }

  render()
  {
  
    const rowid = this.props.rowId;

    // main row selection 
    const isRowSelected = this.props.rowInfoList[this.props.rowIndex].selected;
    
    // get row height
    const rowHeight = this.props.rowInfoList[this.props.rowIndex].height;

    // to get the background color for the row depending on its state
    const rowState = this.props.rowInfoList[this.props.rowIndex].state;
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
        key={`table-row-${this.props.rowIndex}-${rowid}`} 
      >
      {this.props.headers.map((header, headerIndex) => {

        // edit types
        const isSelectionIcon = header.editType === IConst.editType_SelectionIcon;
        const isTextfield =
          header.editType === IConst.editType_PrimaryKey ||
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
        const isRowEditButton = 
          header.editType === IConst.editType_ButtonEditRow ||
          header.editType === IConst.editType_ButtonEdit ||
          header.editType === IConst.editType_ButtonSave ||
          header.editType === IConst.editType_ButtonUndo ||
          header.editType === IConst.editType_ButtonDelete;

        // TODO :
        const btnHoverWidth = this.props.settings.buttonSizeOnRows + 8; 

        // checking about typos
        const typeFound = (
          isSelectionIcon || isTextfield || isNumber || isDropdown || 
          isCheckbox || isDate || isChip || isSpecialButton || isRowEditButton
        );

        // get fieldname and the value of the field
        const field = header.dataFieldName;
        let tmp = this.state.row[header.dataFieldName];
        // TODO decimals 
        //if (isDecimal) tmp = tmp.toFixed(header.decimalCount);
        const value = tmp;

        // enable / disbable the editing of one row
        // if "this.props.settings.alwaysActivateEditing" is TRUE, editing is always enabled
        const editing = this.props.settings.alwaysActivateEditing || this.state.rowEditing;
        
        // only show this column when it's defined as visible
        const visible = header.isVisible;
        
        if (visible) {
          return (
            <ITableCellHeightResizer
              height={rowHeight}
              setHeight={(height) => this.setState({rowHeight: height})}
              handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e)}
            >

              {isSelectionIcon &&
              <IFieldSelection
                settings={this.props.settings}
                header={header}
                value = {value}
                handleSelectionClickRow={e => this.handleSelectionClickRow(e, rowid)}
              />}

              {isTextfield && 
              <IFieldText
                editing={editing}
                value={value}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isNumber &&
              <IFieldNumber
                editing={editing}
                value={value}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isDropdown &&
              <IFieldDropDown
                editing={editing}
                value={value}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isCheckbox &&
              <IFieldCheckbox
                editing={editing}
                value={value}
                settings={this.props.settings}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isDate &&
              <IFieldDate
                editing={editing}
                value={value}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isChip &&
              <IFieldChipMenu
                editing={editing}
                value={value}
                header={header}
                rowid={rowid}
                handleDataChange= {e => this.handleDataChange(e, field)}
              />}

              {isSpecialButton &&
              <IFieldSpecialButton
                header = {header}
                handleSpecialButtonClick = {() => this.props.handleSpecialButtonClick(rowid, header.dataFieldName)}
              />}

              {isRowEditButton &&
              <IFieldRowEditButton
                editing={editing}
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


