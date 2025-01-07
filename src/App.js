import * as React from 'react';
import { Alert, Grid, Snackbar } from '@mui/material';

import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import IConst from './itable/IConst';
import ITable from './itable/ITable';
import { 
  iconButtonStyleYellow,
  iconButtonStyleBlue, 
  iconButtonStyleGreen, 
  iconButtonStyleRed,
  iconButtonStyleOrange,
  iconButtonStylePurple,
  iconButtonStyleTurqoise,
  iconButtonStyleGrey } from './itable/IStyles';


// columns for Waldo
const headersWaldo = [
  {
    id: 0,
    databaseField: "",
    isResizable: false,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: false,
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
    defaultSorting: '',
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
    helperText: "The firstname is required.",
  },
  {
    id: 3,
    databaseField: "lastName",
    headerTitle: "Lastame",
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
    helperText: "The lastname is required.",
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
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
      { id: 1, label: '',    color: '#F3F3F3', colorHover: '#F5F5F5', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleGrey,},
      { id: 2, label: '',     color: '#FFFFBB', colorHover: '#FFFF99', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleYellow,},
      { id: 3, label: '', color: '#FFE1BF', colorHover: '#FFDFC1', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleOrange,},
      { id: 4, label: 'surgery', color: '#FFBBFF', colorHover: '#99BB99', icon: AdjustRoundedIcon, iconStyle: iconButtonStylePurple,},
      { id: 5, label: 'visited', color: '#BBFFFF', colorHover: '#99FFFF', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleTurqoise,},
      { id: 6, label: 'invest.', color: '#BBBBFF', colorHover: '#9999FF', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleBlue,},
      { id: 7, label: 'all ok',  color: '#BBFFBB', colorHover: '#99FF99', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleGreen,},
      { id: 8, label: 'danger',  color: '#FFBBBB', colorHover: '#FF9999', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleRed,},
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
    defaultSorting: '',
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
    defaultSorting: '',
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
    defaultSorting: '',
    width: 150,
    minWidth: 120,
    maxWidth: 320,
    editType: 'button',
    button: { 
      caption: "View",  
      icon: PersonRoundedIcon,
      iconStyle: iconButtonStyleBlue,
      buttonHeight: 30,
      buttonRadius: 15,
      buttonBackgroundColor: "#EEEEFF", 
      buttonBackgroundHover: "#CCCCFF", 
    },
    dataFieldName: 'viewPatient',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },
  {
    id: 17,
    headerTitle: "St.Btn.",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    width: 120,
    minWidth: 100,
    maxWidth: 320,
    editType: IConst.editType_StateButton,
    buttonHeight: 32,
    buttonRadius: 15,
    buttonList: [
      { id: 1, caption: '',     color: '#F3F3F3', colorHover: '#F5F5F5', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleGrey, },
      { id: 2, caption: '',       color: '#FFFFBB', colorHover: '#FFFF88', icon: AdjustRoundedIcon, iconStyle: iconButtonStyleOrange, },
      { id: 3, caption: '',   color: '#FFBBBB', colorHover: '#FF8888', icon: EditRoundedIcon, iconStyle: iconButtonStyleRed, },
      { id: 4, caption: 'completed', color: '#BBFFBB', colorHover: '#88FF88', icon: DoneRoundedIcon, iconStyle: iconButtonStyleGreen, },
    ],
    dataFieldName: 'statebutton',
    horizontalAlign: 'center',
    hasHeaderMenu: false,
  },

  {
    id: 18,
    databaseField: "dropdown",
    headerTitle: "Dropdown",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: '',
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
    id: 19,
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
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
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
  {
    id: 24,
    databaseField: "",
    headerTitle: "Getter",
    isResizable: true,
    isEditable: false,
    isRequired: false,
    isVisible: true,
    isSortable: true,
    defaultSorting: '',
    width: 120,
    minWidth: 100,
    maxWidth: 300,
    editType: 'getter',
    defaultValue: '',
    dataFieldName: '',
    horizontalAlign: 'left',
    hasHeaderMenu: true,
    valueGetter: "`${row.lastName} ${row.firstName}`",
  },
  { 
    id: 25,
    headerTitle: " Date From",
    helperText: "not after 'Date To'",
    isResizable: true,
    isEditable: true,
    isVisible: true,
    isSortable: true,
    width: 120,
    minWidth: 100,
    maxWidth: 320,
    editType: 'date',
    datetimeFormat: IConst.format_DateShort,
    dataFieldName: 'datefrom',
    datetimeCheck: 3,
    datetimeCheckField: "dateto",
    datetimeCheckDifference: 5,
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
  { 
  id: 26,
    headerTitle: "Date To",
    helperText: "not before 'Date From'",
    isResizable: true,
    isEditable: true,
    isVisible: true,
    isSortable: true,
    width: 120,
    minWidth: 100,
    maxWidth: 320,
    editType: 'date',
    datetimeFormat: IConst.format_DateShort,
    dataFieldName: 'dateto',
    datetimeCheck: 4,
    datetimeCheckField: "datefrom",
    datetimeCheckDifference: 10,
    horizontalAlign: 'center',
    hasHeaderMenu: true,
  },
];

headersWaldo[4].isVisible = false;
headersWaldo[6].isVisible = false;
headersWaldo[7].isVisible = false;
headersWaldo[8].isVisible = false;
headersWaldo[9].isVisible = false;
headersWaldo[11].isVisible = false;
headersWaldo[12].isVisible = false;
headersWaldo[15].isVisible = false;

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
    statebutton: i < 5 ? i : null,
    dropdownvalue: i <= 6 ? i : null,
    datefrom: new Date(Date.now() + (i * 24 * 3600 * 1000)),
    dateto: new Date(Date.now() + ((i + 3) * 24* 3600 * 1000)),
  
  });
}

patients[1].address = patients[1].address + "\nNew Line address 2\nNew Line address 3";
patients[2].address = patients[2].address + "\nNew Line address 2";


const App = ()=> {

  const holder = {
    saveSelected: null,
  }

  const primaryKey = "id";

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
    editComponentHeight: 23,
    resizerBackgroundColor: '#8888FF',
    iconImageSize: 30,

    // dialog
    dialogName: 'InselDialog_MainData',

    // button options
    buttonSizeOnRows: 32,
    buttonSizeOnRowsHover: 38,
    buttonSizeMain: 32,
    hasButtonNewRow: true,
    hasButtonSaveAll: true,
    hasButtonUndoAll: true,
    hasButtonExcelAll: true,
    hasButtonExcelSelected: true,
    hasButtonManageSorting: true,

    // localization
    localization: IConst.datetimeLocalization_deCH,

    // menu buttons
    menuButtonList: [
      { id:1, caption: "Back", hint: "go to previous page", icon: ArrowCircleLeftRoundedIcon,  positionStart: true },
      { id:2, caption: "Next", hint: "go to next page",     icon: ArrowCircleRightRoundedIcon, positionStart: false },
    ],
  };
  
  // open slack
  const [open,setOpen] = React.useState(false);

  function handleSpecialButtonClick(rowid, fieldname)
  {
    alert("Button was clicked (rowid, fieldname) = (" + rowid + ", " + fieldname + ")");
    // TODO 
  }
  
  function handleStateButtonClick(rowid, fieldname)
  {
    alert("Button was clicked (rowid, fieldname) = (" + rowid + ", " + fieldname + ")");
    // TODO 
  }

  function handleSaveOneRowClick(row, state)
  {
    setOpen(true);

    // TODO 
    // code for testing response to DB savings
    // can be deleted later
    const savedRows = [];
    savedRows.push(row);
    const states = [];
    states.push(state);
    const oldIds = [];
    const newIds = [];
    const results = [];
    let newMaxId = 100001;

    oldIds.push(row[primaryKey]);
    let newId = row[primaryKey];
    if (state === IConst.rowStateInserted)
    {
      newId = newMaxId;
      newMaxId = newMaxId + 1;
    }
    newIds.push(newId);
    results.push(true);

    //if (holder.saveSelected) 
      holder.saveSelected(savedRows, oldIds, newIds, states, results);

  }

  function handleSaveAllRowsClick(rows, states)
  {
    setOpen(true);

    // TODO 
    // code for testing response to DB savings
    // can be deleted later
    const savedRows = [...rows];
    const oldIds = [];
    const newIds = [];
    const results = [];
    let newMaxId = 100001;

    for (let r = 0; r < savedRows.length; r++)
    {
      oldIds.push(rows[r][primaryKey]);
      let newId = rows[r][primaryKey];
      if (states[r] === IConst.rowStateInserted)
      {
        newId = newMaxId;
          newMaxId = newMaxId + 1;
      }
      newIds.push(newId);
      results.push(true);
    }
    //if (holder.saveSelected) 
      holder.saveSelected(savedRows, oldIds, newIds, states, results);
  
    //if(holder.saveSelected)
    //    holder.saveSelected();
  }

  function menuButtonClick(buttonId)
  {
    if (buttonId === 1)
    {
      // button with id = 1 was clicked
      // see settings.menuButtonList
    }
    alert("Button id "+  buttonId + " was clicked.");
  }

  
  return(
    <>
    <Grid container
      //style={{ width: '100%' }} 
    >

      <Grid item 
        style={{ overflowX: 'auto' }} 
      >
        <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Table with own components</div>
        <ITable 
          settings={settings}
          headers={headersWaldo} 
          holder={holder}
          primaryKey={primaryKey}
          data={patients}  
          dialogName="IDialogData_First"
          handleSpecialButtonClick={(rowid, fieldname) => handleSpecialButtonClick(rowid, fieldname)}
          handleStateButtonClick={(rowid, fieldname) => handleStateButtonClick(rowid, fieldname)}
          handleSaveOneRowClick={(row, state) => handleSaveOneRowClick(row, state)}
          handleSaveAllRowsClick={(rows, states) => handleSaveAllRowsClick(rows, states)}
          menuButtonClick={(index) => menuButtonClick(index)}
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