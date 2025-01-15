import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';


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
    props.handleDataChange(id);
  }
  
  const editing = (props.editing && !props.savingInProgressAll);
  let chipItem = null;
  let chipIndex = props.header.chipList.findIndex(c => c.id === props.value);
  if (chipIndex === -1) chipIndex = props.header.chipList.findIndex(c => c.default);
  chipItem = (chipIndex === -1) ? props.header.chipList[0] : props.header.chipList[chipIndex];
  const chipWidth = props.header.chipWidth;
  const chipLabel = (chipItem) ? chipItem.label : "";
  const chipColor = (chipItem) ? chipItem.color : null;
  const chipColorHover = (chipItem) ? chipItem.colorHover : null;
  const chipClickable = props.header.isEditable;
  const ChipIcon = (chipItem) ? chipItem.icon ? chipItem.icon : null : null;
  const image = (chipItem) ? chipItem.image ? chipItem.image : null : null;
  const chipIconStyle = (chipItem) ? chipItem.style : null;

  const [isHovered, setIsHovered] = useState(false);

  if (editing)
  {
    return (
      <div 
        style={{
          padding: '5px 0px', 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}
      >
        <Chip 
          label={chipLabel}
          avatar={ image ? <Avatar src={image}/> : <ChipIcon style={chipIconStyle} />}
          clickable={chipClickable}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}      
          onClick={(e) => handleClick(e, chipClickable)}
          style={{
            width: chipWidth,
            backgroundColor: isHovered ? chipColorHover : chipColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isHovered ? 'black' : chipColor,
          }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '14px',
            backgroundColor: chipColor, 
            color: 'black', 
          }}
        >
        </Chip>
        <Menu
          id="long-menu"
          MenuListProps={{ 'aria-labelledby': 'long-button', }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
        >
          {props.header.chipList.map((chip, index) => {
            const title = chip.label;
            const color = chip.color;
            return (
              <MenuItem 
                key={`chipmenu-item${index}-header${props.header.id}`}
                onClick={() => handleChipClickHere(chip)} 
                style={{
                  backgroundColor: color,
                  margin: '3px 5px',
                  borderRadius: '10px',
                  height: 32,
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
  else
  {
    return (
      <div 
        style={{ 
          padding: '5px 0px', 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}
      >
        <Chip 
          label={chipLabel}
          avatar={ image ? <Avatar src={image}/> : <ChipIcon style={chipIconStyle} />}
          style={{
            width: chipWidth,
            backgroundColor: chipColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: chipColorHover,
          }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '14px',
            backgroundColor: chipColor, 
            color: 'black', 
          }}
        />
      </div>
    );
  }
}
