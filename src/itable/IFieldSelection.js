import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldSelection (props) {

  // Component for the row selection column on each row.
  const value = props.value;
  const rowid = props.rowid;
  const imgWidth = props.settings.buttonSizeOnRows;
  const btnHoverWidth = props.settings.buttonSizeOnRowsHover;

  const iconCheckbox = value ? 
    IConst.imgChkboxChecked: 
    IConst.imgChkboxUnchecked;

 
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
    <IconButton
      onClick={() => props.handleSelectionClickRow(rowid)}
      style={{ width: btnHoverWidth, height: btnHoverWidth, }} 
      >
      <img 
        src = {iconCheckbox}
        alt="img"
        title="Select / Unselect this row"
        style={{ width: imgWidth, height: imgWidth, padding: '0px', }} 
      />
    </IconButton>
    </div>
  );
}
