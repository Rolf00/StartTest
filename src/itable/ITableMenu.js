import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

// TODO
//import ArrowDropRight from '@mui/material/ArrowDropRight';

export default function InselTableMenu  (props) 
{


  // State to control the visibility of the main submenu and the subsubmenu
  const [mainMenuAnchor, setMainMenuAnchor] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);
  const [subSubMenuAnchor, setSubSubMenuAnchor] = useState(null);

  // Handle opening the main menu
  const handleMainMenuOpen = (event) => {
    setMainMenuAnchor(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchor(null);
  };

  // Handle opening the sub-menu (on hover over last item of the main menu)
  const handleSubMenuOpen = (event) => {
    setSubMenuAnchor(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchor(null);
  };

  // Handle opening the subsubmenu (on hover over the last item of the submenu)
  const handleSubSubMenuOpen = (event) => {
    setSubSubMenuAnchor(event.currentTarget);
  };

  const handleSubSubMenuClose = () => {
    setSubSubMenuAnchor(null);
  };
  
  /*

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorManageColumns, setAnchorManageColumns] = React.useState(null);
  const openManageColumns = Boolean(anchorManageColumns);

  let mainAnhcor = null;
  
  const handleClick = (event) =>
  {
    mainAnhcor = event.currentTarget;
    setAnchorEl(event.currentTarget);
    event.currentTarget.focus();
  }

  const handleClose = () =>
  {
    mainAnhcor = null;
    setAnchorEl(null);
  }

  const handleHoldMenu = () =>
  {
    setAnchorEl(mainAnhcor);
  }

  const handleOpenCloseManageColumns = (event, open) =>
  {
    //setAnchorManageColumns
    const element = open ? event.currentTarget : null;
    setAnchorManageColumns(element);
  }
    */


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
    //handleClose(); 
    setMainMenuAnchor(null);

    // TODO
    alert("TableMenu: ordering data is not implemented yet.")
    return;

    // sort the data for one field
    // TODO
    const newData = this.state.data.sort((a, b) => {
      if (sortAscending)
      {
        return a[props.fieldname].localeCompare(b[props.fieldname]);
      }
      else
      {
        return b[props.fieldname].localeCompare(a[props.fieldname]);
      }
    });

    console.log("ordered newData", newData);

    // now re-render data
    // TODO how to render?
    //this.setState({data: newData});
  }

  const handleFilter = () =>
  {
    // hide the menu 
    //handleClose(); 
    setMainMenuAnchor(null);

    // TODO 
    alert("Searching and filtering are not implemented yet.");
  }

  const handleHideColumn = () =>
  {
    // hide the menu 
    setMainMenuAnchor(null);
    //handleClose(); 
    props.headers[props.headerIndex].isVisible = true;
    props.HideColumn(props.headerIndex);
  }
    
  const handleUnhideColumn = () =>
    {
      // close the sub menu
      //setAnchorManageColumns(null);
      props.headers[props.headerIndex].isVisible = true;
      // TODO hot to render headers?
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
        //aria-controls={open ? 'long-menu' : undefined}
        //aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
         // onClick={(e) => handleClick(e)}
        //onMouseEnter={(e) => handleClick(e)}
        //onMouseLeave={(e) => handleClose(e)}

        onMouseEnter={handleMainMenuOpen} 
        onMouseLeave={handleMainMenuClose}

      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        /*
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onMouseLeave={(e) => handleClose(e)}
        //onMouseEnter={() => handleHoldMenu()}
        //onClose={() => handleClose()}
        slotProps={{
          paper: {
            style: {
              //width: '20ch',
            },
          },
        }}*/
          anchorEl={mainMenuAnchor}
          open={Boolean(mainMenuAnchor)}
          onClose={handleMainMenuClose}
          MenuListProps={{
            onMouseLeave: handleMainMenuClose, // Close menu when mouse leaves the submenu
          }}
  
      >

        <MenuItem key='1' 
          onClick={() => handleSortColumn(true)}
          //onMouseOver={(e) => handleOpenCloseManageColumns(e, false)}
        >Sort ascending</MenuItem>
        <MenuItem key='2' 
          onClick={() => handleSortColumn(false)}
          //onMouseOver={(e) => handleOpenCloseManageColumns(e, false)}
        >Sort descending</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='3' 
          onClick={() => handleFilter()}
          //onMouseOver={(e) => handleOpenCloseManageColumns(e, false)}
        >Search value</MenuItem>
        <MenuItem key='4' 
          onClick={() => handleFilter()}
          //onMouseOver={(e) => handleOpenCloseManageColumns(e, false)}
        >Filter value</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='5' 
          //onMouseOver={(e) => handleOpenCloseManageColumns(e, false)}
          //onClick={() => handleHideColumn()}
        >Hide column</MenuItem>
        {/* TODO */} 
        <MenuItem 
          id="nestedMenusManageColumns"
          //anchorEl={anchorManageColumns}
          disabled={getAllColumnsAreVisible()}
          onMouseEnter={handleSubMenuOpen}
          onMouseLeave={handleSubMenuClose}

          //onMouseEnter={(e) => handleOpenCloseManageColumns(e, true)}
          //onMouseLeave={(e) => handleOpenCloseManageColumns(e, false)}      
    
          //onClick={(e) => handleOpenCloseManageColumns(e, true)}
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
        >Manage columns</MenuItem>
      </Menu>

      <Menu
anchorEl={subMenuAnchor}
open={Boolean(subMenuAnchor)}
onClose={handleSubMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        MenuListProps={{
          onMouseLeave: handleSubSubMenuClose, // Close subsubmenu when mouse leaves
        }}
      >
        <MenuItem>Subsubmenu Item 1</MenuItem>
        <MenuItem>Subsubmenu Item 2</MenuItem>
        <MenuItem>Subsubmenu Item 3</MenuItem>
      </Menu>

{/*
          {invisibleMenus.map((header, index) => {
            const title = header.headerTitle;
            const newIndex = index + 100;
            return (
              <MenuItem 
                key={newIndex}
                onclick={() => handleUnhideColumn()} 
              >
                Show column "{title}"
              </MenuItem>
            );
          })}

            <Menu
              //open={openManageColumns}
              open={openManageColumns}
              anchorEl={anchorManageColumns}
              anchorOrigin={{
                vertical: 'top',   // Aligns the top of the submenu to the bottom of the button
                horizontal: 'right',   // Aligns the left of the submenu to the left of the button
              }}
              transformOrigin={{
                vertical: 'top',      // Aligns the top of the submenu to the bottom of the anchorEl
                horizontal: 'left',   // Aligns the left of the submenu to the left of the anchorEl
              }}              
            >
              <MenuItem key={6} onClick={() => handleUnhideColumn()}>Show hided column 1</MenuItem>
              <MenuItem key={7} onClick={() => handleUnhideColumn()}>Show hided column 2</MenuItem>
              <MenuItem key={8} onClick={() => handleUnhideColumn()}>Show hided column 3</MenuItem>
              <MenuItem key={9} onClick={() => handleUnhideColumn()}>Show hided column 4</MenuItem>
            </Menu>
          </div>
        </MenuItem>
      </Menu>
    </div>

*/}
    </div>
  );
}
