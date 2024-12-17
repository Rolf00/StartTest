import * as React from 'react';
import TextField from '@mui/material/TextField';
import IConst from './IConst';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldNumber (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const hasError = 
    (value < props.header.numberMinValue) ||
    (value > props.header.numberMaxValue) ||
    (value === null && props.header.required) ||
    (value === '' && props.header.required);

  const helperText = hasError ? props.header.helperText : "";
  const isInteger = props.header.editType === IConst.editType_Integer;
  const type = isInteger ? 'number' : 'text';
  const disabled = !props.header.isEditable;
  const width = props.header.width;

  const color = hasError ? IConst.errorColor : 'black';
  const background = hasError ? IConst.errorColorBackground : 'transparent';


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
        width: props.width, 
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
        style={{ 
          width: width, 
        }}
        sx={{ '& .MuiInputBase-root': { height: props.editHeight,  }, }}
        inputProps={{
          type: type,
          sx: {
            backgroundColor: background,
            color: {color},
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
        width={props.header.width}
        verticalAlign={props.verticalAlign} 
        horizontalAlign={props.horizontalAlign}
        value={showtext}
      />
    );
  }
}
