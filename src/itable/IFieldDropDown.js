import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function IFieldDropDown (props) {

  const editing = props.editing;
  const rowid = props.rowid;
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
      <FormControl 
        style={{ 
          //width: {dropdownWidth}, 
          //width: '100%', 
        }} >
        <Select
          //width={dropdownWidth}
          width={'100%'}

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
      <div 
        style={{ 
          padding: '5px 0px', width: '100%', 
          textAlign: props.header.horizontalAlign,
        }}
      >{showtext}</div>
    );
  }

}
