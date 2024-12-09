import * as React from 'react';
import TextField from '@mui/material/TextField';
import IConst from './IConst';

export default function IFieldText (props) {

  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const multiline = props.header.editType === IConst.editType_TextfieldMultiline;
  const horizontalAlign = props.header.horizontalAlign
  const hasError = 
    value.length > props.header.textMaxLength ||
    (value === null && props.header.required) ||
    (value === '' && props.header.required);
    const helperText = hasError ? props.header.helperText : "";
    const width = props.header.width;

  const color = hasError ? IConst.errorColor : 'black';
  const background = hasError ? IConst.errorColorBackground : 'transparent';

  const handleChange = (e) =>
  {
    const newValue = e.target.value;
    // change the data now
    props.handleDataChange(newValue, rowid, fieldname);
  }
 
  return (
    <TextField
      //id="outlined"
      disabled={disabled}
      value={value}
      helperText={helperText} 
      multiline={multiline}
      style={{ 
        textAlign: horizontalAlign, 
        width: width, 
      }}
      inputProps={{
        sx: {
          color: color,
          backgroundColor: background
        },
      }}
      onChange={(event) => handleChange(event)}
    />
  );
}
