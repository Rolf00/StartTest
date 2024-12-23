import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


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


export default function ITableMenu (props) 
{

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

  
  const field = props.headers[props.headerIndex].dataFieldName;
  let fIndex = -1;
  if (props.filters !== null)
  {
    fIndex = props.filters.findIndex(f => f.field = field);
  }
  const fOperator = fIndex === -1 ? null : props.filters[fIndex].operator;
  const fValue = fIndex === -1 ? null : props.filters[fIndex].value;
  const [anchorFiltering, setAnchorFiltering] = React.useState(null);
  const openFiltering = Boolean(anchorFiltering);
  const [filterOperator, setFilterOperator] = React.useState(fOperator);
  const [filterValue, setFilterValue] = React.useState(fValue);
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
    props.headers[props.headerIndex].defaultSorting = sortAscending;
    const newList = [...props.headers];
    props.setChangedHeaders(newList);
  }

  const removeAllSorting = () =>
  {
    // remove all sortings
    handleClose(); 
    for (let h = 0; h < props.headers.length; h++) props.headers[h].defaultSorting = '';
    const newList = [...props.headers];
    props.setChangedHeaders(newList);
  }

  const openFilter = () =>
  {
    // open filter menu
    handleClose(); 
    props.FilterColumn(props.headerIndex)
  }

  const addFilterClick = () =>
  {
    // add a new filter
    // first check, if it already exists
    const field = props.headers[props.headerIndex].dataFieldName;
    let index = -1;
    if (props.filters !== null)
    {
      index = props.filters.findIndex(f => f.field === field);
    }

    let newlist = [...props.filters];
    if (index === -1)
    {
      // it doesnt exist yet, so we create a new one
      let obj = {};
      obj['fieldname'] = field;
      obj['operator'] = filterOperator;
      obj['value'] = filterValue;
      newlist.push(obj);
    }
    else
    {
      // it exists already
      newlist[index].operator = filterOperator;
      newlist[index].value = filterValue;
    }
    props.setChangedFilters(newlist);
  }

  const removeRowFilter = () =>
  {
    // remove filter of one column
    const field = props.headers[props.headerIndex].dataFieldName;
    const newList = props.filters.filter(f => f.fieldname !== field);
    props.setChangedFilters(newList);
  }

  const removeAllFilters = () =>
  {
    // remove all filters
    const newList = [];
    props.setChangedFilters(newList);
  }

  const cancelFilter = () => {
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
  let noRowFilterExists = true;
  let noFilterExists = true;
  if (props.filters)
  {
    const fList = props.filters.filter(f => f.field === props.headers[props.headerIndex].dataFieldName);
    noRowFilterExists = fList.length === 0;
    noFilterExists = props.filters.length === 0;
  }

  // enable / disable menu items for hiding
  const hList = props.headers.filter(h => h.isVisible === false);
  const noHidedColumnExists = hList.length === 0;
  const isSortable = props.headers[props.headerIndex].isSortable;

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
        //onMouseLeave={(e) => handleClose(e)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              //width: '20ch',
            },
          },
        }}
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
          <ListItemText>Remove all sortings</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem key='ITableMenu_Item5' 
          onClick={(e) => openCloseFiltering(e)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Add filter</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item6' 
          disabled={noRowFilterExists}
          onClick={() => removeRowFilter()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove filter</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item7' 
          disabled={noFilterExists}
          onClick={() => removeAllFilters()}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Remove all filters</ListItemText>
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
          <ListItemText>Unhide all columns</ListItemText>
        </MenuItem>

        <MenuItem key='ITableMenu_Item10' 
          id="nestedMenusManageColumns"
          anchorEl={anchorManageColumns}
          disabled={noHidedColumnExists}
          onClick={(e) => openCloseManageColumns(e)}>
          <ListItemIcon></ListItemIcon>
          <ListItemText>Manage columns</ListItemText>
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
        }}
        MenuListProps={{
          onMouseLeave: handleClose, // Close subsubmenu when mouse leaves
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
          <Grid item direction={"column"}>
            <Grid item style={{ padding: "8px 4px 2px 4px" }}>&nbsp;</Grid>
            <Grid item style={{ display: "flex", alignItems: "center", padding: "2px 4px 8px 4px", }}>
              <Tooltip title="Delete this filter">
              <IconButton
                onClick={() => removeRowFilter()}
              ><CloseIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item direction={"column"}>
            <Grid item style={{ width: "170px", padding: "8px 4px 2px 4px" }}>
              <Typography>Operator</Typography >
            </Grid>
            <Grid item style={{ width: "170px", padding: "2px 4px 8px 4px", display: "flex", alignItems: "center" }}>
              <Select
                onChange={(e) => filterOperatorChange(e)}
                value={filterOperator}
                style={{ width: "170px",  }}
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

          <Grid item direction={"column"}>
            <Grid item style={{ width: "170px", padding: "8px 4px 2px 4px" }}>
              <Typography >Value</Typography >
            </Grid>
            <Grid item style={{ width: "170px", padding: "2px 4px 8px 4px" }}>
              <TextField 
                value={filterValue}
                onChange = {(e) => filterValueChange(e)}
                sx={{ 
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': { 
                    height: props.settings.editComponentHeight,  
                    padding: '6px',
                  }, 
                }}                  
                />
            </Grid>
          </Grid>

          <Grid item direction={"column"}>
            <Grid item style={{ padding: "8px 4px 2px 4px" }}>&nbsp;</Grid>
            <Grid item style={{ display: "flex", alignItems: "center", padding: "2px 4px 8px 4px", }}>
              <Tooltip title="Add this filter">
              <IconButton
                onClick={() => addFilterClick()}
              ><AddIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item direction={"column"}>
            <Grid item style={{ padding: "8px 4px 2px 4px" }}>&nbsp;</Grid>
            <Grid item style={{ display: "flex", alignItems: "center", padding: "2px 4px 8px 4px", }}>
              <Tooltip title="Cancel editing">
              <IconButton
                onClick={() => cancelFilter()}
              ><CancelIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          
        </Grid>
      </Popover>
    </div>

  );
}
