import React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


export default function IFieldStateButton (props) 
{
  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = false;
  const buttonWidth = props.header.buttonWidth;
  const buttonRadius = props.header.buttonRadius;
  const iconSize = props.header.iconSize;
  const value = props.value;

  const hasButtonList = (props.header.buttonList && props.header.buttonList.length > 0);
  const index = hasButtonList ? props.header.buttonList.findIndex(b => b.id === value) : -1;
  const button = index === -1 ? null : props.header.buttonList[index];
  const caption = button === null ? "" : button.caption;
  const ButtonIcon = button === null ? null : button.icon ? button.icon : null;
  const image = index === -1 ? null : button.image ? button.image : null;
  const iconStyle = button === null ? "" : button.iconStyle;
  const buttonBackgroundColor = button === null || image ? "" : button.color;
  const buttonBackgroundHover = button === null || image ? "" : button.colorHover;
  const hasCaption = caption !== "";
  const hasClickButton = (hasButtonList || hasCaption || value);

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
    {hasClickButton && <IconButton
      onClick={() => props.handleStateButtonClick(rowid, dataFieldName)}
      style={{
        fontSize: '14px',
        padding: '2px 6px 2px 2px',
        disabled: disabled,
        borderRadius: hasCaption ? buttonRadius : '',
        borderWidth: hasCaption ?  '1px' : '0px',
        borderStyle: hasCaption ? 'solid' : 'none',
        width: hasCaption ? buttonWidth : image ? iconSize : '', 
        height: hasCaption ? '' : image ? iconSize : '', 
      }}
      sx={{
        display: caption === "" ? '' : 'flex', 
        justifyContent: caption === "" ? '' : 'flex-start',
        borderColor: image ? '' : buttonBackgroundHover,
        backgroundColor: image ? '' : buttonBackgroundColor,
        '&:Hover': {
          color: image ? 'black' : '',
          borderColor: image ? 'black' : '',
          backgroundColor: buttonBackgroundHover,
        }
      }}>
        
      {hasButtonList && (!image) && <ButtonIcon style={iconStyle}/>}
      {hasButtonList && image && <Avatar src={image} style={{ width: iconSize, height: iconSize }} />}
      {(!hasButtonList) && value}

      {caption}
      </IconButton>}

    </div>
  );
}
