import * as React from 'react';
import IconButton from '@mui/material/IconButton';


export default function IFieldSpecialButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be directed back to the parent of the ITable component. 

  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = !props.header.isEditable;

  const caption = props.button[0];
  const icon = props.button[1];
  const iconWidth = props.button[2];
  const buttonBackgroundColor = props.button[3];
  const title = props.header.headerTitle;
  
  return (
    <IconButton
      onClick={() => props.handleSpecailButtonClick(rowid, dataFieldName)}
      style={{
        width: '100%', 
        height: '52px',
        borderRadius: '16px',
        padding: '0px',
        disabled: {disabled},
        backgroundColor: {buttonBackgroundColor}
      }}>
      <img 
        src={icon}
        title={title}
        style={{ 
          width: {iconWidth}, 
          height: {iconWidth},
          padding: '0px',
        }} 
      />{caption}</IconButton>
);
}
