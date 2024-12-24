import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

import AdjustIcon from '@mui/icons-material/Adjust';



/*
// HOW TO USE CHIP FIELDS
// -------------------------------------------------------------------
// you are free to design colors, texts and the lenght of chip array
// -------------------------------------------------------------------
// example of colors
// -----------------
// #BFBFBF LightGrey
// #FFFF00 yellow
// #FF7F00 orange
// #FF0000 red
// #FF00FF purple
// #0000FF blue
// #00FFFF turqoise
// #00FF00 green
// 
// example of icons
// ----------------
import imgChipStatusLightGrey from './CircleLightGrey.png'; 
import imgChipStatusYellow from './CircleYellow.png'; 
import imgChipStatusOrange from './CircleOrange.png'; 
import imgChipStatusRed from './CircleRed.png'; 
import imgChipStatusPurple from './CirclePurple.png'; 
import imgChipStatusBlue from './CircleBlue.png'; 
import imgChipStatusTurqoise from './CircleTurqoise.png'; 
import imgChipStatusGreen from './CircleGreen.png'; 
import imgPerson48 from './imgPerson48.png';
// 
// example of a header definition
// ------------------------------
  {
    id: 13,
    databaseField: "chipstate",
    headerTitle: "State",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    width: 120,
    minWidth: 100,
    maxWidth: 320,
    editType: 'chip',
    chipList: [
      { id: 1, label: 'open',    color: '#F3F3F3', colorHover: '#F5F5F5', icon: imgChipStatusLightGrey, },
      { id: 2, label: 'new',     color: '#FFFFBB', colorHover: '#FFFF99', icon: imgChipStatusYellow, },
      { id: 3, label: 'invited', color: '#FFE1BF', colorHover: '#FFDFC1', icon: imgChipStatusOrange, },
      { id: 4, label: 'surgery', color: '#FFBBFF', colorHover: '#99BB99', icon: imgChipStatusPurple, },
      { id: 5, label: 'visited', color: '#BBFFFF', colorHover: '#99FFFF', icon: imgChipStatusTurqoise, },
      { id: 6, label: 'invest.', color: '#BBBBFF', colorHover: '#9999FF', icon: imgChipStatusBlue, },
      { id: 7, label: 'all ok',  color: '#BBFFBB', colorHover: '#99FF99', icon: imgChipStatusGreen, },
      { id: 8, label: 'danger',  color: '#FFBBBB', colorHover: '#FF9999', icon: imgChipStatusRed, },
    ],
    chipWidth: 100,
    chipIconWidth: 32,
    dataFieldName: 'chipstate',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
*/

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
  const chipLabel = (chipItem) ? chipItem.label : "";
  const chipColor = (chipItem) ? chipItem.color : null;
  const chipColorHover = (chipItem) ? chipItem.colorHover : null;
  const chipIcon = (chipItem) ? chipItem.icon : null;
  const chipClickable = props.header.isEditable;
  const chipWidth = (chipItem) ? props.header.chipWidth : 0;
  const chipIconWidth = (chipItem) ? props.header.chipIconWidth : 0;

  const [isHovered, setIsHovered] = useState(false);

  if (editing)
  {
    return (
      <div 
        style={{
          padding: '5px 0px', 
          width: props.width, 
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}
      >
        <Chip 
          label={chipLabel}
          //avatar={<Avatar alt="" src={<AdjustIcon/>} />}
          avatar={<AdjustIcon/>}
          clickable={chipClickable}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}      
          onClick={(e) => handleClick(e, chipClickable)}
          style={{
            minWidth: chipWidth,
            margin: '0px auto',
            backgroundColor: isHovered ? chipColorHover : chipColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isHovered ? 'black' : chipColor,
          }}
          sx={{
            color: 'black', 
            width: chipIconWidth, 
            height: chipIconWidth,
            justifyContent: 'left',
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
          {props.header.chipList.map((chip, index) => {
            const chipId = chip.id;
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
          width: props.width, 
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}
      >
        <Chip 
          label={chipLabel}
          //avatar={<Avatar alt="" src={chipIcon} />}
          avatar={<AdjustIcon/>}
          style={{
            minWidth: chipWidth,
          }}
          sx={{
            backgroundColor: chipColor, 
            color: 'black', 
            width: chipIconWidth, 
            height: chipIconWidth,
            justifyContent: 'left',
          }}
        />
      </div>
    );
  }
}
