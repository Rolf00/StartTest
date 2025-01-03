import * as React from 'react';
import { 
  IconButton,
  Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StopIcon from '@mui/icons-material/Stop';

import IConst from './IConst';
import { listItemSecondaryActionClasses } from '@mui/material';

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
  const saving = props.saving;

  let disabled = true;
  if (!props.savingInProgressAll)
  {
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
  }
  if (props.saving) disabled = true;

  const imgWidth = props.settings.buttonSizeOnRows;
  const btnHoverWidth = props.settings.buttonSizeOnRowsHover;

  /*
  const icon = 
    props.header.editType === IConst.editType_ButtonEditRow ? 
      editing ? IConst.imgEditStop : IConst.imgEditButton :
    props.header.editType === IConst.editType_ButtonEdit ? IConst.imgEditEditDialogButton :
    props.header.editType === IConst.editType_ButtonSave ? IConst.imgSaveButton :
    props.header.editType === IConst.editType_ButtonUndo ? IConst.imgUndoButton :
    props.header.editType === IConst.editType_ButtonDelete ? IConst.imgDeleteButton : null;
  */

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
      {props.header.editType === IConst.editType_ButtonEditRow && !editing &&
      <Tooltip title={title} arrow>
      <EditIcon sx={{ 
        color: IConst.iconColorGreen,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      {props.header.editType === IConst.editType_ButtonEditRow && editing &&
      <Tooltip title={title} arrow>
      <StopIcon sx={{ 
        color: IConst.iconColorRed,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      {props.header.editType === IConst.editType_ButtonEdit && 
      <Tooltip title={title} arrow>
      <EditNoteIcon sx={{ 
        color: IConst.iconColorGreen,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      {props.header.editType === IConst.editType_ButtonSave && 
      <Tooltip title={title} arrow>
      <SaveIcon sx={{ 
        color: IConst.iconColorRed,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      {props.header.editType === IConst.editType_ButtonUndo && 
      <Tooltip title={title} arrow>
      <UndoIcon sx={{ 
        color: IConst.iconColorRed,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      {props.header.editType === IConst.editType_ButtonDelete && 
      <Tooltip title={title} arrow>
      <HighlightOffIcon sx={{ 
        color: IConst.iconColorRed,
        opacity: disabled ? 0.2 : 1 }} /></Tooltip>}

      </IconButton>
    </div>
  );
}
