import React from "react";
import {
    TableRow,
    IconButton,
    TextField, 
    Select, 
    MenuItem, 
    FormControl,
    Chip,
    //import Avatar from '@mui/material/Avatar';
    Avatar,

  } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
//import { de } from 'date-fns/locale'; ;
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

  
import InselConstants from './InselConstants';
import InselTableCellHeightResizer from './InselTableCellHeightResizer';
import IChipMenu from './IChipMenu';
  
class InselTableRow  extends React.Component {
  constructor(props) {
    super(props);
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
    if (oldState === InselConstants.rowStateInserted)
    {
      // new rows cannot be deleted
      alert("This is a new row. Just UNDO if you don't want it to be saved.");
      return;
    }

    const isDeleted = this.getRowState(rowid) === InselConstants.rowStateDeleted;
    if (!isDeleted)
    {
      // delete it now
      this.changeRowState(rowid, InselConstants.rowStateDeleted);
    }
  }

  handleUndoRow(e, rowid)
  {
    // button UNDO for one row was clicked
    const oldState = this.getRowState(rowid);
    const index = this.getRowIndex(rowid);
    if (index === -1) return;

    if (oldState === InselConstants.rowStateEdited)
    {

      // row was edited, thus we restore the old values
      this.state.rowInfoList[index].state = InselConstants.rowStateUnchanged;

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
    else if (oldState === InselConstants.rowStateInserted)
    {
      // row was inserted, thus we remove it from the data list
      const newlist = this.state.data.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({data: newlist});

      // also delete the info list
      const newStatelist = this.state.rowInfoList.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({rowInfoList: newStatelist});
    }
    else if (oldState === InselConstants.rowStateDeleted)
    {
      // row was deleted, thus we restore the old values
      this.state.rowInfoList[index].state = InselConstants.rowStateUnchanged;
      
      // restore the old data
      const newlist = this.state.data;
      newlist[index] = this.props.data[index];
      this.setState({data: newlist});
    }

    this.SetMainButtons();
  }

  changeRowState(rowid, newRowState)
  {
    const index = this.state.rowInfoList.findIndex(r => r.id === rowid);
    if (index === -1) return;
    this.state.rowInfoList[index].state = newRowState;
    this.SetMainButtons();
  }

  SetMainButtons()
  {
    const newlist = this.state.rowInfoList.filter(r => r.state !== InselConstants.rowStateUnchanged);
    const disable = newlist.length === 0;
    this.setState({mainButtonsDisabled: disable});

    console.log("this.state.rowInfoList", this.state.rowInfoList);
  }

  // ---------------------------------------------------------------------------------------
  // row procedures / functions

  getRowState(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return InselConstants.rowStateUnchanged;
    return this.state.rowInfoList[index].state;
  }

  getRowHeight(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return this.props.settings.initialRowHeight;
    return this.state.rowInfoList[index].height;
  }

  getRowSelection(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return false;
    return this.state.rowInfoList[index].selected;
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
      InselConstants.imgChkboxChecked : 
      InselConstants.imgChkboxUnchecked;
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

  setRowState(rowid, state)
  {
    // set a new row state
    // if the old state is INSERTED, then we dont change it to edited
    const oldState = this.getRowState(rowid);
    if (oldState === InselConstants.rowStateInserted) return;

    // set a new row state
    const index = this.getRowIndex(rowid);
    const newlist = this.state.rowInfoList;
    newlist[index].state = state;
    this.setState({rowInfoList: newlist});

    // update main buttons
    this.SetMainButtons();
  }  

  getHasError(header, value)
  {
    if (!header.isEditable) return false;

    // check new values in text fields
    const isText = (
      header.editType === InselConstants.editType_Textfield ||
      header.editType === InselConstants.editType_TextfieldMultiline
    );
    if (isText)
    {
      if (header.required && (value === "" || value === null)) return true;
      if (value.length > header.textMaxLength) return true;
      return false;
    }

    // check new values in number fields
    const isInteger = header.editType === InselConstants.editType_Integer;
    const isDecimal = header.editType === InselConstants.editType_Decimal;
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
  
  handleTextfieldChange(e, rowid, fieldName)
  {
    // change the data when a field was edited
    const index = this.getRowIndex(rowid);
    const newList = this.state.data;
    newList[index][fieldName] = e.target.value;
    this.setState({data: newList});

    // now we also change the state of the row
    const rowState = this.getRowState(rowid);
    if (rowState === InselConstants.rowStateUnchanged) 
      this.setRowState(rowid, InselConstants.rowStateEdited);
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
    if (rowState === InselConstants.rowStateUnchanged) 
      this.setRowState(rowid, InselConstants.rowStateEdited);
  }

  handleDropdownChange(e, rowIndex, fieldName)
  {
    // change the data when a field was edited
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === InselConstants.rowStateUnchanged) 
      this.setRowState(rowIndex, InselConstants.rowStateEdited);
  }

  handleCheckboxChange(e, rowIndex, fieldName)
  {
    // change the data when a field was edited
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === InselConstants.rowStateUnchanged) 
      this.setRowState(rowIndex, InselConstants.rowStateEdited);
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
    if (rowState === InselConstants.rowStateUnchanged) 
      this.setRowState(rowIndex, InselConstants.rowStateEdited);
  }

  handleChipChange(chipid, rowid, fieldname)
  {
    alert("chip clicked : " + chipid);
    this.props.handleChipChange(chipid, rowid, fieldname);
  }

  render()
  {
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

    } = this.props;
    
    // state
    this.state = {
      classes: classes,
      settings: settings,
      headers: headers,
      oldRow: oldRow,
      row: row,
      rowIndex: rowIndex,
      data: data,
      rowInfoList: rowInfoList,
      mainButtonsDisabled: mainButtonsDisabled,
    }

    // unique identifier for the rows
    const rowid = this.state.row[this.props.primaryKey];

    //console.log("this.props.primaryKey", this.props.primaryKey);

    // main row selection 
    const isRowSelected = this.getRowSelection(rowid);
    
    // to get the background color for the row depending on its state
    const rowState = this.getRowState(rowid);
    const isRowDeleted = rowState === InselConstants.rowStateDeleted;
    const isRowInserted = rowState === InselConstants.rowStateInserted;
    const isRowChanged = rowState === InselConstants.rowStateEdited || isRowDeleted || isRowInserted;

    const iconSource = this.getIconSource(rowid);
    const rowHeight = this.getRowHeight(rowid);
    const reszBgColor = this.props.settings.resizerNSBackgroundColor;

    const rowBackgroundColor =
      isRowSelected && isRowDeleted ? InselConstants.rowColorSelDeleted :
      isRowSelected && isRowChanged ? InselConstants.rowColorSelChanged :
      isRowSelected && isRowInserted ? InselConstants.rowColorSelInserted :
      isRowSelected ? InselConstants.rowColorSelected :
      isRowDeleted ? InselConstants.rowColorDeleted :
      isRowChanged ? InselConstants.rowColorChanged :
      isRowInserted ? InselConstants.rowColorInserted : "#FFFFFF";

    return (


      <TableRow
        // TODO include classes ?
        // className={this.state.classes.table_row}
        height={rowHeight}
        style={{
          height: rowHeight,
          backgroundColor: rowBackgroundColor,
        }}
        key={`table-row-${this.state.rowindex}-${rowid}`} 
      >
      {this.state.headers.map((header, colindex) => {

        // edit types
        const isPrimaryKey = header.editType === InselConstants.editType_PrimaryKey;
        const isSelectionIcon = header.editType === InselConstants.editType_SelectionIcon;
        const isNoEdit = header.editType === InselConstants.editType_NoEdit;
        const isTextfield = header.editType === InselConstants.editType_Textfield;
        const isTextfieldMultiline = header.editType === InselConstants.editType_TextfieldMultiline;
        const isInteger = header.editType === InselConstants.editType_Integer;
        const isDecimal = header.editType === InselConstants.editType_Decimal;
        const isDropdown = header.editType === InselConstants.editType_Dropdown;
        const isCheckbox = header.editType === InselConstants.editType_Checkbox;
        const isDate = header.editType === InselConstants.editType_Date;
        const isChip = header.editType === InselConstants.editType_Chip;
        // buttons on row
        const isButtonEdit = header.editType === InselConstants.editType_ButtonEdit;
        const isButtonSave = header.editType === InselConstants.editType_ButtonSave;
        const isButtonUndo = header.editType === InselConstants.editType_ButtonUndo;
        const isButtonDelete = header.editType === InselConstants.editType_ButtonDelete;
        const btnHoverWidth = this.props.settings.buttonSizeOnRows + 8; 
        const dropdownWidth = header.width - 10;

        // checking about typos
        const typeFound = (
          isPrimaryKey || isSelectionIcon || isNoEdit || 
          isTextfield || isTextfieldMultiline ||
          isInteger || isDecimal || isDropdown ||
          isButtonEdit || isButtonSave || isButtonUndo || isButtonDelete ||
          isCheckbox || isDate || isChip
        );

        // get the value of the field
        let tmp = row[header.dataFieldName];
        if (isDecimal) tmp = tmp.toFixed(header.decimalCount);
        if (isPrimaryKey) tmp = row[this.props.primaryKey];
        const value = tmp;

        // chip
        /*
        let chipItem = null;
        if (isChip) 
        {
          let chipIndex = header.chipList.findIndex(c => c.id === value);


          /*
          if (rowid === 5)
          {
          console.log("chip rowid", rowid);
          console.log("chip header.chipList", header.chipList);
          }
          */
/*

          if (chipIndex === -1) chipIndex = header.chipList.findIndex(c => c.default);
          chipItem = (chipIndex === -1) ? header.chipList[0] : header.chipList[chipIndex];
        }
        const chipLabel = (chipItem) ? chipItem.label : "";
        const chipColor = (chipItem) ? chipItem.color : null;
        const chipIcon = (chipItem) ? chipItem.icon : null;
        const chipClickable = header.isEditable;
        const chipWidth = (chipItem) ? header.chipWidth : 0;
        const chipIconWidth = (chipItem) ? header.chipIconWidth : 0;

        if (isChip)
          {
            //console.log("chip value", value);
            //console.log("chipLabel", chipLabel);
            //console.log("chipColor", chipColor);
          }
*/

        const field = header.dataFieldName;

        // choose teh icon of the selection checkbox
        const iconCheckbox = isCheckbox ? value ? 
          InselConstants.imgChkboxChecked : 
          InselConstants.imgChkboxUnchecked :  null;

        // check data (if error show an helper text)f
        const hasError = this.getHasError(header, value);
        const helperText = hasError ? header.helperText : "";
        const color = hasError ? 'red' : 'black';
        const background = hasError ? '#FFDDDD' : 'transparent';


        /*
          <Chip 
          label={chipLabel}
          //icon={chipIcon}
          avatar={<Avatar alt="" src={chipIcon} />}
          clickable={chipClickable}
          onClick={e => this.handleChipClick(e, rowid, colindex)}
          style={{
            minWidth: chipWidth,
            margin: '0px auto',
          }}
          sx={{
            backgroundColor: chipColor, 
            color: 'black', 
            width: chipIconWidth, 
            height: chipIconWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          />

        */

        return (
          <InselTableCellHeightResizer
            className={this.state.classes.table_check_cell}
            height={rowHeight}
            setHeight={(height) => this.setState({rowHeight: height})}
            handleMouseDownRowNS={(e)=>this.props.handleMouseDownRowNS(e, rowid)}
            resizerBackgroundColor={reszBgColor}
          >

          {isSelectionIcon &&
            <IconButton
              onClick={e => this.props.handleSelectionClickRow(rowid)}
              style={{ width: header.width, height: header.width }} >
              <img 
              src={iconSource}
              style={{ width: header.width, height: header.width }} 
            />
            </IconButton>
          }

          {isPrimaryKey && 
            <TextField
              value={value}
              disabled
              fullWidth
              style={{ 
                  textAlign: header.horizontalAlign, }}
            ></TextField>
          }

          {isTextfield && 
            <TextField
              value={value}
              fullWidth
              helperText={helperText} 
              style={{ 
                  textAlign: header.horizontalAlign, 
              }}
              // TODO inputProps depreceated
              inputProps={{
                  sx: {
                  color: {color},
                  backgroundColor: {background}
                  },
              }}
              onChange={e => this.props.handleTextfieldChange(e, rowid, field)}
            ></TextField>
          }

          {isTextfieldMultiline && 
            <TextField 
              multiline
              value={value}
              helperText={helperText} 
              fullWidth
              style={{ 
                  textAlign: header.horizontalAlign, 
              }}
              //InputProps={{ height: '300px' }}
              inputProps={{
                  style: { height: rowHeight },
                  sx: {
                  color: {color},
                  backgroundColor: {background}
                  },
              }}
              onChange={e => this.handleTextfieldChange(e, rowid, field)}
            >
            </TextField>
          }

          {isInteger && 
            <TextField
              value={value}
              helperText={helperText} 
              fullWidth
              inputProps={{
                  sx: {
                  backgroundColor: {background},
                  color: {color},
                  textAlign: header.horizontalAlign,
                  "&::placeholder": {
                      textAlign: header.horizontalAlign,
                  },
                  },
              }}
              onChange={e => this.handleTextfieldNumberChange(e, rowid, field)}
            >
            </TextField>
          }

          {isDecimal && 
            <TextField
              value={value}
              helperText={helperText} 
              fullWidth
              inputProps={{
                  sx: {
                  color: {color},
                  textAlign: header.horizontalAlign,
                  "&::placeholder": {
                      textAlign: header.horizontalAlign,
                  },
                  },
              }}                            
              onChange={e => this.handleTextfieldNumberChange(e, rowid, field)}
            >
            </TextField>
          }

          {isDropdown && 
            <FormControl
              style={{ width: dropdownWidth, }}
            >
            <Select
              value={value}
              onChange={e => this.handleDropdownChange(e, rowid, colindex)}
            >
            {header.dropdownSelection.map((item, itemIndex) =>
            {
              const ddId = header.dropdownSelection[itemIndex].id;
              const ddValue = header.dropdownSelection[itemIndex].value;
              return (
              <MenuItem 
                  value={ddId}
                  >{ddValue}</MenuItem>
              );
            })}
            </Select> 
            </FormControl>
          }

          {isCheckbox &&
            <IconButton
              onClick={e => this.handleCheckboxChange(e, rowid, colindex)}
              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
              <img 
              src={iconCheckbox}
              style={{ 
                width: this.props.settings.buttonSizeOnRows, 
                height: this.props.settings.buttonSizeOnRows 
              }} 
            />
            </IconButton>
          }

          {isDate &&
            <LocalizationProvider dateAdapter={AdapterLuxon} locale={'de'}>
            <DatePicker 
              label={header.headerTitle}
              //onChange={e => this.handleDatePickerChange(e, rowid, row)}
            /></LocalizationProvider>                        
          }

          {isChip &&
          <IChipMenu
            header={header}
            value={value}
            handleChipChange={(chipid) => this.props.handleChipChange(chipid, rowid, field)}
          />
          }

          {isButtonEdit &&
            <IconButton
              disabled={isRowDeleted}
              onClick={e => this.handleEditModalDialogClick(e, rowid, row)}
                  style={{ width: btnHoverWidth, height: btnHoverWidth }} >
              <img 
              src={InselConstants.imgEditButton}
              title="Edit this in the dialog"
              style={{ 
                  width: header.width, height: header.width,
                  opacity: (!isRowDeleted ? 1 : 0.2) }} 
              />
            </IconButton>
          }

          {isButtonSave &&
            <IconButton
              disabled={!isRowChanged}
              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
              <img 
              src={InselConstants.imgSaveButton}
              title="Save this row by clicking here"
              style={{ 
                  width: header.width, height: header.width,
                  opacity: (isRowChanged ? 1 : 0.2) 
              }} 
              />
            </IconButton>
          }

          {isButtonUndo &&
            <IconButton
              disabled={!isRowChanged}
              onClick={e => this.handleUndoRow(e, rowid)}
              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
              <img 
                  src={InselConstants.imgUndoButton}
                  title="Undo this row by clicking here"
                  style={{ 
                  width: header.width, height: header.width,
                  opacity: (isRowChanged ? 1 : 0.2) 
                  }} 
              />
            </IconButton>
          }

          {isButtonDelete &&
            <IconButton
              disabled={isRowDeleted}
              onClick={e => this.handleDeleteRow(e, rowid)}
              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
              <img 
              src={InselConstants.imgDeleteButton}
              title="Delete this row by clicking here"
              style={{ 
                width: header.width, height: header.width,
                opacity: (!isRowDeleted ? 1 : 0.2)
              }} 
            />
            </IconButton>
          }

          {!typeFound && <span>TYPE ERROR</span>}
          </InselTableCellHeightResizer>
        );
      })}
      </TableRow>    
    );
  }
}

export default InselTableRow;

