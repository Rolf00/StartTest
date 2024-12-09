import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldSelection (props) {

  // Component for the row selection column on each row.
  const value = props.value;
  const rowid = props.rowid;
  const imgWidth = props.settings.buttonSizeOnRows;
  const newheaderWidth = props.header.width + 18;

  const iconCheckbox = value ? 
    IConst.imgChkboxChecked: 
    IConst.imgChkboxUnchecked;

  
  return (
    <IconButton
      onClick={e => this.handleSelectionClickRow(e, rowid)}
      style={{ width: newheaderWidth, height: newheaderWidth, }}>
      <img 
        src = {iconCheckbox}
        alt="img"
        title="Select / Unselect this row"
        style = {{ 
          width: imgWidth, 
          height: imgWidth,
          padding: '0px',
        }} 
      />
    </IconButton>
  );
}
