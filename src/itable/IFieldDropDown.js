import * as React from 'react';
import FormControl from '@mui/material/FormControl';
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
