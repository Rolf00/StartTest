import React from "react";
import {
    TableRow,
    IconButton,
    TextField, 
    Select, 
    MenuItem, 
    FormControl, 
  } from '@mui/material';

  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  //import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
  //import { de } from 'date-fns/locale'; ;
    
import InselConstants from './InselConstants';
import InselTableCellHeightResizer from './InselTableCellHeightResizer';
  
class InselTableRow  extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }
    
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }
  
  // functions
  getIconSource(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return null;
    const selected = this.state.rowInfoList[index].selected;
    return selected ? 
      InselConstants.imgChkboxChecked : 
      InselConstants.imgChkboxUnchecked;
  }

  render()
  {

    // props
    const {
      classes,
      settings,
      headers,
      row,
    } = this.props;
    
    // state
    this.state = {
      classes: classes,
      settings: settings,
      headers: headers,
      row: row,
      mainChecked: false,
      mainIndeterminated: false,
      mainCheckIcon: InselConstants.imgChkboxUnchecked,
      headerWidthList: this.setHeaderWidthList(),
    }
    
    // unique identifier for the rows
    const rowid = row[this.props.primaryKey];

    // main row selection 
    const isRowSelected = this.getRowSelection(row.id);

    // to get the background color for the row depending on its state
    const rowState = this.getRowState(rowid);
    const isRowDeleted = rowState === InselConstants.rowStateDeleted;
    const isRowInserted = rowState === InselConstants.rowStateInserted;
    const isRowChanged = rowState === InselConstants.rowStateEdited || isRowDeleted || isRowInserted;

    const iconSource = this.getIconSource(row.id);
    const rowHeight = this.getRowHeight(rowid);
    const reszBgColor = this.props.settings.resizerNWBackgroundColor;

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
      key={`table-row-${rowindex}-${id}`} 
    >
    {this.state.headers.map((header, colindex) => {

      // TODO AT HOME use InselConstants
      const isPrimaryKey = header.editType === 'primaryKey';
      //const isSelection = header.editType === 'selection';
      const isSelectionIcon = header.editType === 'selectionIcon';
      const isNoEdit = header.editType === 'none';
      const isTextfield = header.editType === 'textfield';
      //const isTextarea = header.editType === 'textarea';
      const isTextfieldMultiline = header.editType === 'textfieldmultiline';
      const isInteger = header.editType === 'integer';
      const isDecimal = header.editType === 'decimal';
      const isDropdown = header.editType === 'dropdown';
      const isCheckbox = header.editType === 'checkbox';
      const isDate = header.editType === InselConstants.editType_Date;
      const isChip = header.editType === InselConstants.editType_Chip;

      const isButtonEdit = header.editType === 'btnEdit';
      const isButtonSave = header.editType === 'btnSave';
      const isButtonUndo = header.editType === 'btnUndo';
      const isButtonDelete = header.editType === 'btnDelete';
      const btnHoverWidth = this.props.settings.buttonSizeOnRows + 8; 
      const dropdownWidth = header.width - 10;
      //const decimalCnt = 

      const typeFound = (
        isPrimaryKey || isSelectionIcon || isNoEdit || 
        isTextfield || isTextfieldMultiline ||
        isInteger || isDecimal || isDropdown ||
        isButtonEdit || isButtonSave || isButtonUndo || isButtonDelete ||
        isCheckbox
      );

      let tmp = row[header.dataFieldName];
      if (isDecimal) tmp = tmp.toFixed(header.decimalCount);
      if (isPrimaryKey) tmp = row[this.props.primaryKey];
      const value = tmp;

      const field = header.dataFieldName;

      const iconCheckbox = isCheckbox ? 
      value ? InselConstants.imgChkboxChecked : InselConstants.imgChkboxUnchecked :  null;

      const hasError = this.getHasError(header, value);
      const helperText = hasError ? header.helperText : "";
      const color = hasError ? 'red' : 'black';
      const background = hasError ? '#FFDDDD' : 'transparent';


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
            onClick={e => this.handleSelectionClickRow(e, rowid)}
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
            onChange={e => this.handleTextfieldChange(e, rowid, field)}
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
            onChange={e => this.handleDatePickerChange(e, rowid, row)}
          /></LocalizationProvider>                        
        }

        {isChip &&
          <DateTimePicker
            onClick={e => this.handleChipChange(e, rowid, colindex)}
            style={{ width: btnHoverWidth, height: btnHoverWidth }} >
          </DateTimePicker>
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

