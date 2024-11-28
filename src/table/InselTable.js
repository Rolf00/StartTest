import React from 'react';
import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import styled from 'styled-components';

import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox,
  Chip,
} from '@mui/material';

import 'dayjs/locale/de';

import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  FormControlLabel 
} from '@mui/material';


// TODO : is this component free ware?
// TODO : do we need it?
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import { green } from '@mui/material/colors';

import imgChkboxChecked from './chkboxChecked48.png'; 
import imgChkboxUnchecked from './chkboxUnchecked48.png'; 
import imgChkboxIndeterminate from './chkboxIndeterminate48.png'; 
import imgEditButton from './editButton48.png'; 
import imgDeleteButton from './deleteButton48.png'; 
import imgSaveButton from './imgSave48.png'; 
import imgUndoButton from './imgUndo48.png'; 
import imgAddButton from './imgAdd48.png'; 
import 'react-resizable/css/styles.css';
import InselTableCellHeightResizer from './InselTableCellHeightResizer';
import InselTableCellWidthResizer from './InselTableCellWidthResizer';
import InselTableMenu from './InselTableMenu';


const RightText = styled.div`
  text-align: right;
  justify-content: right;
`;

// TODO do we need it?
const chipcolors = {
  Online: '#0d0',
  Offline: '#d00',
};
const chipcolorsbg = {
  Online: '#dfd',
  Offline: '#fdd',
};


function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
  //const monthName = date.toLocaleDateString('de-DE', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}


function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

// TODO : format numbers : 1.23456 => 1.235 | 1.2 => 1.200
const NumberFormatter = ({ number }) => {
  // Format number with commas and two decimal places for 'en-US'
  //const formattedNumber = number.toLocaleString('en-US', {
  const formattedNumber = number.toLocaleString('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  return <span>{formattedNumber}</span>;
}


/*

READ ME: Information about header definitions
=============================================
The headers will be created in the order of theirs definition.
The fields have the following meaning:

- databaseField: 
  The field name on the database, needed for UPDATE and INSERT statements.
  It can be empty for calculated fields or for row selection checkboxes

- headerTitle:
  The title which will be displayed in the table header
  It can be empty for the row selection checkbox

- isResizable: 
  The header width is resizable in the header

- isEditable: true,
- isRequired: true,
- isVisible: true,
- isSortable
- defaultSorting: 'asc',
- width: 45,
- minWidth: 45,
- maxWidth: 45,
- textMaxLength: 0,
- numberMinValue: 0,
- numberMaxValue: 0,
- decimals
- editType: 'checkbox',
- defaultValue: false,
- dataFieldName: '',
- horizontalAlign: 'center',
- dropdownSelection: [],
- hasHeaderMenu
*/


  function renderStatus(status) {
    const colors = {
      Online: '#0d0',
      Offline: '#d00',
    };
    const bgcolors = {
      Online: '#dfd',
      Offline: '#fdd',
    };
    return <Chip 
        label={status} 
        //color={colors[status]} 
        style={{
          color: colors[status],
          backgroundColor: bgcolors[status] 
        }}
        size="small"
         />;
  }

const rowStateUnchanged = 0;  
const rowStateEdited = 1;  
const rowStateDeleted = 2;  
const rowStateInserted = 3;  

class InselTable extends React.Component {
  constructor(props) {
    super(props);

    const {
      settings, 
      headers, 
      primaryKey,
      data } = this.props;
  
    this.state = {
      headers: headers,
      primaryKey: primaryKey,
      data: data,
      //data: this.getDataList(),
      page: 0,
      limit: 5,
      selectedRows: [],
      editingFieldList_User: [],
      editableFields: ["name", "users", "eventCount", "viewsPerUser", "averageTime"],
      newRowData: [],
      mainChecked: false,
      mainIndeterminated: false,
      mainCheckIcon: imgChkboxUnchecked,
      mainEditIcon: imgEditButton,
      mainDeleteIcon: imgDeleteButton,
      mainSaveIcon: imgSaveButton,
      mainUndoIcon: imgUndoButton,
      mainAddIcon: imgAddButton,
      openDialog: false,
      productName: "",
      isCellEditingUser: false,
      editedValue_Users: "",
      newvalue_Users: "",
      rowsWereEdited : false,
      colwidthName: 100,
      colheightName: 50,
      mainDisabled: true,
      rowHeight: 200,
      colwidth: 120,
      headerHeight: 35,
      minRowHeight: 19,

      headerWidthList: this.setHeaderWidthList(),
      rowInfoList: this.setRowInfoList(),
    };
  }

  // ---------------------------------------------------------------------------------------
  // preparing

  getDataList()
  {
    let newlist = [];
    for (let i = 0; i < this.props.data.length; i++)
    {
      newlist = [...newlist, this.props.data[i]];
    }
    return newlist;
  }

  setHeaderWidthList()
  {
    let newlist = [];
    for (let i = 0; i < this.props.headers.length; i++)
    {
      newlist.push(this.props.headers[i].width);
    }
    return newlist;
  }

  setRowInfoList()
  {
    let newlist = [];
    for (let i = 0; i < this.props.data.length; i++)
    {
      let obj = {};
      obj['id'] = this.props.data[i][this.props.primaryKey];
      obj['height'] = this.props.settings.initialRowHeight;
      obj['state'] = rowStateUnchanged; // edited, deleted, inserted, 
      newlist.push(obj);
    }
    //console.log({x:this.primaryKeyIndex});
    return newlist;
  }

  /*
  getPrimaryKeyIndex()
  {
    if (this.props.data.length === 0)
    {
      alert("ERROR no data was delivered.");
      return -1;
    }

    let index = -1;
    for (let d = 0; d < this.props.data[0].length; d++)
    {
      if (this.props.data[0][])

    }


    const index = this.props.headers.findIndex(h => h.dataFieldName === this.props.primaryKey);
    if (index === -1) alert("ERROR missing field primaryKey in header definition.");
    alert("index = " + index);
    return index;
  }
    */


  // ---------------------------------------------------------------------------------------
  // button clicks 

  getRowIndex(rowid)
  {
    // get the index of the row 
    const index = this.state.rowInfoList.findIndex(r => r[this.props.primaryKey] === rowid);
    return index;
  }

  handleDeleteRow(e, rowid)
  {
    // button DELETE for one row was clicked
    const oldState = this.getRowState(rowid);
    if (oldState === rowStateInserted)
    {
      // new rows cannot be deleted
      alert("This is a new row. Just UNDO if you don't want it to be saved.");
      return;
    }

    const isDeleted = this.getRowState(rowid) === rowStateDeleted;
    if (!isDeleted)
    {
      // delete it now
      this.changeRowState(rowid, rowStateDeleted);
    }
  }

  handleUndoRow(e, rowid)
  {
    // button UNDO for one row was clicked
    const oldState = this.getRowState(rowid);
    const index = this.getRowIndex(rowid);


    if (index === -1)
    {
      alert("ERROR handleUndoRow: index = -1.")
      return;
    }

    if (oldState === rowStateEdited)
    {

      console.log("handleUndoRow start props", this.props.data);      

      // row was edited, thus we restore the old values
      this.state.rowInfoList[index].state = rowStateUnchanged;

      // restore the old data
      const oldRow = this.props.data[index];

      const newlist = this.state.data;
      const keys = Object.keys(oldRow);



      // TODO how to get the original values
      for (let f = 0; f < keys.length; f++)
      {
        const field = keys[f];
        newlist[index][field] = this.props.data[index][field];
      }

      //newlist[index] = this.props.data[index];
      console.log("handleUndoRow end props", this.props.data);      
      console.log("handleUndoRow new data", newlist);      

      this.setState({data: newlist});
    }
    else if (oldState === rowStateInserted)
    {
      // row was inserted, thus we remove it from the data list
      const newlist = this.state.data.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({data: newlist});

      // also delete the info list
      const newStatelist = this.state.rowInfoList.select(r => r[this.props.primaryKey] !== rowid);
      this.setState({rowInfoList: newStatelist});
    }
    else if (oldState === rowStateDeleted)
    {
      // row was deleted, thus we restore the old values
      this.state.rowInfoList[index].state = rowStateUnchanged;

      // restore the old data
      const newlist = this.state.data;
      newlist[index] = this.props.data[index];
      this.setState({data: newlist});
    }

    this.SetMainButtons();
  }

  handleInsertRow(e, rowid)
  {
    // button INSERT a new row was clicked
    // first get a new primaryKey => the minimum -1, -2, -3, ... 
    let min = 0;
    for (let r = 0; r < this.state.data.length; r++)
    {
      if (min > this.state.data[r][this.props.primaryKexIndex])
        min = this.state.data[r][this.props.primaryKexIndex];
    }
    min = min - 1;
    
    // get the default values for each field and min for the primary key
    let obj = {};
    for (let h = 0; h < this.props.headers; h++)
    {
      const head = this.props.headers[h];
      obj[head.dataFieldName] = 
        head.fieldname === this.props.primaryKey ? min : head.defaultValue;
    }

    // now also add a new row for the rowInfoList list
    let newlistState = [];
    let objState = {};
    objState['id'] = min;
    objState['height'] = this.props.settings.initialRowHeight;
    objState['state'] = rowStateInserted; // edited, deleted, inserted, 
    newlistState.push(objState);
    this.setState({rowInfoList: newlist});

    // add a new row
    let newlist = this.state.data;
    newlist.push(obj);
    this.setState({data: newlist});
  }

  changeRowState(rowid, newRowState)
  {
    const index = this.state.rowInfoList.findIndex(r => r.id === rowid);
    if (index === -1) 
    {
      alert("ERROR changeRowState: index = -1.");
      return;
    }
    this.state.rowInfoList[index].state = newRowState;
    this.SetMainButtons();
  }

  handleSaveAll(e)
  {
    alert("TODO: save all");
    //alert("All data was saved");
  }

  handleUndoAll(e)
  {
    // undo all changes in all rows
    let hasError = false;
    const changedList = this.state.rowInfoList;
    for (let i = changedList.length - 1; i >= 0; i--)
    {
      const state = changedList[i].state;
      if (state === rowStateEdited)
      {
        this.changeRowState(changedList[i].id, rowStateUnchanged);
      }
      else if (state === rowStateDeleted)
      {
        this.changeRowState(changedList[i].id, rowStateUnchanged);
      }
      else if (state === rowStateInserted)
      {
        changedList.splice(i, 1);
      }
    }
    
    // now get old data for all rows
    const olddatalist = this.props.data;
    this.setState({data: olddatalist});

    if (hasError) alert("ERROR while undoing all rows.");
  }

  SetMainButtons()
  {
    const newlist = this.state.rowInfoList.filter(r => r.state !== rowStateUnchanged);
    const disable = newlist === 0;
    this.setState({mainDisabled: disable});
  }


  // ---------------------------------------------------------------------------------------
  // row procedures / functions

  getRowState(rowid)
  {
    const index = this.state.rowInfoList.findIndex(d => d.id === rowid);
    if (index === -1) 
    {
      alert("ERROR getRowState: index = -1.")
      return '';
    } 
    return this.state.rowInfoList[index].state;
  }

  getRowHeight(rowid)
  {
    const index = this.state.rowInfoList.findIndex(d => d.id === rowid);
    if (index === -1) return this.props.settings.initialRowHeight;
    return this.state.rowInfoList[index]['height'];
  }

  getRowSelection(idx)
  {
    const index = this.state.selectedRows.findIndex(d => d === idx);
    return (index > -1);
  }

  // ---------------------------------------------------------------------------------------
  // row selection procedures / functions

  getIconSource(idx)
  {
    const index = this.state.selectedRows.findIndex(d => d === idx);
    return ((index > -1) ? imgChkboxChecked : imgChkboxUnchecked);
  }

  handleCheckboxClickHeader(e)
  {
    let ischecked = this.state.mainChecked;
    ischecked = !ischecked;
    this.setState({mainIndeterminated: false});
    this.setState({mainChecked: ischecked});

    let newlist = [];
    if (ischecked)
    {
      this.state.data.forEach((row) => {
        newlist = [...newlist, row.id];
      });
    }
    // now update the main list
    this.setState({selectedRows: newlist});
    this.setState({mainCheckIcon: 
      ischecked ? imgChkboxChecked : imgChkboxUnchecked});
  }

  handleSelectionClickRow(e, idx)
  {
    // create a new list in order to be up to date
    let newlist = this.state.selectedRows;

    const selected = this.state.data[idx].id;
    let isSelected = (newlist.findIndex(d => d === selected) > -1);

    if (!isSelected)
    {
      newlist = [...newlist, selected];
      /*
      this.setState({selectedRows: newlist}, () => {
        this.state.selectedRows
      });
      */
      isSelected = true;
    }
    else
    {
      // new selection = FALSE
      newlist = newlist.filter(item => item !== selected);
      isSelected = false;
    }

    let allAreSame = true;
    this.state.data.forEach((row) => {
      const thisRowIsSelected = newlist.findIndex(d => d === row.id) > -1;
      if (isSelected !== thisRowIsSelected)
      {
        allAreSame = false;
      }
    });

    if (allAreSame)
    {
      this.setState({mainIndeterminated: false});
      if (isSelected)
      {
        // all rows are selected
        this.setState({mainChecked: true});
        this.setState({mainCheckIcon: imgChkboxChecked});
      }
      else
      {
        // no row is selected
        this.setState({mainChecked: false});
        this.setState({mainCheckIcon: imgChkboxUnchecked});
      }
    }
    else
    {
      // different states exists
      this.setState({mainIndeterminated: true});
      this.setState({mainCheckIcon: imgChkboxIndeterminate});
    }

    // now update the main list
    this.setState({selectedRows: newlist});
  }


  // ---------------------------------------------------------------------------------------
  // modal dialog

  handleEditnModalDialogClick(e, rowid, row)
  {
    alert("Modal Dialog: not implemented. Jus see an example.");
    // first set the row
    this.setState({editId: rowid});
    // TODO
    /*
    this.setState({dlgName: name});
    this.setState({dlgUser: users});
    this.setState({dlgEvents: events});
    this.setState({dlgViews: views});
    this.setState({dlgTime: time});
    */

    // now open
    this.setState({openDialog: true});
  }

  handleSubmit = () => 
  {
    const idx = this.state.data.findIndex(d => d.id === this.state.editId);
    this.state.data[idx].name = this.state.dlgName;
    // TODO: fill other fields

    this.setState({openDialog: false});
  };

  handleClose = () => 
  {
    this.setState({openDialog: false});
  };  

  handleDialogChange = (e, field) => 
  {
    if (field === "dlgName") this.setState({dlgName: e.target.value});
    if (field === "dlgUser") this.setState({dlgUser: e.target.value});
    // TODO other fields
  };  

  // ---------------------------------------------------------------------------------------
  // copy selection

  handleTableMainKeyUp = (e) => 
  {
    if (e.key === "c" && e.ctrlKey) {
      const txt = window.getSelection().toString();
      navigator.clipboard.writeText(txt);
    }
  }


  // ---------------------------------------------------------------------------------------
  // cell editing procedures and functions

  setRowState(rowid, state)
  {
    // set a new row state
    // if the old state is INSERTED, then we dont change it to edited
    const oldState = this.getRowState(rowid);
    if (oldState === rowStateInserted) return;

    // set a new row state
    const index = this.getRowIndex(rowid);
    const newlist = this.state.rowInfoList;
    newlist[index].state = state;
    this.setState({rowInfoList: newlist});
  }  
  
  handleTextfieldChange(e, rowid, fieldName)
  {

    console.log("handleTextfieldChange start props", this.props.data);      

    // change the data when a field was selected
    const index = this.getRowIndex(rowid);
    const newList = [...this.state.data];
    
    //newList[index][fieldName] = e.target.value;

    this.state.data[index][fieldName] = e.target.value;

    this.setState({data: newList});


    console.log("handleTextfieldChange end props", this.props.data);      
    console.log("handleTextfieldChange end state", this.state.data);      


    // now also change the state of the row
    const rowState = this.getRowState(rowid);
    if (rowState === rowStateUnchanged) this.setRowState(rowid, rowStateEdited);
  }

  handleTextfieldNumberChange(e, rowid, fieldName)
  {
    // change the data when a field was selected
    const index = this.getRowIndex(rowid);
    const newList = this.state.data;
    const number = parseFloat(e.target.value);
    newList[index][fieldName] = number;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowid);
    if (rowState === rowStateUnchanged) this.setRowState(rowid, rowStateEdited);
  }

  handleDropdownChange(e, rowIndex, fieldName)
  {
    // change the data when a field was selected
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === rowStateUnchanged) this.setRowState(rowIndex, rowStateEdited);
  }

  handleCheckboxChange(e, rowIndex, fieldName)
  {
    // change the data when a field was selected
    const newList = this.state.data;
    newList[rowIndex][fieldName] = e.target.value;
    this.setState({data: newList});

    // now also change the state of the row
    const rowState = this.getRowState(rowIndex);
    if (rowState === rowStateUnchanged) this.setRowState(rowIndex, rowStateEdited);
  }


  // ---------------------------------------------------------------------------------------
  // common key events

  handleCellEditKeyUp(e, rowId, fieldname)
  {
    if (e.key === 'Enter' || e.keyCode === 13)
    {

    }
    else if (e.key === 'Escape')
    {
      
    }
  }

  // ---------------------------------------------------------------------------------------
  // resizing row heights and column widths events
 
  handleMouseDownRowNS(e, rowid)
  {
    // resizing row height
    let mouseStart = e.clientY;
    let oldRowHeight = this.getRowHeight(rowid);

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + oldRowHeight;
      if (newheight > this.props.settings.initialRowHeight)
      {
        const newList = this.state.rowInfoList;
        const index = this.state.rowInfoList.findIndex(dr => dr.id === rowid);
        newList[index].height = newheight;
        this.setState({rowInfoList : newList});
      }
    }

    const onMouseUpRowNS = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowNS);
      document.removeEventListener('mouseup', onMouseUpRowNS);
      document.body.style.userSelect = "auto";  
    };    

    document.addEventListener('mousemove', onMouseMoveRowNS);
    document.addEventListener('mouseup', onMouseUpRowNS);  
    document.body.style.userSelect = "none";  
  }

  handleMouseDownRowEW(e, index)
  {
    // resizing column width
    const mouseStart = e.clientX;
    const colindex = index;
    const cellWidth = this.state.headers[colindex].width;

    const onMouseMoveRowEW = (e) => 
    {
      const newwidth = e.clientX - mouseStart + cellWidth;
      const newList2 = this.state.headers;
      newList2[index].width = newwidth;
      this.setState({headers : newList2});
    }

    const onMouseUpRowEW = (e) => 
    {
      document.removeEventListener('mousemove', onMouseMoveRowEW);
      document.removeEventListener('mouseup', onMouseUpRowEW);
      document.body.style.userSelect = "auto"; 
    };    

    document.addEventListener('mousemove', onMouseMoveRowEW);
    document.addEventListener('mouseup', onMouseUpRowEW);    
    document.body.style.userSelect = "none";  
  }

  // ---------------------------------------------------------------------------------------
  // header menu events

  Sort(sortOrder, colHeadIndex)
  {
    const newlist = this.state.headers;
    newlist[colHeadIndex].defaultSorting = sortOrder === 'asc' ? 'desc' : 'asc';
    //this.setState({headers, newlist});
  }


  render() 
  {
    const dataDays = getDaysInMonth(4, 2024);
    const { classes } = this.props;
    const { page, limit } = this.state;
    const data = this.state.data.slice(page * limit, page * limit + limit);
    const mainChecked = this.state.mainChecked;
    const mainIndeterminated = this.state.mainIndeterminated;
    const mainCheckIcon = this.state.mainCheckIcon;
    const mainEditIcon = this.state.mainEditIcon;
    const mainDeleteIcon = this.state.mainDeleteIcon;
    const mainSaveIcon = this.state.mainSaveIcon;
    const mainAddIcon = this.state.mainAddIcon;
    const mainUndoIcon = this.state.mainUndoIcon;
    const mainDisabled = this.state.mainDisabled;
    const colwidth = this.state.colwidth;
    const headers = this.state.headers;
    const rowInfoList = this.state.rowInfoList;


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
            overflow: 'auto',
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
          }}>

          <Table 
          className={classes.table} 
          stickyHeader
          style={{
            height: '800px',

          }}
          >
            {/* ================================================================================ */}
            {/* start of table header ========================================================== */}
            {/* ================================================================================ */}
            <TableHead className={classes.table_head}>
              <TableRow 
                className={classes.table_head_row}
                >

                {headers.map((header, colHeadIndex) => {
                  const isSelection = header.editType === 'selection';
                  const isSelectionIcon = header.editType === 'selectionIcon';
                  const isSortable = header.isSortable;
                  const sortOrder = header.defaultSorting;
                  const isNoEdit = (!isSelection) && (!isSelectionIcon);
                  const isButtonheader = (
                    header.editType === 'btnEdit' ||
                    header.editType === 'btnSave' ||
                    header.editType === 'btnUndo' ||
                    header.editType === 'btnDelete'
                  );

                  const hasHeaderMenu = header.hasHeaderMenu;
                  const headerTitle = headers[colHeadIndex].headerTitle;
                  const isisResizable = headers[colHeadIndex].isResizable;
                  const headerMinWidth = headers[colHeadIndex].minWidth;
                  const headerHorizontalAlign = headers[colHeadIndex].horizontalAlign;
                  const newheaderWidth = 
                    isButtonheader ? header.width + 18 : header.width;
                  const headerRowHeight = this.props.settings.initialHeaderHeight;

                  return (
                    <InselTableCellWidthResizer
                    className={classes.table_head_cell}
                    notResizable={!isisResizable}
                    width={newheaderWidth}
                    minWidth={headerMinWidth}
                    horizontalAlign={headerHorizontalAlign}
                    verticalAlign={'bottom'}
                    height= {headerRowHeight}
                    setWidth={(colwidth) => this.setState({colwidth: colwidth})}
                    handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, colHeadIndex)}
                    hasHeaderMenu={hasHeaderMenu}>

                    {isSelection &&
                      <Checkbox
                      checked={mainChecked}
                      indeterminate={mainIndeterminated}
                      color_checked={green[400]}
                      color_uncheck={green[600]}
                      onClick={e => this.handleCheckboxClickHeader(e)}
                      size="small"/>
                    }

                    {isSelectionIcon &&
                      <IconButton
                        style={{ width: newheaderWidth, height: newheaderWidth }} 
                      >
                      <img 
                        src={mainCheckIcon}
                        style={{ width: header.width, height: header.width }} 
                        />
                      </IconButton>
                    }

                    {isNoEdit && headerTitle }

                    </InselTableCellWidthResizer>
                  );
                })}
              </TableRow>
            </TableHead>


            {/* ================================================================================ */}
            {/* Start of the rows ============================================================== */}
            {/* ================================================================================ */}
            <TableBody className={classes.table_body_row}>
              {data.map((row, rowIndex) => {

                // unique identifier for the rows
                const rowid = row[this.props.primaryKey];

                // main row selection 
                const isRowSelected = this.getRowSelection(row.id);
                
                // to get the background color for the row depending on its state
                const rowState = this.getRowState(rowid);
                const isRowDeleted = rowState === rowStateDeleted;
                const isRowInserted = rowState === rowStateInserted;
                const isRowChanged = rowState === rowStateEdited || isRowDeleted || isRowInserted;

                const iconSource = this.getIconSource(row.id);
                //const editvalue_Users = isCellEditingUser ? this.newvalue_Users : users;
                const rowHeight = this.getRowHeight(rowid);
                //const reszBgColor = (index === 1 ) ? 'red' : 'blue';
                const reszBgColor = 'lightblue';

                return (
                  <TableRow
                    className={classes.table_row}
                    height={rowHeight}
                    style={{
                      height: rowHeight,
                      backgroundColor: 
                        isRowDeleted ? '#fee' : 
                        isRowChanged ? '#efe' : 
                        isRowInserted ? '#ffe' : 'white',
                    }}
                    //key={`table-row-${rowindex}-${id}`} 
                  >

                  {headers.map((header, colindex) => {

                    const isPrimaryKey = header.editType === 'primaryKey';
                    const isSelection = header.editType === 'selection';
                    const isSelectionIcon = header.editType === 'selectionIcon';
                    const isNoEdit = header.editType === 'none';
                    const isTextfield = header.editType === 'textfield';
                    const isTextarea = header.editType === 'textarea';
                    const isTextfieldMultiline = header.editType === 'textfieldmultiline';
                    const isInteger = header.editType === 'integer';
                    const isDecimal = header.editType === 'decimal';
                    const isDropdown = header.editType === 'dropdown';
                    const isCheckbox = header.editType === 'checkbox';

                    const isButtonEdit = header.editType === 'btnEdit';
                    const isButtonSave = header.editType === 'btnSave';
                    const isButtonUndo = header.editType === 'btnUndo';
                    const isButtonDelete = header.editType === 'btnDelete';
                    const btnHoverWidth = header.width + 8;
                    const dropdownWidth = header.width - 10;
                    //const decimalCnt = 

                    const typeFound = (
                      isPrimaryKey || isSelection || isSelectionIcon || isNoEdit || 
                      isTextfield || isTextarea || isTextfieldMultiline ||
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
                      value ? imgChkboxChecked : imgChkboxUnchecked :  null;

                    return (
                      <InselTableCellHeightResizer
                        className={classes.table_check_cell}
                        height={rowHeight}
                        setHeight={(height) => this.setState({rowHeight: height})}
                        handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, rowid)}
                        resizerBackgroundColor={reszBgColor}>
                        
                        {isSelection &&
                          <Checkbox
                          checked={isRowSelected}
                          color_checked={green[400]}
                          color_uncheck={green[600]}
                          onClick={e => this.handleSelectionClickRow(e, rowid)}
                          size="small"/>
                        }

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
                            style={{ textAlign: header.horizontalAlign, }}
                          ></TextField>
                        }

                        {isTextfield && 
                          <TextField
                            value={value}
                            fullWidth
                            style={{ textAlign: header.horizontalAlign, }}
                            onChange={e => this.handleTextfieldChange(e, rowid, field)}
                          ></TextField>
                        }

                        {isTextarea && 
                          <textarea 
                            onChange={e => this.handleTextfieldChange(e, rowid, field)}
                            style={{ height: rowHeight}}
                          >{value}</textarea>
                        }

                        {isTextfieldMultiline && 
                          <TextField 
                            multiline
                            value={value}
                            fullWidth
                            style={{ 
                              textAlign: header.horizontalAlign, 
                            }}
                            //InputProps={{ height: '300px' }}
                            inputProps={{ style: { height: rowHeight } }}
                            onChange={e => this.handleTextfieldChange(e, rowid, field)}
                            >
                          </TextField>
                        }

                        {isInteger && 
                          <TextField
                            value={value}
                            fullWidth
                            inputProps={{
                              sx: {
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
                            fullWidth
                            inputProps={{
                              sx: {
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
                            //sx={{ m: 1, minWidth: header.minWidth, }}
                          >
                          {/* 
                          <InputLabel 
                            id="demo-simple-select-isRequired-label">select example</InputLabel>*/}
                          <Select
                            //labelId="demo-simple-select-isRequired-label"
                            //label="select example"
                            //minWidth={100}
                            value={value}
                            onChange={e => this.handleDropdownChange(e, rowid, colindex)}

                            //style={{ width: header.width, }}
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
                            style={{ width: header.width, height: header.width }} 
                          />
                          </IconButton>
                        }

                        {isButtonEdit &&
                          <IconButton
                            disabled={isRowDeleted}
                            onClick={e => this.handleEditnModalDialogClick(e, rowid, row)}
                              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
                          <img 
                            src={mainEditIcon}
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
                            src={mainSaveIcon}
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
                              src={mainUndoIcon}
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
                            src={mainDeleteIcon}
                            title="Delete this row by clicking here"
                            style={{ width: header.width, height: header.width,
                              opacity: (!isRowDeleted ? 1 : 0.2)
                             }} 
                          />
                          </IconButton>
                        }

                        {!typeFound && <span>TYPE ERROR</span>}

                      </InselTableCellHeightResizer>
                    );
                  })} 
                  {/* end map headers */}
                  </TableRow>
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
            boxShadow: '0px -2px 4px rgba(0,0,0,0.1)', // Optional: adds shadow to separate pagination
          }}>
          <TableFooter>
            <TableRow>

{/* new button */}
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                //disabled={mainDisabled}
                //onClick={e => this.handleNewRow(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
              <img 
                src={mainAddIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  //opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />&nbsp;new row</IconButton>


{/* save all */}    
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                disabled={mainDisabled}
                onClick={e => this.handleSaveAll(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
              <img 
                src={mainSaveIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />Save all</IconButton>

{/* undo all */}     
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                disabled={mainDisabled}
                onClick={e => this.handleUndoAll(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
              <img 
                src={mainUndoIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />&nbsp;Undo all</IconButton>

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


{/* ================================================================================ */}
{/* modal dialog =================================================================== */}
{/* ================================================================================ */}

        {/* Dialog component for the modal */}
        <Dialog 
          width={720}
          maxWidth={720}
          minWidth={720}
          open={this.state.openDialog} 
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Custom backdrop color (darker)
            }
          }}          
          sx={{
            '& .MuiDialog-paper': {
              border: '5px solid #1976d2', // Set border color
              borderRadius: '20px',         // Optional: set border radius for rounded corners
            }
          }}          >
          <DialogTitle
            textAlign={'center'}
          >Sample Modal</DialogTitle>
          <DialogContent>
            <Typography 
              variant="h6"
              textAlign={'center'}
            >Edit the row:</Typography>
            <Table>
              <TableRow>
                <TableCell >Product</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    label="Productname"
                    type="text"
                    value={this.state.dlgName}
                    sx={{ width: '720px' }}
                    helperText="Enter the product here. Don't enter any comments."
                    onChange={(e) => this.handleDialogChange(e, 'dlgName')}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>
                  <TextField
                    label="Users"
                    type="text"
                    value={this.state.dlgUser}
                    helperText="Percentages: enter only values between 0 and 100"
                    onChange={(e) => this.handleDialogChange(e, 'dlgUser')}
                  />
                </TableCell>
                <TableCell>Events</TableCell>
                <TableCell>
                  <TextField
                    label="Events"
                    type="text"
                    value={this.state.dlgEvents}
                    helperText="Count of events must be bigger than 0"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Views</TableCell>
                <TableCell>
                  <TextField
                    label="Views"
                    type="text"
                    value={this.state.dlgViews}
                    helperText="Average of views is a decimal number (format XX.YYYY)"
                  />
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>
                  <TextField
                    label="Time"
                    type="text"
                    value={this.state.dlgTime}
                    helperText="Time format: XXm YYs"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Checks</TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox1"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox2"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox3"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox4"/>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Comments</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    multiline
                    rows={5}
                    label="enter comments here text multiline"
                    sx={{ width: '720px' }}
                    helperText="Enter free comments about your observations"
                  />
                </TableCell>
              </TableRow>
            </Table>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>


      </Paper>
    );
  }
}

InselTable.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(InselTable, useStyles);
