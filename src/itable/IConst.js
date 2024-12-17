import imgChkboxChecked from './imgCheckboxChecked48.png'; 
import imgChkboxUnchecked from './imgCheckboxUnchecked48.png'; 
import imgChkboxIndeterminate from './imgCheckboxIndeterminate48.png'; 
import imgEditButton from './imgEdit48.png'; 
import imgEditStop from './imgStop48.png'; 
import imgDeleteButton from './imgDelete48.png'; 
import imgSaveButton from './imgSave48.png'; 
import imgUndoButton from './imgUndo48.png'; 
import imgAddButton from './imgAdd48.png'; 
import imgExcelButton from './imgExcel48.png'; 

import imgIconOk from './imgYes48.png'; 
import imgIconYes from './imgYes48.png'; 
import imgIconNo from './imgNo48.png'; 
import imgIconCancel from './imgCancel48.png'; 

import imgDialogInfo from './imgInfo96.png'; 
import imgDialogQuestion from './imgQuestion96.png'; 
import imgDialogStop from './imgStop96.png'; 
import imgDialogWarning from './imgWarning96.png'; 



class IConst {

  // colors for row backgrounds unselected
  static rowColorDeleted = "#FFEEEE";
  static rowColorChanged = "#EEFFEE";
  static rowColorInserted = "#FFFFEE";

  // colors for row backgrounds selected
  static rowColorSelected = "#EEEEFF";
  static rowColorSelDeleted = "#FFCCCC";
  static rowColorSelChanged = "#CCFFCC";
  static rowColorSelInserted = "#FFFFCC";

  // background color resizer
  static colorResizerBackground = "#8888FF";

  // error colors
  static errorColor = "#FF0000";
  static errorColorBackground = "#FFCCCC";

  // icons selection / checkbox
  static imgChkboxChecked = imgChkboxChecked; 
  static imgChkboxUnchecked = imgChkboxUnchecked; 
  static imgChkboxIndeterminate = imgChkboxIndeterminate; 

  // icons selection / checkbox / data functions on row
  static imgEditButton = imgEditButton; 
  static imgEditStop = imgEditStop; 
  static imgDeleteButton = imgDeleteButton; 
  static imgSaveButton = imgSaveButton; 
  static imgUndoButton = imgUndoButton; 
  static imgAddButton = imgAddButton; 
  static imgExcelButton = imgExcelButton; 

  // alignments
  static horizontalAlign_Left = "left";
  static horizontalAlign_Center = "center";
  static horizontalAlign_Right = "right";
  static verticalAlign_Top = "top";
  static verticalAlign_Middle = "middle";
  static verticalAlign_Bottom = "bottom";

  static getHorizontalAlign(horizontalAlign)
  {
    return (
      horizontalAlign === this.horizontalAlign_Left ? 'flex-start' :
      horizontalAlign === this.horizontalAlign_Center ? 'center' : 'flex-end');
  }

  static getVerticalAlign(verticalAlign)
  {
    return (
      verticalAlign === this.verticalAlign_Top ? 'flex-start' :
      verticalAlign === this.verticalAlign_Middle ? 'center' : 'flex-end');
  }

  // icons button dialog
  static imgIconOk = imgIconOk; 
  static imgIconYes = imgIconYes; 
  static imgIconNo = imgIconNo; 
  static imgIconCancel = imgIconCancel; 

  // big icon dialog
  static imgDialogBigIconInfo = imgDialogInfo; 
  static imgDialogBigIconQuestion = imgDialogQuestion; 
  static imgDialogBigIconStop = imgDialogStop; 
  static imgDialogBigIconWarning = imgDialogWarning; 

  // types for button dialog 
  static buttonDialogTypeOk = 0;
  static buttonDialogTypeYesNo = 1;
  static buttonDialogTypeYesNoCancel = 2;

  // types of icons for button dialog 
  static buttonDialogIconType_None = 0;
  static buttonDialogIconType_Info = 1;
  static buttonDialogIconType_Question = 2;
  static buttonDialogIconType_Stop = 3;

  // default buttons for button dialog 
  static defaultButtonsOk = [
    { caption: "Close", icon: imgIconOk, horizontalAlign: 'left', X: 1, Y: 1, }
  ];
  static defaultButtonsYesNo = [
    { caption: "Yes", icon: imgIconYes, horizontalAlign: 'left', X: 1, Y: 1, },
    { caption: "No", icon: imgIconNo, horizontalAlign: 'right', X: 2, Y: 1, }
  ];
  static defaultButtonsYesNoCancel = [
    { caption: "Yes", icon: imgIconYes, horizontalAlign: 'left', X: 1, Y: 1, },
    { caption: "No", icon: imgIconNo, horizontalAlign: 'left', X: 2, Y: 1, },
    { caption: "Cancel", icon: imgIconCancel, horizontalAlign: 'left', X: 3, Y: 1, }
  ];
  
  // row states 
  static rowStateUnchanged = 0;  
  static rowStateEdited = 1;  
  static rowStateDeleted = 2;  
  static rowStateInserted = 3;  

  // edit types
  static editType_PrimaryKey = 'primaryKey';
  static editType_SelectionIcon = 'selectionIcon';
  static editType_NoEdit = 'none';
  static editType_Textfield = 'textfield';
  static editType_TextfieldMultiline = 'textfieldmultiline';
  static editType_Integer = 'integer';
  static editType_Decimal = 'decimal';
  static editType_Dropdown = 'dropdown';
  static editType_Checkbox = 'checkbox';
  static editType_Date = 'date';
  static editType_Chip = 'chip';
  static editType_SpecialButton = 'button';
  // only buttons
  static editType_ButtonEditRow = 'btnEditRow';
  static editType_ButtonEdit = 'btnEdit';
  static editType_ButtonSave = 'btnSave';
  static editType_ButtonUndo = 'btnUndo';
  static editType_ButtonDelete = 'btnDelete';

  // localizarions
  static datetimeLocalization_deCH = "de-CH"; 
  static datetimeLocalization_frCH = "fr-CH"; 
  static datetimeLocalization_enUS = "en-US"; 
  static datetimeLocalization_enEN = "en-EN"; 

  // date / time formats
  // https://www.codecademy.com/resources/docs/javascript/dates/toLocaleTimeString

  // dd.MM.yyyy
  static format_DateShort = 1;
  // Mi., dd. Dez. yyyy
  static format_DateMiddle = 2;
  // Mittwoch, dd. Dezember yyyy
  static format_DateLong = 3;

  // 23:MM:ss
  static format_Time24h = 4;
  // 11:MM:ss  AM/PM
  static format_Time12h = 5;

  // dd.MM.yyyy 23:MM:ss
  static format_DateShort_Time24h = 6;
  // dd.MM.yyyy 11:MM:ss  AM/PM
  static format_DateShort_Time12h = 7;

  // Mi., dd. Dez. yyyy 23:MM:ss
  static format_DateMiddle_Time24h = 8;
  // Mi., dd. Dez. yyyy 11:MM:ss  AM/PM
  static format_DateMiddle_Time12h = 9;

  // Mittwoch, dd. Dezember yyyy
  static format_DateLong_Time24h = 10;
  // Mittwoch, dd. Dezember yyyy 11:MM:ss  AM/PM
  static format_DateLong_Time12h = 11;

  static formatDateTime(date, format, localization)
  {
    // Format the date
    let dateText = "";
    let optionsDate = [];
    if (format === this.format_DateShort ||
      format === this.format_DateShort_Time24h ||
      format === this.format_DateShort_Time12h)
    {
      // dd.MM.yyyy
      optionsDate = { month: "2-digit", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }
    else 
    if (format === this.format_DateMiddle ||
      format === this.format_DateMiddle_Time24h ||
      format === this.format_DateMiddle_Time12h)
    {
      // Mi., dd. Dez. yyyy
      optionsDate = { weekday: "short", month: "short", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }
    else 
    if (format === this.format_DateLong ||
      format === this.format_DateLong_Time24h ||
      format === this.format_DateLong_Time12h)
    {
      // Mittwoch, dd. Dezember yyyy
      optionsDate = { weekday: "long", month: "long", day: "2-digit", year: "numeric", };
      dateText = date.toLocaleDateString(localization, optionsDate);
    }

    // Format the time
    let timeText = "";
    let optionsTime = [];
    if (format === this.format_Time24h ||
      format === this.format_DateShort_Time24h ||
      format === this.format_DateMiddle_Time24h ||
      format === this.format_DateLong_Time24h)
    {
      // 23:MM:ss
      optionsTime = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", };
      timeText += date.toLocaleTimeString(localization, optionsTime);
    }
    else 
    if (format === this.format_Time12h ||
      format === this.format_DateShort_Time12h ||
      format === this.format_DateMiddle_Time12h ||
      format === this.format_DateLong_Time12h)
    {
      // 11:MM:ss AM/PM
      optionsTime = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", };
      timeText += date.toLocaleTimeString(localization, optionsTime);
    }

    // now combine date and time
    const finalText = 
      dateText === "" && timeText === "" ? "" :
      dateText === "" ? timeText :
      timeText === "" ? dateText :
      dateText + " " + timeText;

    return finalText;
  }

  static getDatePickerDisplayFormat(localization)
  {
    let displayFormat = "DD.MM.YYYY";
    if (localization === this.datetimeLocalization_deCH) displayFormat = "DD.MM.YYYY"; else
    if (localization === this.datetimeLocalization_frCH) displayFormat = "DD.MM.YYYY"; else
    if (localization === this.datetimeLocalization_enUS) displayFormat = "MM/DD/YYYY"; else
    if (localization === this.datetimeLocalization_enEN) displayFormat = "MM/DD/YYYY"; 
    return displayFormat;
  }

  static hasError(value, header)
  {

    // text fields
    if (header.editType === this.editType_Textfield ||
      header.editType === this.editType_TextfieldMultiline)
    {
      if (!value && !header.required)
      {
        return false;
      }
      else if (!value && header.required)
      {
        return true;
      }
      else if (value === "" && !header.required)
      {
          return false;
      }
      else if (value === "" && header.required)
      {
          return true;
      }
      else if (!header.textMaxLength)
      {
          return false;
      }
      else if (value.length > header.textMaxLength)
      {
          return true;
      }
      return false;
    }
  
    // number fields
    if (header.editType === this.editType_Integer ||
      header.editType === this.editType_Decimal)
    {
      if (!value && !header.required)
      {
        return false;
      }
      else if (!value && header.required)
      {
        return true;
      }
      else if (header.numberMaxValue)
      {
        if (value > header.numberMaxValue) return true;
      }
      else if (header.numberMinValue)
      {
        if (value < header.numberMinValue) return true;
      }
      return false;
    }
    return false;
  }

}

export default IConst;

