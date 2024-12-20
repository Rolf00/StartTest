//import * as React from 'react';
import React, { useState } from "react";

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';


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
import IUtils from './IUtils';
import IFieldReadOnly from './IFieldReadOnly';

export default function IFieldDate (props) {

  const editing = props.editing;
  const value = props.value;
  const fieldname = props.header.dataFieldName
  const disabled = !props.header.isEditable;

  const hasError = IUtils.hasError(value, props.header);
  const color = hasError ? IConst.errorColor : 'black';
  const background = hasError ? IConst.errorColorBackground : 'transparent';
  const helperText =  hasError ? props.header.helperText : '';


  // prepare the date from JS to DatePicker
  const oldJSDate = props.value;
  const jsdt = new Date(
    oldJSDate.getFullYear(), 
    oldJSDate.getMonth(), 
    oldJSDate.getDate());
  const pickerDate = dayjs(jsdt);

  // TODO
  // prepare display format
  const displayFormat = IUtils.getDatePickerDisplayFormat(props.localization);

  
  const handleChange = (value) =>
  {
    /*
    format of e :
    {
      $L: "en",
      $u: undefined,
      $d: undefined,
      $y: 2024,
      $M: 6,
      $D: 23,
      $W: null,
      $H: 0,
      $m: 0,
      $s: 0,
      $ms: 0,
      $x: null,
      $isDayjsObject: true,
    };
    */
    
    const year = parseInt(value.$y);
    const month = parseInt(value.$M);
    const day = parseInt(value.$D);
    const newDateJS = new Date(year, month, day);

    // change the data now
    props.handleDataChange(newDateJS, fieldname);
  }

  const handleTextChange = (e) =>
  {
    props.handleDataChange(e, fieldname);
  }

  const selectedDate = props.value;
  const formattedDate = IUtils.formatDateTime(
    selectedDate, 
    IConst.format_DateLong, 
    props.localization);

  if (editing)
  {


    return (
      <div 
        style={{ 
          padding: '5px 0px', 
          width:  '100%', //props.width, 
          height: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: props.horizontalAlign, 
          alignItems: props.verticalAlign,
        }}>    

      <LocalizationProvider dateAdapter={AdapterDayjs} locale='de'>
      <DatePicker 
        disabled={disabled}
        value={pickerDate}
        format="DD.MM.YYYY"
        style={{ width: '100%', }}
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
        slotProps={{
          textField: {
            error: hasError, // Bolean
            helperText: helperText, // String
          },
        }}        
        onChange={(value) => handleChange(value)}
        //renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>   

      </div>                     
    );
  }
  else
  {
    const dateText = IUtils.formatDateTime(value, props.header.datetimeFormat, props.localization);
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
