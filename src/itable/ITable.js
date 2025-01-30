import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'tss-react/mui';
import 'react-resizable/css/styles.css';

import {
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Grid,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';


import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import { useStyles } from '../ITableStyles.js';

import IConst from './IConst';
import IUtils from './IUtils';
import { getSortRows } from './IUtilsSort';
import { getSortFunc } from './IUtilsSort';
import ITableHeader from './ITableHeader';
import ITableRow from './ITableRow'; 

import IDialogButton from './IDialogButton';
import IDialogSorting from './IDialogSorting';

  
class ITable extends React.Component {
  constructor(props) {
    super(props);

    const {
      headers, 
    } = this.props;

    this.state = {
      headers: headers,
      data: this.getDataList(),
      sortings: this.getSortingList(),
      openDialogSorting: false,
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
      selectedRow: null,
      isHoveredOrResizing: false,

      // enabling / disabling buttons SAVE ALL and UNDO ALL
      mainButtonsDisabled: true,
      countChangedRows: 0,

      rowHeight: 200,
      colwidth: 120,
      headerHeight: 35,
      minRowHeight: 29,

      // filtering
      filters: [],
      rowInfoList: this.setRowInfoList(),

      openSnackbar: false,
      textSnackbar: "",
    };
  }

  specialButtonIndex = 0;
  specialButtonRowId = 0;
  specialButtonField = "";
  
  componentDidMount() 
  {
    // we check the headers and fill empty fields with default values
    this.checkHeaders();
  }

  // ---------------------------------------------------------------------------------------
  // preparing

  getDataList()
  {
    // in order to be able to UNDO data changes,
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
      const oneInfo =
      {
        id: this.props.data[i][this.props.primaryKey],
        height: this.props.settings.initialRowHeight,
        state: IConst.rowStateUnchanged,
        selected: false,
        editing: false,
        saving: false, 
      }
      newlist.push(oneInfo);
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
      if (!this.state.headers[h].minWidth) this.state.headers[h].minWidth = this.state.headers[h].width / 2;
      if (!this.state.headers[h].maxWidth) this.state.headers[h].maxWidth = this.state.headers[h].width * 2;
      if (!this.state.headers[h].textMaxLength) this.state.headers[h].textMaxLength = 255;
      if (!this.state.headers[h].numberMinValue) this.state.headers[h].numberMinValue = 0;
      if (!this.state.headers[h].numberMaxValue) this.state.headers[h].numberMaxValue = 100;
      if (!this.state.headers[h].decimalCount) this.state.headers[h].decimalCount = 3;
      if (!this.state.headers[h].editType) this.state.headers[h].editType = "error";
      if (!this.state.headers[h].defaultValue) this.state.headers[h].defaultValue = "";
      if (!this.state.headers[h].dataFieldName) this.state.headers[h].dataFieldName = "";
      if (!this.state.headers[h].horizontalAlign) this.state.headers[h].horizontalAlign = IConst.horizontalAlign_Left;
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
  
  handleNewRow()
  {
    // first get a new id
    const min = Math.min(...this.state.rowInfoList.map(item => item.id));
    const minid = min >= 0 ? -1: min - 1;
    
    // now we fill all default values
    let objRow = {};
    objRow[this.props.primaryKey] = minid;
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
    const oneInfo =
    {
      id: minid,
      height: this.props.settings.initialRowHeight,
      state: IConst.rowStateInserted,
      selected: false,
      editing: true,
      saving: false, 
      forcingUpdate: true,
    }
    const newInfoList = [...this.state.rowInfoList, oneInfo];

    // now add the filter "inserted rows"
    // if not, the new row might not be found in the dataset 
    let newfilters = this.state.filters.length === 0 ? [] : [...this.state.filters];
    const index = newfilters.findIndex(f => f.filterFieldname === "");
    if (index === -1)  
    {
      const oneFilter = { 
        filterFieldname: "", 
        filterOperator: IConst.filterOperator_Inserted, 
        filterValue: "" };
      newfilters.push(oneFilter);
    }
    else
    {
      newfilters[index].filterOperator = IConst.filterOperator_Inserted;
    }

    // now add the new row to data
    const newlist = newInfoList.filter(r => r.state !== IConst.rowStateUnchanged);
    const cntChangedRows = newlist.length;
    this.setState({
      page: 0,
      rowInfoList: newInfoList,
      data: newRows,
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
      mainButtonsDisabled: true
    });

    // save to DB now
    this.props.handleSaveOneRowClick(row, state);
  }

  handleSaveAll()
  {
    // save all changed rows
    const listedited = this.state.rowInfoList.filter(d => d.state !== IConst.rowStateUnchanged);
    if (this.state.mainButtonsDisabled && listedited.length === 0) return true;

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
      mainButtonsDisabled: true
    });


    // no error found, thus we can save all rows now
    this.props.handleSaveAllRowsClick(rowList, stateList);
    return true;
  }

  showDataErrorMessage(errorText)
  {
    // show a dalog with the error messages 
    let newText = errorText;

    const buttons = [ 
      { caption: "Close", 
        icon: DoneRoundedIcon, 
        style: "iconButtonStyleGrey", 
        horizontalAlign: IConst.horizontalAlign_Left, 
        X: 1, Y: 1, },
      { caption: "Copy",  
        icon: ContentCopyRoundedIcon, 
        style: "iconButtonStyleGrey", 
        horizontalAlign: IConst.horizontalAlign_Left, 
        X: 2, Y: 1, }, 
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
    // undo all rows
    let newData = this.props.data;
    let newInfo = this.state.rowInfoList;
    let undoList = this.state.rowInfoList.filter(r => 
      r.state !== IConst.rowStateUnchanged && r.saving === false);

    for (let r = undoList.length - 1; r >= 0; r--)
    {
      const rowid = undoList[r][this.props.primaryKey];
      if (undoList[r].state === IConst.rowStateInserted)
      {
        // row was inserted, thus we need to delete it
        newInfo = newInfo.filter(l => l.id !== rowid);
        newData = newData.filter(l => l[this.props.primaryKey] !== rowid);
      }
      else
      {
        // row was edited or deleted, so we copy the old values
        const index = newInfo.findIndex(i => i.id === undoList[r].id);
        newInfo[index].state = IConst.rowStateUnchanged;
        newInfo[index].editing = false;
        newInfo[index].forceUpdate = true;
      }

      const cntChangedRows = newInfo.filter(i => i.state !== IConst.rowStateUnchanged).length;
      this.setState({
        buttonDialogOpen: false,
        rowInfoList: newInfo,
        data: newData,
        mainButtonsDisabled: cntChangedRows === 0,
        countChangedRows: cntChangedRows
      });
    }
  }
 
  handleUndoAll()
  {
    // ask before undoing all rows: open the confirm dialog YES / NO
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
          const isDecimal = eType === IConst.editType_Decimal;
          const isDropdown = eType === IConst.editType_Dropdown;
          const isChipMenu = eType === IConst.editType_Chip;
          const isGetter = eType === IConst.editType_Getter;
          const isStateButton = eType === IConst.editType_StateButton;
          const isCheckbox = eType === IConst.editType_Checkbox;
          const isDate = eType === IConst.editType_Date;
          const datetimeformat = this.props.headers[h].datetimeFormat;

          let value = this.state.data[rowIndex][this.props.headers[h].dataFieldName];
          if (isDecimal) value = value.toFixed(this.props.headers[h].decimalCount);
          if (isDate) value = IUtils.formatDateTime(value, datetimeformat, this.props.settings.localization);
          const isString = typeof value === 'string' || value instanceof String;
          if (value === null || value === undefined || !value) value = "";

          if (isGetter) 
          {
            // "row" is used to evaluate the getter, don't delete it here
            const row = this.state.data[rowIndex];
            value = eval(this.props.headers[h].valueGetter);
          }

          if (isStateButton)
          {
            value = this.state.data[rowIndex][this.props.headers[h].dataFieldName];
          }
          if (isCheckbox)
          {
            value = this.state.data[rowIndex][this.props.headers[h].dataFieldName] ? "Yes" : "No";
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

  handleOpenDialogSorting()
  {
    // open dialog manage sorting
    this.setState({openDialogSorting: true});
  }

  deleteAllFilters()
  {
    const newfilters = [];
    this.setState({filters: newfilters});
  }

  closeSnackbar()
  {
    this.setState({openSnackbar: false});
  }

  // ---------------------------------------------------------------------------------------
  // clicks from button dialog

  rowUpdate(info, row)
  {
    // copy the new row and its state 
    // and update the buttons SAVE ALL, UNDO ALL

    let newInfo = [...this.state.rowInfoList];
    let newData = [...this.state.data];
    
    // all other rows we can update with row
    const rowId = row[this.props.primaryKey];
    const rowIndex = this.state.data.findIndex(r => r[this.props.primaryKey] === rowId);
    const infoIndex = this.state.rowInfoList.findIndex(i => i.id === rowId);
    newInfo[infoIndex].state = info.state;
    newInfo[infoIndex].forceUpdate = true;
    IUtils.copyOneRow(row, newData[rowIndex]);


    const newlist = newInfo.filter(r => r.state !== IConst.rowStateUnchanged);
    const cntChangedRows = newlist.length;
    this.setState({
      rowInfoList: newInfo,
      data: newData,
      mainButtonsDisabled: cntChangedRows === 0,
      countChangedRows: cntChangedRows
    });
  }

  rowUndo(info, row)
  {
    // copy the new row and its state 
    // and update the buttons SAVE ALL, UNDO ALL
    const rowId = row[this.props.primaryKey];

    let newInfo = [...this.state.rowInfoList];
    let newData = [...this.state.data];
    let newFilters = [...this.state.filters];

    if (info.state === IConst.rowStateInserted)
    {
      // rows NULL has to be deleted
      const rowId = info.id;
      newData = newData.filter(d => d[this.props.primaryKey] !== rowId);
      newInfo = newInfo.filter(d => d.id !== rowId);
      newFilters = newFilters.filter(f => f.filterOperator !== IConst.filterOperator_Inserted);
    }
    else
    {
      // all other rows we can update with row
      const rowIndex = this.state.data.findIndex(r => r[this.props.primaryKey] === rowId);
      const infoIndex = this.state.rowInfoList.findIndex(i => i.id === rowId);
      newInfo[infoIndex].state = IConst.rowStateUnchanged;
      newInfo[infoIndex].editing = false;
      newInfo[infoIndex].forceUpdate = true;
      IUtils.copyOneRow(this.props.data[rowIndex], newData[rowIndex]);
    }

    const newlist = newInfo.filter(r => r.state !== IConst.rowStateUnchanged);
    const cntChangedRows = newlist.length;
    this.setState({
      rowInfoList: newInfo,
      data: newData,
      filters: newFilters,
      mainButtonsDisabled: cntChangedRows === 0,
      countChangedRows: cntChangedRows
    });
  }

  openModalDataDialog(row)
  {
    // open the new edit dialog (outside ITable)
    this.props.editRowModalDialog(row);
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
        // button 'NO' was pressed
        // nothing to do here
      }
      return;
    }
    else if (
      dialogID === "MenuButton" || 
      dialogID === "SpecialButton" || 
      dialogID === "StateButton")
    {
      // do you want to save?
      if (buttonIndex === 2) return; // cancel was clicked
      else if (buttonIndex === 0) {
        // YES was clicked => we check if the data is ok
        // if not, we dont proceed
        if (!this.handleSaveAll()) return;     
      }
      // else : NO was clicked => nothing to do here
      if (dialogID === "MenuButton")  
        this.props.menuButtonClick(this.specialButtonIndex);
      else if (dialogID === "SpecialButton")  
        this.props.handleSpecialButtonClick(this.specialButtonRowId, this.specialButtonField);
      else if (dialogID === "StateButton")  
        this.props.handleStateButtonClick(this.specialButtonRowId, this.specialButtonField);
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

  // ---------------------------------------------------------------------------------------
  // row selection procedures / functions

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
    const listedited = this.state.rowInfoList.filter(d => d.state !== IConst.rowStateUnchanged);
    if (listedited.length > 0 || (!this.state.mainButtonsDisabled))
    {
      // do you want to save?
      this.specialButtonRowId = rowid;
      this.specialButtonField = field;
      this.checkForChangedData("SpecialButton");
    }
    else
    {
      this.props.handleSpecialButtonClick(rowid, field);
    }
  }

  handleStateButtonClick(rowid, field)
  {
    const listedited = this.state.rowInfoList.filter(d => d.state !== IConst.rowStateUnchanged);
    if (listedited.length > 0 || (!this.state.mainButtonsDisabled))
    {
      // do you want to save?
      this.specialButtonRowId = rowid;
      this.specialButtonField = field;
      this.checkForChangedData("StateButton");
    }
    else
    {
      this.props.handleStateButtonClick(rowid, field);
    }
  }

  setChangedSortings(newSorting, origin) 
  {
    if (newSorting === null)
    {
      // cancel was pressed
      this.setState({openDialogSorting: false});
    }
    else if (origin === "dialog")
    {
      // here we render the new sorting of rows
      const newlist = [];
      const newheaders = [...this.state.headers];
      for (let i = 0; i < newSorting.length; i++)
      {
        if (newSorting[i].order !== "")
        {
          const oneSort = { 
            order: newSorting[i].order, 
            orderByField: newSorting[i].orderByField };
          newlist.push(oneSort);
        }
        
        // now also change the visibility of columns
        const headerIndex = newSorting[i].headerId;
        newheaders[headerIndex].isVisible = newSorting[i].isVisible;
      }

      this.setState({
        openDialogSorting: false,
        sortings: newlist,
        headers: newheaders,
      });
    }
    else if (origin === "menu")
    {
      this.setState({
        openDialogSorting: false,
        sortings: newSorting,
      });
    }
  }

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

  checkForChangedData(dialogID)
  {
    // button dialog: Do you want to save?
    this.setState({
      buttonDialogId: dialogID,
      buttonDialogOpen: true,
      buttonDialogTitle: "Changes found",
      buttonDialogQuestion: "Do you want to save your changes?",
      buttonDialogListType: IConst.buttonDialogTypeYesNoCancel,
      buttonDialogIconType: IConst.buttonDialogIconType_Question,
      buttonDialogHorizontalAlign: 'center',
      buttonDialogSizeType: IConst.buttonDialogSizeType_ButtonWidths,
      buttonDialogWidth: 120,
    });
  }

  menuButtonClick(index)
  {
    const listedited = this.state.rowInfoList.filter(d => d.state !== IConst.rowStateUnchanged);
    if (listedited.length > 0 || (!this.state.mainButtonsDisabled))
    {
      // do you want to save?
      this.specialButtonIndex = index;
      this.checkForChangedData("MenuButton");
    }
    else
    {
      this.props.menuButtonClick(index);
    }
  }

  updateRowsFromParent = (rows, newparams) => 
  {
    // here we can update the data calles by teh parent
    let newData = [...this.state.data];
    let newInfo = [...this.state.rowInfoList];

    for (let r = 0; r < rows.length; r++)
    {
      const oldRowId = newparams[r].oldId;
      const newRowId = newparams[r].newId;
      const oldState = newparams[r].state;
      const newState = newparams[r].newstate;
      const ok = newparams[r].success;
      const dataIndex = newData.findIndex(r => r[this.props.primaryKey] === oldRowId);
      const infoIndex = newInfo.findIndex(i => i.id === oldRowId);
      const propsIndex = this.props.data.findIndex(i => i[this.props.primaryKey] === oldRowId);

      if (dataIndex !== -1 && infoIndex !== -1)
      {
        if (ok && oldState !== IConst.rowStateDeleted)
        {
          // edited rows
          // copy data (new values, old values)
          IUtils.copyOneRow(rows[r], newData[dataIndex]);
          newInfo[infoIndex].state = newState;
          newInfo[infoIndex].saving = false;
          newInfo[infoIndex].editing = false;
          newInfo[infoIndex].forceUpdate = true;

          if (propsIndex !== -1)
          {
            // here we also update the old rows in props.data
            // in order to have updated values in a later UNDO of rows
            IUtils.copyOneRow(rows[r], this.props.data[propsIndex]);
          }
        }
        else if (ok && oldState === IConst.rowStateDeleted)
        {
          // deleted rows
          newData = newData.filter(d => d[this.props.primaryKey] !== oldRowId);
          newInfo = newInfo.filter(d => d.id !== oldRowId);
        }
        else if (ok && oldState === IConst.rowStateInserted)
        {
          // inserted rows
          // copy data (new values, old values)
          IUtils.copyOneRow(rows[r], newData[dataIndex]);
          newData[this.props.primaryKey] = newRowId;
          newInfo[infoIndex].id = newRowId;
          newInfo[infoIndex].state = newState;
          newInfo[infoIndex].saving = false;
          newInfo[infoIndex].editing = false;
        }
        else if ((!ok) && oldState === IConst.rowStateEdited)
        {
          // an error occured while saving to DB, 
          // thus we overwite already edited data (new values, old values)
          IUtils.copyOneRow(this.props.data[r], newData[dataIndex]);
          newInfo[infoIndex].state = newState;
          newInfo[infoIndex].saving = false;
          newInfo[infoIndex].editing = false;
          newInfo[infoIndex].forceUpdate = true;
        }
        else if ((!ok) && oldState === IConst.rowStateDeleted)
        {
          // an error occured while saving to DB, 
          // thus we just set the state to unchanged
          newInfo[infoIndex].state = newState;
          newInfo[infoIndex].saving = false;
          newInfo[infoIndex].editing = false;
          newInfo[infoIndex].forceUpdate = true;
        }
        else if ((!ok) && oldState === IConst.rowStateInserted)
        {
          // an error occured while saving to DB, 
          // thus we just undo/delete the  already insreted rows
          newData = newData.filter(d => d[this.props.primaryKey] !== oldRowId);
          newInfo = newInfo.filter(d => d.id !== oldRowId);
        }
      }
    } 

    const newlist = newInfo.filter(r => r.state !== IConst.rowStateUnchanged);
    const cntChangedRows = newlist.length;
    this.setState({
      rowInfoList: newInfo,
      data: newData,
      mainButtonsDisabled: cntChangedRows === 0,
      countChangedRows: cntChangedRows
    });
  }

  render() 
  {
    const { classes } = this.props;
    const { page, limit } = this.state;
    
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
            filterOperator === IConst.filterOperator_IsSmallerOrEqualThan ? 
              IUtils.getCellValue(row, filterField, editType, getter) <= filterTypeValue :
            filterOperator === IConst.filterOperator_IsBiggerThan ? 
              IUtils.getCellValue(row, filterField, editType, getter) > filterTypeValue :
            filterOperator === IConst.filterOperator_IsBiggerOrEqualThan ? 
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

    // multiple ordering
    for (let s = this.state.sortings.length - 1; s >= 0; s--) {
      data = getSortRows(data,
        getSortFunc(
          this.state.sortings[s].order, 
          this.state.sortings[s].orderByField, 
          this.state.headers)
      );
    }

    const filteredRowsCount = data.length;
    data = data.slice(page * limit, page * limit + limit);

    const mainChecked = this.state.mainChecked;
    const mainIndeterminated = this.state.mainIndeterminated;
    const mainButtonsDisabled = this.state.mainButtonsDisabled;
    const cntChangedRows = this.state.countChangedRows;

    return (
      <div style={{ overflowX: 'none' }} >
        <TableContainer
          tabIndex={0}
          className={classes.itable_container}
          onKeyUp={this.handleTableMainKeyUp}
          style={{
            overflowY: 'auto', // Enables vertical scrolling
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
          }}>

          <Table className={classes.itable} stickyHeader>
            <ITableHeader
              className={classes.itable_head_row}
              settings={this.props.settings}
              headers={this.state.headers}
              filters={this.state.filters}
              sortings={this.state.sortings}
              mainChecked={mainChecked}
              mainIndeterminated={mainIndeterminated}
              handleCheckboxClickHeader={(e)=>this.handleCheckboxClickHeader(e)}
              setChangedHeaders={(newheaders) => this.setChangedHeaders(newheaders)}
              setChangedFilters={(newfilters) => this.setChangedFilters(newfilters)}
              setChangedSortings={(newsortings, origin) => this.setChangedSortings(newsortings, origin)}
              handleOpenDialogSorting={() => this.handleOpenDialogSorting()}
            />
            <TableBody className={classes.itable_body_row}>
              {data.map((row, rowIndex) => {
                // we use the old values for undoing changes
                const rowid = row[this.props.primaryKey];
                const rowInfoIndex = this.state.rowInfoList.findIndex(r => r.id === rowid);

                return(
                  <ITableRow
                    key={`itablerow-row${rowIndex}`}
                    className={classes.itable_row_cell}
                    settings={this.props.settings}
                    headers={this.props.headers}
                    rowInfo={this.state.rowInfoList[rowInfoIndex]}
                    oldRow={row}
                    primaryKey={this.props.primaryKey}
                    row={row}
                    rowUpdate={(info, row) => this.rowUpdate(info, row)}
                    rowUndo={(info, row) => this.rowUndo(info, row)}
                    handleSelectionClickRow={(rowid) => this.handleSelectionClickRow(rowid)}
                    handleSpecialButtonClick={(rowid, field) => this.handleSpecialButtonClick(rowid, field)}
                    handleStateButtonClick={(rowid, field) => this.handleStateButtonClick(rowid, field)}
                    handleSaveOneRow = {(row) =>  this.handleSaveOneRow(row)}
                    showDataErrorMessage = {(errorText) =>  this.showDataErrorMessage(errorText)}
                    editRowModalDialog={(row) => this.props.editRowModalDialog(row)}  
                  />
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>

        <Grid 
          className={classes.itable_footerrow}
          container>
          <Grid item style={{ flex: 1, }}> 

              {this.props.settings.menuButtonList && 
                this.props.settings.menuButtonList.map((button, index) => {
                const ButtonIcon = button.icon;
                const buttonStyle = button.style;
                if (button.positionStart === true)
                return (
                  <IconButton
                    key={`menuButtonList-button${index}`}
                    className={classes.mainButtons}
                    onClick={() => this.menuButtonClick(button.id)}>
                    {button.icon && <ButtonIcon className={classes[buttonStyle]} />}
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
              <this.props.settings.iconMainButtonNewRow className={classes.iconMainButtonNewRow}/>
              New row</IconButton></Tooltip>}

              {/* save all */}
              {this.props.settings.hasButtonSaveAll &&
              <Tooltip title="Ctrl-S" arrow><span>
              <IconButton
                className={classes.mainButtons}
                disabled={mainButtonsDisabled}
                onClick={e => this.handleSaveAll(e)}>
                <this.props.settings.iconMainButtonSaveAll 
                  className={classes.iconButtonStyleSaveAll}
                  sx={{ opacity: mainButtonsDisabled ? 0.2 : 1 }}/>
              Save all ({cntChangedRows})</IconButton></span></Tooltip>}

              {/* undo all  */}
              {this.props.settings.hasButtonUndoAll &&
              <Tooltip title="Ctrl-U" arrow><span>
              <IconButton
                className={classes.mainButtons}
                disabled={mainButtonsDisabled}
                onClick={e => this.handleUndoAll(e)}>
              <this.props.settings.iconMainButtonUndoAll 
                className={classes.iconButtonStyleUndoAll} 
                sx={{ opacity: mainButtonsDisabled ? 0.2 : 1 }}/>
              Undo all ({cntChangedRows})</IconButton></span></Tooltip>}

              {/* export for excel all rows */}    
              {this.props.settings.hasButtonExcelAll && 
              <Tooltip title="Ctrl-E" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(true)}>
              <this.props.settings.iconMainButtonCopyToExcel className={classes.iconButtonStyleExcelExport}/>
              Copy all rows</IconButton></Tooltip>}

              {/* export for excel only selected rows */}
              {this.props.settings.hasButtonExcelSelected &&
              <Tooltip title="Ctrl-Shift-E" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={e => this.handleCopyForExcel(false)}>
              <this.props.settings.iconMainButtonCopyToExcel className={classes.iconButtonStyleExcelExport}/>
              Copy selected rows</IconButton></Tooltip>}

              {/* manage the sortings of rows */}
              {this.props.settings.hasButtonManageSorting &&
              <Tooltip title="Ctrl-Shift-M" arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={() => this.handleOpenDialogSorting(true)}>
              <this.props.settings.iconMainButtonManageSorting className={classes.iconButtonStyleManageSorting}/>
              Manage sorting ...</IconButton></Tooltip>}

              {/* delete all filters */}
              {this.props.settings.hasButtonDeleteAllFilters &&
              <Tooltip arrow>
              <IconButton
                className={classes.mainButtons}
                onClick={() => this.deleteAllFilters()}>
              <this.props.settings.iconMainButtonDeleteFilters className={classes.iconButtonStyleDeleteFilters}/>
              Delete all filters</IconButton></Tooltip>}

              {this.props.settings.menuButtonList &&
                this.props.settings.menuButtonList.map((button, index) => {
                const ButtonIcon = button.icon;
                const buttonStyle = button.style;
                if (button.positionStart === false)
                return (
                  <IconButton
                    key={`menuButtonList-button${index}`}
                    className={classes.mainButtons}
                    onClick={() => this.menuButtonClick(button.id)}>
                    {button.icon && <ButtonIcon className={classes[buttonStyle]}/>}
                    {button.caption}
                  </IconButton>
                );
              })}
          </Grid>

          <Grid item style={{ display: 'flex', alignItems: 'flex-start'}}>
            <TablePagination
              component="div"
              count={filteredRowsCount}
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
        {this.state.buttonDialogOpen && 
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
          handleDialogButtons={(index) => this.handleDialogButtons(index, this.state.buttonDialogId)}
        />}

        {this.state.openDialogSorting && 
        <IDialogSorting
          openDialogSorting={this.state.openDialogSorting}
          headers={this.state.headers}
          sortings={this.state.sortings}
          setChangedSortings={(newlist, origin) => this.setChangedSortings(newlist, origin)}
        />}

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
      </div>
    );
  }
}

ITable.propTypes = { classes: PropTypes.object, };

export default withStyles(ITable, useStyles);
