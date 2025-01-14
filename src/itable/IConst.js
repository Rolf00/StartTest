import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { 
  iconButtonStyleBlue, 
  iconButtonStyleGreen, 
  iconButtonStyleRed,
  iconButtonStyleOrange } from './IStyles';

class IConst {

  // colors for icons
  static iconColorRed = "#AA0000";
  static iconColorGreen = "#00AA00";
  static iconColorBlue = "#0000AA";
  static iconColorDarkYellow = "#CCCC00";

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

  // alignments
  static horizontalAlign_Left = "left";
  static horizontalAlign_Center = "center";
  static horizontalAlign_Right = "right";
  static verticalAlign_Top = "top";
  static verticalAlign_Middle = "middle";
  static verticalAlign_Bottom = "bottom";

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
    { caption: "Close", icon: DoneRoundedIcon, iconStyle: iconButtonStyleGreen, horizontalAlign: this.horizontalAlign_Left, X: 1, Y: 1, }
  ];
  static defaultButtonsYesNo = [
    { caption: "Yes", icon: DoneRoundedIcon, iconStyle: iconButtonStyleGreen, horizontalAlign: this.horizontalAlign_Left, X: 1, Y: 1, },
    { caption: "No", icon: RemoveCircleRoundedIcon, iconStyle: iconButtonStyleRed, horizontalAlign: this.horizontalAlign_Right, X: 2, Y: 1, }
  ];
  static defaultButtonsYesNoCancel = [
    { caption: "Yes", icon: DoneRoundedIcon, iconStyle: iconButtonStyleGreen, horizontalAlign: this.horizontalAlign_Left, X: 1, Y: 1, },
    { caption: "No", icon: RemoveCircleRoundedIcon, iconStyle: iconButtonStyleRed, horizontalAlign: this.horizontalAlign_Left, X: 2, Y: 1, },
    { caption: "Cancel", icon: CloseRoundedIcon, iconStyle: iconButtonStyleRed, horizontalAlign: this.horizontalAlign_Left, X: 3, Y: 1, }
  ];

  // calucalted from the elnght of all buttons horizontally aligned
  static buttonDialogSizeType_ButtonWidths = 0;
  // fixed width from window 80 percent
  static buttonDialogSizeType_ParentWidth80Percent = 1; 
  // fixed height from parent in percentage
  static buttonDialogSizeType_ParentHeight80Percent = 2; 
  // fixed width and height from parent in percentage
  static buttonDialogSizeType_Parent80Percent = 3;
  // TODO can we measure rect of a text
  // fixed width | height from text
  //static buttonDialogSizeType_Width_TextHeight = 4;
  // TODO can we measure rect of a text
  // fixed height | width from text
  //static buttonDialogSizeType_Height_TextWidth = 5;
  
  // row states 
  static rowStateUnchanged = 0;  
  static rowStateEdited = 1;  
  static rowStateDeleted = 2;  
  static rowStateInserted = 3;  

  // sow sorting
  static sortingASC = 'asc';
  static sortingDESC = 'desc';

  // edit types
  //static editType_PrimaryKey = 'primaryKey';
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
  static editType_StateButton = 'statebutton';
  static editType_Getter = 'getter';
  // only buttons
  static editType_ButtonEditRow = 'btnEditRow';
  static editType_ButtonEdit = 'btnEdit';
  static editType_ButtonSave = 'btnSave';
  static editType_ButtonUndo = 'btnUndo';
  static editType_ButtonDelete = 'btnDelete';

  // localizations
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

  // special checks for dates
  static datetimeCheck_Before = 1; // date not before today
  static datetimeCheck_After = 2; // date not after today
  static datetimeCheck_BeforeAnother = 3; // date not after field "xyz"
  static datetimeCheck_AfterAnother = 4; // date not before field "xyz"

  // filtering
  static filterOperator_Contains = "1";
  static filterOperator_ContainsNot = "2";
  static filterOperator_Equals = "3";
  static filterOperator_EqualsNot = "4";
  static filterOperator_StartsWith = "5";
  static filterOperator_StartsWithNot = "6";
  static filterOperator_EndsWith = "7";
  static filterOperator_EndsWithNot = "8";
  static filterOperator_IsEmpty = "9";
  static filterOperator_IsEmptyNot = "10";
  static filterOperator_IsSmallerThan= "11";
  static filterOperator_IsSmallerOrEqualThan= "12";
  static filterOperator_IsBiggerThan = "13";
  static filterOperator_IsBiggerOrEqualThan = "14";
  static filterOperator_IsBetween = "15";
  // TODO : what is meant with any of
  //static filterOperator_IsAnyOf = "16";

  // fitering states
  static filterOperator_Edited = "E";
  static filterOperator_Deleted = "D";
  static filterOperator_Inserted = "I";
  static filterOperator_Modified = "U";
}

export default IConst;

