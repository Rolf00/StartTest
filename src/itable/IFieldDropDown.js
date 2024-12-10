import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function IFieldDropDown (props) {

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
    props.handleDataChange(newValue, rowid, fieldname);
  }

  const editing = false;
  
  if (editing)
  {
    return (
      <FormControl style={{ width: {dropdownWidth}, }} >
        <Select
          width={dropdownWidth}
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
    const showtext = dropdownList[value].value;
    return (
      <div>{showtext}</div>
    );
  }

}
