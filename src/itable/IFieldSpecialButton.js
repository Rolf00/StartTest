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
  //const buttonHeight = props.header.button.buttonHeight;
  const buttonRadius = props.header.button.buttonRadius;
  const buttonBackgroundColor = props.header.button.buttonBackgroundColor;
  const buttonBackgroundHover = props.header.button.buttonBackgroundHover;

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
      style={{
        fontSize: '14px',
        padding: '2px 6px 2px 2px',
        disabled: disabled,
        borderRadius: buttonRadius,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      sx={{
        borderColor: buttonBackgroundHover,
        backgroundColor: buttonBackgroundColor,
        '&:Hover': {
          color: 'black',
          borderColor: 'black',
          backgroundColor: buttonBackgroundHover,
        }
      }}>
      <ButtonIcon style={iconStyle}/>
      {caption}</IconButton>
    </div>
  );
}
