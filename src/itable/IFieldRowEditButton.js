import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldRowEditButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be handled inside the ITable component. 

  const rowid = props.rowid;
  const dataFieldName = props.header.dataFieldName;
  const disabled = !props.header.isEditable;

  const icon = 
    props.header.editType = IConst.editType_ButtonEdit ? IConst.imgEditButton :
    props.header.editType = IConst.editType_ButtonSave ? IConst.imgSaveButton :
    props.header.editType = IConst.editType_ButtonUndo ? IConst.imgUndoButton :
    props.header.editType = IConst.editType_ButtonDelete ? IConst.imgDeleteButton : null;

  const iconWidth = props.settings.buttonSizeOnRows;

  const title = 
    props.header.editType = IConst.editType_ButtonEdit ? "Edit this row in modal dialog" :
    props.header.editType = IConst.editType_ButtonSave ? "Save this row" :
    props.header.editType = IConst.editType_ButtonUndo ? "Undo this row" :
    props.header.editType = IConst.editType_ButtonDelete ? "Delete this row" : "";
  
  return (
    <IconButton
      onClick={() => props.handleRowEditButtonClick(rowid, dataFieldName)}
      style={{
        width: '100%', 
        height: '52px',
        borderRadius: '16px',
        padding: '0px',
        disabled: {disabled},
      }}>
      <img 
        src = {icon}
        title = {title}
        style = {{ 
          width: {iconWidth}, 
          height: {iconWidth},
          padding: '0px',
        }} 
      /></IconButton>
);
}
