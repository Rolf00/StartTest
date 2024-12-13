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
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldDate (props) {

  const editing = props.editing;
  const rowid = props.rowid;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;
  const width = props.header.width;
    
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        disabled={disabled}
        selected={value}
        dateFormat="dd/MM/yyyy"
        style={{ 
          width: width, 
        }}
        //renderInput={(params) => <TextField {...params} />}
        onChange={(event) => handleChange(event)}
      />
      </LocalizationProvider>   

      </div>                     
    );
  }
  else
  {
    const dateText = IConst.formatDateTime(value, props.header.datetimeFormat, props.localization);
    return (
      <IFieldReadOnly
        width={props.header.width}
        verticalAlign={props.verticalAlign} 
        horizontalAlign={props.horizontalAlign}
        value={dateText}
      />
    );
  }
}
