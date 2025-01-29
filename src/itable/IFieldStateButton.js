import React from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


export default function IFieldStateButton (props) 
{
  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = false;
  const buttonWidth = props.header.buttonWidth;
  const buttonHeight = props.header.buttonHeight;
  const buttonRadius = props.header.buttonRadius;
  const iconSize = props.header.iconSize;
  const value = props.value;

  const hasButtonList = (props.header.buttonList && props.header.buttonList.length > 0);
  const index = hasButtonList ? props.header.buttonList.findIndex(b => b.id === value) : -1;
  const button = index === -1 ? null : props.header.buttonList[index];

  const isMuiIcon = button ? button.icon ? true : false : false;
  const isImage = button ? button.image ? true : false : false;
  const isHtml = button ? button.html ? true : false : false;

  // mui
  const ButtonIcon = isMuiIcon ? button.icon : null;
  const iconStyle = isMuiIcon ? button.style : null;
  // image
  const imgSource = isImage ? button.image : null;
  // html
  const html = isHtml ? button.html : null;

  const caption = button === null ? "" : button.caption;
  const buttonBackgroundColor = button === null || imgSource ? "" : button.color;
  const buttonBackgroundHover = button === null || imgSource ? "" : button.colorHover;
  const hasCaption = caption !== "";
  const hasOnlyCaption = hasCaption && (!isMuiIcon) && (!isImage) && (!isHtml);
  const canClick = props.header.isEditable && (isMuiIcon || isImage || isHtml || hasCaption);

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
    {canClick && <IconButton
      onClick={() => props.handleStateButtonClick(rowid, dataFieldName)}
      style={{
        fontSize: '14px',
        padding: '2px',
        disabled: disabled,
        borderRadius: hasCaption && (!isHtml) ? buttonRadius : '',
        borderWidth: hasCaption && (!isHtml) && (!hasOnlyCaption) ?  '1px' : '0px',
        borderStyle: hasCaption && (!isHtml) && (!hasOnlyCaption) ? 'solid' : '',
        width: hasOnlyCaption ? '100%' : hasCaption ? buttonWidth : isImage || isMuiIcon ? iconSize : '', 
        height: hasCaption ? buttonHeight : isImage || isMuiIcon ? iconSize : '', 
        textAlign: hasOnlyCaption ? 'center' : '',
      }}
      sx={{
        display: 'flex', 
        justifyContent: hasCaption ? 'flex-start' : hasOnlyCaption ? 'center' : 'center',
        borderColor: hasCaption && (!isHtml) ? buttonBackgroundHover : '',
        backgroundColor: hasCaption && (!isHtml) ? buttonBackgroundColor : '',
        '&:Hover': {
          color: hasCaption && (!isHtml) ? 'black' : '',
          borderColor: hasCaption && (!isHtml) ? 'black' : '',
          backgroundColor: hasCaption && (!isHtml) ? buttonBackgroundHover : '',
        }
      }}>
        {isMuiIcon && <ButtonIcon className={props.classes[iconStyle]}/>}
        {isImage && <Avatar src={imgSource} style={{ width: iconSize, height: iconSize }} />}
        {isHtml && html}
        {hasCaption && caption} 
      </IconButton>}

      {(!canClick) && <div
      style={{
        fontSize: '14px',
        padding: '2px',
        disabled: disabled,
        borderRadius: hasCaption && (!isHtml) ? buttonRadius : '',
        borderWidth: hasCaption && (!isHtml) && (!hasOnlyCaption) ?  '1px' : '0px',
        borderStyle: hasCaption && (!isHtml) && (!hasOnlyCaption) ? 'solid' : '',
        width: hasOnlyCaption ? '100%' : hasCaption ? buttonWidth : isImage || isMuiIcon ? iconSize : '', 
        height: hasCaption ? '' : isImage || isMuiIcon ? iconSize : '', 
        textAlign: hasOnlyCaption ? 'center' : '',
      }}
      sx={{
        display: 'flex', 
        justifyContent: hasCaption ? 'flex-start' : hasOnlyCaption ? 'center' : 'center',
        borderColor: hasCaption && (!isHtml) ? buttonBackgroundHover : '',
        backgroundColor: hasCaption && (!isHtml) ? buttonBackgroundColor : '',
      }}>
        {isMuiIcon && <ButtonIcon className={props.classes[iconStyle]}/>}
        {isImage && <Avatar src={imgSource} style={{ width: iconSize, height: iconSize }} />}
        {isHtml && html}
        {hasCaption && caption} 
      </div>}

    </div>
  );
}
