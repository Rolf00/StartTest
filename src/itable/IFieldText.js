import * as React from 'react';

import TextField from '@mui/material/TextField';
import IConst from './IConst';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldText (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const multiline = props.header.editType === IConst.editType_TextfieldMultiline;
  const horizontalAlign = props.header.horizontalAlign
  const hasError = ( 
    value.length > props.header.textMaxLength ||
    (value === null && props.header.required) ||
    (value === '' && props.header.required));
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
      <div 
      style={{ 
        padding: '5px 0px', 
        width:  '100%', // props.width, 
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: props.horizontalAlign, 
        alignItems: props.verticalAlign,
      }}
      >    
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
        sx={{ '& .MuiInputBase-root': { 
          height: props.editHeight,  
          backgroundColor: background,
          color: {color},
        }, }}
        onChange={(event) => handleChange(event)}
      />
      </div>
    );
  }
  else
  {
    let lines = [];
    if (multiline) { lines = value.split("\n"); }

    if (lines.length === 0 || props.header.textWrap === false)
    {
      return (
        <IFieldReadOnly
          width={width}
          verticalAlign={props.verticalAlign} 
          horizontalAlign={props.horizontalAlign}
          value={value}
        />
      );
    }
    else
    {
      return(
        <div style={{ 
          padding: '5px 0px', 
          width: width, 
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}>
        {lines.map((line) => {
          return(
            <div style={{ 
              padding: '0px', 
              width: width, 
              textAlign: props.singleHorizontalAlign,
            }}>{line}</div>
          );
        })}
        </div>
      );
    }
  }
}
