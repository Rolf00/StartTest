import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
// TODO
//import ArrowDropRight from '@mui/material/ArrowDropRight';

export default function InselTableMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    alert("Menu actions are not implemented yet");
    setAnchorEl(null);
  };

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
        <MenuItem key='' onClick={handleClose}>Sort ascending</MenuItem>
        <MenuItem key='' onClick={handleClose}>Sort descending</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='' onClick={handleClose}>Search value</MenuItem>
        <MenuItem key='' onClick={handleClose}>Filter value</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem key='' onClick={handleClose}>Hide column</MenuItem>
        {/* TODO */} 
        <MenuItem 
          key=''
          primaryText="Dropdown" 
         // rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem key={1} primaryText="Show hided column 1"/>,
            <MenuItem key={1} primaryText="Show hided column 2"/>,
            <MenuItem key={1} primaryText="Show hided column 3"/>,
            <MenuItem key={1} primaryText="Show hided column 4"/>,
          ]}
        >Manage columns</MenuItem>
      </Menu>
    </div>
  );
}