import imgChkboxChecked from './imgCheckboxChecked48.png'; 
import imgChkboxUnchecked from './imgCheckboxUnchecked48.png'; 
import imgChkboxIndeterminate from './imgCheckboxIndeterminate48.png'; 
import imgEditButton from './imgEdit48.png'; 
import imgDeleteButton from './imgDelete48.png'; 
import imgSaveButton from './imgSave48.png'; 
import imgUndoButton from './imgUndo48.png'; 
import imgAddButton from './imgAdd48.png'; 
import imgExcelButton from './imgExcel48.png'; 

import imgIconOk from './imgYes48.png'; 
import imgIconYes from './imgYes48.png'; 
import imgIconNo from './imgNo48.png'; 
import imgIconCancel from './imgCancel48.png'; 

import imgDialogQuestion from './imgQuestion96.png'; 
import imgDialogStop from './imgStop96.png'; 
import imgDialogWarning from './imgWarning96.png'; 



class InselConstants {

  // colors for row backgrounds unselected
  static rowColorDeleted = "#FFEEEE";
  static rowColorChanged = "#EEFFEE";
  static rowColorInserted = "#FFFFEE";

  // colors for row backgrounds selected
  static rowColorSelected = "#EEEEFF";
  static rowColorSelDeleted = "#FFCCCC";
  static rowColorSelChanged = "#CCFFCC";
  static rowColorSelInserted = "#FFFFCC";

  // icons selection / checkbox
  static imgChkboxChecked = imgChkboxChecked; 
  static imgChkboxUnchecked = imgChkboxUnchecked; 
  static imgChkboxIndeterminate = imgChkboxIndeterminate; 

  // icons selection / checkbox / data functions on row
  static imgEditButton = imgEditButton; 
  static imgDeleteButton = imgDeleteButton; 
  static imgSaveButton = imgSaveButton; 
  static imgUndoButton = imgUndoButton; 
  static imgAddButton = imgAddButton; 
  static imgExcelButton = imgExcelButton; 

  // icons button dialog
  static imgIconOk = imgIconOk; 
  static imgIconYes = imgIconYes; 
  static imgIconNo = imgIconNo; 
  static imgIconCancel = imgIconCancel; 

  // big icon dialog
  static imgDialogIconQuestion = imgDialogQuestion; 

  // types for button dialog 
  static buttonDialogTypeOk = 0;
  static buttonDialogTypeYesNo = 1;
  static buttonDialogTypeYesNoCancel = 2;

  // types of icons for button dialog 
  static buttonDialogIconTypeNone = 0;
  static buttonDialogIconTypeInfo = 1;
  static buttonDialogIconTypeWarning = 2;
  static buttonDialogIconTypeError = 3;

  // default buttons for button dialog 
  static defaultButtonsOk = [
    { caption: "Close", icon: imgIconOk, horizontalAlign: 'left' }
  ];
  static defaultButtonsYesNo = [
    { caption: "Yes", icon: imgIconYes, horizontalAlign: 'left' },
    { caption: "No", icon: imgIconNo, horizontalAlign: 'left' }
  ];
  static defaultButtonsYesNoCancel = [
    { caption: "Yes", icon: imgIconYes, horizontalAlign: 'left' },
    { caption: "No", icon: imgIconNo, horizontalAlign: 'left' },
    { caption: "Cancel", icon: imgIconCancel, horizontalAlign: 'left' }
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
  // only buttons
  static editType_ButtonEdit = 'btnEdit';
  static editType_ButtonSave = 'btnSave';
  static editType_ButtonUndo = 'btnUndo';
  static editType_ButtonDelete = 'btnDelete';

}

export default InselConstants;

