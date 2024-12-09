import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldCheckbox (props) {

  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const width = props.settings.buttonSizeOnRow
  const btnHoverWidth = props.header.width + 10;
  const iconCheckbox = value ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;

  const handleChange = (e) =>
  {
    let newValue = e.target.value;

    // change the data now
    props.handleDataChange(newValue, rowid, fieldname);
  }
  
  return (
    <IconButton
      disabled = {disabled}
      onChange = {e => handleChange(e)}
      style={{ width: btnHoverWidth, height: btnHoverWidth }} >
      <img 
        src={iconCheckbox}
        style={{ width: {width}, height: {width} }} 
      />
    </IconButton>
  );
}
