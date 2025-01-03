import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from 'tss-react/mui';
import 'react-resizable/css/styles.css';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Grid,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';


import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';

import { useStyles } from './styles';
import IConst from './IConst';
import IUtils from './IUtils';
import { getSortRows } from './IUtilsSort';
import { getSortFunc } from './IUtilsSort';
import ITableHeader from './ITableHeader';
import ITableRow from './ITableRow'; 

import IDialogButton from './IDialogButton';
import IDialogSorting from './IDialogSorting';
import IDialogData_First from './IDialogData_First';


const availableDialogs = {
  IDialogData_First: IDialogData_First,
  // here more dialogs can be listed, 
  // depending on the dataset what should be edited. 
  //dialog1: ComponentB,
};

class ITable extends React.Component {
  constructor(props) {
    super(props);

    const {
      classes,
      settings, 
      headers, 
      primaryKey,
      data,
      dialogName } = this.props;
  
    this.state = {
      headers: headers,
      data: this.getDataList(),
      sortings: this.getSortingList(),
      page: 0,
      limit: 10,

      // selection in header
      mainChecked: false,
      mainIndeterminated: false,

      // props for button dialog
      buttonDialogId: "",
      buttonDialogOpen: false,
      buttonDialogTitle: "",
      buttonDialogQuestion: "",
      buttonDialogButtons: [],
      buttonDialogListType: 0,
      buttonDialogIconType: 0,
      buttonDialogHorizontalAlign: '',
      buttonDialogSizeType: 0,
      buttonDialogWidth: 120,
  
      // props for edit dialog
      openDataModalDialog: false,
      selectedRow: null,
      isHoveredOrResizing: false,

      // enabling / disabling buttons SAVE ALL and UNDO ALL
      mainButtonsDisabled: true,
      countChangedRows: 0,
      savingInProgressOneRow: false,
      savingInProgressAll: false,

      rowHeight: 200,
      colwidth: 120,
      headerHeight: 35,
      minRowHeight: 29,

      // filtering
      filters: [],

      //headerWidthList: this.setHeaderWidthList(),
      rowInfoList: this.setRowInfoList(),

      openSnackbar: false,
      textSnackbar: "",
    };
  }

  componentDidMount() 
  {
    // we check the headers and fill empty fields with default values
    this.checkHeaders();
  }

  // ---------------------------------------------------------------------------------------
  // preparing

  getDataList()
  {
    // in order to be able to an UNDO ocj data changes,
    // we need to have an backup of the initial data
    let newlist = [];
    for (let i = 0; i < this.props.data.length; i++)
    {
      newlist.push({...this.props.data[i]});
    }
    return newlist;
  }

  getSortingList()
  {
    let sortList = [];
    for (let i = 0; i < this.props.headers.length; i++)
    {
      if (this.props.headers[i].defaultSorting === IConst.sortingASC ||
        this.props.headers[i].defaultSorting === IConst.sortingDESC)
      {
        const oneSort = { 
          order: this.props.headers[i].defaultSorting, 
          orderByField : this.props.headers[i].dataFieldName };
        sortList.push(oneSort);
      }
    }

    return sortList;
  }

  setHeaderWidthList()
  {
    // a list for column widths
    let newlist = [];
    for (let i = 0; i < this.props.headers.length; i++)
    {
      newlist.push(this.props.headers[i].width);
    }
    return newlist;
  }

  setRowInfoList()
  {
    // store properties for each row
    let newlist = [];
    for (let i = 0; i < this.props.data.length; i++)
    {
      let obj = {};
      obj['id'] = this.props.data[i][this.props.primaryKey];
      obj['height'] = this.props.settings.initialRowHeight;
      obj['state'] = IConst.rowStateUnchanged; // edited, deleted, inserted, 
      obj['selected'] = false; 
      obj['editing'] = false; 
      obj['saving'] = false; 
      newlist.push(obj);
    }
    return newlist;
  }

  checkHeaders()
  {
    // here we fill default values for each empty value and for each header
    for(let h = 0; h < this.state.headers.length; h++) 
    {
      if (!this.state.headers[h].headerTitle) this.state.headers[h].headerTitle = "";
      if (this.state.headers[h].isResizable === null) this.state.headers[h].isResizable = true;
      if (this.state.headers[h].isEditable === null) this.state.headers[h].isEditable = false;
      if (this.state.headers[h].isRequired === null) this.state.headers[h].isRequired = false;
      if (this.state.headers[h].isVisible === null) this.state.headers[h].isVisible = true;
      if (this.state.headers[h].isSortable === null) this.state.headers[h].isSortable = false;
      if (!this.state.headers[h].defaultSorting) this.state.headers[h].defaultSorting = "";
      if (!this.state.headers[h].width) this.state.headers[h].width = 160;
      if (!this.state.headers[h].minWidth) this.state.headers[h].minWidth = 80;
      if (!this.state.headers[h].maxWidth) this.state.headers[h].maxWidth = 320;
      if (!this.state.headers[h].textMaxLength) this.state.headers[h].textMaxLength = 255;
      if (!this.state.headers[h].numberMinValue) this.state.headers[h].numberMinValue = 0;
      if (!this.state.headers[h].numberMaxValue) this.state.headers[h].numberMaxValue = 100;
      if (!this.state.headers[h].decimalCount) this.state.headers[h].decimalCount = 3;
      if (!this.state.headers[h].editType) this.state.headers[h].editType = "error";
      if (!this.state.headers[h].defaultValue) this.state.headers[h].defaultValue = "";
      if (!this.state.headers[h].dataFieldName) this.state.headers[h].dataFieldName = "";
      if (!this.state.headers[h].horizontalAlign) this.state.headers[h].horizontalAlign = "left";
      if (!this.state.headers[h].dropdownSelection) this.state.headers[h].dropdownSelection = [];
      if (this.state.headers[h].hasHeaderMenu === null) this.state.headers[h].hasHeaderMenu = false;
    }
  }

  // ---------------------------------------------------------------------------------------
  // button clicks 

  getDataRowIndex(rowid)
  {
    // get the index of the row 
    const index = this.state.data.findIndex(r => r[this.props.primaryKey] === rowid);
    if (index === -1) alert("ERROR getDataRowIndex: index = -1");
    return index;
  }

  getInfoRowIndex(rowid)
  {
    // get the index of the row 
    const index = this.state.rowInfoList.findIndex(r => r.id === rowid);
    if (index === -1) alert("ERROR getInfoRowIndex: index = -1");
    return index;
  }

  handleDeleteRow(rowid)
  {
    // button DELETE for one row was clicked
    const rowIndex = this.getInfoRowIndex(rowid);
    if (rowIndex === -1) return;

    const oldState = this.state.rowInfoList[rowIndex].state;
    if (oldState === IConst.rowStateInserted)
    {
      // new rows cannot be deleted
      alert("This is a new row. Just UNDO if you don't want it to be saved.");
      return;
    }

    if (oldState !== IConst.rowStateDeleted)
    {
      this.state.rowInfoList[rowIndex].state = IConst.rowStateDeleted;
      // update the buttons SAVE ALL, UNDO ALL
      const mainEnabled = this.getMainButtonsEnabled();    
      const cntChangedRows = this.getCountChangedRows();
      this.setState({ 
        mainButtonsDisabled: mainEnabled,
        countChangedRows: cntChangedRows
      });
    }
  }

  handleUndoInsertedRows(rowIndex)
  {
    // delete an inserted row
    const newlist = this.state.data;
    newlist.splice(rowIndex, 1);
    // update the buttons SAVE ALL, UNDO ALL
    const mainEnabled = this.getMainButtonsEnabled();    
    const cntChangedRows = this.getCountChangedRows();
    this.setState({ 
      data: newlist,
      mainButtonsDisabled: mainEnabled,
      countChangedRows: cntChangedRows
    });
  }

  handleUndoRow(rowid)
  {
    // button UNDO for one row was clicked
    const index = this.getInfoRowIndex(rowid);
    if (index === -1) return;
    const oldState = this.state.rowInfoList[index].state;

    if (oldState === IConst.rowStateEdited)
    {
      // row was edited, thus we restore the old values
      this.state.rowInfoList[index].state = IConst.rowStateUnchanged;

      // restore the old data
      const oldRow = this.props.data[index];
      const newlist = this.state.data;
      const keys = Object.keys(oldRow);
      for (let f = 0; f < keys.length; f++)
      {
        const field = keys[f];
        newlist[index][field] = this.props.data[index][field];
      }

      // update the buttons SAVE ALL, UNDO ALL
      const mainEnabled = this.getMainButtonsEnabled();
      const cntChangedRows = this.getCountChangedRows();
      this.setState({ 
        data: newlist,
        mainButtonsDisabled: mainEnabled,
        countChangedRows: cntChangedRows
      });
    }
    else if (oldState === IConst.rowStateInserted)
    {
      // row was inserted, thus we remove it from the data list
      const newlist = this.state.data.select(r => r[this.props.primaryKey] !== rowid);

      // also delete the info list
      const newStatelist = this.state.rowInfoList.select(r => r[this.props.primaryKey] !== rowid);
      this.state.rowInfoList = newStatelist;

      // update the buttons SAVE ALL, UNDO ALL
      const mainEnabled = this.getMainButtonsEnabled();
      const cntChangedRows = this.getCountChangedRows();
      this.setState({ 
        data: newlist,
        mainButtonsDisabled: mainEnabled,
        countChangedRows: cntChangedRows
      });
    }
    else if (oldState === IConst.rowStateDeleted)
    {
      // row was deleted, thus we restore the old values
      this.state.rowInfoList[index].state = IConst.rowStateUnchanged;
      
      // restore the old data
      const newlist = this.state.data;
      newlist[index] = this.props.data[index];

      // update the buttons SAVE ALL, UNDO ALL
      const mainEnabled = this.getMainButtonsEnabled();
      const cntChangedRows = this.getCountChangedRows();
      this.setState({ 
        data: newlist,
        mainButtonsDisabled: mainEnabled,
        countChangedRows: cntChangedRows
      });
    }
  }

  handleNewRow()
  {
    // first get a new id
    const min = Math.min(...this.state.rowInfoList.map(item => item.id));
    const minid = min >= 0 ? -1: min - 1;

    let newRow = [];
    let objRow = {};
    objRow[this.props.primaryKey] = minid;
    // now we fill all default values

    for (let h = 0; h < this.state.headers.length; h++)
    {
      if (this.state.headers[h].dataFieldName !== "" && 
          this.state.headers[h].dataFieldName !== this.props.primaryKey)
      {
        if (this.state.headers[h].editType === IConst.editType_Date)
          objRow[this.state.headers[h].dataFieldName] = new Date();
        else
          objRow[this.state.headers[h].dataFieldName] = this.state.headers[h].defaultValue;
      }
    }
    const newRows = [...this.state.data, objRow];

    // first add the new row to rowInfoList
    const newInfoList = [...this.state.rowInfoList];
    let obj = {};
    obj['id'] = minid;
    obj['height'] = this.props.settings.initialRowHeight;
    obj['state'] = IConst.rowStateInserted; // edited, deleted, inserted, 
    obj['selected'] = false; // edited, deleted, inserted, 
    newInfoList.push(obj);

    // now add the filter "inserted rows"
    // if not, the new row might be not found in the dataset 
    let newfilters = this.state.filters.length === 0 ? [] : [...this.state.filters];
    const index = newfilters.findIndex(f => f.filterFieldname === "");
    if (index === -1)  
    {
      const oneFilter = { filterFieldname: "", filterOperator: IConst.filterOperator_Inserted, filterValue: "" };
      newfilters.push(oneFilter);
    }
    else
    {
      newfilters[index].filterOperator = IConst.filterOperator_Inserted;
    }

    const cntChangedRows = this.getCountChangedRows();

    // now add the new row to data
    this.setState({
      data: newRows,
      rowInfoList: newInfoList,
      filters: newfilters,
      mainButtonsDisabled: false,
      countChangedRows: cntChangedRows + 1
     });
  }

  handleSaveOneRow(row)
  {
    // button SAVE for one row was clicked
    // first we check the data
    const errorText = IUtils.getRowErrorText(this.state.headers, row);
    if (errorText !== "")
    {
      // we found errors in the data, thus, we dont allow to save
      this.showDataErrorMessage(errorText);
      return;
    }

    // now we can save one row
    const rowIndex = this.getDataRowIndex(row[this.props.primaryKey]);
    if (rowIndex === -1) return;
    const newlist = [...this.state.data];
    newlist[rowIndex] = row;

    const infoIndex = this.getInfoRowIndex(row[this.props.primaryKey]);
    const state = this.state.rowInfoList[infoIndex].state;
    const newInfolist = [...this.state.rowInfoList];
    newInfolist[infoIndex].editing = false;
    newInfolist[infoIndex].saving = true;
    
    this.setState({
      data: newlist,
      rowInfoList: newInfolist,
      savingInProgressOneRow: true,
      mainButtonsDisabled: true
    });

    // save to DB now
    this.props.handleSaveOneRowClick(row, state);
  }

  handleSaveAll()
  {
    // save all changed rows
    if (this.state.mainButtonsDisabled) return;

    const rowList = [];
    const stateList = this.state.rowInfoList.filter(i => i.state !== IConst.rowStateUnchanged);
    for (let r = 0; r < stateList.length; r++)
    {
      const index = this.state.data.findIndex(d => d[this.props.primaryKey] === stateList[r].id);
      const row = this.state.data[index];
      rowList.push(row);
    }

    if (rowList.length === 0) return true;

    // check first, if all rows have correct data
    const errorTextAll = IUtils.getAllRowsErrorText(
      this.state.headers, rowList, this.props.primaryKey);
    if (errorTextAll !== "")
    {
      // we found errors in the data, thus, we dont allow to save
      this.showDataErrorMessage(errorTextAll);
      return false;
    }

    const newInfo = [...this.state.rowInfoList];
    for (let r = 0; r <= rowList.length; r++)
    {
      const index = this.state.rowInfoList.findIndex(i => i.id === rowList[this.props.primaryKey]);
      if (index !== -1) 
      {
        newInfo[index].editing = false;
        newInfo[index].saving = true;
      }
    }

    this.setState({
      rowInfoList: newInfo,
      // TODO : savingInProgressAll needed?
      savingInProgressAll: true,
      mainButtonsDisabled: true
    });


    // no error found, thus we can save all rows now
    this.props.handleSaveAllRowsClick(rowList, stateList);
  }

  showDataErrorMessage(errorText)
  {
    // show a dalog with the error messages 
    let newText = errorText;

    /*
    // TODO what do when to many lines in the error message?
    const lines = errorText.split("\n");
    if (lines.lenght > 25)
    {
      // if there are more than 25 error lines, 
      // we show only 25, but we show that there are more
      // furthermore, in this case we add a button "copy to clipboard"
      newText = "";
      for (let t = 0; t < 25; t++) newText += newText + lines[t] + "\n";
      newText += newText + "...\n";
      newText += newText + "...\n";
      newText += newText + "[more than 25 error messages ]\n";
    }

    const buttons = lines.lenght > 25 
      ? [ { caption: "Close", icon: IConst.imgIconOk, horizontalAlign: 'left', X: 1, Y: 1, },
          { caption: "Copy", icon: IConst.imgIconCopy, horizontalAlign: 'left', X: 2, Y: 1, }, ]
      : IConst.defaultButtonsOk; 
    */

    const buttons = [ 
      { caption: "Close", icon: IConst.imgIconOk, horizontalAlign: 'left', X: 1, Y: 1, },
      { caption: "Copy", icon: IConst.imgCopyButton, horizontalAlign: 'left', X: 2, Y: 1, }, 
    ];

    this.setState({
      buttonDialogId: "DataError",
      buttonDialogOpen: true,
      buttonDialogTitle: "Error in data found",
      buttonDialogQuestion: newText,
      buttonDialogButtons: buttons,
      buttonDialogListType: -1, // -1 : dont use pre-defined buttons
      buttonDialogIconType: IConst.buttonDialogIconType_Stop,
      buttonDialogHorizontalAlign: IConst.horizontalAlign_Left,
      buttonDialogSizeType: IConst.buttonDialogSizeType_ParentPercentages,
      buttonDialogButtonWidth: 120, // in pixel
    });
  }

  UndoAllRows()
  {
    // new undo all rows
    const undoList = this.state.rowInfoList.filter(r => r.state !== IConst.rowStateUnchanged);
    for (let r = 0; r < undoList.length; r++)
    {
      this.handleUndoRow(undoList[r].id);
    }
  }
 
  handleUndoAll()
  {
    // ask before undoing all rows
    // open the confirm dialog YES / NO
    //alert("UndoAll : not implemented yet.");

    //this.UndoAllRows();
    //return;
    this.setState({
      buttonDialogId: "UndoAll",
      buttonDialogOpen: true,
      buttonDialogTitle: "Undo all rows",
      buttonDialogQuestion: "Do you really want to undo all changes?",
      buttonDialogButtons: [],
      buttonDialogListType: IConst.buttonDialogTypeYesNo,
      buttonDialogIconType: IConst.buttonDialogIconType_Question,
      buttonDialogHorizontalAlign: IConst.horizontalAlign_Center,
      buttonDialogSizeType: IConst.buttonDialogSizeType_ButtonWidths,
      buttonDialogButtonWidth: 120,
    });
  }

  getIsNotExportable(eType)
  {
    const isNotExportable = 
      eType === IConst.editType_SelectionIcon ||
      eType === IConst.editType_ButtonEdit ||
      eType === IConst.editType_ButtonSave ||
      eType === IConst.editType_ButtonUndo ||
      eType === IConst.editType_ButtonDelete ||
      eType === IConst.editType_SpecialButton;
    return isNotExportable;
  }

  handleCopyForExcel(all)
  {
    // select the rows to export
    const excelRows = (all === true)
      ? this.state.rowInfoList
      : this.state.rowInfoList.filter(r => r.selected === true);

    if (excelRows.length === 0)
    {
      // no rows found
      this.setState({
        openSnackbar: true,
        textSnackbar: "No rows are selected.",
      });
      return;
    }

    // first export the header
    let txt = "";
    for (let h = 0; h < this.props.headers.length; h++)
    {
      // we exclude not important columns
      const eType = this.props.headers[h].editType;
      const isNotExportable = this.getIsNotExportable(eType);
      if (!isNotExportable) txt = txt + this.props.headers[h].headerTitle + "\t";
    }
    txt = txt + "\n";

    // now export all rows
    for (let r = 0; r < excelRows.length; r++)
    {
      const rowIndex = this.getDataRowIndex(excelRows[r].id);
      for (let h = 0; h < this.props.headers.length; h++)
      {
        // we exclude not important columns
        const eType = this.props.headers[h].editType;
        const isNotExportable = this.getIsNotExportable(eType);
        if (!isNotExportable) 
        { 
          const isPrimaryKey = eType === IConst.editType_PrimaryKey;
          const isDecimal = eType === IConst.editType_Decimal;
          const isDropdown = eType === IConst.editType_Dropdown;
          const isChipMenu = eType === IConst.editType_Chip;
          const isGetter = eType === IConst.editType_Getter;
          const isDate = eType === IConst.editType_Date;
          const datetimeformat = this.props.headers[h].datetimeFormat;

          let value = this.state.data[rowIndex][this.props.headers[h].dataFieldName];
          if (isDecimal) value = value.toFixed(this.props.headers[h].decimalCount);
          if (isPrimaryKey) value = this.state.data[rowIndex][this.props.primaryKey];
          if (isDate) value = IUtils.formatDateTime(value, datetimeformat, this.props.settings.localization);
          const isString = typeof value === 'string' || value instanceof String;
          if (value === null || value === undefined || !value) value = "";
          if (isGetter) 
          {
            // "row" is used to evaluate the getter, don't delete it here
            const row = this.state.data[rowIndex];
            value = eval(this.props.headers[h].valueGetter);
          }

          try
          {
            if (isDropdown && !isString) {
              const index = this.props.headers[h].dropdownSelection.findIndex(h => h.id === value);
              value = this.props.headers[h].dropdownSelection[index].value;
            }
            if (isChipMenu && !isString) 
            {
              const index = this.props.headers[h].chipList.findIndex(h => h.id === value);
              value = this.props.headers[h].chipList[index].label;
            };
          }
          catch
          {
            value = "";
          }

          if (isString && value.includes('\n'))
          {
            // in case of several lines in one cell,
            // we first have to change all existing "'s into ""'s
            // and then put the whole text in "....."
            value = value.replace('"', '""');
            const lines = value.split('\n');
            value = '"';
            for (let l = 0; l < lines.length; l++) {
              if (l > 0) value += '\n';
              value += lines[l];
            }
            value += '"';
          }
          else if (isString && value.includes('\t'))
          {
            // in case of a TAB in one cell,
            // we first  have to change all existing "'s into ""'s
            // and then put the whole text in "....."
            value = value.replace('"', '""');
            value = '"' + value + '"';
          }
          txt += value + '\t';
        }
      }
      txt = txt + '\n';
    }
  
    // now copy to clipboard
    navigator.clipboard.writeText(txt);

    this.setState({
      openSnackbar: true,
      textSnackbar: excelRows.length === 1 ?
        "1 row was copied to clipboard." :
        excelRows.length + " rows are copied to clipboard.",
    });
  }

  openDialogSorting()
  {
    // TODO : open dialog manage sorting
  }

  closeSnackbar()
  {
    this.setState({openSnackbar: false});
  }

  // ---------------------------------------------------------------------------------------
  // clicks from button dialog
  
  /*
  getxxxMainButtonsEnabled()
  {
    const newlist = this.state.rowInfoList.filter(r => r.state !== IConst.rowStateUnchanged);
    const disable = newlist.length === 0;
    return disable;
  }
    */

  getCountChangedRows()
  {
    const newlist = this.state.rowInfoList.filter(r => r.state !== IConst.rowStateUnchanged);
    return newlist.length;
  }

  setRowStateIndex(rowIndex, newstate)
  {
    // now set the correct state of the row
    const oldState = this.state.rowInfoList[rowIndex].state;
    const changeState = oldState === IConst.rowStateUnchanged ?
      IConst.rowStateEdited : newstate;
    this.state.rowInfoList[rowIndex].state = changeState;
  }

  setMainButtonState()
  {
    // update the buttons SAVE ALL, UNDO ALL
    ///const mainEnabled = this.getxxMainButtonsEnabled();
    const cntChangedRows = this.getCountChangedRows();
    this.setState({
      mainButtonsDisabled: cntChangedRows === 0,
      countChangedRows: cntChangedRows
    });
  }

  handleDataChange(newvalue, rowid, field)
  {
    // update new values to the data
    const rowIndex = this.getDataRowIndex(rowid);
    if (rowIndex === -1) return;

    // prepare data
    const newlist = [...this.state.data];
    newlist[rowIndex][field] = newvalue;

    // prepare state
    const infoIndex = this.getDataRowIndex(rowid);

    const oldState = this.state.rowInfoList[infoIndex].state;
    const newState = oldState === IConst.rowStateUnchanged ?
      IConst.rowStateEdited : oldState;
    this.state.rowInfoList[infoIndex].state = newState;

    // update the buttons SAVE ALL, UNDO ALL
    this.setMainButtonState();
  }

  openModalDataDialog(row)
  {
    // open the new edit dialog
    const rowIndex = this.getDataRowIndex(row[this.props.primaryKey]);
    this.setState({
      selectedRow: this.state.data[rowIndex],
      openDataModalDialog: true
    });
  }

  handleDialogButtons(buttonIndex, dialogID)
  {
    // close the dialog
    this.setState({buttonDialogOpen: false});

    if (dialogID === "UndoAll")
    {

      // answer from buttonDialog (yes | no);
      if (buttonIndex === 0)
      {
        // button yes was pressed
        this.UndoAllRows();
      }
      else if (buttonIndex === 1)
      {
        // button no was pressed
        // nothing to do here
      }
      return;
    }

  }  


  // ---------------------------------------------------------------------------------------
  // row procedures / functions

  getRowHeight(rowid)
  {
    const index = this.getInfoRowIndex(rowid);
    if (index === -1) return this.props.settings.initialRowHeight;
    return this.state.rowInfoList[index].height;
  }

  getRowSelection(rowid)
  {
    const index = this.getInfoRowIndex(rowid);
    if (index === -1) return false;
    return this.state.rowInfoList[index].selected;
  }

  // ---------------------------------------------------------------------------------------
  // row selection procedures / functions

  getIconSource(rowid)
  {
    const index = this.getInfoRowIndex(rowid);
    if (index === -1) return null;
    const selected = this.state.rowInfoList[index].selected;
    return selected ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;
  }

  handleCheckboxClickHeader(e)
  {
    // selection in the header was clicked
    let ischecked = this.state.mainChecked;
    ischecked = !ischecked;

    // now set the same selection for all rows
    const newlist = [...this.state.rowInfoList];
    newlist.forEach((row) => {row.selected = ischecked});

    this.setState({
      rowInfoList: newlist,
      mainChecked: ischecked,
      mainIndeterminated: false
    });
  }

  handleSelectionClickRow(rowid)
  {
    // create a new list in order to be up to date
    const rowIndex = this.getInfoRowIndex(rowid);
    let newlist = [...this.state.rowInfoList];
    newlist[rowIndex].selected = !newlist[rowIndex].selected;
    const newSelected = newlist[rowIndex].selected;
    let allRowsAreSame = true;
    newlist.forEach((row) => 
    {
      if (row.selected !== newSelected) allRowsAreSame = false;
    });

    if (allRowsAreSame)
    {
      this.setState({
        rowInfoList: newlist,
        mainChecked: newSelected,
        mainIndeterminated: false,
      });
    }
    else
    {
      // different states exists
      this.setState({
        rowInfoList: newlist,
        mainChecked: true,
        mainIndeterminated: true,
      });
    }
  }

  handleSpecialButtonClick(rowid, field)
  {
    if (!this.handleSaveAll()) 
    {
      // TODO asynchroneous ???
      //return;
    }
    this.props.handleSpecialButtonClick(rowid, field);
  }

  // ---------------------------------------------------------------------------------------
  // modal dialog

  handleSubmitModalDialog = (newRow, saveIt) => 
  {
    if (saveIt)
    {
      // copy the edited row into the data
      const rowIndex = this.getInfoRowIndex(newRow[this.props.primaryKey]);
      const newlist = [...this.state.data];
      newlist[rowIndex] = newRow;
      /*

      const keys = Object.keys(newRow);
      for (let f = 0; f < keys.length; f++)
      {
        const field = keys[f];
        newlist[rowIndex][field] = newRow[field];
      }
        */

      const infoIndex = this.getInfoRowIndex(newRow[this.props.primaryKey]);
      const newinfo = [...this.state.rowInfoList];
      if (newinfo[infoIndex].state === IConst.rowStateUnchanged)
        newinfo[infoIndex].state = IConst.rowStateEdited;

      // update the buttons SAVE ALL, UNDO ALL
      //const mainEnabled = this.getMainButtonsEnabled();    
      const cntChangedRows = this.getCountChangedRows();
      this.setState({ 
        openDataModalDialog: false,
        data: newlist, 
        rowInfoList: newinfo,
        mainButtonsDisabled: cntChangedRows === 0,
        countChangedRows: cntChangedRows
      });
    }
    else
    {
      // close the dialog
      this.setState({  openDataModalDialog: false, });
    }
  };

  setChangedSortings(newSorting) 
  {
    if (newSorting === null)
    {
      // cancel was pressed
      this.setState({openSortingDialog: false});
    }
    else
    {
      // here we render the new sorting of rows
      this.setState({
        openSortingDialog: false,
        sortings: newSorting,
      });
    }
  }

  // ---------------------------------------------------------------------------------------
  // copy selection

  handleTableMainKeyUp = (e) => 
  {
    if (e.key === "c" && e.ctrlKey) 
    {
      // copy window selection
      e.key = null;
      const txt = window.getSelection().toString();
      navigator.clipboard.writeText(txt);
    }
    else if (e.key === "c" && e.ctrlKey && e.shiftKey) 
    {
      // copy for excel all rows
      if (!this.props.settings.hasButtonExcelAll) return;
      e.key = null;
      this.handleCopyForExcel(true);
    }
    else if (e.key === "e" && e.ctrlKey) 
    {
      // copy for excel selected rows
      if (!this.props.settings.hasButtonExcelSelected) return;
      e.key = null;
      this.handleCopyForExcel(false);
    }
    else if (e.key === "s" && e.ctrlKey) 
    {
      // save all
      if (!this.props.settings.hasButtonSaveAll) return;
      if (this.state.mainButtonsDisabled) return;
      e.key = null;
      this.handleSaveAll();
    }
    else if (e.key === "u" && e.ctrlKey) 
    {
      // undo all
      if (!this.props.settings.hasButtonUndoAll) return;
      if (this.state.mainButtonsDisabled) return;
      e.key = null;
      this.handleUndoAll();
    }
    else if (e.key === "i" && e.ctrlKey) 
    {
      // new row
      if (!this.props.settings.hasButtonNewRow) return;
      e.key = null;
      this.handleNewRow();
    }
  }

  // ---------------------------------------------------------------------------------------
  // header menu events

  setChangedHeaders(newHeaders)
  {
    // change hide one column
    this.setState({headers: newHeaders});
  }

  setChangedFilters(newFilters)
  {
    // change filtering
    this.setState({filters: newFilters});
  }

  menuButtonClick(index)
  {
    if (!this.state.mainButtonsDisabled)
    {
      // TODO asynchroneous solution?
      //if (!this.handleSaveAll()) return;     
      this.handleSaveAll();     
    }
    this.props.menuButtonClick(index);
  }
  
  render() 
  {
    const { classes } = this.props;
    const { page, limit } = this.state;

    // if a edit dialog is declared corretly, it can be opened
    const EditDialog = availableDialogs[this.props.dialogName];
    
    let data = this.state.data;
    if (this.state.filters !== null && this.state.filters.length > 0)
    {
      // we apply all filters
      for (let f = 0; f < this.state.filters.length; f++) 
      {
        const filterField = this.state.filters[f].filterFieldname;
        const filterOperator = this.state.filters[f].filterOperator;

        let index = -1;
        let getter = "";
        let editType = "";

        if (filterField === "")
        {
          // filtering row states 
        }
        else
        {
          index = this.state.headers.findIndex((h) => h.dataFieldName === filterField);
          if (index > -1)
          {
            getter = this.state.headers[index].getter;
            editType = this.state.headers[index].editType;
          }
        }
  
        const filterTypeValue = 
          editType === IConst.editType_Integer ? parseInt(this.state.filters[f].filterValue) :
          editType === IConst.editType_Decimal ? parseFloat(this.state.filters[f].filterValue) :
          editType === IConst.editType_Date ? Date.parse(this.state.filters[f].filterValue) :
          this.state.filters[f].filterValue;

        const filterTypeSecondValue =
          editType === IConst.editType_Integer ? parseInt(this.state.filters[f].filterSecondValue) :
          editType === IConst.editType_Decimal ? parseFloat(this.state.filters[f].filterSecondValue) :
          editType === IConst.editType_Date ? Date.parse(this.state.filters[f].filterSecondValue) :
          this.state.filters[f].filterSecondValue;
  
        if (data.length > 0) 
        {
          data = data.filter((row) =>
            filterOperator === IConst.filterOperator_Contains ? 
              IUtils.getCellValue(row, filterField, editType, getter).includes(filterTypeValue) :
            filterOperator === IConst.filterOperator_ContainsNot ? 
              !IUtils.getCellValue(row, filterField, editType, getter).includes(filterTypeValue) :
            filterOperator === IConst.filterOperator_Equals ? 
              IUtils.getCellValue(row, filterField, editType, getter) === filterTypeValue :
            filterOperator === IConst.filterOperator_EqualsNot ? 
              !IUtils.getCellValue(row, filterField, editType, getter) !== filterTypeValue :
            filterOperator === IConst.filterOperator_StartsWith ? 
              IUtils.getCellValue(row, filterField, editType, getter).startsWith(filterTypeValue) :
            filterOperator === IConst.filterOperator_StartsWithNot ? 
              !IUtils.getCellValue(row, filterField, editType, getter).startsWith(filterTypeValue) :
            filterOperator === IConst.filterOperator_EndsWith ? 
              IUtils.getCellValue(row, filterField, editType, getter).endsWith(filterTypeValue) :
            filterOperator === IConst.filterOperator_EndsWithNot ? 
              !IUtils.getCellValue(row, filterField, editType, getter).endsWith(filterTypeValue) :
            filterOperator === IConst.filterOperator_IsEmpty ? 
              IUtils.getCellValue(row, filterField, editType, getter) === null :
            filterOperator === IConst.filterOperator_IsEmptyNot ? 
              IUtils.getCellValue(row, filterField, editType, getter) !== null :
            filterOperator === IConst.filterOperator_IsSmallerThan ? 
              IUtils.getCellValue(row, filterField, editType, getter) < filterTypeValue :
            filterOperator === IConst.filterOperator_IsBiggerThan ? 
              IUtils.getCellValue(row, filterField, editType, getter) > filterTypeValue :
            filterOperator === IConst.filterOperator_IsBetween ? 
              IUtils.getCellValue(row, filterField, editType, getter) >= filterTypeValue  &&
              IUtils.getCellValue(row, filterField, editType, getter) <= filterTypeSecondValue :
              

            // filtering states
            filterOperator === IConst.filterOperator_Edited ? 
              IUtils.getRowState(row[this.props.primaryKey], this.state.rowInfoList) === IConst.rowStateEdited : 
            filterOperator === IConst.filterOperator_Deleted ? 
              IUtils.getRowState(row[this.props.primaryKey], this.state.rowInfoList) === IConst.rowStateDeleted : 
            filterOperator === IConst.filterOperator_Inserted ? 
              IUtils.getRowState(row[this.props.primaryKey], this.state.rowInfoList) === IConst.rowStateInserted : 
            filterOperator === IConst.filterOperator_Modified ? 
              IUtils.getRowState(row[this.props.primaryKey], this.state.rowInfoList) !== IConst.rowStateUnchanged : 
            true
          );
        }
      }
    }

    // sorting
    /*
    const indexSort = this.state.headers.findIndex(h => h.defaultSorting != '');
    const order = indexSort === -1 ? '' : this.state.headers[indexSort].defaultSorting;
    const orderBy = indexSort === -1 ? '' : this.state.headers[indexSort].dataFieldName;

    if (order !== '') 
    {
      // we only order something, when an order is defined
      data = getSortRows(data, getSortFunc(order, orderBy, this.state.headers));
    }
      */
  
    for (let s = this.state.sortings.length - 1; s >= 0; s--) {
      data = getSortRows(data,
        getSortFunc(
          this.state.sortings[s].order, 
          this.state.sortings[s].orderByField, 
          this.state.headers)
      );
    }

    data = data.slice(page * limit, page * limit + limit);

    const mainChecked = this.state.mainChecked;
    const mainIndeterminated = this.state.mainIndeterminated;
    const mainButtonsDisabled = this.state.mainButtonsDisabled;
    const cntChangedRows = this.state.countChangedRows;

    const sizeMainButton = this.props.settings.buttonSizeMain;

    return (
      <Paper 
        className={classes.paper}
        style={{ overflowX: 'auto' }}
        >
        <TableContainer
          tabIndex={0}
          onKeyUp={this.handleTableMainKeyUp}
          
          className={classes.table_container}
          style={{
            height: 650, // Set the max height to allow scrolling after 5 items
            overflowY: 'auto', // Enables vertical scrolling
            //overflowX: 'auto',
            '&::WebkitScrollbar': {
              width: '12px',
              height: '12px',
            },
            '&::WebkitScrollbarTrack': {
              backgroundColor: '#f1f1f1',
            },
            '&::WebkitScrollbarThumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#555',
              },
            },
          }}
        >

          <Table 
            className={classes.table} 
            stickyHeader
            //sx={{ width: '1800px', }}
          >
            <ITableHeader
              className={classes.table_head_row}
              settings={this.props.settings}
              headers={this.state.headers}
              filters={this.state.filters}
              sortings={this.state.sortings}
              mainChecked={mainChecked}
              mainIndeterminated={mainIndeterminated}
              handleCheckboxClickHeader={(e)=>this.handleCheckboxClickHeader(e)}
              setChangedHeaders={(newheaders) => this.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.setChangedFilters(newfilters)}
              setChangedSortings={(newsortings) => this.setChangedSortings(newsortings)}
              openDialogSorting={() => this.openDialogSorting()}
            />
            <TableBody 
              className={classes.table_body_row}
              >
              {data.map((row, rowIndex) => {
                // we use the old values for undoing changes
                const rowid = row[this.props.primaryKey];
                const rowInfoIndex = this.state.rowInfoList.findIndex(r => r.id === rowid);

                return(
                  <ITableRow
                    key={`itablerow-row${rowIndex}`}
                    savingInProgressAll={this.state.savingInProgressAll}
                    settings={this.props.settings}
                    headers={this.props.headers}
                    rowInfoList={this.state.rowInfoList}
                    rowInfoIndex={rowInfoIndex}
                    oldRow={row}
                    primaryKey={this.props.primaryKey}
                    row={row}
                    setMainButtonState={() => this.setMainButtonState()}
                    handleUndoInsertedRows={(rowid) => this.handleUndoRow(rowid)}
                    handleSelectionClickRow={(rowid) => this.handleSelectionClickRow(rowid)}
                    handleSpecialButtonClick={(rowid, field) => this.handleSpecialButtonClick(rowid, field)}
                    //handleDataChange={(newvalue, rowid, field) => this.handleDataChange(newvalue, rowid, field)}
                    handleSaveOneRow = {(row) =>  this.handleSaveOneRow(row)}
                    showDataErrorMessage = {(errorText) =>  this.showDataErrorMessage(errorText)}
                    openModalDataDialog={(row) => this.openModalDataDialog(row)}  
                  />
                );
              })}

              <TableRow className={classes.table_body_row}>
                <TableCell
                  colSpan={4}
                  style={{
                    padding: 0,
                    margin: 0,
                    borderBottom: '1px solid rgb(229, 234, 239)',
                    borderWidth: '1px medium medium',
                    borderStyle: 'dashed none none',
                    borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
                    borderImage: 'none',
                    color: 'rgb(107, 114, 128)',
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


        <Grid container sx={{ 
          border: '1px solid black', 
          borderRadius: '8px',
          margin: '6px 0px', 
          backgroundColor: 'rgb(243, 244, 246)' }}>
          <Grid item style={{ flex: 1}}> 

              {this.props.settings.menuButtonList && 
                this.props.settings.menuButtonList.map((button, index) => {
                const iconSize = this.props.settings.buttonSizeMain;
                if (button.positionStart === true)
                return (
                  <IconButton
                    key={`menuButtonList-button${index}`}
                    className={classes.mainButtons}
                    disabled={this.state.savingInProgressAll}
                    onClick={(index) => this.menuButtonClick(index)}>
                    {button.icon && <img src={button.icon} style={{ width: iconSize, height:iconSize }} />}
                    {button.caption}
                  </IconButton>
                );
              })}

              {/* new row */}
              {this.props.settings.hasButtonNewRow &&
              <Tooltip title="Ctrl-I" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleNewRow()}>
              <AddBoxIcon sx={{ color: IConst.iconColorDarkYellow, }}/>
              New row</IconButton></Tooltip>}

              {/* save all */}
              {this.props.settings.hasButtonSaveAll &&
              <Tooltip title="Ctrl-S" arrow><span>
              <IconButton
                className={classes.mainButtons}
                disabled={mainButtonsDisabled}
                onClick={e => this.handleSaveAll(e)}>
                <SaveIcon sx={{ 
                  color: IConst.iconColorGreen, 
                  opacity: mainButtonsDisabled ? 0.2 : 1 }}/>
              Save all ({cntChangedRows})</IconButton></span></Tooltip>}

              {/* undo all  */}
              {this.props.settings.hasButtonUndoAll &&
              
              <Tooltip title="Ctrl-U" arrow><span>
              <IconButton
                className={classes.mainButtons}
                disabled={mainButtonsDisabled}
                onClick={e => this.handleUndoAll(e)}>
              <UndoIcon sx={{ 
                color: IConst.iconColorRed,
                opacity: mainButtonsDisabled ? 0.2 : 1 }}/>
              Undo all ({cntChangedRows})</IconButton></span></Tooltip>}

              {/* export for excel all rows */}    
              {this.props.settings.hasButtonExcelAll && 
              <Tooltip title="Ctrl-E" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(true)}>
              Copy all rows</IconButton></Tooltip>}

              {/* export for excel only selected rows */}
              {this.props.settings.hasButtonExcelSelected &&
              <Tooltip title="Ctrl-Shift-E" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(false)}>
              Copy selected rows</IconButton></Tooltip>}

              {/* manage the sortings of rows */}
              {this.props.settings.hasButtonManageSorting &&
              <Tooltip title="Ctrl-Shift-M" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.openDialogSorting(false)}>
              Manage sorting ...</IconButton></Tooltip>}

              {this.props.settings.menuButtonList &&
                this.props.settings.menuButtonList.map((button, index) => {
                const iconSize = this.props.settings.buttonSizeMain;
                if (button.positionStart === false)
                return (
                  <IconButton
                    key={`menuButtonList-button${index}`}
                    className={classes.mainButtons}
                    disabled={this.state.savingInProgressAll}
                    onClick={(index) => this.menuButtonClick(index)}>
                    {button.icon && <img src={button.icon} style={{ width: iconSize, height:iconSize }} />}
                    {button.caption}
                  </IconButton>
                );
              })}


          </Grid>

          <Grid item style={{ display: 'flex', alignItems: 'center'}}>
            <TablePagination
              component="div"
              count={this.state.data.length}
              labelDisplayedRows={({ from, to, count }) => `${from} - ${to} of ${count}` }
              labelRowsPerPage="Rows:" // Shorter label
              onPageChange={(event, page) => {
                event.preventDefault();
                this.setState({ page });
              }}
              onRowsPerPageChange={event => {
                this.setState({
                  page: 0,
                  limit: parseInt(event.target.value, 10),
                });
              }}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 20, 100]}
              showFirstButton
              showLastButton
              sx={{
                overflow: 'hidden',
                '.MuiTablePagination-toolbar': {
                  minHeight: '40px', 
                  paddingLeft: '8px', 
                  paddingRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1rem', 
                },
                '.MuiTablePagination-selectLabel': {
                  margin: 0,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem', 
                  lineHeight: 1.43,
                  letterSpacing: '0.01071em',
                  marginRight: '4px', 
                },
                '.MuiTablePagination-select': {
                  minWidth: '16px',
                  paddingRight: '12px', 
                  paddingLeft: '4px', 
                  textAlign: 'left',
                  textAlignLast: 'left',
                  fontSize: '1rem',
                },
                '.MuiTablePagination-displayedRows': {
                  margin: 0,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem', 
                  lineHeight: 1.43,
                  letterSpacing: '0.01071em',
                  marginLeft: '4px',
                  marginRight: '4px',
                },
                '.MuiIconButton-root': {
                  padding: '4px', 
                  borderRadius: '50%',
                  overflow: 'isVisible',
                  color: 'inherit',
                  transition:
                    'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                  '&.Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                },
                '.MuiSvgIcon-root': {
                  fontSize: '1.4rem', 
                },
                '& .MuiToolbar-root': {
                  gap: '2px',
                },
              }}
            />
          </Grid>
        </Grid>

        {/* button dialog */}
        {this.state.buttonDialogId && this.state.buttonDialogOpen &&
        <IDialogButton
          buttonDialogId={this.buttonDialogId}
          buttonDialogOpen={this.state.buttonDialogOpen}
          buttonDialogTitle={this.state.buttonDialogTitle}
          buttonDialogQuestion={this.state.buttonDialogQuestion}
          buttonDialogButtons={this.state.buttonDialogButtons}
          buttonDialogListType={this.state.buttonDialogListType}
          buttonDialogIconType = {this.state.buttonDialogIconType}
          buttonDialogHorizontalAlign = {this.state.buttonDialogHorizontalAlign}
          buttonDialogSizeType = {this.state.buttonDialogSizeType}
          buttonDialogButtonWidth={this.state.buttonDialogButtonWidth}
          handleDialogButtons={(index) => this.handleDialogButtons(index, this.state.buttonDialogId)}
        />}

        {/* main edit dialog */}
        {this.props.dialogName === 'IDialogData_First' &&  this.state.openDataModalDialog &&
          <EditDialog
            open={this.state.openDataModalDialog}
            settings={this.props.settings}
            headers={this.props.headers}
            row={this.state.selectedRow}
            primaryKey={this.props.primaryKey}
            handleSubmitModalDialog={(row, saveIt) => this.handleSubmitModalDialog(row, saveIt)}
            showDataErrorMessage={(errorText) => this.showDataErrorMessage(errorText)}>
          </EditDialog>
        }

      {/* 
      {true && // openSortingDialog
      <IDialogSorting
        open={true}
        headers={this.state.headers}
        sortings={this.state.sortings}
        setChangesSortings={(newlist) => this.setChangesSortings(newlist)}
      />}
      */}

      <Snackbar 
        open={this.state.openSnackbar} 
        autoHideDuration={5000} 
        onClose={()=>this.closeSnackbar()} 
        anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert
          onClose={()=>this.closeSnackbar()}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >{this.state.textSnackbar}</Alert>
      </Snackbar>

      </Paper>
    );
  }
}

ITable.propTypes = { classes: PropTypes.object, };

export default withStyles(ITable, useStyles);
