import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// not exported?
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// doesnt work
//import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
//import { DateTime } from 'luxon';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



//import DatePicker from 'react-datepicker';
import { de } from 'date-fns/locale'; // German (Switzerland)

import IConst from './IConst';

export default function IFieldDate (props) {

  const editing = props.editing;
  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
    
  const handleChange = (e) =>
  {
    let newValue = e.target.value;

    // change the data now
    props.handleDataChange(newValue, fieldname);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        disabled={disabled}
        selected={value}
        dateFormat="dd/MM/yyyy"
        //renderInput={(params) => <TextField {...params} />}
        onChange={(event) => handleChange(event)}
      />
      </LocalizationProvider>                        
    );
  }
  else
  {
    const localization = IConst.localization;

    // see https://chatgpt.com/
    /*
    static datetimeFormat_Short = 1; // dd.MM.yyyy
    static datetimeFormat_Long = 2; // ddd, dd.MM.yyyy
    static datetimeFormat_24 = 3; // HH:mm.ss
    static datetimeFormat_12 = 4; // hh:mm.ss am/pm
    static datetimeFormat_Short_24 = 5; // dd.MM.yyyy HH:mm.ss
    static datetimeFormat_Short_12 = 6; // dd.MM.yyyy hh:mm.ss am/pm
    static datetimeFormat_Long_24 = 7; // ddd, dd.MM.yyyy HH:mm.ss 
    static datetimeFormat_Long_12 = 8; // ddd, dd.MM.yyyy hh:mm.ss am/pm
    */

    let dateText = value.toLocaleDateString(localization); 
    if (props.header.dateFormat === IConst.datetimeFormat_Long)
    {
      const options = { weekday: 'short', month: 'short', day: '2-digit' };
      dateText = value.toLocaleDateString(localization, options);    
    }
    // TODO

    return (
      <div 
        style={{ 
          padding: '5px 0px', width: '100%', 
          textAlign: props.header.horizontalAlign,
        }}
      >{dateText}</div>
    );
  }
}
