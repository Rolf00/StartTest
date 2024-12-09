import React from "react";
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
      classes,
      settings,
      headers,
      oldRow,
      row,
      rowIndex,
      primaryKey,
      data,
      rowInfoList,
      mainButtonsDisabled,
      handleDataChange,

    } = this.props;
    
    // state
    this.state = {
      headers: headers,
      oldRow: oldRow,
      row: row,
      rowIndex: rowIndex,
      data: data,
      rowInfoList: rowInfoList,
      mainButtonsDisabled: mainButtonsDisabled,
    }

  }

  componentDidMount() {
  }
    
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }

  // ---------------------------------------------------------------------------------------
  // button clicks for rows

  getRowIndex(rowid)
  {
    // get the index of the row 
    const index = this.state.rowInfoList.findIndex(r => r[this.props.primaryKey] === rowid);
    if (index === -1) alert("ERROR getRowIndex: index = -1");
    return index;
  }

  handleDeleteRow(e, rowid)
  {
    // button DELETE for one row was clicked
    const oldState = this.getRowState(rowid);
    if (oldState === IConst.rowStateInserted)
    {
      // new rows cannot be deleted
      alert("This is a new row. Just UNDO if you don't want it to be saved.");
      return;
    }

    const isDeleted = this.getRowState(rowid) === IConst.rowStateDeleted;
    if (!isDeleted)
    {
      // delete it now
      this.changeRowState(rowid, IConst.rowStateDeleted);
    }
  }

  /*
  handleUndoRow(e, rowid)
  {
    // button UNDO for one row was clicked
    const oldState = this.getRowState(rowid);
    const index = this.getRowIndex(rowid);
    if (index === -1) return;

    if (oldState === IConst.rowStateEdited)
    {

      // row was edited, thus we restore the old values
      this.state.rowInfoList[index].state = IConst.rowStateUnchanged;

      // restore the old data
      //const oldRow = this.props.  ccc  data[index];
      const newlist = this.state.data;
      const keys = Object.keys(this.props.oldRow);

      //console.log("handleUndoRow start this.props.oldRow)", this.props.oldRow); 


      for (let f = 0; f < keys.length; f++)
      {
        const field = keys[f];
        newlist[index][field] = this.props.oldRow[field];
      }
      //console.log("handleUndoRow end props", this.props.data);      
      //console.log("handleUndoRow new data", newlist);      
      this.setState({data: newlist});
    }
    else if (oldState === IConst.rowStateInserted)
    {
      // row was inserted, thus we remove it from the data list
      const newlist = this.state.data.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({data: newlist});

      // also delete the info list
      const newStatelist = this.state.rowInfoList.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({rowInfoList: newStatelist});
    }
    else if (oldState === IConst.rowStateDeleted)
    {
      // row was deleted, thus we restore the old values
      this.state.rowInfoList[index].state = IConst.rowStateUnchanged;
      
      // restore the old data
      const newlist = this.state.data;
      newlist[index] = this.props.data[index];
      this.setState({data: newlist});
    }

    this.SetMainButtons();
  }
    */


  // ---------------------------------------------------------------------------------------
  // row procedures / functions

  getRowState(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return IConst.rowStateUnchanged;
    return this.props.rowInfoList[index].state;
  }

  getRowHeight(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return this.props.settings.initialRowHeight;
    return this.props.rowInfoList[index].height;
  }

  getRowSelection(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return false;
    return this.props.rowInfoList[index].selected;
  }
  
  // ---------------------------------------------------------------------------------------
  // row selection procedures / functions

  // delete handleCheckboxClickHeader

  getIconSource(rowid)
  {
    // get the icon for the selection column
    const index = this.getRowIndex(rowid);
    if (index === -1) return null;
    const selected = this.state.rowInfoList[index].selected;
    return selected ? 
      IConst.imgChkboxChecked : 
      IConst.imgChkboxUnchecked;
  }

  /*
  handleSelectionClickRow(e, rowid)
  {
    // row selector was clicked
    const rowIndex = this.getRowIndex(rowid);
    let newlist = [...this.state.rowInfoList];
    let oldSelected = newlist[rowIndex].selected;
    oldSelected = !oldSelected;
    newlist[rowIndex].selected = oldSelected;

    // now we check, if all rows are selected or unselected
    let selectionOfAllRowsAreTheSame = true;
    newlist.forEach((row) => {
      if (row.selected !== oldSelected)
      {
        selectionOfAllRowsAreTheSame = false;
      }
    });

    if (selectionOfAllRowsAreTheSame)
    {
      this.setState({mainIndeterminated: false});
      if (oldSelected)
      {
        // all rows are selected
        this.setState({mainChecked: true});
      }
      else
      {
        // no row is selected
        this.setState({mainChecked: false});
      }
    }
    else
    {
      // different states exists
      this.setState({mainIndeterminated: true});
    }

    // now update the main list
    this.setState({rowInfoList: newlist});
  }
    */
  
  // ---------------------------------------------------------------------------------------
  // cell editing procedures and functions

  /*
  setRowState(rowid, state)
  {
    // set a new row state
    // if the old state is INSERTED, then we dont change it to edited
    const oldState = this.getRowState(rowid);
    if (oldState === IConst.rowStateInserted) return;

    // set a new row state
    const index = this.getRowIndex(rowid);
    const newlist = this.state.rowInfoList;
    newlist[index].state = state;
    this.setState({rowInfoList: newlist});

    // update main buttons
    this.SetMainButtons();
  } 
    */ 

  /*
  getHasError(header, value)
  {
    if (!header.isEditable) return false;

    // check new values in text fields
    const isText = (
      header.editType === IConst.editType_Textfield ||
      header.editType === IConst.editType_TextfieldMultiline
    );
    if (isText)
    {
      if (header.required && (value === "" || value === null)) return true;
      if (value.length > header.textMaxLength) return true;
      return false;
    }

    // check new values in number fields
    const isInteger = header.editType === IConst.editType_Integer;
    const isDecimal = header.editType === IConst.editType_Decimal;
    if (isInteger || isDecimal)
    {
      if (header.required && (value === null)) return true;
      const actValue = isInteger ? parseInt(value) : parseFloat(value);
      if (actValue > header.numberMaxValue || 
          actValue < header.numberMinValue) return true;
      // no errors found 
      return false;
    }

    // no checks were done => no errors
    return false;
  }
    */
  
  /*
  handleTextfieldChange(e, rowid, fieldName)
  {
    // change the data when a field was edited
    const index = this.getRowIndex(rowid);
    const newList = this.state.data;
    newList[index][fieldName] = e.target.value;
    this.setState({data: newList});

    // now we also change the state of the row
    const rowState = this.getRowState(rowid);
    if (rowState === IConst.rowStateUnchanged) 
      this.setRowState(rowid, IConst.rowStateEdited);
  }

  handleTextfieldNumberChange(e, rowid, fieldName)
  {
    // change we the data when a field was edited
    const index = this.getRowIndex(rowid);
    const newList = this.state.data;

    // TODO parseFloat
    // TODO isInteger
    const isInteger = true;
    if (isInteger)
    {
      // field is integer
      const number = parseInt(e.target.value);
      newList[index][fieldName] = number;
      this.setState({data: newList});
    }
    else
    {
      // TODO parseFloat
      // field is decimal 
    }

    // now also change the state of the row
    const rowState = this.getRowState(rowid);
    if (rowState === IConst.rowStateUnchanged) 
      this.setRowState(rowid, IConst.rowStateEdited);
  }

  handleDropdownChange(e, rowIndex, fieldName)
  {
    // change the data when a field was edited
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === IConst.rowStateUnchanged) 
      this.setRowState(rowIndex, IConst.rowStateEdited);
  }

  handleCheckboxChange(e, rowIndex, fieldName)
  {
    // change the data when a field was edited
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === IConst.rowStateUnchanged) 
      this.setRowState(rowIndex, IConst.rowStateEdited);
  }


  handleDatePickerChange(e, rowIndex, fieldName)
  {
    // change the data when a field was edited
    // TODO doesnt work:
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.date;
    this.setState({data: newList});

    //alert("handleDatePickerChange" +  e.target.date);

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === IConst.rowStateUnchanged) 
      this.setRowState(rowIndex, IConst.rowStateEdited);
  }

  handleChipChange(chipid, rowid, fieldname)
  {
    alert("chip clicked : " + chipid);
    this.props.handleChipChange(chipid, rowid, fieldname);
  }
    */

  /*
  getRowState(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return IConst.rowStateUnchanged;
    return this.props.rowInfoList[index].state;
  }
    */

  render()
  {

    // unique identifier for the rows
    const rowid = this.state.row[this.props.primaryKey];

    // main row selection 
    const isRowSelected = this.getRowSelection(rowid);
    
    // to get the background color for the row depending on its state
    const rowState = this.getRowState(rowid);
    const isRowDeleted = rowState === IConst.rowStateDeleted;
    const isRowInserted = rowState === IConst.rowStateInserted;
    const isRowChanged = rowState === IConst.rowStateEdited || isRowDeleted || isRowInserted;

    const rowHeight = this.getRowHeight(rowid);
    const reszBgColor = this.props.settings.resizerNSBackgroundColor;

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
        key={`table-row-${this.state.rowindex}-${rowid}`} 
      >
      {this.state.headers.map((header, colindex) => {

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
        const isSpecialButton = header.editType === IConst.editType_IconButton;
        const isRowEditButton = 
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

        // check data (if error show an helper text)
        /*
        const hasError = this.getHasError(header, value);
        const helperText = hasError ? header.helperText : "";
        // TODO colors in stettings
        const color = hasError ? 'red' : 'black';
        const background = hasError ? '#FFDDDD' : 'transparent';
        */

        return (
          <ITableCellHeightResizer
            height={rowHeight}
            setHeight={(height) => this.setState({rowHeight: height})}
            handleMouseDownRowNS={(e)=>this.props.handleMouseDownRowNS(e, rowid)}
            resizerBackgroundColor={reszBgColor}
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
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isNumber &&
            <IFieldNumber
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isDropdown &&
            <IFieldDropDown
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isCheckbox &&
            <IFieldCheckbox
              value={value}
              settings={this.props.settings}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isDate &&
            <IFieldDate
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isChip &&
            <IFieldChipMenu
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isSpecialButton &&
            <IFieldSpecialButton
              header = {header}
              onClick = {e => this.props.rowSpecialButtonClick(e, header.editType)}
            />}

            {isRowEditButton &&
            <IFieldRowEditButton
              settings = {this.props.settings}
              header = {header}
              handleRowEditButtonClick = {e => this.props.handleRowEditButtonClick(e, header.editType)}
            />}

            {!typeFound && <span>TYPE ERROR</span>}  

          </ITableCellHeightResizer>
        );
      })}
      </TableRow>    
    );
  }
}

ITableRow.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableRow, useStyles);


