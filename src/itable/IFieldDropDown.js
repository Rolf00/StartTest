import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldDropDown (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const dropdownList = props.header.dropdownSelection;
  const disabled = !props.header.isEditable;
  const dropdownWidth = props.header.width - 10;
  
  const handleChange = (e) =>
  {
    const newValue = e.target.value;
    // change the data now
    props.handleDataChange(newValue, fieldname);  }

  if (editing)
  {
    return (

      <div 
      style={{ 
        padding: '5px 0px', 
        width: dropdownWidth, 
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: props.horizontalAlign, 
        alignItems: props.verticalAlign,
      }}
      >    
      <FormControl 
        style={{ width: {dropdownWidth}, }} >
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
              key={itemIndex} value={ddId}
            >{ddValue}</MenuItem>
          );
        })}
        </Select> 
      </FormControl>
      </div>
    );
  }
  else
  {
    let showtext = "";
    try {
      // Code that might throw an error
      showtext = props.header.dropdownSelection[value].value;
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
