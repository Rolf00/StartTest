import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

export default function IFieldSelection (props) {

  // Component for the row selection column on each row.
  const classes = props.classes;
  const value = props.value;
  const rowid = props.rowid;
  const btnHoverWidth = props.settings.buttonSizeOnRowsHover;
 
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
    <Tooltip title="Select / Unselect this row" arrow> 
    <IconButton
      onClick={() => props.handleSelectionClickRow(rowid)}
      style={{ width: btnHoverWidth, height: btnHoverWidth, }}>
      {value && <CheckBoxRoundedIcon className={classes.iconButtonStyleSelection}/>}
      {!value && <CheckBoxOutlineBlankRoundedIcon className={classes.iconButtonStyleSelection}
      />}
    </IconButton>
    </Tooltip>
    </div>
  );
}
