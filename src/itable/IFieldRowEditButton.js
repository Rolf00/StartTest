import * as React from 'react';
import { 
  IconButton,
  Tooltip } from '@mui/material';

import IConst from './IConst';

  
export default function IFieldRowEditButton (props) {

  // Component for buttons placed on each row.
  // Their onClick event will be handled inside the ITableRow component. 
  const classes = props.classes;
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
  if (saving) disabled = true;

  const btnHoverWidth = props.settings.buttonSizeOnRowsHover;

  const title = 
    props.header.editType === IConst.editType_ButtonEditRow ? 
      editing ? "Stop editing row" : "Edit this row" :
    props.header.editType === IConst.editType_ButtonEdit ? "Edit this row in modal dialog" :
    props.header.editType === IConst.editType_ButtonSave ? "Save this row" :
    props.header.editType === IConst.editType_ButtonUndo ? "Undo this row" :
    props.header.editType === IConst.editType_ButtonDelete ? "Delete this row" : "";

  const MuiIcon = 
    props.header.editType === IConst.editType_ButtonEditRow ? 
      editing ? props.settings.rowEditStopIcon : props.settings.rowEditIcon :
    props.header.editType === IConst.editType_ButtonEdit ? props.settings.rowEditDialogIcon :
    props.header.editType === IConst.editType_ButtonSave ? props.settings.rowSaveIcon :
    props.header.editType === IConst.editType_ButtonUndo ? props.settings.rowUndoIcon :
    props.header.editType === IConst.editType_ButtonDelete ? props.settings.rowDeleteIcon : props.settings.rowEditIcon;
    
  return (
    <div
      style={{
        padding: '5px 0px', 
        width: '100%',
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
        style={{ width: btnHoverWidth, height: btnHoverWidth, }}
      >
      {props.header.editType === IConst.editType_ButtonEditRow && !editing &&
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleEditRow} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      {props.header.editType === IConst.editType_ButtonEditRow && editing &&
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleEditRowStop} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      {props.header.editType === IConst.editType_ButtonEdit && 
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleEditRow} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      {props.header.editType === IConst.editType_ButtonSave && 
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleSave} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      {props.header.editType === IConst.editType_ButtonUndo && 
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleUndo} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      {props.header.editType === IConst.editType_ButtonDelete && 
      <Tooltip title={title} arrow>
      <MuiIcon className={classes.iconButtonStyleDelete} sx={{ opacity: disabled ? 0.2 : 1 }} />
      </Tooltip>}

      </IconButton>
    </div>
  );
}
