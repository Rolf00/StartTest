import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';


export default function IFieldSpecialButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be directed back to the parent of the ITable component. 

  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = !props.header.isEditable;
  const caption = props.header.button.caption;
  const ButtonIcon = props.header.button.icon;

  const iconStyle = props.header.button.iconStyle;
  const style = props.header.button.style;
  const color = props.header.button.color;
  const borderColor = props.header.button.borderColor;
  const backgroundColor = props.header.button.backgroundColor;
  const hoverColor = props.header.button.hoverColor;
  const hoverBorderColor = props.header.button.hoverBorderColor;
  const hoverBackgroundColor = props.header.button.hoverBackgroundColor;

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
    <IconButton
      onClick={() => props.handleSpecialButtonClick(rowid, dataFieldName)}
      style={style}
      disabled={disabled}
      sx={{
        color: color,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        '&:Hover': {
          color: hoverColor,
          borderColor: hoverBorderColor,
          backgroundColor: hoverBackgroundColor,
        }
      }}
      >
      <ButtonIcon style={iconStyle}/>
      {caption}</IconButton>
    </div>
  );
}
