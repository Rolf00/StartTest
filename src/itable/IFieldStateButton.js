import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';

export default function IFieldStateButton (props) 
{
  
  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  // TODO : disabled depneing on role?
  //const disabled = !props.header.isEditable;
  const disabled = false;
  const buttonHeight = props.header.buttonHeight;
  const buttonRadius = props.header.buttonRadius;

  const value = props.value;
  const index = props.header.buttonList.findIndex(b => b.id === value);
  const button = index === -1 ? null : props.header.buttonList[index];
  const caption = button === null ? "" : button.caption;
  const ButtonIcon = button === null ? null : button.icon;
  const iconStyle = button === null ? "" : button.iconStyle;
  const buttonBackgroundColor = button === null ? "" : button.color;
  const buttonBackgroundHover = button === null ? "" : button.colorHover;

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
    {index > -1 && <IconButton
      onClick={() => props.handleStateButtonClick(rowid, dataFieldName)}
      style={{
        fontSize: '14px',
        width: caption === "" ? buttonHeight : '100%', 
        height: buttonHeight,
        borderRadius: buttonRadius,
        margin: '2px',
        disabled: disabled,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      sx={{
        display: caption === "" ? '' : 'flex', 
        justifyContent: caption === "" ? '' : 'flex-start',
        borderColor: buttonBackgroundHover,
        backgroundColor: buttonBackgroundColor,
        '&:Hover': {
          color: 'black',
          borderColor: 'black',
          backgroundColor: buttonBackgroundHover,
        }
      }}>
      <ButtonIcon style={iconStyle}/>
      {caption}</IconButton>}
    </div>
  );
}
