import * as React from 'react';
import { Alert, Grid, Snackbar } from '@mui/material';

// => icons für chip erstellen
// #FF7F00 orange
// #FF0000 red
// #FF00FF purple
// #0000FF blue
// #00FFFF turqoise
// #00FF00 green
// #FFFF00 yellow
// #BFBFBF LightGrey
import imgChipStatusLightGrey from './CircleLightGrey.png'; 
import imgChipStatusYellow from './CircleYellow.png'; 
import imgChipStatusOrange from './CircleOrange.png'; 
import imgChipStatusRed from './CircleRed.png'; 
import imgChipStatusPurple from './CirclePurple.png'; 
import imgChipStatusBlue from './CircleBlue.png'; 
import imgChipStatusTurqoise from './CircleTurqoise.png'; 
import imgChipStatusGreen from './CircleGreen.png'; 
import imgPerson48 from './imgPerson48.png';

import IConst from './itable/IConst';
import ITable from './itable/ITable';

// columns for Waldo
const headersWaldo = [
  {
    id: 0,
    databaseField: "",
    isResizable: false,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    width: 45,
    minWidth: 45,
    maxWidth: 55,
    editType: 'selectionIcon',
    defaultValue: false,
    dataFieldName: '',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
  {
    id: 1,
    databaseField: "primaryKey",
    headerTitle: "ID",
    isResizable: true,
    isEditable: false,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 65,
    minWidth: 65,
    maxWidth: 120,
    editType: 'primaryKey',
    dataFieldName: 'id',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
  {
    id: 2,
    databaseField: "firstName",
    headerTitle: "Firstname",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 180,
    minWidth: 140,
    maxWidth: 300,
    editType: 'textfield',
    dataFieldName: 'firstName',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 3,
    databaseField: "lastName",
    headerTitle: "lastName",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 180,
    minWidth: 80,
    maxWidth: 300,
    editType: 'textfield',
    dataFieldName: 'lastName',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 4,
    databaseField: "age",
    headerTitle: "Age",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 80,
    minWidth: 80,
    maxWidth: 120,
    numberMinValue: 0,
    numberMaxValue: 150,
    helperText: "Ages only between 0 and 120",
    editType: 'integer',
    dataFieldName: 'age',
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  {
    id: 5,
    databaseField: "birthday",
    headerTitle: "Birthday",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 120,
    maxWidth: 120,
    editType: 'date',
    dataFieldName: 'birthday',
    datetimeFormat: IConst.format_DateShort,
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  {
    id: 6,
    databaseField: "gender",
    headerTitle: "Gender",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 80,
    minWidth: 40,
    maxWidth: 120,
    editType: 'textfield',
    dataFieldName: 'gender',
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  {
    id: 7,
    databaseField: "diagnosis",
    headerTitle: "Diagnosis",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 90,
    maxWidth: 220,
    editType: 'textfield',
    dataFieldName: 'diagnosis',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 8,
    databaseField: "bloodPressure",
    headerTitle: "Blood Pressure",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 100,
    maxWidth: 120,
    editType: 'textfield',
    dataFieldName: 'bloodPressure',
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  {
    id: 9,
    databaseField: "weight",
    headerTitle: "W. (kg)",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 80,
    minWidth: 60,
    maxWidth: 120,
    editType: 'textfield',
    dataFieldName: 'weight',
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  {
    id: 10,
    databaseField: "address",
    headerTitle: "Adress",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 260,
    minWidth: 150,
    maxWidth: 320,
    editType: 'textfieldmultiline',
    textWrap: false,
    dataFieldName: 'address',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 11,
    databaseField: "nationality",
    headerTitle: "Nationality",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 160,
    minWidth: 80,
    maxWidth: 320,
    editType: 'textfield',
    dataFieldName: 'nationality',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 12,
    databaseField: "survey",
    headerTitle: "Surveys",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 80,
    maxWidth: 220,
    editType: 'integer',
    dataFieldName: 'survey',
    horizontalAlign: 'right',
    hasHeaderMenu: true,
  },
  {
    id: 13,
    databaseField: "chipstate",
    headerTitle: "State",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    width: 120,
    minWidth: 100,
    maxWidth: 320,
    editType: 'chip',
    chipList: [
      { id: 1, label: 'open',    color: '#F3F3F3', colorHover: '#F5F5F5', icon: imgChipStatusLightGrey, },
      { id: 2, label: 'new',     color: '#FFFFBB', colorHover: '#FFFF99', icon: imgChipStatusYellow, },
      { id: 3, label: 'invited', color: '#FFE1BF', colorHover: '#FFDFC1', icon: imgChipStatusOrange, },
      { id: 4, label: 'surgery', color: '#FFBBFF', colorHover: '#99BB99', icon: imgChipStatusPurple, },
      { id: 5, label: 'visited', color: '#BBFFFF', colorHover: '#99FFFF', icon: imgChipStatusTurqoise, },
      { id: 6, label: 'invest.', color: '#BBBBFF', colorHover: '#9999FF', icon: imgChipStatusBlue, },
      { id: 7, label: 'all ok',  color: '#BBFFBB', colorHover: '#99FF99', icon: imgChipStatusGreen, },
      { id: 8, label: 'danger',  color: '#FFBBBB', colorHover: '#FF9999', icon: imgChipStatusRed, },
    ],
    chipWidth: 100,
    chipIconWidth: 32,
    dataFieldName: 'chipstate',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
  {
    id: 14,
    databaseField: "lastUpdate",
    headerTitle: "Last update",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 290,
    minWidth: 190,
    maxWidth: 420,
    editType: 'date',
    datetimeFormat: IConst.format_DateMiddle_Time12h,
    dataFieldName: 'lastUpdate',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 15,
    databaseField: "lastUpdate",
    headerTitle: "Last update",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 290,
    minWidth: 190,
    maxWidth: 420,
    editType: 'date',
    datetimeFormat: IConst.format_DateLong_Time24h,
    dataFieldName: 'lastUpdate2',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
  },
  {
    id: 16,
    databaseField: "",
    headerTitle: "Patient",
    isResizable: true,
    isEditable: false,
    isRequired: true,
    isVisible: true,
    isSortable: false,
    defaultSorting: 'asc',
    width: 150,
    minWidth: 120,
    maxWidth: 320,
    editType: 'button',
    button: { 
      caption: "View",  
      icon: imgPerson48, 
      iconWidth: 25,
      buttonHeight: 30,
      buttonBackgroundColor: "#EEEEFF", 
      buttonBackgroundHover: "#CCCCFF", 
    },
    dataFieldName: 'viewPatient',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
  {
    id: 17,
    databaseField: "dropdown",
    headerTitle: "Dropdown",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 180,
    minWidth: 180,
    maxWidth: 300,
    textMaxLength: 100,
    numberMinValue: 0,
    numberMaxValue: 10000,
    decimalCount: 0,
    editType: 'dropdown',
    defaultValue: -1,
    dataFieldName: 'dropdownvalue',
    horizontalAlign: 'left',
    dropdownSelection: [
      { id: 1, value: 'Dropdown 1', },
      { id: 2, value: 'Dropdown 2', },
      { id: 3, value: 'Dropdown 3', },
      { id: 4, value: 'Dropdown 4', },
      { id: 5, value: 'Dropdown 5', },
      { id: 6, value: 'Dropdown 6', },
    ],
    hasHeaderMenu: true,
  }, 
  {
    id: 18,
    databaseField: "",
    headerTitle: "Edit",
    isResizable: false,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 42,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    decimalCount: 0,
    editType: 'btnEditRow',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropdownSelection: [],
    hasHeaderMenu: false,
  },
  {
    id: 19,
    databaseField: "",
    headerTitle: "Dlg.",
    isResizable: false,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 42,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    decimalCount: 0,
    editType: 'btnEdit',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropdownSelection: [],
    hasHeaderMenu: false,
  },
  {
    id: 20,
    databaseField: "",
    headerTitle: "Save",
    isResizable: false,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 42,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    decimalCount: 0,
    editType: 'btnSave',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropdownSelection: [],
    hasHeaderMenu: false,
  },
  {
    id: 21,
    databaseField: "",
    headerTitle: "Undo",
    isResizable: false,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 42,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    decimalCount: 0,
    editType: 'btnUndo',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropdownSelection: [],
    hasHeaderMenu: false,
  },
  {
    id: 22,
    databaseField: "",
    headerTitle: "Del.",
    isResizable: false,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 42,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    decimalCount: 0,
    editType: 'btnDelete',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropdownSelection: [],
    hasHeaderMenu: false,
  },
];

/*
headersWaldo[3].isVisible = false;
headersWaldo[4].isVisible = false;
headersWaldo[6].isVisible = false;
headersWaldo[7].isVisible = false;
headersWaldo[8].isVisible = false;
headersWaldo[9].isVisible = false;
*/

// data Waldo
const patients = [];
const countries = ["USA", "Canada", "Germany", "France", "UK", "India", "Australia", "Brazil", "Japan", "Mexico"];

for (let i = 0; i < 100; i++) {
  const randomAge = Math.floor(Math.random() * 60) + 18;  // Age between 18 and 77
  const randomBirthday = new Date(2000 - randomAge, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  const randomWeight = Math.floor(Math.random() * 80) + 40;  // Weight between 40 and 120 kg
  const randomAddress = `${Math.floor(Math.random() * 9999)} ${["Street", "Avenue", "Lane", "Boulevard"][Math.floor(Math.random() * 4)]} ${["Main", "Oak", "Pine", "Maple", "Elm"][Math.floor(Math.random() * 5)]}`;
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const randomUpdate = new Date(Date.now() - Math.floor(Math.random() * (1000 * 60 * 60 * 24 * 365)));  // Random last update within the past year

  patients.push({
    id: i + 1,
    firstName: `Patient${i + 1}`,
    lastName: `Lastname${i + 1}`,
    age: randomAge,
    birthday: randomBirthday, //.toISOString().split('T')[0],  // Convert to YYYY-MM-DD format
    gender: Math.random() > 0.5 ? "Male" : "Female",
    diagnosis: Math.random() > 0.5 ? "Hypertension" : "Diabetes",
    bloodPressure: `${Math.floor(Math.random() * 50) + 110}/${Math.floor(Math.random() * 40) + 70}`,
    weight: randomWeight,
    address: randomAddress,
    nationality: randomCountry,
    survey: Math.floor(Math.random() * 100) + 1,  // Random number between 1-100
    lastUpdate: randomUpdate, //.toISOString(),  // Date format: YYYY-MM-DDTHH:MM:SS.SSSZ
    lastUpdate2: randomUpdate,
    chipstate: i < 9 ? i : null,
    dropdownvalue: i <= 6 ? i : null,
  });
}

patients[1].address = patients[1].address + "\nNew Line address 2\nNew Line address 3";
patients[2].address = patients[2].address + "\nNew Line address 2";


const App = ()=> {

  const settings = 
  {
    // when TRUE, each row can be edited without clicking EDIT 
    alwaysActivateEditing: false,

    // header content 
    headerVerticalAlign: IConst.verticalAlign_Middle,
    initialHeaderHeight: 55,
    initialRowHeight: 27,
    initialRowHeightReadonly: 27,

    // rows settings (top, middle, bottom)
    rowsVerticalAlign: IConst.verticalAlign_Middle,
    editComponentHeight: 21,
    resizerBackgroundColor: '#8888FF',
    iconImageSize: 30,

    // dialog
    dialogName: 'InselDialog_MainData',

    // button options
    buttonSizeOnRows: 32,
    buttonSizeOnRowsHover: 38,
    buttonSizeMain: 40,
    hasButtonNewRow: true,
    hasButtonSaveAll: true,
    hasButtonUndoAll: true,
    hasButtonExcelAll: true,
    hasButtonExcelSelected: true,
    hasButtonContinue: true,
    hasButtonBack: true,

    // localization
    localization: IConst.datetimeLocalization_deCH,
  };
  
  // open slack
  const [open,setOpen] = React.useState(false);

  function handleSpecialButtonClick(rowid, fieldname)
  {
    alert("Button was clicked (rowid, fieldname) = (" + rowid + ", " + fieldname + ")");
    // TODO 
  }

  function handleSaveOneRowClick(row, state)
  {
    setOpen(true);
  }

  function handleSaveAllRowsClick(rows, states)
  {
    setOpen(true);
    return true;
  }
  
  return(
    <>
    <Grid container  style={{ width: '100%' }} >

      <Grid item style={{ width: '100%' }} >
        <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Table with own components</div>
        <ITable 
          settings={settings}
          headers={headersWaldo} 
          primaryKey="id"
          data={patients}  
          dialogName="IDataDialog_First"
          handleSpecialButtonClick={(rowid, fieldname) => handleSpecialButtonClick(rowid, fieldname)}
          handleSaveOneRowClick={(row, state) => handleSaveOneRowClick(row, state)}
          handleSaveAllRowsClick={(rows, states) => handleSaveAllRowsClick(rows, states)}
        />
      </Grid>
    </Grid>

    <Snackbar 
      open={open} 
      autoHideDuration={5000} 
      onClose={()=>setOpen(false)} 
      anchorOrigin={{ vertical:"top", horizontal:"right" }}>
      <Alert
        onClose={()=>setOpen(false)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >Saving in progress. Wait until done.</Alert>
    </Snackbar>
    </>
  )
}
export default App