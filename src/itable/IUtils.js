import IConst from './IConst'; 

class IUtils {

  static getHorizontalAlign(horizontalAlign)
  {
    return (
      horizontalAlign === IConst.horizontalAlign_Left ? 'flex-start' :
      horizontalAlign === IConst.horizontalAlign_Center ? 'center' : 'flex-end');
  }

  static getVerticalAlign(verticalAlign)
  {
    return (
      verticalAlign === IConst.verticalAlign_Top ? 'flex-start' :
      verticalAlign === IConst.verticalAlign_Middle ? 'center' : 'flex-end');
  }

  static formatDateTime(date, format, localization)
  {
    // Format the date
    let dateText = "";
    let optionsDate = [];
    if (format === IConst.format_DateShort ||
      format === IConst.format_DateShort_Time24h ||
      format === IConst.format_DateShort_Time12h)
    {
      // dd.MM.yyyy
      optionsDate = { month: "2-digit", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }
    else 
    if (format === IConst.format_DateMiddle ||
      format === IConst.format_DateMiddle_Time24h ||
      format === IConst.format_DateMiddle_Time12h)
    {
      // Mi., dd. Dez. yyyy
      optionsDate = { weekday: "short", month: "short", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }
    else 
    if (format === IConst.format_DateLong ||
      format === IConst.format_DateLong_Time24h ||
      format === IConst.format_DateLong_Time12h)
    {
      // Mittwoch, dd. Dezember yyyy
      optionsDate = { weekday: "long", month: "long", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }

    // Format the time
    let timeText = "";
    let optionsTime = [];
    if (format === IConst.format_Time24h ||
      format === IConst.format_DateShort_Time24h ||
      format === IConst.format_DateMiddle_Time24h ||
      format === IConst.format_DateLong_Time24h)
    {
      // 23:MM:ss
      optionsTime = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", };
      timeText += date.toLocaleTimeString(localization, optionsTime);
    }
    else 
    if (format === IConst.format_Time12h ||
      format === IConst.format_DateShort_Time12h ||
      format === IConst.format_DateMiddle_Time12h ||
      format === IConst.format_DateLong_Time12h)
    {
      // 11:MM:ss AM/PM
      optionsTime = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", };
      timeText += date.toLocaleTimeString(localization, optionsTime);
    }

    // now combine date and time
    const finalText = 
      dateText === "" && timeText === "" ? "" :
      dateText === "" ? timeText :
      timeText === "" ? dateText : dateText + " " + timeText;

    return finalText;
  }

  static getDatePickerDisplayFormat(localization)
  {
    let displayFormat = "DD.MM.YYYY";
    if (localization === IConst.datetimeLocalization_deCH) displayFormat = "DD.MM.YYYY"; else
    if (localization === IConst.datetimeLocalization_frCH) displayFormat = "DD.MM.YYYY"; else
    if (localization === IConst.datetimeLocalization_enUS) displayFormat = "MM/DD/YYYY"; else
    if (localization === IConst.datetimeLocalization_enEN) displayFormat = "MM/DD/YYYY"; 
    return displayFormat;
  }

  static hasError(value, header)  
  {
    // field is not editable, thus we dont check anyting 
    if (!header.isEditable) return false;

    // text fields
    if (header.editType === IConst.editType_Textfield ||
    header.editType === IConst.editType_TextfieldMultiline)
    {
      // cases with no errors
      if (
        (!value && !header.required) || 
        (value === "" && !header.required) ||
        !header.textMaxLength
      ) return false;

      // cases with errors
      if (
        (!value && header.required) ||
        (value === "" && header.required) ||
        (value.length > header.textMaxLength)
      ) return true;

      // no errors found
      return false;
    }

    // number fields
    if (header.editType === IConst.editType_Integer ||
      header.editType === IConst.editType_Decimal)
    {
      // cases with no errors
      if (!value && !header.required) return false;

      // cases with errors
      if (
        (!value && header.required) ||
        (value > header.numberMaxValue) ||
        (value < header.numberMinValue)
      ) return true;

      // no errors found
      return false;
    }

    // dropdown fields
    if (header.editType === IConst.editType_Dropdown)
    {
      // cases with no errors
      if (!value && !header.required) return false;

      // cases with errors
      if (!value && header.required) return true;

      // no errors found
      return false;
    }

    // no component to check errors
    return false;
  }

  static hasErrorDate(value, header, row)  
  {
    // field is not editable, thus we dont check anyting 
    if (!header.isEditable) return false;
    if ((!value) && header.required) return true;
    if ((!value) && !header.required) return false;

    if (header.datetimeCheck === IConst.datetimeCheck_Before)
    {
       // date not before today
       if (value < new Date()) return true;
    }
    else if (header.datetimeCheck === IConst.datetimeCheck_After)
    {
      // date not after today
      if (value > new Date()) return true;
    }
    else if (header.datetimeCheck === IConst.datetimeCheck_BeforeAnother)
    {
      // date not after field "xyz"
      const otherValue = row[header.datetimeCheckField];
      if (value > otherValue) return true;
    }
    else if (header.datetimeCheck === IConst.datetimeCheck_AfterAnother)
    {
      // date not before field "xyz"
      const otherValue = row[header.datetimeCheckField];
      if (value < otherValue) return true;
    }

    // no errors found
    return false;
  }

  static getRowErrorText(headers, row)
  {
    if (!row) return "";

    let errorText = "";
    headers.forEach((header) => 
    {
      const value = row[header.dataFieldName];
      if (header.editType === IConst.editType_Date)
      {
        // special checks for date fields
        if (this.hasErrorDate(value, header, row))
          errorText += "Field " + header.headerTitle + " : " + 
        header.helperText + "\n";
      }
      else
      {
        // normal for all other fields
        if (this.hasError(value, header))  
          errorText += "Field " + header.headerTitle + " : " + 
            header.helperText + "\n";
      }
    });

    return errorText;
  }

  static getAllRowsErrorText(headers, rows, primaryKey)
  {
    if (!rows) return "";
    if (rows.length === 0) return "";

    let errorTextAll = "";
    rows.forEach((row) => {
      const errorText = this.getRowErrorText(headers, row);
      if (errorText !== "")
      {
        errorTextAll += "Error on row " + row[primaryKey] + " : \n";
        errorTextAll += errorText + "\n\n";
      }
    });
    return errorTextAll;
  }

  static getCellValue = (row, field, isGetter, getter) => {
    let text = row[field];
    if (isGetter) text = eval(getter);
    return text;
  };


}

export default IUtils;