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
  TableFooter,
  TablePagination,
  TableRow,
} from '@mui/material';

import { useStyles } from './styles';
import IConst from './IConst';
import ITableHeader from './ITableHeader';
import ITableRow from './ITableRow'; 
import IButtonDialog from './IButtonDialog';
import IDataDialog_First from './IDataDialog_First';
//import IHeaderManage from './IHeaderManage';


const avaiableDialogs = {
  // TODO
  //dialog_MainData: IDataDialog_First,
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

    // TODO
    const EditDialog = avaiableDialogs[this.props.dialogName];
  
    this.state = {
      headers: headers,
      data: this.getDataList(),
      page: 0,
      limit: 10,

      // selection in header
      mainChecked: false,
      mainIndeterminated: false,

      // props for button dialog
      openButtonDialog: false,
      buttonDialogId: "",
      buttonDialogTitle: "",
      buttonDialogQuestion: "",
      buttonDialogButtons: [],
      buttonDialogListType: 0,
      dialogIconType: 0,
      buttonWidth: 120,
  
      // props for edit dialog
      openDataModalDialog: false,
      selectedRow: null,
      isHoveredOrResizing: false,

      openManageColumns: false,

      // enabling / disabling buttons SAVE ALL and UNDO ALL
      mainButtonsDisabled: true,

      rowHeight: 200,
      colwidth: 120,
      headerHeight: 35,
      minRowHeight: 29,

      //headerWidthList: this.setHeaderWidthList(),
      rowInfoList: this.setRowInfoList(),
    };
  }

  componentDidMount() 
  {
    // TODO where to place "checkHeaders"
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
      if (!this.state.headers[h].isResizable) this.state.headers[h].isResizable = true;
      if (!this.state.headers[h].isEditable) this.state.headers[h].isEditable = false;
      if (!this.state.headers[h].isRequired) this.state.headers[h].isRequired = false;
      if (!this.state.headers[h].isVisible) this.state.headers[h].isVisible = true;
      if (!this.state.headers[h].isSortable) this.state.headers[h].isSortable = true;
      if (!this.state.headers[h].defaultSorting) this.state.headers[h].defaultSorting = "asc";
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
      if (!this.state.headers[h].hasHeaderMenu) this.state.headers[h].hasHeaderMenu = false;
    }
  }

  // ---------------------------------------------------------------------------------------
  // button clicks 

  getRowIndex(rowid)
  {
    // get the index of the row 
    const index = this.state.rowInfoList.findIndex(r => r[this.props.primaryKey] === rowid);
    if (index === -1) alert("ERROR getRowIndex: index = -1");
    return index;
  }

  handleDeleteRow(rowid)
  {
    // button DELETE for one row was clicked
    const rowIndex = this.getRowIndex(rowid);
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
      this.setState({ 
        mainButtonsDisabled: mainEnabled
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
    this.setState({ 
      data: newlist,
      mainButtonsDisabled: mainEnabled
    });
  }

  handleUndoRow(rowid)
  {
    // button UNDO for one row was clicked
    const index = this.getRowIndex(rowid);
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

      this.setState({
        data: newlist,
        mainButtonsDisabled: mainEnabled
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

      this.setState({
        data: newlist,
        mainButtonsDisabled: mainEnabled
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

      this.setState({
        data: newlist,
        mainButtonsDisabled: mainEnabled
      });
    }
  }

  handleNewRow()
  {
    // button INSERT a new row was clicked

    let newRow = [];
    if (this.props.data.lenght === 0)
    {
      // no data was defined, thus we need to copy from empty rows
      newRow = this.props.emptyRow;
    }
    else
    {
      // data was defined, thus we copy the first row and set all fields to null
      newRow = this.state.data[0];
      for (let f = 0; f < newRow.length; f++) newRow[0][f] = null;
    }

    // now we fill all default values
    for (let h = 0; h < this.props.headers.length; h++)
    {
      const header = this.props.headers[h];
      if (header.dataFieldName !== "" && header.dataFieldName !== null) 
        newRow[header.dataFieldName] = header.defaultValue;
    }

    // now we get a new primary key: -1, -2, -3,
    const allPrimaryKeys = this.state.data.map(el => {
      return { id: el[this.props.primaryKey] }
    });
    let min = Math.min(...allPrimaryKeys);
    if (min >= 0) min = 0;
    min = min - 1;
    newRow[this.props.primaryKey] = min;

    // first add the new row to rowInfoList
    const newRowInfo = [];
    let obj = {};
    obj['id'] = min;
    obj['height'] = this.props.settings.initialRowHeight;
    obj['state'] = IConst.rowStateInserted; // edited, deleted, inserted, 
    obj['selected'] = false; // edited, deleted, inserted, 
    newRowInfo.push(obj);
    this.setState({rowInfoList: [...this.state.rowInfoList, newRowInfo]});

    // now add the new row to data
    this.setState({data: [...this.state.data, newRow]});
  }

  handleSaveOneRow(row, state)
  {
    // save one changed row
    if (this.props.handleSaveOneRowClick(row, state))
    {
      const infoIndex = this.state.rowInfoList.findIndex(i => i.id === row[this.props.primaryKey]);
      const newlist = this.state.rowInfoList;
      newlist[infoIndex].state = IConst.rowStateUnchanged;
      this.setState({rowInfoList: newlist, });
    }
    else
    {
      // TODO error message here ?
    }
  }

  handleSaveAll()
  {
    // save all changed rows
    const rowList = [];
    const stateList = this.state.rowInfoList.filter(i => i.state !== IConst.rowStateUnchanged);
    for (let r = 0; r < stateList.length; r++)
    {
      const index = this.state.data.findIndex(d => d[this.props.primaryKey] === stateList[r].id);
      const row = this.state.data[index];
      rowList.push(row);
    }

    // check first, if all rows have correct data
    let errorTextAll = "";
    let hasErrorAll = false;
    for (let r = 0; r < rowList.length; r++)
    {
      let errorText = "";
      let hasError = false;
      for (let h = 0; h < this.props.headers.lenght; h++)
      {
        const value = this.state.row[this.props.headers[h].dataFieldName];
        if (IConst.hasError(value, this.props.headers[h])) 
        {
          errorText += 
            this.props.headers[h].headerTitle + ": " + 
            this.props.headers[h].helperText + "\n";
          hasError = true;
          hasErrorAll = true;
        }
      }
      if (hasError) 
      {
        errorTextAll += "Error on row " + rowList[this.props.primaryKey] + " : \n";
        errorTextAll += errorText + "\n"
      }
    }

    if (hasErrorAll)
    {
      // TODO make a nicer dialog
      alert("Data has errors. Fix them first: " + errorTextAll);

      // we found errors in the data, thus, we dont allow to save
      this.showDataErrorMessage(errorTextAll);
      return;
    }

    // no error found, this we can save now
    if (this.props.handleSaveAllRowsClick(rowList, stateList))
    {
      const newlist = this.state.rowInfoList;
      for (let s = 0; s < newlist.length; s++) newlist[s].state = IConst.rowStateUnchanged;
      this.setState({rowInfoList: newlist});
    }
    else
    {
      // TODO error message here ?
    }
  }

  showDataErrorMessage(errorText)
  {
    // show a dalog with the error messages 
    let newText = errorText;
    const lines = errorText.split("\n");
    if (lines.lenght > 15)
    {
      newText = "";
      for (let t = 0; t < 15; t++) newText += newText + "\n";
    }

    this.setState({
      buttonDialogId: "DataError",
      openButtonDialog: true,
      buttonDialogTitle: "Error in data found",
      question: newText,
      buttonList: [],
      buttonDialogListType: IConst.buttonDialogTypeOk,
      dialogIconType: IConst.buttonDialogIconType_Stop,
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
      buttonDialogTitle: "Undo all rows",
      buttonDialogQuestion: "Do you really want to undo all changes?",
      buttonDialogButtons: [],
      buttonDialogListType: IConst.buttonDialogTypeYesNo,
      dialogIconType: IConst.buttonDialogIconType_Question,
      buttonWidth: 120,
      openButtonDialog: true,
    });
  }

  getIsNotExportable(eType)
  {
    const isNotExportable = 
      eType === IConst.editType_SelectionIcon ||
      eType === IConst.editType_ButtonEdit ||
      eType === IConst.editType_ButtonSave ||
      eType === IConst.editType_ButtonUndo ||
      eType === IConst.editType_ButtonDelete;
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
      alert("No rows seleted.");
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
      const rowIndex = this.getRowIndex(this.state.rowInfoList[r].id);
      for (let h = 0; h < this.props.headers.length; h++)
      {
        // we exclude not important columns
        const eType = this.props.headers[h].editType;
        const isNotExportable = this.getIsNotExportable(eType);
        if (!isNotExportable) 
        { 
          const isDecimal = eType === IConst.editType_Decimal;
          const isPrimaryKey = eType === IConst.editType_PrimaryKey;
          const isDate = eType === IConst.editType_Date;
          const datetimeformat = this.props.headers[h].datetimeFormat;
          let value = this.state.data[rowIndex][this.props.headers[h].dataFieldName];
          if (isDecimal) value = value.toFixed(this.props.headers[h].decimalCount);
          if (isPrimaryKey) value = this.state.data[rowIndex][this.props.primaryKey];
          if (isDate) value = IConst.formatDateTime(value, datetimeformat, IConst.datetimeLocalization);
          value = value.replace("\n", "|");
          txt = txt + value + "\t";
        }
      }
      txt = txt + "\n";
    }

    // now copy to clipboard
    navigator.clipboard.writeText(txt);
    alert("Data was copied to clipboard.");
  }

  handleManageColumns()
  {
    this.setState({
      openManageColumns: true,
      headers: this.state.headers,
    });
  }

  arrangeColumns(doIt, newlist)
  {
    // TODO
    alert("TODO: manage columns not implemented yet,");
    this.setState({
      openManageColumns: false,
    });
  }

  handleTest()
  {
    const buttons = [
      { caption: "Yes", icon: IConst.imgIconYes, horizontalAlign: 'left', X: 1, Y: 1, },
      { caption: "No", icon: IConst.imgIconNo, horizontalAlign: 'left', X: 2, Y: 1, },
      { caption: "Cancel", icon: IConst.imgIconCancel, horizontalAlign: 'left', X: 3, Y: 1, },
      { caption: "Maybe", icon: IConst.imgIconYes, horizontalAlign: 'left', X: 1, Y: 2, },
      { caption: "NoAtAll", icon: IConst.imgIconNo, horizontalAlign: 'left', X: 2, Y: 2, },
      { caption: "Unsure", icon: IConst.imgIconCancel, horizontalAlign: 'left', X: 3, Y: 2, },
      { caption: "ok", icon: IConst.imgIconCancel, horizontalAlign: 'left', X: 1, Y: 3, },
      { caption: "no way", icon: IConst.imgIconCancel, horizontalAlign: 'left', X: 3, Y: 3, },
    ];
    this.setState({
      buttonDialogId: "UndoAll",
      buttonDialogTitle: "Undo all rows",
      buttonDialogQuestion: "Do you really want to undo all changes?",
      buttonDialogButtons: buttons,
      buttonDialogListType: -1,
      dialogIconType: IConst.buttonDialogIconType_Question,
      buttonWidth: 120,
      openButtonDialog: true,
    });
  }

  // ---------------------------------------------------------------------------------------
  // clicks from button dialog
  
  getMainButtonsEnabled()
  {
    const newlist = this.state.rowInfoList.filter(r => r.state !== IConst.rowStateUnchanged);
    const disable = newlist.length === 0;
    return disable;
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
    const mainEnabled = this.getMainButtonsEnabled();
    this.setState({mainButtonsDisabled: mainEnabled });
  }

  handleDataChange(newvalue, rowid, field)
  {

    // update new values to the data
    const rowIndex = this.getRowIndex(rowid);
    if (rowIndex === -1) return;

    // prepare data
    const newlist = this.state.data;
    newlist[rowIndex][field] = newvalue;

    // prepare state
    const oldState = this.state.rowInfoList[rowIndex].state;
    const newState = oldState === IConst.rowStateUnchanged ?
      IConst.rowStateEdited : oldState;
    this.state.rowInfoList[rowIndex].state = newState;

    // update the buttons SAVE ALL, UNDO ALL
    const mainEnabled = this.getMainButtonsEnabled();

    this.setState({
      data: newlist,
      mainButtonsDisabled: mainEnabled
    });
  }

  openModalDataDialog(row)
  {
    //alert("Modal Dialog: not implemented. ");
    //return;

    // open the new edit dialog
    const rowIndex = this.getRowIndex(row[this.props.primaryKey]);
    this.setState({
      selectedRow: this.state.data[rowIndex],
      openDataModalDialog: true
    });
  }

  handleDialogButtons(buttonIndex, dialogID)
  {
    // close the dialog
    this.setState({openButtonDialog: false});

    if (dialogID === "UndoAll")
    {
      if (buttonIndex === 0)
      {
        // button yes was pressed
        alert("undo all rows: index = " + buttonIndex + ", dialogID = " + dialogID);
        // TODO
        // this.UndoAllRows();
      }
      else if (buttonIndex === 1)
      {
        // button no was pressed
        // nothing to do here
        alert("undo all rows CANCELLED");
      }
      return;
    }

  }  


  // ---------------------------------------------------------------------------------------
  // row procedures / functions

  /*
  getRowxxStateIndex(rowIndex)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return IConst.rowStateUnchanged;
    return this.state.rowInfoList[index].state;
  }
    */

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

  getIconSource(rowid)
  {
    const index = this.getRowIndex(rowid);
    if (index === -1) return null;
    const selected = this.state.rowInfoList[index].selected;
    return selected ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;
  }

  handleCheckboxClickHeader(e)
  {
    // selection in the header was clicked
    let ischecked = this.state.mainChecked;
    ischecked = !ischecked;
    this.setState({mainIndeterminated: false});
    this.setState({mainChecked: ischecked});

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
    const rowIndex = this.getRowIndex(rowid);
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
      if (newSelected)
      {
        // all rows are selected
        this.setState({
          rowInfoList: newlist,
          mainChecked: true,
          mainIndeterminated: false,
        });
      }
      else
      {
        // no row is selected
        this.setState({
          rowInfoList: newlist,
          mainChecked: false,
          mainIndeterminated: false,
        });
      }
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


  // ---------------------------------------------------------------------------------------
  // modal dialog

  handleSubmitModalDialog = (newRow, saveIt) => 
  {
    if (saveIt)
    {
      // copy the edited row into the data
      const rowIndex = this.getRowIndex(newRow[this.props.primaryKey]);
      const newlist = this.state.data;
      const keys = Object.keys(newRow);
      for (let f = 0; f < keys.length; f++)
      {
        const field = keys[f];
        newlist[rowIndex][field] = newRow[field];
      }
      if (this.state.rowInfoList[rowIndex].state === IConst.rowStateUnchanged)
        this.state.rowInfoList[rowIndex].state = IConst.rowStateEdited;

      // update the buttons SAVE ALL, UNDO ALL
      const mainEnabled = this.getMainButtonsEnabled();    

      this.setState({ 
        openDataModalDialog: false,
        data: newlist, 
        mainButtonsDisabled: mainEnabled
      });
    }
    else
    {
      // close the dialog
      this.setState({  openDataModalDialog: false, });

    }
  };

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
  // cell editing procedures and functions

  /*
  setRowState(rowid, state)
  {
    // set a new row state
    // if the old state is INSERTED, then we dont change it to edited
    const oldState = this.getRowxxxxState(rowid);
    if (oldState === IConst.rowStateInserted) return;

    // set a new row state
    const index = this.getRowIndex(rowid);
    const newlist = this.state.rowInfoList;
    newlist[index].state = state;
    this.setState({rowInfoList: newlist});

    // update main buttons
    this.setMainxxxxxButtons();
  } 
    */ 

  getHasError(header, value)
  {

    // TODO : use IConst.hasError

    if (!header.isEditable) return false;

    // check text fields
    const isText = 
      header.editType === IConst.editType_Textfield ||
      header.editType === IConst.editType_TextfieldMultiline;
    if (isText)
    {
      if (header.required && (value === "" || value === null)) return true;
      if (value.length > header.textMaxLength) return true;
      return false;
    }

    // check number fields
    const isInteger = header.editType === IConst.editType_Integer;
    const isDecimal = header.editType === IConst.editType_Decimal;
    if (isInteger || isDecimal)
    {
      if (header.required && (value === null)) return true;
      const actValue = isInteger ?
        parseInt(value) :
        parseFloat(value);
      if (actValue > header.numberMaxValue || 
          actValue < header.numberMinValue) return true;
      return false;
    }

    // TODO others?

    return false;

  }
  
  handleTextfieldChange(e, rowid, fieldName)
  {
    // TODO delete
    // change the data when a field was selected
    const index = this.getRowIndex(rowid);
    const newList = [...this.state.data];
    this.state.data[index][fieldName] = e.target.value;
    
    // now also change the state of the row
    const oldState = this.state.rowInfoList[index].state;
    if (oldState === IConst.rowStateUnchanged) 
      this.state.rowInfoList[index].state = IConst.rowStateEdited;
    
    // update the buttons SAVE ALL, UNDO ALL
    const mainEnabled = this.getMainButtonsEnabled();    

    this.setState({
      data: newList, 
      mainButtonsDisabled: mainEnabled
    });
  }

  handleTextfieldNumberChange(e, rowid, fieldName)
  {
    // TODO delete
    // check the data
    /*
    const indexHeader = this.props.headers.findIndex(h => h.dataFieldName === fieldName);
    if (indexHeader === -1)
    {
      alert("ERROR handleTextfieldChange: indexHeader === -1.");
      return;
    }

    // if the entered value is not correct, we show the helpertext
    const header = this.props.headers[indexHeader];
    const hasError = this.getHasError(header, e.target.value);
    e.target.style.color = hasError ? 'red' : 'black';
    */

    // change the data when a field was selected
    const index = this.getRowIndex(rowid);
    const newList = this.state.data;

    // now also change the state of the row
    const oldState = this.state.rowInfoList[index].state;
    if (oldState === IConst.rowStateUnchanged) 
      this.state.rowInfoList[index].state = IConst.rowStateEdited;

    // TODO parseInt
    const number = parseFloat(e.target.value);
    newList[index][fieldName] = number;

    // update the buttons SAVE ALL, UNDO ALL
    const mainEnabled = this.getMainButtonsEnabled();    

    this.setState({
      data: newList, 
      mainButtonsDisabled: mainEnabled
    });
  }
  
  handleDatePickerChange(e, rowIndex, fieldName)
  {
    // TODO delete
    const newlist = this.state.data;
    newlist[rowIndex][fieldName] = e.target.date;

    // update the buttons SAVE ALL, UNDO ALL
    const mainEnabled = this.getMainButtonsEnabled();    

    this.setState({ 
      data: newlist, 
      mainButtonsDisabled: mainEnabled
    });
  }

  handleChipChange(chipid, rowid, fieldName)
  {
    alert("Not implemented yet (chip id = " + chipid + ")");
  }

  // ---------------------------------------------------------------------------------------
  // common key events

  handleCellEditKeyUp(e, rowId, fieldname)
  {
    // TODO delete
    if (e.key === 'Enter' || e.keyCode === 13)
    {

    }
    else if (e.key === 'Escape')
    {
      
    }
  }

  // ---------------------------------------------------------------------------------------
  // resizing row heights and column widths events

  handleMouseDownRowEW(e, index)
  {
    // resizing column width
    const mouseStart = e.clientX;
    const colindex = index;
    const cellWidth = this.state.headers[colindex].width;
    
    const element = e.target;
    element.style.backgroundColor = IConst.colorResizerBackground;

    const onMouseMoveRowEW = (e) => 
    {
      const newwidth = e.clientX - mouseStart + cellWidth;
      if (newwidth > this.state.headers[colindex].maxWidth &&
          newwidth !== this.state.headers[colindex].maxWidth)
      {
        const newList2 = this.state.headers;
        newList2[colindex].width = this.state.headers[colindex].maxWidth;
        this.setState({headers : newList2});
      }
      else
      if (newwidth < this.state.headers[colindex].minWidth &&
        newwidth !== this.state.headers[colindex].minWidth)
      {
        const newList2 = this.state.headers;
        newList2[colindex].width = this.state.headers[colindex].minWidth;
        this.setState({headers : newList2});
      }
      else
      if (newwidth < this.state.headers[colindex].maxWidth &&
          newwidth > this.state.headers[colindex].minWidth)
      {
        const newList2 = this.state.headers;
        newList2[colindex].width = newwidth;
        this.setState({headers : newList2});
      }
      else 
      {
        //console.log("onMouseUpRowEW no resizing possible");
      }
    }

    const onMouseUpRowEW = (e) => 
    {
      document.removeEventListener('mousemove', onMouseMoveRowEW);
      document.removeEventListener('mouseup', onMouseUpRowEW);
      document.body.style.userSelect = "auto"; 
      element.style.backgroundColor = 'transparent';
    };    

    document.addEventListener('mousemove', onMouseMoveRowEW);
    document.addEventListener('mouseup', onMouseUpRowEW);    
    document.body.style.userSelect = "none";  
  }

  // ---------------------------------------------------------------------------------------
  // header menu events

  HideColumn(headerIndex)
  {
    // hide one column
    const newHeaders = this.state.headers;
    newHeaders[headerIndex].isVisible = false;
    this.setState({headers: newHeaders});
  }

  SortColumn(headerIndex, sortAscending)
  {
    // sort the data for one field
    const field = this.state.headers[headerIndex].dataFieldName;
    if (this.state.headers[headerIndex].editType === IConst.editType_Textfield ||
      this.state.headers[headerIndex].editType === IConst.editType_TextfieldMultiline)
    {
      // strings
      const newData = [...this.state.data].sort((a, b) => {
        if (sortAscending)
        {
          return a[field].localeCompare(b[field]);
        }
        else
        {
          return b[field].localeCompare(a[field]);
        }
      });
      this.setState({data: newData});
      return;
    }
    else
    if (this.state.headers[headerIndex].editType === IConst.editType_Integer ||
      this.state.headers[headerIndex].editType === IConst.editType_Decimal ||
      this.state.headers[headerIndex].editType === IConst.editType_Dropdown ||
      this.state.headers[headerIndex].editType === IConst.editType_Date)
    {
      // numbers, dates, dropdowns
      const newData = [...this.state.data].sort((a, b) => {
        if (sortAscending)
        {
          return a[field] - b[field];
        }
        else
        {
          return b[field] - a[field];
        }
      });
      this.setState({data: newData});
      return;
    }
    else 
    {
      alert("Unknown type for sortings: " + this.state.headers[headerIndex].editType);
    }
  }


  render() 
  {
    const { classes } = this.props;
    const { page, limit } = this.state;
    const data = this.state.data.slice(page * limit, page * limit + limit);
    const mainChecked = this.state.mainChecked;
    const mainIndeterminated = this.state.mainIndeterminated;
    const mainButtonsDisabled = this.state.mainButtonsDisabled;
    const headers = this.state.headers;

    const sizeMainButton = this.props.settings.buttonSizeMain;

    return (
      <Paper 
        className={classes.paper}
        >
        <TableContainer
          tabIndex={0}
          onKeyUp={this.handleTableMainKeyUp}
          
          className={classes.table_container}
          style={{
            height: 650, // Set the max height to allow scrolling after 5 items
            overflowY: 'auto', // Enables vertical scrolling
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
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
            sx={{ width: '1800px', }}
          >
            <ITableHeader
              className={classes.table_head_row}
              settings={this.props.settings}
              headers={headers}
              mainChecked={mainChecked}
              mainIndeterminated={mainIndeterminated}
              handleMouseDownRowEW={(e, colHeadIndex)=>this.handleMouseDownRowEW(e, colHeadIndex)}
              handleCheckboxClickHeader={(e)=>this.handleCheckboxClickHeader(e)}
              HideColumn={(headerIndex) => this.HideColumn(headerIndex)}
              SortColumn={(headerIndex, sortAscending) => this.SortColumn(headerIndex, sortAscending)}
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
                    settings={this.props.settings}
                    headers={this.props.headers}
                    rowInfoList={this.state.rowInfoList}
                    rowInfoIndex={rowInfoIndex}
                    oldRow={row}
                    primaryKey={this.props.primaryKey}
                    row={row}
                    setMainButtonState={() => this.setMainButtonState()}
                    handleUndoInsertedRows={(rowIndex) => this.handleRowEditButtons(rowIndex)}
                    handleSelectionClickRow={(rowid) => this.handleSelectionClickRow(rowid)}
                    handleSpecialButtonClick={(rowid, field) => this.props.handleSpecialButtonClick(rowid, field)}
                    handleDataChange={(newvalue, rowid, field) => this.handleDataChange(newvalue, rowid, field)}
                    handleSaveOneRow = {(row, state) =>  this.handleSaveOneRow(row, state)}
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
        <Table
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.paper',
            boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',  // Optional: adds shadow to separate pagination
          }}>
          <TableFooter>
            <TableRow>

              {/* new row button --------------------------------------------------------------- */}
              {this.props.settings.hasButtonNewRow &&
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleNewRow()}
              >
              <img 
                src={IConst.imgAddButton}
                title='Ctrl-I'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                 }} 
              />&nbsp;New row</IconButton>
              }

              {/* save all --------------------------------------------------------------------- */}    
              {this.props.settings.hasButtonSaveAll &&
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                disabled={mainButtonsDisabled}
                className={classes.mainButtons}
                onClick={e => this.handleSaveAll(e)}
              >
              <img 
                src={IConst.imgSaveButton}
                title='Ctrl-S'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                  opacity: (!mainButtonsDisabled ? 1 : 0.2) 
                 }} 
              />Save all</IconButton>
              }

              {/* undo all ------------------------------------------------------------------ */}     
              {this.props.settings.hasButtonUndoAll &&
              <IconButton
                disabled={mainButtonsDisabled}
                className={classes.mainButtons}
                onClick={e => this.handleUndoAll(e)}
              >
              <img 
                src={IConst.imgUndoButton}
                title='Ctrl-U'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                  opacity: (!mainButtonsDisabled ? 1 : 0.2) 
                 }} 
              />&nbsp;Undo all</IconButton>
              }

              {/* export for excel all rows ----------------------------------------------------- */}    
              {this.props.settings.hasButtonExcelAll && 
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(true)}
              >
              <img 
                src={IConst.imgExcelButton}
                title='Ctrl-Shift-C'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                 }} 
              />&nbsp;Copy all rows</IconButton>
              }

              {/* export for excel only selected rows --------------------------------------------- */}
              {this.props.settings.hasButtonExcelSelected &&
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(false)}
              >
              <img 
                src={IConst.imgExcelButton}
                title='Ctrl-Shift-E'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                 }} 
              />&nbsp;Copy selected rows</IconButton>
              }

              {/* manage columns ----------------------------------------------------------- */}
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleManageColumns()}
              >
              <img 
                src={IConst.imgColumsButton}
                title='Ctrl-M'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                 }} 
              />&nbsp;Manage columns</IconButton>


              {/* tests ----------------------------------------------------------- */}
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleTest()}
              >
              <img 
                //src={IConst.imgExcelButton}
                title='Ctrl-M'
                style={{ 
                  width: sizeMainButton, 
                  height: sizeMainButton,
                 }} 
              />&nbsp;Test</IconButton>

              <TablePagination
                component="div"
                count={this.state.data.length}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
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
                sx={{
                  borderTop: '1px solid rgba(224, 224, 224, 1)',
                  overflow: 'hidden',
                  '.MuiTablePagination-toolbar': {
                    minHeight: '40px', // Reduced from 52px
                    paddingLeft: '8px', // Reduced from 16px
                    paddingRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '.MuiTablePagination-spacer': {
                    flex: '1 1 100%',
                    // flex: '0.2', // Reduced flex space
                  },
                  '.MuiTablePagination-selectLabel': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', //'0.875rem',
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginRight: '4px', // added
                  },
                  '.MuiTablePagination-select': {
                    minWidth: '16px',
                    paddingRight: '12px', // Reduced from 24px
                    paddingLeft: '4px', // Reduced from 8px
                    textAlign: 'left',
                    textAlignLast: 'left',
                  },
                  '.MuiTablePagination-displayedRows': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', // Smaller font
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginLeft: '4px',
                    marginRight: '4px',
                  },
                  '.MuiIconButton-root': {
                    padding: '4px', // Reduced from 12px
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
                    fontSize: '1.2rem', // Smaller icons
                  },
                  // Make the whole pagination more compact
                  '& .MuiToolbar-root': {
                    gap: '2px',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>

        {/* button dialog */}
        {this.state.buttonDialogId && this.state.openButtonDialog &&
        <IButtonDialog
          id={this.buttonDialogId}
          open={this.state.openButtonDialog}
          title={this.state.buttonDialogTitle}
          question={this.state.buttonDialogQuestion}
          buttonList={this.state.buttonDialogButtons}
          buttonDialogListType={this.state.buttonDialogListType}
          dialogIconType={this.state.dialogIconType}
          buttonWidth={120}
          handleDialogButtons={(index) => this.handleDialogButtons(index, this.state.buttonDialogId)}
        />}

        {/* button dialog 
        {this.state.openManageColumns && 
        <IHeaderManage
          open={this.state.openManageColumns}
          headers={this.state.headers}
          arrangeColumns={(doIt, newlist) => this.arrangeColumns(doIt, newlist)}
        />
        }
        */}

        {/* main edit dialog */}
        {this.props.dialogName === 'IDataDialog_First' &&  this.state.openDataModalDialog &&
          <IDataDialog_First
            open={this.state.openDataModalDialog}
            settings={this.props.settings}
            headers={this.props.headers}
            row={this.state.selectedRow}
            primaryKey={this.props.primaryKey}
            handleSubmitModalDialog={(row, saveIt) => this.handleSubmitModalDialog(row, saveIt)}
          >
          </IDataDialog_First>
        }

      </Paper>
    );
  }
}

ITable.propTypes = { classes: PropTypes.object, };

export default withStyles(ITable, useStyles);
