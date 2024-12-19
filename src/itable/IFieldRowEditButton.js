import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldRowEditButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be handled inside the ITableRow component. 

  const dataFieldName = props.header.editType;
  const rowState = props.rowState;
  const editType = props.header.editType;
  const isChanged = 
    rowState === IConst.rowStateEdited ||
    rowState === IConst.rowStateDeleted ||
    rowState === IConst.rowStateInserted;
  const isDeleted = props.rowstate === IConst.rowStateDeleted;
  
  const editing = props.editing;

  let disabled = true;
  if (editType === IConst.editType_ButtonEditRow)
  {
    disabled = false;
  }
  else if (editType === IConst.editType_ButtonEdit)
  {
    disabled = false;
  }
  else if (editType === IConst.editType_ButtonSave)
  {
    disabled = !isChanged;
  }    
  else if (editType === IConst.editType_ButtonUndo)
  {
    disabled = !isChanged
  }    
  else if (editType === IConst.editType_ButtonDelete)
  {
    disabled = isDeleted && rowState !== IConst.rowStateInserted;
  }    

  const imgWidth = props.settings.buttonSizeOnRows;
  const btnHoverWidth = props.settings.buttonSizeOnRowsHover;

  const icon = 
    props.header.editType === IConst.editType_ButtonEditRow ? 
      editing ? IConst.imgEditStop : IConst.imgEditButton :
    props.header.editType === IConst.editType_ButtonEdit ? IConst.imgEditButton :
    props.header.editType === IConst.editType_ButtonSave ? IConst.imgSaveButton :
    props.header.editType === IConst.editType_ButtonUndo ? IConst.imgUndoButton :
    props.header.editType === IConst.editType_ButtonDelete ? IConst.imgDeleteButton : null;

  const title = 
    props.header.editType === IConst.editType_ButtonEditRow ? 
      editing ? "Stop editing row" : "Edit this row" :
    props.header.editType === IConst.editType_ButtonEdit ? "Edit this row in modal dialog" :
    props.header.editType === IConst.editType_ButtonSave ? "Save this row" :
    props.header.editType === IConst.editType_ButtonUndo ? "Undo this row" :
    props.header.editType === IConst.editType_ButtonDelete ? "Delete this row" : "";
  
  return (
    <div
      style={{
        padding: '5px 0px', 
        width: props.width, 
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: props.verticalAlign, 
        alignItems: props.horizontalAlign,
      }}
    >
      <IconButton
        onClick={() => props.handleRowEditButtonClick(dataFieldName)}
        disabled={disabled}
        style={{ 
          width: btnHoverWidth, 
          height: btnHoverWidth,
        }}
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
    </div>
  );
}
