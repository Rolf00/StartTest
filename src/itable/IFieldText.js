import * as React from 'react';

import TextField from '@mui/material/TextField';
import IConst from './IConst';

export default function IFieldText (props) {

  const editing = props.editing;
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
    props.handleDataChange(newValue, fieldname);
  }

  if (editing)
  {
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
  else
  {
    let lines = [];
    if (multiline) 
    {
      lines = value.split("\n");
    }
    if (lines.length === 0)
    {
      return (
        <div style={{ 
          padding: '5px 0px', 
          width: '100%',
          textAlign: props.header.horizontalAlign,
        }}>{value}</div>
      );
    }
    else
    {
      return(
        <div style={{ padding: '5px 0px', width: '100%' }}>
        {lines.map((line) => {
          return(
            <div style={{ 
              padding: '0px 0px', 
              width: '100%',
              textAlign: props.header.horizontalAlign,
            }}>{line}</div>
          );
        })}
        </div>
      );
    }
  }
}
