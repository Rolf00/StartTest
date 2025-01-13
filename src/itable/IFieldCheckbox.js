import * as React from 'react';
import IconButton from '@mui/material/IconButton';

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

import { iconButtonStyleGreen } from './IStyles';

export default function IFieldCheckbox (props) {

  const editing = (props.editing && !props.savingInProgressAll);
  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const btnHoverWidth = props.settings.buttonSizeOnRows;
  const CheckboxIcon = value ? CheckBoxRoundedIcon : CheckBoxOutlineBlankRoundedIcon;

  const handleChange = (e) =>
  {
    const newValue = !props.value;
    // change the data now
    props.handleDataChange(newValue, rowid, fieldname);
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
          justifyContent: props.verticalAlign, 
          alignItems: props.horizontalAlign,
        }}
      >
        <IconButton
          disabled={disabled}
          onClick={e => handleChange(e)}
          style={{ width: btnHoverWidth, height: btnHoverWidth }} >
          <CheckboxIcon style={iconButtonStyleGreen} />
        </IconButton>
      </div>
    );
  }
  else
  {
    return (
      <div 
        style={{ 
          padding: '5px 0px', 
          width: '100%',
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.verticalAlign, 
          alignItems: props.horizontalAlign,
        }}
      >
        <CheckboxIcon style={iconButtonStyleGreen} />
      </div>
    );
  }
}
