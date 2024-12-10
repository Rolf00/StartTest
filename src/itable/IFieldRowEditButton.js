import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldRowEditButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be handled inside the ITable component. 

  const rowid = props.rowId;
  const dataFieldName = props.header.dataFieldName;
  const rowState = props.rowState;
  const editType = props.header.editType;
  const isChanged = 
    rowState === IConst.rowStateEdited ||
    rowState === IConst.rowStateInserted;
  const isDeleted = props.rowstate === IConst.rowStateDeleted;
  
  const editing = false;

  let disabled = true;
  if (editType === IConst.editType_ButtonEditRow)
  {
    disabled = editing;
  }
  else if (editType === IConst.editType_ButtonEdit)
  {
    disabled = !props.header.isEditable;
  }
  else if (editType === IConst.editType_ButtonSave)
  {
    disabled = !isChanged;
  }    
  else if (editType === IConst.editType_ButtonUndo)
  {
    disabled = (!isChanged) && (!isDeleted);
  }    
  else if (editType === IConst.editType_ButtonDelete)
  {
    disabled = isDeleted;
  }    

  const imgWidth = props.settings.buttonSizeOnRows;
  const btnHoverWidth = imgWidth + 18;

  const icon = 
    props.header.editType === IConst.editType_ButtonEditRow ? IConst.imgEditButton :
    props.header.editType === IConst.editType_ButtonEdit ? IConst.imgEditButton :
    props.header.editType === IConst.editType_ButtonSave ? IConst.imgSaveButton :
    props.header.editType === IConst.editType_ButtonUndo ? IConst.imgUndoButton :
    props.header.editType === IConst.editType_ButtonDelete ? IConst.imgDeleteButton : null;

  //console.log("props.header.editType", props.header.editType );

  const title = 
    props.header.editType === IConst.editType_ButtonEditRow ? "Edit this row" :
    props.header.editType === IConst.editType_ButtonEdit ? "Edit this row in modal dialog" :
    props.header.editType === IConst.editType_ButtonSave ? "Save this row" :
    props.header.editType === IConst.editType_ButtonUndo ? "Undo this row" :
    props.header.editType === IConst.editType_ButtonDelete ? "Delete this row" : "";
  
  
  if (editing || props.header.editType === IConst.editType_ButtonEditRow)
  {
    return (
      <IconButton
        onClick={() => props.handleRowEditButtonClick(rowid, dataFieldName)}
        disabled={disabled}
        style={{ width: btnHoverWidth, height: btnHoverWidth }}
      >
        <img 
          src = {icon}
          title = {title}
          style={{ 
            width: imgWidth, height: imgWidth, 
            padding: '0px', 
            opacity: disabled ? 0.2 : 1
          }} 
        />
      </IconButton>
    );
  }
  else 
  {
    const disabled = true;
    return (
      <div style={{ width: btnHoverWidth}}>&nbsp;</div>
    );
  }
}
