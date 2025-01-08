import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

export default function IChipMenu (props) 
{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) =>
  {
    // open the chip menu
    if (!chipClickable) return;
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () =>
  {
    // close the chip menu
    setAnchorEl(null);
  }

  const handleChipClickHere = (chip) =>
  {
    // hide the menu 
    handleClose(); 

    // edit the data in the parent
    const id = chip.id;
    props.handleChipChange(id);
  }
  
  let chipItem = null;
  let chipIndex = props.header.chipList.findIndex(c => c.id === props.value);
  if (chipIndex === -1) chipIndex = props.header.chipList.findIndex(c => c.default);
  chipItem = (chipIndex === -1) ? props.header.chipList[0] : props.header.chipList[chipIndex];
  //const chipId = (chipItem) ? chipItem.id : 1;
  const chipLabel = (chipItem) ? chipItem.label : "";
  const chipColor = (chipItem) ? chipItem.color : null;
  const chipIcon = (chipItem) ? chipItem.icon : null;
  const chipClickable = props.header.isEditable;
  const chipWidth = (chipItem) ? props.header.chipWidth : 0;
  const chipIconWidth = (chipItem) ? props.header.chipIconWidth : 0;
  
  return (
    <div>
      <Chip 
        label={chipLabel}
        avatar={<Avatar alt="" src={chipIcon} />}
        clickable={chipClickable}
        onClick={(e) => handleClick(e, chipClickable)}
        style={{
          minWidth: chipWidth,
          margin: '0px auto',
        }}
        sx={{
          backgroundColor: chipColor, 
          color: 'black', 
          width: chipIconWidth, 
          height: chipIconWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

      </Chip>
      <Menu
        id="long-menu"
        MenuListProps={{ 'aria-labelledby': 'long-button', }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            style: {
              //width: '20ch',
            },
          },
        }}
      >
        {props.header.chipList.map((chip) => {
          const chipId = chip.id;
          const title = chip.label;
          const color = chip.color;
          return (
            <MenuItem 
              key={chipId}
              onClick={() => handleChipClickHere(chip)} 
              style={{
                backgroundColor: color,
                margin: '3px 5px',
                borderRadius: '10px',
              }}
            >
            {title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
