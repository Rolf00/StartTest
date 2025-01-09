import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


export default function IFieldStateButton (props) 
{

  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = false;
  const buttonHeight = props.header.buttonHeight;
  const buttonRadius = props.header.buttonRadius;

  const value = props.value;
  const index = props.header.buttonList.findIndex(b => b.id === value);
  const button = index === -1 ? null : props.header.buttonList[index];
  const caption = button === null ? "" : button.caption;
  const ButtonIcon = button === null ? null : button.icon ? button.icon : null;
  const image = index === -1 ? null : button.image ? button.image : null;
  const iconStyle = button === null ? "" : button.iconStyle;
  const buttonBackgroundColor = button === null || image ? "" : button.color;
  const buttonBackgroundHover = button === null || image ? "" : button.colorHover;

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
        width: image ? '' : caption === "" ? buttonHeight : '100%', 
        height: image ? '' : '100%',
        minHeight: image ? '' : buttonHeight,
        borderRadius: image ? '' : buttonRadius,
        margin: '0px 2px 3px 2px',
        padding: '2px',
        disabled: disabled,
        borderWidth: image ? '0px' : '1px',
        borderStyle: image ? 'none' : 'solid',
      }}
      sx={{
        display: caption === "" ? '' : 'flex', 
        justifyContent: caption === "" ? '' : 'flex-start',
        borderColor: image ? '' : buttonBackgroundHover,
        backgroundColor: image ? '' : buttonBackgroundColor,
        '&:Hover': {
          color: image ? '' : 'black',
          borderColor: image ? '' : 'black',
          backgroundColor: buttonBackgroundHover,
        }
      }}>
      {!image && <ButtonIcon style={iconStyle}/>}
      {image && <Avatar src={image}/>}
      {caption}</IconButton>}
    </div>
  );
}
