import * as React from 'react';
import TextField from '@mui/material/TextField';

import IConst from './IConst';
import IUtils from './IUtils';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldText (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const multiline = props.header.editType === IConst.editType_TextfieldMultiline;
  const horizontalAlign = props.header.horizontalAlign

  const hasError = IUtils.hasError(value, props.header);
  const color = hasError ? props.settings.errorColor : 'black';
  const background = hasError ? props.settings.errorColorBackground : 'transparent';
  const helperText = hasError ? props.header.helperText : '';

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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: props.horizontalAlign, 
        alignItems: props.verticalAlign,
      }}
      >    
      <TextField
        disabled={disabled}
        value={value}
        helperText={helperText} 
        multiline={multiline}
        style={{ 
          width: '100%',
          textAlign: horizontalAlign, 
        }}
        sx={{ 
          '& .MuiInputBase-root': {
            backgroundColor: background,
            color: color,
            padding: '0px',
          },
          '& .MuiInputBase-input': { 
            height: props.editHeight,  
            padding: '6px',
          }, 
        }}
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
          width: '100%',
          padding: '5px 0px', 
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}>
        {lines.map((line) => {
          return(
            <div style={{ 
              width: '100%',
              padding: '0px', 
              textAlign: props.singleHorizontalAlign,
            }}>{line}</div>
          );
        })}
        </div>
      );
    }
  }
}
