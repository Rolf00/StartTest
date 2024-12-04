import * as React from 'react';
import IconButton from '@mui/material/IconButton';
//import ArrowDropRight from '@mui/icons-material/ArrowDropRight';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

// TODO
//import ArrowDropRight from '@mui/material/ArrowDropRight';

export default function InselTableMenu  (
  props
) {

  //console.log("InselTableMenu headers start", props.headers);
  //console.log("InselTableMenu headerIndex start", props.headerIndex);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorManageColumns, setAnchorManageColumns] = React.useState(null);
  const openManageColumns = Boolean(anchorManageColumns);
  
  const handleClick = (event) =>
  {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () =>
  {
    setAnchorEl(null);
  }

  const handleOpenCloseManageColumns = (event, open) =>
  {
    //setAnchorManageColumns
    const element = open ? event.currentTarget : null;
    setAnchorManageColumns(element);
  }

  const getAllColumnsAreVisible = () =>
  {
    // here we check if any columns is not visible
    const notVisibleCols = props.headers.filter(h => h.isVisible === false);
    // TODO
    //return notVisibleCols.length === 0;
    return false;
  }

  const handleSortColumn = (sortAscending) => 
  {
    // hide the menu
    handleClose(); 

    // sort the data for one field
    // TODO
    /*
    const newData = this.state.data.sort((a, b) => {
      if (sortAscending)
      {
        return a[fieldname].localeCompare(b[fieldname]);
      }
      else
      {
        return b[fieldname].localeCompare(a[fieldname]);
      }
    });

    // now re-render both together
    this.setState({data: newData});
    */
  }

  const handleFilter = () =>
  {
    // hide the menu 
    handleClose(); 

    // TODO 
    alert("Searching and filtering are not implemented yet.");
  }

  const handleHideColumn = () =>
  {
    // hide the menu 
    handleClose(); 

    // TODO 
    alert("Hiding columns is not implemented yet.");
  }

  // TODO
  /*
  const headerIndex = this.props.headerIndex;
  const open = this.state.open;
  const anchorEl = this.state.anchorEl;
  const allColumnsAreVisible = false;
  const anchorManageColumns = this.state.anchorManageColumns;
  console.log('render',this.state.open);
  */

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
        slotProps={{
          paper: {
            style: {
              //width: '20ch',
            },
          },
        }}
      >

        <MenuItem key='1' 
          onClick={() => handleSortColumn(true)}
        >Sort ascending</MenuItem>
        <MenuItem key='2' 
          onClick={() => handleSortColumn(false)}
        >Sort descending</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='3' 
          onClick={() => handleFilter()}
        >Search value</MenuItem>
        <MenuItem key='4' 
          onClick={() => handleFilter()}
        >Filter value</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='5' 
          onClick={() => handleHideColumn()}
        >Hide column</MenuItem>
        {/* TODO */} 
        <MenuItem 
          id="nestedMenusManageColumns"
          anchorEl={anchorManageColumns}
          disabled={getAllColumnsAreVisible()}
  
          //onMouseIn={(e) => handleOpenCloseManageColumns(e, true)}
          //onMouseOut={(e) => handleOpenCloseManageColumns(e, false)}
          onClick={(e) => handleOpenCloseManageColumns(e, true)}
          //primaryText="Manage columns"
          // TODO 
          //rightIcon={<ArrowDropRight />}
          /*
          {invisibleMenus.map((header) => {
            const title = header.headerTitle;
            const field = header.dataFieldName;
            return (
              <MenuItem 
                onclick={handleShowMenu(field)} 
                //primaryText="Show hided column 1"
              >
                Show column "{title}"
              </MenuItem>
            );
          })}
            */
        >Manage columns

        <Menu
          //open={openManageColumns}
          open={openManageColumns && open}
          anchorEl={anchorManageColumns}
        >
          <MenuItem key={6} >Show hided column 1</MenuItem>
          <MenuItem key={7} >Show hided column 2</MenuItem>
          <MenuItem key={8} >Show hided column 3</MenuItem>
          <MenuItem key={9} >Show hided column 4</MenuItem>
        </Menu>

        </MenuItem>


      </Menu>
    </div>
  );
}
