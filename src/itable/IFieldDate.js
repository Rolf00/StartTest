import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

//import DatePicker from 'react-datepicker';
import { de } from 'date-fns/locale'; // German (Switzerland)

export default function IFieldDate (props) {

  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  
  const editing = false;

  const handleChange = (e) =>
  {
    let newValue = e.target.value;

    // change the data now
    props.handleDataChange(newValue, rowid, fieldname);
  }

{/* 
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
    <DatePicker 
      disabled={disabled}
      value={value}
      inputFormat="dd.MM.yyyy"
      //renderInput={(params) => <TextField {...params} />}
      onChange={(event) => handleChange(event)}
    />
    </LocalizationProvider> 
*/}    

  if (editing)
  {
    return (
      <LocalizationProvider dateAdapter={AdapterLuxon} locale={de}>
      <DatePicker 
        disabled={disabled}
        //value={value}
        dateFormat="dd/MM/yyyy"
        //renderInput={(params) => <TextField {...params} />}
        onChange={(event) => handleChange(event)}
      />
      </LocalizationProvider>                        
    );
  }
  else
  {
    const dateText = "TODO: 01.01.1900";
    return (
      <div>{dateText}</div>
    );
  }
}
