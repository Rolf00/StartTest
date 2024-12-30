import React, { useState } from 'react';

import {
  IconButton,
  Snackbar, 
  Alert, 
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Popover,
  Grid,
  Typography,
  Select,
  TextField,
  Tooltip
} from '@mui/material';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SwapVertIcon from '@mui/icons-material/SwapVert';     


import IConst from './IConst';
import { getNewSortingList } from './IUtilsSort';

// TODO
//import ISortingDialog from './ISortingDialog';


export default function ITableMenu (props) 
{

  const filterTopButton =
  {
    padding: "4px 4px 2px 4px",
    display: 'flex',
    alignItems: 'center',
  }

  const filterEdit =
  {
    width: "210px", 
    padding: "4px 4px 2px 4px" ,
    margin: '0px 4px 8px 4px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

  const filterTopText =
  {
    padding: "8px 4px 2px 4px" ,
    margin: '0px 4px 0px 4px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorManageColumns, setAnchorManageColumns] = React.useState(null);
  const openManageColumns = Boolean(anchorManageColumns);
  const openCloseManageColumns = (e) =>
  {
    if (e === null)
    {
      setAnchorManageColumns(null);
    }
    else
    {
      setAnchorManageColumns(e.currentTarget );
    }
  }
  
  const [anchorFiltering, setAnchorFiltering] = React.useState(null);
  const openFiltering = Boolean(anchorFiltering);
  
  const [selfilterOperator, setFilterOperator] = React.useState("");
  const [selfilterValue, setFilterValue] = React.useState("");

  // prepare the datepicker
  /*
  const oldJSDate = props.value;
  const jsdt = oldJSDate === null || oldJSDate === "" ? new Date() : new Date(
    oldJSDate.getFullYear(), 
    oldJSDate.getMonth(), 
    oldJSDate.getDate());
    */
  const jsdt = new Date();
  const pickerDate = dayjs(jsdt);
  const [selfilterDateValue, setFilterDateValue] = React.useState(pickerDate);

  const openCloseFiltering = (e) =>
  {
    if (e === null)
    {
      setAnchorFiltering(null);
    }
    else
    {
      setAnchorFiltering(e.currentTarget);
    }
  }

  const filterOperatorChange = (e) =>
  {
    setFilterOperator(e.target.value);
  }

  const filterValueChange = (e) =>
  {
    setFilterValue(e.target.value);
  }

  const filterDateChange = (value) =>
  {
    const year = parseInt(value.$y);
    const month = parseInt(value.$M);
    const day = parseInt(value.$D);
    const newDateJS = new Date(year, month, day);
    setFilterDateValue(newDateJS);
  }

  const [openSnack,setOpenSnack] = React.useState(false);
        
  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
    event.currentTarget.focus();
  }

  const handleClose = () =>
  {
    setAnchorEl(null);
    openCloseManageColumns(null);
  }

  const sortColumn = (sortAscending) => 
  {
    // sort a column
    handleClose(); 

    const field = props.headers[props.headerIndex].dataFieldName;
    const newSortingList = getNewSortingList(props.sortings, sortAscending, field);
    props.setChangedSortings(newSortingList);
  }

  const removeAllSorting = () =>
  {
    // remove all sortings
    const newList = [];
    props.setChangedSortings(newList);
  }

  const [openSortingDialog, setOpenSortingDialog] = React.useState(true);
  const manageSortings = () =>
  {
    setOpenSortingDialog(true);
  }

  const addFilter = (newField, newOperator, newValue) =>
  {
    // first check, if this filter it already exists
    const index = props.filters.findIndex(f => f.filterFieldname === newField);

    let newlist;
    if (index === -1) 
    {
      // it doesnt exist yet, so we create a new one
      const onerow = { 
        filterFieldname: newField, 
        filterOperator: newOperator, 
        filterValue: newValue };

      if (props.filters.length === 0) 
      {
        newlist = [onerow];
      } 
      else 
      {
        newlist = [...props.filters, onerow];
      }
    } 
    else 
    {
      // it exists already, so we edit the old one
      newlist = [...props.filters];
      newlist[index].filterOperator = newOperator;
      newlist[index].filterValue = newValue;
    }

    props.setChangedFilters(newlist);
  }
  
  const removeFilter = (field) =>
  {
    // remove a filter
    const newlist = [...props.filters].filter(f => f.filterFieldname !== field);
    props.setChangedFilters(newlist);
  }
  
  const addFilterClick = () =>
  {
    // add a new filter
    if (selfilterOperator === null || selfilterOperator === "")
    {
      // dont add filters without operators
      setOpenSnack(true);
      return;
    }

    openCloseFiltering(null);

    // first check, if it already exists
    const field = props.headers[props.headerIndex].dataFieldName;
    addFilter(field, selfilterOperator, selfilterValue);
  }

  const addRowStateFilter = (operator) =>
  {
    // close the menu
    handleClose();

    // add filter wihtout a fieldname 
    addFilter("", operator, "");
  }

  const removeRowStateFilter = () =>
  {
    // close the menu
    handleClose();

    // remove filter where field === ''
    removeFilter("");
  }

  const removeRowFilter = () =>
  {
    // close the menu
    handleClose();
    setFilterOperator("");
    setFilterValue("");
    setFilterDateValue(new Date());

    // remove filter of one column
    const field = props.headers[props.headerIndex].dataFieldName;
    removeFilter(field);
  }

  const removeAllFilters = () =>
  {
    // close the menu
    handleClose();
    // remove all filters
    const newList = [];
    props.setChangedFilters(newList);
  }

  const cancelFilter = () => 
  {
    // close the fiter menu
    openCloseFiltering(null);
  }

  const hideColumn = () =>
  {
    // hide one column
    props.headers[props.headerIndex].isVisible = false;
    const newList = [...props.headers];
    props.setChangedHeaders(newList);
  }
    
  const unhideAllColumns = () =>
  {
    // unhide all columns
    openCloseManageColumns(null);
    for (let h = 0; h < props.headers.length; h++) props.headers[h].isVisible = true;
    const newList = [...props.headers];
    props.setChangedHeaders(newList);
  }

  const unhideOneColumn = (headerId) =>
  {
    // unhide just one column
    openCloseManageColumns(null);
    const index = props.headers.findIndex(h => h.id === headerId);
    if (index === -1) return;
    props.headers[index].isVisible = true;
    const newList = [...props.headers];
    props.setChangedHeaders(newList);
  }

  // enable / disable menu items for sortings
  const actualSorting = props.headers[props.headerIndex].defaultSorting;
  const sList = props.headers.filter(h => h.defaultSorting !== '');
  const noSortingExists = sList.length === 0;

  // enable / disable menu items for filtering
  const noFilterExists = props.filters.length === 0;
  const noRowFilterExists = props.filters.filter(f => f.filterFieldname === props.headers[props.headerIndex].dataFieldName).length === 0;

  // enable / disable menu items for hiding
  const hList = props.headers.filter(h => h.isVisible === false);
  const noHidedColumnExists = hList.length === 0;
  const isSortable = props.headers[props.headerIndex].isSortable;
 
  // evaluate the type to edit the value
  const isNumber = 
    props.headers[props.headerIndex].editType === IConst.editType_Integer ||
    props.headers[props.headerIndex].editType === IConst.editType_Decimal;
  const isDate = props.headers[props.headerIndex].editType === IConst.editType_Date;
  const isDropdown = props.headers[props.headerIndex].editType === IConst.editType_Dropdown;
  const isTextfield = !(isNumber || isDate || isDropdown);

  // get the old filter state
  const hasNoStateFilter = props.filters.filter(f => f.filterFieldname === "").length === 0;
  let stateFilter = null;
  if (!hasNoStateFilter)
  {
    const stIndex = props.filters.findIndex(f => f.filterFieldname === "");
    stateFilter = props.filters[stIndex].filterOperator;
  }

  // preparing views
  const filterEditWidth = 210;
  const countSortings = props.headers.filter(f => f.defaultSorting !== "").length;
  const countFilters = props.filters.length;
  const countHidedColumns = props.headers.filter(h => h.isVisible === false).length;

  // prepare the old values of filtering
  // TODO

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{ width: '23px', height: '40px', borderRadius: '3px' }}
        onClick={(e) => handleClick(e)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

        {isSortable &&
        <MenuItem key='ITableMenu_Item1' 
          disabled={actualSorting === IConst.sortingASC}
          onClick={() => sortColumn(IConst.sortingASC)}>
          <ListItemIcon><ArrowUpwardIcon /></ListItemIcon>
          <ListItemText>Sort ascending</ListItemText>
        </MenuItem>}

        {isSortable &&
        <MenuItem key='ITableMenu_Item2' 
          disabled={actualSorting === IConst.sortingDESC}
          onClick={() => sortColumn(IConst.sortingDESC)}>
          <ListItemIcon><ArrowDownwardIcon /></ListItemIcon>
          <ListItemText>Sort descending</ListItemText>
        </MenuItem>}

        {isSortable &&
        <MenuItem key='ITableMenu_Item3' 
          disabled={actualSorting === ''}
          onClick={() => sortColumn('')}>
          <ListItemIcon><SwapVertIcon /></ListItemIcon>
          <ListItemText>Remove sorting</ListItemText>
        </MenuItem>}

        <MenuItem key='ITableMenu_Item4' 
          disabled={noSortingExists}
          onClick={() => removeAllSorting('')}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove all sortings ({countSortings})</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item4' 
          onClick={() => manageSortings()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Manage sortings ...</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem key='ITableMenu_Item5' 
          onClick={(e) => openCloseFiltering(e)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Add filter for '{props.headers[props.headerIndex].headerTitle}'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item6' 
          disabled={noRowFilterExists}
          onClick={() => removeRowFilter()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove filter for '{props.headers[props.headerIndex].headerTitle}'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item7' 
          disabled={noFilterExists}
          onClick={() => removeAllFilters()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove all filters ({countFilters})</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem key='ITableMenu_ItemState1' 
          disabled={stateFilter === IConst.filterOperator_Edited}
          onClick={() => addRowStateFilter(IConst.filterOperator_Edited)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Show only states 'edited rows'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_ItemState2' 
          disabled={stateFilter === IConst.filterOperator_Deleted}
          onClick={() => addRowStateFilter(IConst.filterOperator_Deleted)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Show only states 'deleted rows'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_ItemState3' 
          disabled={stateFilter === IConst.filterOperator_Inserted}
          onClick={() => addRowStateFilter(IConst.filterOperator_Inserted)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Show only states 'inserted rows'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_ItemState4' 
          disabled={stateFilter === IConst.filterOperator_Modified}
          onClick={() => addRowStateFilter(IConst.filterOperator_Modified)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Show all 'modified rows'</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_ItemState5' 
          disabled={hasNoStateFilter}
          onClick={() => removeRowStateFilter()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove state filter</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem key='ITableMenu_Item8' 
          onClick={() => hideColumn()}>
          <ListItemIcon><VisibilityOffOutlinedIcon /></ListItemIcon>
          <ListItemText>Hide this column</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item9' 
          disabled={noHidedColumnExists}
          onClick={() => unhideAllColumns()}>
          <ListItemIcon><VisibilityOutlinedIcon /></ListItemIcon>
          <ListItemText>Unhide all columns ({countHidedColumns})</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item10' 
          id="nestedMenusManageColumns"
          anchorEl={anchorManageColumns}
          disabled={noHidedColumnExists}
          onClick={(e) => openCloseManageColumns(e)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Manage columns ({countHidedColumns})</ListItemText>
          <ListItemIcon><ArrowRightIcon/></ListItemIcon>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorManageColumns}
        open={openManageColumns}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {props.headers.map((header, index) => {
          if (!header.isVisible)
          {
            return(
              <MenuItem
                key={`ITableMenu_ItemUnhide_${index}`}
                onClick={() => unhideOneColumn(header.id)}>
                <ListItemIcon><VisibilityOutlinedIcon /></ListItemIcon>
                <ListItemText>Unhide '{header.headerTitle}'</ListItemText>
              </MenuItem>
            );
          }
        })}
      </Menu>

      <Popover
        anchorEl={anchorFiltering}
        open={openFiltering}
        onClose={() => openCloseFiltering(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        >
        <Grid container direction={"row"}>

          <Grid item >
            <Grid item style={filterTopText}>&nbsp;</Grid>
            <Grid item style={filterTopButton}>
              <Tooltip title="Delete this filter">
              <IconButton
                onClick={() => removeRowFilter()}
              ><CloseIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item style={filterTopText}>
              <Typography>Operator</Typography >
            </Grid>
            <Grid item style={filterEdit}>
              <Select
                onChange={(e) => filterOperatorChange(e)}
                value={selfilterOperator}
                style={{ width: filterEditWidth,  }}
                sx={{ 
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': { 
                    height: props.settings.editComponentHeight,  
                    padding: '6px',
                  }, 
                }}                  
                >
                <MenuItem key="filterOp1" value={IConst.filterOperator_Contains}
                >contains</MenuItem>
                <MenuItem key="filterOp2" value={IConst.filterOperator_ContainsNot}
                >does not contain</MenuItem>
                <MenuItem key="filterOp3" value={IConst.filterOperator_Equals}
                >equals</MenuItem>
                <MenuItem key="filterOp4" value={IConst.filterOperator_EqualsNot}
                >does not equal</MenuItem>
                <MenuItem key="filterOp5" value={IConst.filterOperator_StartsWith}
                >starts with</MenuItem>
                <MenuItem key="filterOp6" value={IConst.filterOperator_StartsWithNot}
                >not starts with</MenuItem>
                <MenuItem key="filterOp7" value={IConst.filterOperator_EndsWith}
                >ends with</MenuItem>
                <MenuItem key="filterOp8" value={IConst.filterOperator_EndsWithNot}
                >not ends with</MenuItem>
                <MenuItem key="filterOp9" value={IConst.filterOperator_IsEmpty}
                >is empty</MenuItem>
                <MenuItem key="filterOp10" value={IConst.filterOperator_IsEmptyNot}
                >is not empty</MenuItem>
                <MenuItem key="filterOp11" value={IConst.filterOperator_IsSmallerThan}
                >is smaller than</MenuItem>
                <MenuItem key="filterOp12" value={IConst.filterOperator_IsBiggerThan}
                >is bigger than</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item style={filterTopText}>
              <Typography >Value</Typography >
            </Grid>
            <Grid item style={filterEdit}>

              {isTextfield &&
              <TextField 
                value={selfilterValue}
                onChange = {(e) => filterValueChange(e)}
                style={{ width: '100%' }}
                sx={{ 
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': { 
                    height: props.settings.editComponentHeight,  
                    padding: '6px',
                  }, 
                }}                  
              />}

              {isDate &&
              <LocalizationProvider dateAdapter={AdapterDayjs} locale='de'>
              <DatePicker 
                value={selfilterDateValue}
                format="DD.MM.YYYY"
                onChange = {(e) => filterDateChange(e)}
                style={{ width: '100%' }}
                sx={{ 
                  '& .MuiInputBase-root': {
                    padding: '0px 10px 0px 0px',
                  },
                  '& .MuiInputBase-input': { 
                    height: props.settings.editComponentHeight,  
                    padding: '6px',
                  }, 
                }}
              /></LocalizationProvider>}

              {isDropdown &&
              <Select 
                value={selfilterValue}
                onChange = {(e) => filterValueChange(e)}
                style={{ width: '100%' }}
                sx={{ 
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': { 
                    height: props.settings.editComponentHeight,  
                    padding: '6px',
                  }, 
                }}>
                  {props.headers[props.headerIndex].dropdownSelection.map((item, itemIndex) =>
                  {
                    const ddId = item.id;
                    const ddValue = item.value;
                    return (
                      <MenuItem 
                        key={`tablemenu-selectitem${itemIndex}`}
                        value={ddId}
                      >{ddValue}</MenuItem>
                    );
                  })}
              </Select>}

            </Grid>
          </Grid>

          <Grid item>
            <Grid item style={filterTopText}>&nbsp;</Grid>
            <Grid item style={filterTopButton}>
              <Tooltip title="Add this filter">
              <IconButton
                onClick={() => addFilterClick()}
              ><AddIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item style={filterTopText}>&nbsp;</Grid>
            <Grid item style={filterTopButton}>
              <Tooltip title="Cancel editing">
              <IconButton
                onClick={() => cancelFilter()}
              ><CancelIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          
        </Grid>
      </Popover>

      <Snackbar 
        open={openSnack} 
        autoHideDuration={5000} 
        onClose={()=>setOpenSnack(false)} 
        anchorOrigin={{ vertical:"top", horizontal:"right" }}>
        <Alert
          onClose={()=>setOpenSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >Choose an operator before adding a filter</Alert>
      </Snackbar>

{/* 
      {openSortingDialog &&
      <ISortingDialog
        open={openSortingDialog}
        headers={props.headers}
        sortings={[]}
      />}
*/}      

    </div>

  );
}
