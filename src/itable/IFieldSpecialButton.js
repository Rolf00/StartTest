import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';


export default function IFieldSpecialButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be directed back to the parent of the ITable component. 

  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = !props.header.isEditable;

  /* EXAMPLE:
  caption: "View patient",  
  icon: imgPerson48, 
  iconWidth: 36,
  buttonHeight: 36,
  buttonBackgroundColor: "#DDDDFF", 
  buttonBackgroundHover: "#AAAAFF", 
  */

  const caption = props.header.button.caption;
  const icon = props.header.button.icon;
  const iconWidth = props.header.button.iconWidth;
  const buttonHeight = props.header.button.buttonHeight;
  const buttonBackgroundColor = props.header.button.buttonBackgroundColor;
  const buttonBackgroundHover = props.header.button.buttonBackgroundHover;

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
    <IconButton
      onClick={() => props.handleSpecialButtonClick(rowid, dataFieldName)}
      style={{
        fontSize: 12,
        width: '100%', 
        height: buttonHeight,
        borderRadius: '10px',
        margin: '2px',
        disabled: disabled,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      sx={{
        borderColor: buttonBackgroundHover,
        backgroundColor: buttonBackgroundColor,
        '&:Hover': {
          borderColor: 'black',
          backgroundColor: buttonBackgroundHover,
        }
      }}
      >
      <img 
        src={icon}
        title={caption}
        style={{ 
          width: iconWidth, 
          height: iconWidth,
          padding: '0px',
        }} 
      />{caption}</IconButton>
    </div>
  );
}
