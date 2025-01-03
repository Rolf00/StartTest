import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';

import IConst from './IConst';
import IUtils from './IUtils';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldDropDown (props) {

  const editing = (props.editing && !props.savingInProgressAll);
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const dropdownList = props.header.dropdownSelection;
  const disabled = !props.header.isEditable;
  const dropdownWidth = props.header.width - 10;
  
  const hasError = IUtils.hasError(value, props.header);
  const color = hasError ? IConst.errorColor : 'black';
  const background = hasError ? IConst.errorColorBackground : 'transparent';
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
      <FormControl 
        style={{ 
          width: '100%', // {dropdownWidth}, 
        }} 
        sx={{ 
          '& .MuiInputBase-root': { 
            backgroundColor: background,
            color: color,
            padding: '0px 10px 0px 0px',
          }, 
          '& .MuiInputBase-input': { 
            height: props.editHeight,  
            padding: '6px',
          }, 
        }}
        >
        <Select
          disabled={disabled}
          value={value}
          onChange={e => handleChange(e)}
          >
        {dropdownList.map((item, itemIndex) =>
        {
          const ddId = item.id;
          const ddValue = item.value;
          return (
            <MenuItem 
              key={itemIndex} 
              value={ddId}
            >{ddValue}</MenuItem>
          );
        })}
        </Select> 
        <FormHelperText>{helperText}</FormHelperText>        
      </FormControl>
      </div>
    );
  }
  else
  {
    let showtext = "";
    try {
      // Code that might throw an error
      const index = props.header.dropdownSelection.findIndex(h => h.id === value)
      showtext = props.header.dropdownSelection[index].value;
    } 
    catch {}
    
    return (
      <IFieldReadOnly
        width={dropdownWidth}
        verticalAlign={props.verticalAlign} 
        horizontalAlign={props.horizontalAlign}
        value={showtext}
      />
    );
  }

}
