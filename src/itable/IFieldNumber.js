import * as React from 'react';
import TextField from '@mui/material/TextField';

import IConst from './IConst';
import IUtils from './IUtils';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldNumber (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const isInteger = props.header.editType === IConst.editType_Integer;
  const type = isInteger ? 'number' : 'text';
  const disabled = !props.header.isEditable;
  const width = props.header.width;

  const hasError = IUtils.hasError(value, props.header);
  const color = hasError ? IConst.errorColor : 'black';
  const background = hasError ? IConst.errorColorBackground : 'transparent';
  const helperText = hasError ? props.header.helperText : '';

  const handleChange = (e) =>
  {
    let newValue = e.target.value;

    if (isInteger)
    {
      // for integers remove a point "."
      const hasPoint = newValue.includes(".");
      if (hasPoint) newValue = newValue.replace(".", "");
    }

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
        id="outlined"
        disabled={disabled}
        type="number"
        value={value}
        helperText={helperText} 
        //style={{  width: width, }}
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
        inputProps={{
          type: type,
          sx: {
            textAlign: props.header.horizontalAlign,
            "&::placeholder": {
              textAlign: props.header.horizontalAlign,
            },
          },
        }}
        onChange={(event) => handleChange(event)}
      />
      </div>
    );
  }
  else
  {
    const showtext = isInteger ? value : value.toFixed(props.header.decimalCount);
    return (
      <IFieldReadOnly
        verticalAlign={props.verticalAlign} 
        horizontalAlign={props.horizontalAlign}
        value={showtext}
      />
    );
  }
}
