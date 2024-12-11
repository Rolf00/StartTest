import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import IConst from './IConst';

export default function IFieldCheckbox (props) {

  const editing = props.editing;
  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const imgWidth = props.settings.buttonSizeOnRows;
  const btnHoverWidth = imgWidth + 18;
  const iconCheckbox = value ? IConst.imgChkboxChecked : IConst.imgChkboxUnchecked;

  const handleChange = (e) =>
  {
    const newValue = !props.value;
    // change the data now
    props.handleDataChange(newValue, rowid, fieldname);
  }
  
  if (editing)
  {
    return (
      <IconButton
        disabled={disabled}
        onClick={e => handleChange(e)}
        style={{ width: btnHoverWidth, height: btnHoverWidth }} >
        <img 
          src={iconCheckbox}
          alt="img"
          style={{ width: imgWidth, height: imgWidth, padding: '0px', }} 
        />
      </IconButton>
    );
  }
  else
  {
    return (
      <img 
        src={iconCheckbox}
        alt="img"
        style={{ width: imgWidth, height: imgWidth, padding: '0px', }} 
      />
    );
  }
}
