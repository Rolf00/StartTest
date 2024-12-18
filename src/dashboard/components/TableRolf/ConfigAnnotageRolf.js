import React from 'react';
import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import styled from 'styled-components';
import { useState } from 'react';
import { useRef } from 'react';
//import React, { useRef, useState, useEffect } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox,
  Chip,
  Stack
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/de';

import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  FormControlLabel 
} from '@mui/material';




import { status_color } from './styles';

// TODO : is this component free ware?
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';


import {
  VisibilityTwoTone,
  EditTwoTone,
  DeleteOutline,
  Label,
} from '@mui/icons-material';

import { green } from '@mui/material/colors';

// https://www.flaticon.com/free-icons/checkbox
// https://icons8.com/icons/set/checkbox
// https://icons8.com/icon/set/indeterminate-checkbox/group-filled--static--mint
// https://de.freepik.com
// https://stock.adobe.com/fr/stock-photo/id/399943838
import imgChkboxChecked from './chkboxChecked48.png'; 
import imgChkboxUnchecked from './chkboxUnchecked48.png'; 
import imgChkboxIndeterminate from './chkboxIndeterminate48.png'; 
import imgEditButton from './editButton48.png'; 
import imgDeleteButton from './deleteButton48.png'; 
import imgSaveButton from './imgSave48.png'; 
import imgUndoButton from './imgUndo48.png'; 
import imgAddButton from './imgAdd48.png'; 


import { ResizableBox } from 'react-resizable';
//import {headerResizer} from 'react-table-header-resizer';

import 'react-resizable/css/styles.css';
import InselTableCellHeightResizer from './InselTableCellHeightResizer';
import InselTableCellWidthResizer from './InselTableCellWidthResizer'


//import { mainSheet } from 'styled-components/dist/models/StyleSheetManager';


const RightText = styled.div`
  text-align: right;
  justify-content: right;
`;

const chipcolors = {
  Online: '#0d0',
  Offline: '#d00',
};
const chipcolorsbg = {
  Online: '#dfd',
  Offline: '#fdd',
};


function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
  //const monthName = date.toLocaleDateString('de-DE', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}



function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

// TODO : format numbers : 1.23456 => 1.235 | 1.2 => 1.200
const NumberFormatter = ({ number }) => {
  // Format number with commas and two decimal places for 'en-US'
  //const formattedNumber = number.toLocaleString('en-US', {
  const formattedNumber = number.toLocaleString('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
  return <span>{formattedNumber}</span>;
}

const settings = [
  {
    headerVerticalAlign: 'top',
    resizerBackgroundColor: 'lightblue',
    resizerSize: 5,
    resizerBorderBottomRightWidth: 1,
    initialRowHeight: 65,
    rowsVerticalAlign: 'top',
    dialogName: '',
  }
];

/*

READ ME: Information about header definitions
=============================================
The headers will be create in the order of theirs definition.
The fields have the following meaning:

- databaseField: 
  The field name on the database, needed for UPDATE and INSERT statements.
  It can be empty for calculated fields or for row selection checkboxes

- headerTitle:
  The title which will be displayed in the table header
  It can be empty for the row selection checkbox

- isResizable: 
  The header width is resizable in the header

- isEditable: true,
- isRequired: true,
- isVisible: true,
- isSortable
- defaultSorting: 'asc',

- width: 45,
- minWidth: 45,
- textMaxLength: 0,
- numberMinValue: 0,
- numberMaxValue: 0,
- editType: 'checkbox',
- defaultValue: false,
- dataFieldName: '',
- horizontalAlign: 'center',
- dropDownSelection: [],
*/


/*
maxwidth
*/


const headers = [
  {
    databaseField: "",
    headerTitle: "",
    isResizable: false,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 45,
    minWidth: 45,
    maxWidth: 300,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    editType: 'checkbox',
    defaultValue: false,
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    databaseField: "",
    headerTitle: "",
    isResizable: false,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: false,
    defaultSorting: '',
    width: 32,
    minWidth: 32,
    maxWidth: 300,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    editType: 'checkboxIcon',
    defaultValue: false,
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
  {
    databaseField: "primaryKey",
    headerTitle: "db ID",
    isResizable: true,
    isEditable: false,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 65,
    minWidth: 65,
    maxWidth: 300,
    textMaxLength: 0,
    numberMinValue: 0,
    numberMaxValue: 0,
    editType: 'none',
    defaultValue: 'none',
    dataFieldName: 'id',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
  {
    databaseField: "FieldXY",
    headerTitle: "Name FIELD",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 180,
    minWidth: 100,
    maxWidth: 300,
    textMaxLength: 200,
    numberMinValue: 0,
    numberMaxValue: 0,
    editType: 'textfield',
    defaultValue: 'default field x',
    dataFieldName: 'field1',
    horizontalAlign: 'left',
    dropDownSelection: [],
  },
  {
    databaseField: "textarea",
    headerTitle: "Textarea autosize",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 180,
    minWidth: 145,
    maxWidth: 300,
    textMaxLength: 200,
    numberMinValue: 0,
    numberMaxValue: 0,
    editType: 'textarea',
    defaultValue: 'default field textarea',
    dataFieldName: 'fieldtextarea',
    horizontalAlign: 'left',
    dropDownSelection: [],
  },
  {
    databaseField: "comment",
    headerTitle: "Textfield multiline",
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
    numberMaxValue: 0,
    editType: 'textfieldmultiline',
    defaultValue: 'default field textfieldmultiline',
    dataFieldName: 'field2',
    horizontalAlign: 'left',
    dropDownSelection: [],
  },
  {
    databaseField: "numbervalue",
    headerTitle: "Count events",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 120,
    maxWidth: 300,
    textMaxLength: 100,
    numberMinValue: 0,
    numberMaxValue: 10000,
    editType: 'integer',
    defaultValue: 0,
    dataFieldName: 'eventCount',
    horizontalAlign: 'right',
    dropDownSelection: [],
  },
  {
    databaseField: "decimalvalue",
    headerTitle: "Average",
    isResizable: true,
    isEditable: true,
    isRequired: true,
    isVisible: true,
    isSortable: true,
    defaultSorting: 'asc',
    width: 120,
    minWidth: 120,
    maxWidth: 300,
    textMaxLength: 20,
    numberMinValue: 0,
    numberMaxValue: 10000,
    editType: 'decimal',
    defaultValue: 1.1111,
    dataFieldName: 'viewsPerUser',
    horizontalAlign: 'right',
    dropDownSelection: [],
  },
  {
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
    editType: 'dropdown',
    defaultValue: -1,
    dataFieldName: 'dropdownvalue',
    horizontalAlign: 'left',
    dropDownSelection: [
      { id: 1, value: 'Dropdown 1', },
      { id: 2, value: 'Dropdown 2', },
      { id: 3, value: 'Dropdown 3', },
      { id: 4, value: 'Dropdown 4', },
      { id: 5, value: 'Dropdown 5', },
      { id: 6, value: 'Dropdown 6', },
    ],

  }, 
  {
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
    editType: 'btnEdit',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
  {
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
    editType: 'btnSave',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
  {
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
    editType: 'btnUndo',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
  {
    databaseField: "",
    headerTitle: "Delete",
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
    editType: 'btnDelete',
    defaultValue: 'none',
    dataFieldName: '',
    horizontalAlign: 'center',
    dropDownSelection: [],
  },
];

/*
valueGetter: (parmas) => {
  const value = params.getValue('user')
  return `${value.firstname} ${value.lastname}`
}
  */

const dataRolf = [
    {
      id: 4,
      field1: 'Field4',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'User Profile Dashboard',
      moreInfo: 'more info about "Dashboard"',
      status: 'Online',
      eventCount: 112543,
      users: 96240,
      viewsPerUser: 4.58756,
      averageTime: '2m 40s',
      conversions: [
        264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126,
        649082, 566792, 723451, 737827, 890859, 935554, 1044397, 1022973, 1129827,
        1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
        1687545, 1581634, 1550291,
      ],
      user: {
        id: 1,
        firstname: 'John',
        lastname: 'doe'
      }
    },
    {
      id: 5,
      field1: 'Field5',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 2,
      name: 'Article Listing - Tech News',
      moreInfo: 'more info about "Listing"',
      status: 'Offline',
      eventCount: 3653,
      users: 142240,
      viewsPerUser: 3.1,
      averageTime: '2m 55s',
      conversions: [
        251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
        640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
        1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
        1854053, 1791831,
      ],
    },
    {
      id: 6,
      field1: 'Field6',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 4,
      name: 'FAQs - Customer Support',
      moreInfo: 'more info about "FAQs"',
      status: 'Online',
      eventCount: 106543,
      users: 15240,
      viewsPerUser: 7.2,
      averageTime: '2m 20s',
      conversions: [
        13671, 16918, 27272, 34315, 42212, 56369, 64241, 77857, 70680, 91093, 108306,
        94734, 132289, 133860, 147706, 158504, 192578, 207173, 220052, 233496, 250091,
        285557, 268555, 259482, 274019, 321648, 359801, 399502, 447249, 497403,
      ],
    },
    {
      id: 7,
      field1: 'Field7',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 2,
      name: 'Product Comparison - Laptops',
      moreInfo: 'more info about "Laptops"',
      status: 'Offline',
      eventCount: 7853,
      users: 32240,
      viewsPerUser: 6.5,
      averageTime: '2m 50s',
      conversions: [
        93682, 107901, 144919, 151769, 170804, 183736, 201752, 219792, 227887, 295382,
        309600, 278050, 331964, 356826, 404896, 428090, 470245, 485582, 539056, 582112,
        594289, 671915, 649510, 574911, 713843, 754965, 853020, 916793, 960158, 984265,
      ],
    },
    {
      id: 8,
      field1: 'Field8',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Shopping Cart - Electronics',
      moreInfo: 'more info about "Electronics"',
      status: 'Online',
      eventCount: 8563,
      users: 48240,
      viewsPerUser: 4.3,
      averageTime: '3m 10s',
      conversions: [
        52394, 63357, 82800, 105466, 128729, 144472, 172148, 197919, 212302, 278153,
        290499, 249824, 317499, 333024, 388925, 410576, 462099, 488477, 533956, 572307,
        591019, 681506, 653332, 581234, 719038, 783496, 911609, 973328, 1056071,
        1112940,
      ],
    },
    {
      id: 9,
      field1: 'Field9',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Payment Confirmation - Bank Transfer',
      moreInfo: 'more info about "Bank"',
      status: 'Offline',
      eventCount: 4563,
      users: 18240,
      viewsPerUser: 2.7,
      averageTime: '3m 25s',
      conversions: [
        15372, 16901, 25489, 30148, 40857, 51136, 64627, 75804, 89633, 100407, 114908,
        129957, 143568, 158509, 174822, 192488, 211512, 234702, 258812, 284328, 310431,
        338186, 366582, 396749, 428788, 462880, 499125, 537723, 578884, 622825,
      ],
    },
    {
      id: 10,
      field1: 'Field10',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Product Reviews - Smartphones',
      moreInfo: 'more info about "Smartphones"',
      status: 'Online',
      eventCount: 9863,
      users: 28240,
      viewsPerUser: 5.1,
      averageTime: '3m 05s',
      conversions: [
        70211, 89234, 115676, 136021, 158744, 174682, 192890, 218073, 240926, 308190,
        317552, 279834, 334072, 354955, 422153, 443911, 501486, 538091, 593724, 642882,
        686539, 788615, 754813, 687955, 883645, 978347, 1142551, 1233074, 1278155,
        1356724,
      ],
    },
    {
      id: 11,
      field1: 'Field11',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Subscription Management - Services',
      moreInfo: 'more info about "Services"',
      status: 'Offline',
      eventCount: 6563,
      users: 24240,
      viewsPerUser: 4.8,
      averageTime: '3m 15s',
      conversions: [
        49662, 58971, 78547, 93486, 108722, 124901, 146422, 167883, 189295, 230090,
        249837, 217828, 266494, 287537, 339586, 363299, 412855, 440900, 490111, 536729,
        580591, 671635, 655812, 576431, 741632, 819296, 971762, 1052605, 1099234,
        1173591,
      ],
    },
    {
      id: 12,
      field1: 'Field12',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Order Tracking - Shipments',
      moreInfo: 'more info about "Shipments"',
      status: 'Online',
      eventCount: 12353,
      users: 38240,
      viewsPerUser: 3.5,
      averageTime: '3m 20s',
      conversions: [
        29589, 37965, 55800, 64672, 77995, 91126, 108203, 128900, 148232, 177159,
        193489, 164471, 210765, 229977, 273802, 299381, 341092, 371567, 413812, 457693,
        495920, 564785, 541022, 491680, 618096, 704926, 833365, 904313, 974622,
        1036567,
      ],
    },
    {
      id: 13,
      field1: 'Field13',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Customer Feedback - Surveys',
      moreInfo: 'more info about "Surveys"',
      status: 'Offline',
      eventCount: 5863,
      users: 13240,
      viewsPerUser: 2.3,
      averageTime: '3m 30s',
      conversions: [
        8472, 9637, 14892, 19276, 23489, 28510, 33845, 39602, 45867, 52605, 59189,
        65731, 76021, 85579, 96876, 108515, 119572, 131826, 145328, 160192, 176528,
        196662, 217929, 239731, 262920, 289258, 315691, 342199, 370752, 402319,
      ],
    },
    {
      id: 14,
      field1: 'Field14',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Account Settings - Preferences',
      moreInfo: 'more info about "Preferences"',
      status: 'Online',
      eventCount: 7853,
      users: 18240,
      viewsPerUser: 3.2,
      averageTime: '3m 15s',
      conversions: [
        15792, 16948, 22728, 25491, 28412, 31268, 34241, 37857, 42068, 46893, 51098,
        55734, 60780, 66421, 72680, 79584, 87233, 95711, 105285, 115814, 127509,
        140260, 154086, 169495, 186445, 205109, 225580, 247983, 272484, 299280,
      ],
    },
    {
      id: 15,
      field1: 'Field15',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Login Page - Authentication',
      moreInfo: 'more info about "Authentication"',
      status: 'Offline',
      eventCount: 9563,
      users: 24240,
      viewsPerUser: 2.5,
      averageTime: '3m 35s',
      conversions: [
        25638, 28355, 42089, 53021, 66074, 80620, 97989, 118202, 142103, 166890,
        193869, 225467, 264089, 307721, 358059, 417835, 488732, 573924, 674878, 794657,
        938542, 1111291, 1313329, 1543835, 1812156, 2123349, 2484926, 2907023, 3399566,
        3973545,
      ],
    },
    {
      id: 16,
      field1: 'Field16',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Promotions - Seasonal Sales',
      moreInfo: 'more info about "Promotions"',
      status: 'Online',
      eventCount: 13423,
      users: 54230,
      viewsPerUser: 7.8,
      averageTime: '2m 45s',
      conversions: [
        241732, 256384, 289465, 321423, 345672, 378294, 398472, 420364, 436278, 460192,
        495374, 510283, 532489, 559672, 587312, 610982, 629385, 654732, 678925, 704362,
        725182, 749384, 772361, 798234, 819472, 846291, 872183, 894673, 919283, 945672,
      ],
    },
    {
      id: 17,
      field1: 'Field17',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Tutorials - How to Guides',
      moreInfo: 'more info about "Tutorials"',
      status: 'Offline',
      eventCount: 4234,
      users: 19342,
      viewsPerUser: 5.2,
      averageTime: '3m 05s',
      conversions: [
        12345, 14567, 16789, 18901, 21023, 23145, 25267, 27389, 29501, 31623, 33745,
        35867, 37989, 40101, 42223, 44345, 46467, 48589, 50701, 52823, 54945, 57067,
        59189, 61301, 63423, 65545, 67667, 69789, 71901, 74023,
      ],
    },
    {
      id: 18,
      field1: 'Field18',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Blog Posts - Tech Insights',
      moreInfo: 'more info about "Blog"',
      status: 'Online',
      eventCount: 8567,
      users: 34234,
      viewsPerUser: 6.3,
      averageTime: '2m 50s',
      conversions: [
        23456, 25678, 27890, 30102, 32324, 34546, 36768, 38980, 41202, 43424, 45646,
        47868, 50080, 52302, 54524, 56746, 58968, 61180, 63402, 65624, 67846, 70068,
        72290, 74502, 76724, 78946, 81168, 83380, 85602, 87824,
      ],
    },
    {
      id: 19,
      field1: 'Field19',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Events - Webinars',
      moreInfo: 'more info about "Webinars"',
      status: 'Offline',
      eventCount: 3456,
      users: 19234,
      viewsPerUser: 4.5,
      averageTime: '3m 20s',
      conversions: [
        123456, 145678, 167890, 190012, 212324, 234546, 256768, 278980, 301202, 323424,
        345646, 367868, 390080, 412302, 434524, 456746, 478968, 501180, 523402, 545624,
        567846, 590068, 612290, 634502, 656724, 678946, 701168, 723380, 745602, 767824,
      ],
    },
    {
      id: 20,
      field1: 'Field20',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Support - Contact Us',
      moreInfo: 'more info about "Support"',
      status: 'Online',
      eventCount: 6734,
      users: 27645,
      viewsPerUser: 3.9,
      averageTime: '2m 55s',
      conversions: [
        234567, 256789, 278901, 301023, 323245, 345467, 367689, 389801, 412023, 434245,
        456467, 478689, 500801, 523023, 545245, 567467, 589689, 611801, 634023, 656245,
        678467, 700689, 722801, 745023, 767245, 789467, 811689, 833801, 856023, 878245,
      ],
    },
    {
      id: 21,
      field1: 'Field21',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Case Studies - Success Stories',
      moreInfo: 'more info about "Success"',
      status: 'Offline',
      eventCount: 4567,
      users: 19345,
      viewsPerUser: 6.1,
      averageTime: '3m 10s',
      conversions: [
        34567, 36789, 38901, 41023, 43145, 45267, 47389, 49501, 51623, 53745, 55867,
        57989, 60101, 62223, 64345, 66467, 68589, 70701, 72823, 74945, 77067, 79189,
        81301, 83423, 85545, 87667, 89789, 91901, 94023, 96145,
      ],
    },
    {
      id: 22,
      field1: 'Field22',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'News - Industry Updates',
      moreInfo: 'more info about "Updates"',
      status: 'Online',
      eventCount: 7856,
      users: 34567,
      viewsPerUser: 5.7,
      averageTime: '3m 05s',
      conversions: [
        45678, 47890, 50102, 52324, 54546, 56768, 58980, 61202, 63424, 65646, 67868,
        70080, 72302, 74524, 76746, 78968, 81180, 83402, 85624, 87846, 90068, 92290,
        94502, 96724, 98946, 101168, 103380, 105602, 107824, 110046,
      ],
    },
    {
      id: 23,
      field1: 'Field23',
      fieldtextarea: 'Textarea ... ... ... ',
      field2: 'Field 2 long text multiline ....',
      dropdownvalue: 1,
      name: 'Forum - User Discussions',
      moreInfo: 'more info about "Discussions"',
      status: 'Offline',
      eventCount: 5678,
      users: 23456,
      viewsPerUser: 4.2,
      averageTime: '2m 40s',
      conversions: [
        56789, 58901, 61023, 63145, 65267, 67389, 69501, 71623, 73745, 75867, 77989,
        80101, 82223, 84345, 86467, 88589, 90701, 92823, 94945, 97067, 99189, 101301,
        103423, 105545, 107667, 109789, 111901, 114023, 116145, 118267,
      ],
    },
  ];

  function renderStatus(status) {
    const colors = {
      Online: '#0d0',
      Offline: '#d00',
    };
    const bgcolors = {
      Online: '#dfd',
      Offline: '#fdd',
    };
    return <Chip 
        label={status} 
        //color={colors[status]} 
        style={{
          color: colors[status],
          backgroundColor: bgcolors[status] 
        }}
        size="small"
         />;
  }

// link customization
// https://mui.com/material-ui/react-checkbox/  
// https://icons8.com/icons/set/indeterminate-checkbox



function getRowHeightList()
{
  let newlist = [];
  for (let i = 0; i < dataRolf.length; i++)
  {
    let obj = {};
    obj['id'] =  dataRolf[i].id; 
    obj['height'] = 55; 
    newlist.push(obj);
  }
  return newlist;
}


class ConfigAnnotageRolf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 5,
      data: dataRolf,
      headers: headers,
      selectedRows: [],
      editingFieldList_User: [],
      editableFields: ["name", "users", "eventCount", "viewsPerUser", "averageTime"],
      newRowData: [],
      mainChecked: false,
      mainIndeterminated: false,
      mainCheckIcon: imgChkboxUnchecked,
      mainEditIcon: imgEditButton,
      mainDeleteIcon: imgDeleteButton,
      mainSaveIcon: imgSaveButton,
      mainUndoIcon: imgUndoButton,
      mainAddIcon: imgAddButton,
      openDialog: false,
      productName: "",
      isCellEditingUser: false,
      editedValue_Users: "",
      newvalue_Users: "",
      rowsWereEdited : false,
      colwidthName: 100,
      colheightName: 50,
      listChangedRows: [],
      mainDisabled: true,
      rowHeight: 200,
      colwidth: 120,
      headerHeight: 35,
      headerHeightList: [25, 25, 80, 35, 35, 35],
      //headerWidthList: [25, 25, 120, 80, 80, 80],
      rowHeightList: getRowHeightList(),
      minRowHeight: 19,
    };
  }
  data
  selected
  fieldnameUsers = 'users';
  
  getCellEditing(id, fieldname)
  {
    if (fieldname === this.fieldnameUsers)
    {
      const index = this.state.editingFieldList_User.findIndex(d => d === id);
      return (index > -1);
    }
    return false;
  }

  isRowDeleted(rowid)
  {
    const index = this.state.listChangedRows.findIndex(d => d['id'] === rowid);
    if (index === -1) return false;
    if (this.state.listChangedRows[index]['action'] === 2) return true;
    return false;
  }

  isRowEdited(rowid)
  {
    const index = this.state.listChangedRows.findIndex(d => d['id'] === rowid);
    if (index === -1) return false;
    return true;
  }
  
  getRowHeight(rowid)
  {
    const index = this.state.rowHeightList.findIndex(d => d['id'] === rowid);
    if (index === -1) return 45;
    //alert("rowHeightList = " + this.state.rowHeightList[index]['height']);
    return this.state.rowHeightList[index]['height'];
  }

  getRowSelection(idx)
  {
    const index = this.state.selectedRows.findIndex(d => d === idx);
    return (index > -1);
  }

  getIconSource(idx)
  {
    const index = this.state.selectedRows.findIndex(d => d === idx);
    const path = "C:/Users/Rolf/Documents/Projects/StartTest/";
    return ((index > -1) ? imgChkboxChecked : imgChkboxUnchecked);
  }

  hdlCheckboxClickHeader(e)
  {
    let ischecked = this.state.mainChecked;
    ischecked = !ischecked;
    this.setState({mainIndeterminated: false});
    this.setState({mainChecked: ischecked});

    let newlist = [];
    if (ischecked)
    {
      this.state.data.forEach((row) => {
        newlist = [...newlist, row.id];
      });
    }
    // now update the main list
    this.setState({selectedRows: newlist});
    this.setState({mainCheckIcon: 
      ischecked ? imgChkboxChecked : imgChkboxUnchecked});
  }

  hdlCheckboxClickRow(e, idx)
  {
    // create a new list in order to be up to date
    let newlist = this.state.selectedRows;

    const selected = this.state.data[idx].id;
    let isSelected = (newlist.findIndex(d => d === selected) > -1);

    if (!isSelected)
    {
      newlist = [...newlist, selected];
      /*
      this.setState({selectedRows: newlist}, () => {
        this.state.selectedRows
      });
      */
      isSelected = true;
    }
    else
    {
      // new selection = FALSE
      newlist = newlist.filter(item => item !== selected);
      isSelected = false;
    }

    let allAreSame = true;
    this.state.data.forEach((row) => {
      const thisRowIsSelected = newlist.findIndex(d => d === row.id) > -1;
      if (isSelected !== thisRowIsSelected)
      {
        allAreSame = false;
      }
    });

    const path = "C:/Users/Rolf/Documents/Projects/StartTest/";
    if (allAreSame)
    {
      this.setState({mainIndeterminated: false});
      if (isSelected)
      {
        // all rows are selected
        this.setState({mainChecked: true});
        this.setState({mainCheckIcon: imgChkboxChecked});
      }
      else
      {
        // no row is selected
        this.setState({mainChecked: false});
        this.setState({mainCheckIcon: imgChkboxUnchecked});
      }
    }
    else
    {
      // different states exists
      this.setState({mainIndeterminated: true});
      this.setState({mainCheckIcon: imgChkboxIndeterminate});
    }

    // now update the main list
    this.setState({selectedRows: newlist});
  }

  handleEditClick(e, id, name, users, events, views, time)
  {
    // first set the row
    this.setState({editId: id});
    this.setState({dlgName: name});
    this.setState({dlgUser: users});
    this.setState({dlgEvents: events});
    this.setState({dlgViews: views});
    this.setState({dlgTime: time});

    // now open
    this.setState({openDialog: true});
  }

  handleEditRowClick(e, id, name, users, events, views, time)
  {
    
  }

  handleSubmit = () => {
    const idx = this.state.data.findIndex(d => d.id === this.state.editId);
    this.state.data[idx].name = this.state.dlgName;
    // TODO: fill other fields

    this.setState({openDialog: false});
  };

  handleClose = () => {
    this.setState({openDialog: false});
  };  

  handleDialogChange = (e, field) => {
    if (field === "dlgName") this.setState({dlgName: e.target.value});
    if (field === "dlgUser") this.setState({dlgUser: e.target.value});
    // TODO other fields
  };  

  handleTableMainKeyUp = (e) => {
    if (e.key === "c" && e.ctrlKey) {
      const txt = window.getSelection().toString();
      navigator.clipboard.writeText(txt);
    }
  }

  // cell editing events -------------------------------------------------------------------------------------

  setNewEditingRow(rowId, fieldname, newvalue)
  {
    // now add the new data to the list of edited values (newRowData)
    const indexNewData = this.state.newRowData.findIndex(dr => dr.id === rowId);
    if (indexNewData === -1)
    {
      // the new data doesnt exist yet, we need to add a new one
      let obj = {};
      obj['id'] = rowId;
      for (let i = 0; i < this.state.editableFields.count; i++)
      {
        if (fieldname === this.state.editableFields[i])
        {
          obj[this.state.editableFields[i]] = newvalue;
        }
        else
        {
          obj[this.state.editableFields[i]] = null;
        }
      }
      this.state.newRowData.push(obj);
    }
    else
    {
      // the new data exists already, we add the new value
      this.state.newRowData[indexNewData][fieldname] = newvalue;
    }
  }

  handleCellEditChange(e, rowId, fieldname)
  {
    if (fieldname === this.fieldnameUsers)
    {
      this.setState({newvalue_Users: e.target.value});
      //this.setState({rowsWereEdited: true});

      const newList = [rowId];
      this.setState({editingFieldList_User: newList});
      //this.setState({newvalue_Users: oldvalue});

      this.setNewEditingRow(rowId, fieldname, e.target.value);
    }

    const newlist = this.AddChangedRows(rowId, 1);
    const lengthEdited = newlist.length;
    this.SetMainButtons(lengthEdited);
}
 
  handleCellEditKeyUp(e, rowId, fieldname)
  {
    if (e.key === 'Enter' || e.keyCode === 13)
    {
      const idx = this.state.data.findIndex(d => d.id === rowId);
      if (fieldname === this.fieldnameUsers)
      {
        const newList = [];
        this.setState({editingFieldList_User: newList});
        this.state.data[idx].users = e.target.value;
      }
      this.setNewEditingRow(rowId, fieldname, e.target.value);
    }
    else if (e.key === 'Escape')
    {
      alert("TODO escape pressed");
    }
  }

  handleCellDoubleClick(rowId, rowIndex, fieldname, oldvalue)
  {
    if (this.state.editingFieldList_User.length > 0)
    {
      let checksAreOk = true;
      if (!checksAreOk)
      {
        alert("checks are not ok. edit field again.");
        return false;
      }

      const idx = this.state.editingFieldList_User[0];
      const oldidx = this.state.data.findIndex(d => d.id === idx);
      this.state.data[oldidx].users = this.state.newvalue_Users;
    }

    if (fieldname === this.fieldnameUsers)
    {
      const newList = [rowId];
      this.setState({editingFieldList_User: newList});
      this.setState({newvalue_Users: oldvalue});
    }
  }


  handleOnDragStart(e, cell)
  {
    //alert("handleOnDragStart");
  }

  handleOnDragLeave(e, cell)
  {
    //alert("onDragLeave");
  }

  handleTouchStart(e)
  {

  }

/*  
  handleMouseDown(e)
  {
    let posXstart = e.clientX;
    let start = this.state.colwidthName;
    let posLeft = posXstart - start;

    const updateCursor = () => {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    };
  
    const resetCursor = () => {
      document.body.style.removeProperty('cursor');
      document.body.style.removeProperty('user-select');
    };
  
    const onMouseMove = (moveEvent) => {
      const newwidth = moveEvent.clientX - posLeft;
      this.setState({colwidthName: newwidth});
      updateCursor();
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      resetCursor();
    };    

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);    
  }
*/

/*
  handleMouseDownNS(e)
  {
    let posYstart = e.clientY;
    console.log("state", this.state);
    let start = this.state.rowHeight;
    let posTop = posYstart - start;

    const onMouseMoveNS = (e) => {
      const newheight = e.clientY - posTop;
      this.setState({rowHeight: newheight});
    }

    const onMouseUpNS = () => {
      document.removeEventListener('mousemove', onMouseMoveNS);
      document.removeEventListener('mouseup', onMouseUpNS);
      /*document.removeEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
      });      
    };    

    document.addEventListener('mousemove', onMouseMoveNS);
    document.addEventListener('mouseup', onMouseUpNS);    
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });      
  }
      */

  handleMouseDownRowNS(e, rowid)
  {
    let mouseStart = e.clientY;
    const startIndex = this.state.rowHeightList.findIndex(dr => dr.id === rowid);
    let cellHeight = 55;
    if (startIndex > -1) cellHeight = this.state.rowHeightList[startIndex].height;

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + cellHeight;
      if (newheight > this.state.minRowHeight)
      {
        const newList = this.state.rowHeightList;
        const index = this.state.rowHeightList.findIndex(dr => dr.id === rowid);
        newList[index].height = newheight;
        this.setState({rowHeightList : newList});
      }
    }

    const onMouseUpRowNS = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowNS);
      document.removeEventListener('mouseup', onMouseUpRowNS);
      document.body.style.userSelect = "auto";  
    };    

    document.addEventListener('mousemove', onMouseMoveRowNS);
    document.addEventListener('mouseup', onMouseUpRowNS);  
    document.body.style.userSelect = "none";  
  }

  setNewHeaderHeight(newHeight)
  {
    //this.setState({headerHeight : newHeight});
  }


  handleMouseDownRowEW(e, index)
  {
    const mouseStart = e.clientX;
    const colindex = index;
    //const cellWidth = this.state.headerWidthList[colindex];
    const cellWidth = this.state.headers[colindex].width;

    //alert("e.clientX = " + mouseStart + ", cellWidth = " + cellWidth);

    const onMouseMoveRowEW = (e) => {
      const newwidth = e.clientX - mouseStart + cellWidth;
      
      //const newList1 = this.state.headerWidthList;
      //newList1[index] = newwidth;
      //this.setState({headerWidthList : newList1});

      const newList2 = this.state.headers;
      newList2[index].width = newwidth;
      this.setState({headers : newList2});
      
    }

    const onMouseUpRowEW = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowEW);
      document.removeEventListener('mouseup', onMouseUpRowEW);
      document.body.style.userSelect = "auto"; 
      this.setNewHeaderHeight(e.target.clientHeight);

      //const cellWidth = this.state.headerWidthList[colindex];
      //alert("colindex = " + colindex);
      //alert("cellWidth = " + cellWidth);
      //alert("colNumber = " + colNumber + ", cellWidth = " + cellWidth);
      //alert("this.state.headerWidthList = " + this.state.headerWidthList);
    };    

    document.addEventListener('mousemove', onMouseMoveRowEW);
    document.addEventListener('mouseup', onMouseUpRowEW);    
    document.body.style.userSelect = "none";  
  }


  
  handleOnMouseMoveEW(e, cell)
  {
    //alert("handleOnMouseMoveEW");
    /*
    let x = e.clientX;
    let c = document.getElementById(cell);
    //c.style.width = c.style.width + x;
    //c.innerHTML = "Resize " + x;
    c = document.getElementById(cell + "Bottom");
    //c.style.width = c.style.width + x;
    */
  }

  handleDeleteRow(e, rowid)
  {
    const isDeleted = this.isRowDeleted(rowid);
    if (!isDeleted)
    {
      const newlist = this.AddChangedRows(rowid, 2);
      const lengthEdited = newlist.length;
      this.SetMainButtons(lengthEdited);
    }
  }

  AddChangedRows(rowid, action)
  {
    let obj = {};
    obj['id'] = rowid;
    obj['action'] = action;

    const newlist = this.state.listChangedRows;
    newlist.push(obj);
    this.setState({listChangedRows: newlist});
    return newlist;
  }


  handleUndoRow(e, rowid)
  {
    const newlist = this.state.listChangedRows.filter(item => item['id'] !== rowid);
    this.setState({listChangedRows: newlist});
    const lengthEdited = newlist.length;
    this.SetMainButtons(lengthEdited);
  }

  SetMainButtons(newlistlenght)
  {
    const disable = newlistlenght === 0;
    this.setState({mainDisabled: disable});
  }

  handleSaveAll(e)
  {
    this.setState({listChangedRows: []});
    alert("All data was saved");
  }

  handleUndoAll(e)
  {
    this.setState({listChangedRows: []});
  }

  getHeaderHeight()
  {
    let maxHeight = 0;
    for (let i = 0; i < this.state.headerHeightList.length; i++)
    {
      if (maxHeight < this.state.headerHeightList[i])
        maxHeight = this.state.headerHeightList[i];
    }
    return maxHeight;
  }

  Sort(sortOrder, colHeadIndex)
  {
    const newlist = this.state.headers;
    newlist[colHeadIndex].defaultSorting = sortOrder === 'asc' ? 'desc' : 'asc';
    this.setState({headers, newlist});
  }

  render() {
    const dataDays = getDaysInMonth(4, 2024);
    const { classes } = this.props;
    const { page, limit } = this.state;
    const data = this.state.data.slice(page * limit, page * limit + limit);
    const mainChecked = this.state.mainChecked;
    const mainIndeterminated = this.state.mainIndeterminated;
    const mainCheckIcon = this.state.mainCheckIcon;
    const mainEditIcon = this.state.mainEditIcon;
    const mainDeleteIcon = this.state.mainDeleteIcon;
    const mainSaveIcon = this.state.mainSaveIcon;
    const mainAddIcon = this.state.mainAddIcon;
    const mainUndoIcon = this.state.mainUndoIcon;
    const colheightName = this.state.colheightName;
    const mainDisabled = this.state.mainDisabled;
    const colwidth = this.state.colwidth;
    const rowHeight = this.state.rowHeight;
    const headerHeightList = this.state.headerHeightList;
    //const headerWidthList = this.state.headerWidthList;
    const headerHeight = this.getHeaderHeight();
    // TODO are same names allowed?
    const headers = this.state.headers;
    const rowHeightList = this.state.rowHeightList;
    

    return (
      <Paper 
        className={classes.paper}
        >
        <TableContainer
          tabIndex={0}
          onKeyUp={this.handleTableMainKeyUp}
          className={classes.table_container}
          style={{
            height: 650, // Set the max height to allow scrolling after 5 items
            overflowY: 'auto', // Enables vertical scrolling
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#555',
              },
            },
          }}>

{/* ================================================================================ */}
{/* start of table header ========================================================== */}
{/* ================================================================================ */}

          <Table 
          className={classes.table} 
          stickyHeader
          style={{
            height: '800px',

          }}
          >
            <TableHead className={classes.table_head}>
              <TableRow 
                className={classes.table_head_row}
                >

                {headers.map((header, colHeadIndex) => {
                  const isCheckbox = header.editType === 'checkbox';
                  const isCheckboxIcon = header.editType === 'checkboxIcon';
                  const isSortable = header.isSortable;
                  const sortOrder = header.defaultSorting;
                  const isNoEdit = (!isCheckbox) && (!isCheckboxIcon);
                  const isButtonheader = (
                    header.editType === 'btnEdit' ||
                    header.editType === 'btnSave' ||
                    header.editType === 'btnUndo' ||
                    header.editType === 'btnDelete' 
                  );

                  const headerTitle = headers[colHeadIndex].headerTitle;
                  const isisResizable = headers[colHeadIndex].isResizable;
                  const headerMinWidth = headers[colHeadIndex].minWidth;
                  const headerHorizontalAlign = headers[colHeadIndex].horizontalAlign;
                  const newheaderWidth = 
                    isButtonheader ? header.width + 18 : header.width;

                  {/*
                    &uarr; ARRAY UP
                    &darr; ARRAY DOWN
                  */}

                  return (
                    <InselTableCellWidthResizer
                    className={classes.table_head_cell}
                    notResizable={!isisResizable}
                    width={newheaderWidth}
                    minWidth={headerMinWidth}
                    horizontalAlign={headerHorizontalAlign}
                    verticalAlign={'bottom'}
                    height= {85}
                    setWidth={(colwidth) => this.setState({colwidth: colwidth})}
                    handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, colHeadIndex)}>
                    {isSortable && 
                      headerHorizontalAlign === 'right' &&
                      sortOrder === 'asc' &&
                      <span>&nbsp;<button 
                        //href={this.Sort(sortOrder, colHeadIndex)}
                        style={{fontSize: '18px', fontWeight: 'bold'}}
                        >&darr;</button>&nbsp;</span>
                    }
                    {isSortable && 
                      headerHorizontalAlign === 'right' &&
                      sortOrder === 'desc' &&
                      <span>&nbsp;<button 
                        //href={this.Sort(sortOrder, colHeadIndex)}
                        style={{fontSize: '18px', fontWeight: 'bold'}}
                        >&uarr;</button>&nbsp;</span>
                    }
                    {isCheckbox &&
                      <Checkbox
                      checked={mainChecked}
                      indeterminate={mainIndeterminated}
                      color_checked={green[400]}
                      color_uncheck={green[600]}
                      onClick={e => this.hdlCheckboxClickHeader(e)}
                      size="small"/>
                    }
                    {isCheckboxIcon &&
                      <IconButton
                        style={{ width: newheaderWidth, height: newheaderWidth }} 
                      >
                      <img 
                        src={mainCheckIcon}
                        style={{ width: header.width, height: header.width }} 
                        />
                      </IconButton>
                    }
                    {isNoEdit && headerTitle }
                    {isSortable && 
                      headerHorizontalAlign === 'left' &&
                      sortOrder === 'asc' &&
                      <span>&nbsp;<button 
                        //href={this.Sort(sortOrder, colHeadIndex)}
                        style={{fontSize: '18px', fontWeight: 'bold'}}
                        >&darr;</button>&nbsp;</span>
                    }
                    {isSortable && 
                      headerHorizontalAlign === 'left' &&
                      sortOrder === 'desc' &&
                      <span>&nbsp;<button 
                        //href={this.Sort(sortOrder, colHeadIndex)}
                        style={{fontSize: '18px', fontWeight: 'bold'}}
                        >&uarr;</button>&nbsp;</span>
                    }
                    </InselTableCellWidthResizer>
                  );
                })}

{/* 
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  notResizable
                  width={headerWidthList[0]}
                  height= {headerHeight}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 0)}>
                </InselTableCellWidthResizer>
                */}                


{/* checkbox with images 
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  width={headerWidthList[1]}
                  height= {headerHeight}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 1)}>
                  <IconButton>
                  <img 
                    src={mainCheckIcon}
                    style={{ width: '32px', height: '32px' }} 
                  />
                  </IconButton>
                </InselTableCellWidthResizer>
                */}

{/* own implementation of resizing cell 
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  width={headerWidthList[2]}
                  height={headerHeight}
                  horizontalAlign={'center'}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 2)}
                  resizerBackgroundColor='red'>
                  {headers[2].title}
                </InselTableCellWidthResizer>
                */}


{/* own implementation of resizing header width
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  width={headerWidthList[3]}
                  height= {headerHeight}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 3)}>
                  header width
                </InselTableCellWidthResizer> */}


{/* Textarea 
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  width={headerWidthList[4]}
                  height= {headerHeight}
                  horizontalAlign={'right'}
                  verticalAlign={'bottom'}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 4)}>
                  textarea autosize
                </InselTableCellWidthResizer>*/}

{/* Textarea 
                <InselTableCellWidthResizer
                  className={classes.table_head_cell}
                  width={headerWidthList[5]}
                  height= {headerHeight}
                  verticalAlign={'center'}
                  setHeight={(colwidth) => this.setState({colwidth: colwidth})}
                  handleMouseDownRowEW={(e)=>this.handleMouseDownRowEW(e, 5)}>
                    Textfield multiline
                </InselTableCellWidthResizer>*/}

{/* dropdown component 
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                    dropdown
                </TableCell>*/}

{/* datetime picker component 
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                    datetime
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                    <TableSortLabel>Products</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Status</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Users</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Event count</TableSortLabel>
                </TableCell>
                <TableCell
                  width={50}
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Views per users</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Average time</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 100,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Conversions</TableSortLabel>
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 56,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                    Edit Dialog
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 56,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                    Edit Row
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 56,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                     Save
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 56,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                    Undo
                </TableCell>

                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    width: 56,
                    paddingLeft: 2, 
                    paddingRight: 2, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                    Delete
                </TableCell>
                */}


                {/*  
                <TableCell className={classes.table_head_cell}>
                  <TableSortLabel>Action</TableSortLabel>
                </TableCell>
                */}


              </TableRow>
            </TableHead>




{/* ================================================================================ */}
{/* Start of the rows ============================================================== */}
{/* ================================================================================ */}


            <TableBody className={classes.table_body_row}>
              {data.map((row, rowindex) => {
                const isCellEditingUser = this.getCellEditing(row.id, this.fieldnameUsers);
                const isRowChanged = this.isRowEdited(row.id);
                const isRowSelected = this.getRowSelection(row.id);
                const isRDeleted = this.isRowDeleted(row.id);
                const iconSource = this.getIconSource(row.id);
                const {
                  id, name, moreInfo, status, 
                  users, eventCount, viewsPerUser, averageTime,
                  conversions
                } = row;
                const editvalue_Users = isCellEditingUser ? this.newvalue_Users : users;
                const rowHeight = this.getRowHeight(row.id);
                //const reszBgColor = (index === 1 ) ? 'red' : 'blue';
                const reszBgColor = 'lightblue';

                return (
                  <TableRow
                    className={classes.table_row}
                    height={rowHeight}
                    style={{
                      height: rowHeight,
                      backgroundColor: isRDeleted ? '#fee' : isRowChanged ? '#efe' : 'white',
                    }}
                    key={`table-row-${rowindex}-${id}`} 
                  >

                  {headers.map((header, colindex) => {

                    //const {
                    //  editType, dropDownSelection, horizontalAlign, 
                    //} = header;


                    const isCheckbox = header.editType === 'checkbox';
                    const isCheckboxIcon = header.editType === 'checkboxIcon';
                    const isNoEdit = header.editType === 'none';
                    const isTextfield = header.editType === 'textfield';
                    const isTextarea = header.editType === 'textarea';
                    const isTextfieldMultiline = header.editType === 'textfieldmultiline';
                    const isInteger = header.editType === 'integer';
                    const isDecimal = header.editType === 'decimal';
                    const isDropdown = header.editType === 'dropdown';
                    const isButtonEdit = header.editType === 'btnEdit';
                    const isButtonSave = header.editType === 'btnSave';
                    const isButtonUndo = header.editType === 'btnUndo';
                    const isButtonDelete = header.editType === 'btnDelete';
                    const btnHoverWidth = header.width + 8;
                    const dropdownWidth = header.width - 10;

                    const typeFound = (
                      isCheckbox || isCheckboxIcon || isNoEdit || 
                      isTextfield || isTextarea || isTextfieldMultiline ||
                      isInteger || isDecimal || isDropdown ||
                      isButtonEdit || isButtonSave || isButtonUndo || isButtonDelete
                    );
                    
                    let tmp = row[header.dataFieldName];
                    if (isDecimal)
                    {
                      tmp = tmp.toFixed(3);
                    }
                    const value = tmp;
                    

                    return (
                      <InselTableCellHeightResizer
                        className={classes.table_check_cell}
                        height={rowHeight}
                        setHeight={(height) => this.setState({rowHeight: height})}
                        handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}
                        resizerBackgroundColor={reszBgColor}>
                        {isCheckbox &&
                          <Checkbox
                          checked={isRowSelected}
                          color_checked={green[400]}
                          color_uncheck={green[600]}
                          onClick={e => this.hdlCheckboxClickRow(e, rowindex)}
                          size="small"/>
                        }
                        {isCheckboxIcon &&
                          <IconButton
                          style={{ width: header.width, height: header.width }} >
                          <img 
                            src={iconSource}
                            style={{ width: header.width, height: header.width }} 
                          />
                          </IconButton>
                        }
                        {isNoEdit && 
                          <TextField
                            value={value}
                            disabled
                            fullWidth
                            style={{ textAlign: header.horizontalAlign, }}
                          ></TextField>}

                        {isTextfield && 
                          <TextField
                            value={value}
                            fullWidth
                            style={{ textAlign: header.horizontalAlign, }}
                          ></TextField>}

                        {isTextarea && 
                          <textarea>{value}</textarea>}

                        {isTextfieldMultiline && 
                          <TextField 
                            multiline
                            value={value}
                            fullWidth
                            style={{ 
                              textAlign: header.horizontalAlign, 
                            }}
                            //InputProps={{ height: '300px' }}
                            inputProps={{ style: { height: rowHeight } }}
                            >
                          </TextField>
                        }
                        {isInteger && 
                          <TextField
                            value={value}
                            fullWidth
                            inputProps={{
                              sx: {
                                textAlign: header.horizontalAlign,
                                "&::placeholder": {
                                  textAlign: header.horizontalAlign,
                                },
                              },
                            }}                            
                          >
                          </TextField>
                        }
                        {isDecimal && 
                          <TextField
                            value={value}
                            fullWidth
                            inputProps={{
                              sx: {
                                textAlign: header.horizontalAlign,
                                "&::placeholder": {
                                  textAlign: header.horizontalAlign,
                                },
                              },
                            }}                            
                          >
                          </TextField>
                        }
                        {isDropdown && 
                          <FormControl
                            style={{ width: dropdownWidth, }}
                            //sx={{ m: 1, minWidth: header.minWidth, }}
                          >
                          {/* 
                          <InputLabel 
                            id="demo-simple-select-isRequired-label">select example</InputLabel>*/}
                          <Select
                            //labelId="demo-simple-select-isRequired-label"
                            //label="select example"
                            //minWidth={100}
                            value={value}
                            //style={{ width: header.width, }}
                            >
                            {header.dropDownSelection.map((item, itemIndex) =>
                            {
                              const ddId = header.dropDownSelection[itemIndex].id;
                              const ddValue = header.dropDownSelection[itemIndex].value;
                              return (
                                <MenuItem 
                                  value={ddId}
                                  >{ddValue}</MenuItem>
                              );
                            })}
                          </Select> 
                          </FormControl>
                        }

                        {isButtonEdit &&
                          <IconButton
                            disabled={isRDeleted}
                            onClick={e => this.handleEditClick(e, id,
                              name, users, eventCount, viewsPerUser, averageTime)}
                              style={{ width: btnHoverWidth, height: btnHoverWidth }} >
                          <img 
                            src={mainEditIcon}
                            title="Edit this in the dialog"
                            style={{ 
                              width: header.width, height: header.width,
                              opacity: (!isRDeleted ? 1 : 0.2) }} 
                          />
                          </IconButton>
                        }

                        {isButtonSave &&
                          <IconButton
                          disabled={!isRowChanged}
                          style={{ width: btnHoverWidth, height: btnHoverWidth }} >
                          <img 
                            src={mainSaveIcon}
                            title="Save this row by clicking here"
                            style={{ 
                              width: header.width, height: header.width,
                              opacity: (isRowChanged ? 1 : 0.2) }} 
                          />
                          </IconButton>
                        }

                        {isButtonUndo &&
                          <IconButton
                            disabled={!isRowChanged}
                            onClick={e => this.handleUndoRow(e, id)}
                            style={{ width: btnHoverWidth, height: btnHoverWidth }} >
                          <img 
                            src={mainUndoIcon}
                            title="Undo this row by clicking here"
                            style={{ 
                              width: header.width, height: header.width,
                              opacity: (isRowChanged ? 1 : 0.2) }} 
                          />
                          </IconButton>
                        }

                        {isButtonDelete &&
                          <IconButton
                            disabled={isRDeleted}
                            onClick={e => this.handleDeleteRow(e, id)}
                            style={{ width: btnHoverWidth, height: btnHoverWidth }} >
                          <img 
                            src={mainDeleteIcon}
                            title="Delete this row by clicking here"
                            style={{ width: header.width, height: header.width,
                              opacity: (!isRDeleted ? 1 : 0.2)
                             }} 
                          />
                          </IconButton>
                        }


                        {!typeFound && <span>TYPE ERROR</span>}
                      </InselTableCellHeightResizer>
                    );
                  })} {/* end map headers */}

{/*                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}
                      resizerBackgroundColor={reszBgColor}>
                      <Checkbox
                        checked={isRowSelected}
                        color_checked={green[400]}
                        color_uncheck={green[600]}
                        onClick={e => this.hdlCheckboxClickRow(e, index)}
                        size="small"
                      />
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}
                      resizerBackgroundColor={reszBgColor}>
                      <IconButton>
                      <img 
                        src={iconSource}
                        style={{ width: '32px', height: '32px' }} 
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}
                      resizerBackgroundColor={reszBgColor}>
                    </InselTableCellHeightResizer>


{/* resizing 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}
                      resizerBackgroundColor={reszBgColor}>
                      <TextField 
                        multiline
                        style={{
                        }}
                        ></TextField>
                    </InselTableCellHeightResizer>


{/* textarea 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                        <textarea 
                          rows={3}
                          style={{
                            width: '100%',
                            backgroundColor: 'transparent'
                          }}
                          >klj d fjlkf slfkjdf lskfj lfj</textarea>
                    </InselTableCellHeightResizer>

{/* textfield 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                        <TextField 
                        multiline
                        style={{
                          height: '100%',
                        }}
                        ></TextField>
                    </InselTableCellHeightResizer>


{/* dropdown component 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                        <FormControl
                          sx={{ m: 1, minWidth: 180,  }}>
                        <InputLabel id="demo-simple-select-isRequired-label">select example</InputLabel>
                        <Select
                        labelId="demo-simple-select-isRequired-label"
                        label="select example"
                        minWidth={100}>
                          <MenuItem value={10}>value 10</MenuItem>
                          <MenuItem value={20}>value 20</MenuItem>
                          <MenuItem value={30}>value 30</MenuItem>
                        </Select> 
                        </FormControl>

                      </InselTableCellHeightResizer>




{/* datetime picker 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                      <DateTimePicker 
                      label="name"
                      views={['year', 'month', 'day']}  
                      name="startDateTime" />
                      </LocalizationProvider>
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        {/*  
                        <Avatar
                          alt={`Avatar n°${index + 1}`}
                          src={`/images/avatars/avatar_${index}.png`}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            width: 35,
                            height: 35,
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '1.25rem',
                            lineHeight: 1,
                            overflow: 'hidden',
                            userSelect: 'none',
                            borderRadius: '4px',
                          }}
                        />
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                          }}>

                          <ResizableBox 
                            width={200} 
                            height={30} 
                            axis="both"
                            style={{
                              //cursor: ew-resize !important;
                              //cursor: 'col-resize'
                            }}
                          >

                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {name}
                          </Box>
                          <Box
                            component="small"
                            sx={{
                              fontSize: '12px',
                              fontWeight: 400,
                            }}>
                            {moreInfo}
                          </Box>
                        </div>
                      </Box>
                    </InselTableCellHeightResizer>


                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      {/* 
                      <Box className={classes.table_box_cell}>
                        <Box
                          className={classes.table_box_cell_circle}
                          style={{ backgroundColor: status_color[status] }}
                        />
                        <Typography
                          className={classes.table_cell_typo}
                          variant="subtitle2">
                          {status}
                        </Typography>
                      </Box>
                      
                      <Chip 
                        label={status} 
                        style={{
                          color: chipcolors[status],
                          backgroundColor: chipcolorsbg[status] 
                        }}
                        size="small" />
                    </InselTableCellHeightResizer>
*/}









{/* editing one cell ------------------------------------------------------------------------------------------------ */}
{/*
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            width: 80,
                            marginTop: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                            textAlign: 'right',
                            marginBlock: 'right',
                          }}>
                          <Box
                            component="p"
                            textAlign='right'
                            justifyContent='right'
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textAlign: 'right',
                              justifyContent: 'right',
                              marginBlock: 'right',
                            }}>
*/}                            
                            {/* TODO: solution Rolf
                            <div
                              onCellDoubleClick={e => this.handleCellDoubleClick(row.id, this.fieldnameUsers)}
                              style = {{
                                display: isCellEditingUser ? 'none' : 'isVisible'
                              }}
                            ><RightText
                            >{users}</RightText></div>
                            */}
{/*                            
                            <div
                              style = {{
                                //display: isCellEditingUser === false ? 'none' : 'isVisible'
                              }}
                            >
                              <input
                                type='text'
                                value={editvalue_Users}
                                readOnly={!isCellEditingUser}
                                style = {{
                                  textAlign: 'right',
                                  width: '100%',
                                  height: 35,
                                  outline: 'none',
                                  borderLeftStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderTopStyle: isCellEditingUser === false ? 'none': 'solid',
                                  borderBottomStyle: isCellEditingUser === false ? 'none': 'solid',
                                  borderTopColor: '#cfc',
                                  borderBottomColor: '#00ff00',
                                  backgroundColor: isCellEditingUser === true ? '#cfc' : 
                                    isRowChanged ? '#efe' : 'white',
                                  //display: isCellEditingUser === false ? 'none' : 'isVisible'
                                }}
                                onDoubleClick={e => this.handleCellDoubleClick(row.id, index, this.fieldnameUsers, users)}
                                onChange={e => this.handleCellEditChange(e, row.id, this.fieldnameUsers)}                                
                                onKeyUp={e => this.handleCellEditKeyUp(e, row.id, this.fieldnameUsers)}                                
                                >
                              </input></div>

                            <div 
                            style={{ 
                                width: '100%', height: '100%', 
                                textAlign: 'right',
                              }}>{users}</div>         
                            
                          </Box>
                          </div>
                      </Box>
                    </InselTableCellHeightResizer>
*/}





                    {/* TODO: do we need 2 elements BOX??? */}

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                            textAlign: 'right',
                            marginBlock: 'right',
                          }}>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textAlign: 'right',
                              justifyContent: 'right',
                              marginBlock: 'right',
                            }}>
                            <div><RightText>{eventCount}</RightText></div>
                          </Box>
                        </div>
                      </Box>
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                          }}>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            <NumberFormatter number={viewsPerUser} />
                            {/* {viewsPerUser} */}
                          </Box>
                        </div>
                      </Box>
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                          }}>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {averageTime}
                          </Box>
                        </div>
                      </Box>
                    </InselTableCellHeightResizer>

                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                          }}>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {/* missing graph */}
                            
    
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={conversions}
        //width={colDef.computedWidth || 100}
        width={100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          dataDays,
        }}
      />
    </div>

                          </Box>
                        </div>
                      </Box>
                    </InselTableCellHeightResizer>

{/* edit with dialog */}
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <IconButton
                        disabled={isRDeleted}
                      >
                      <img 
                        src={mainEditIcon}
                        title="Edit this row by clicking here"
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          opacity: (!isRDeleted ? 1 : 0.2) 
                        }} 
                        onClick={e => this.handleEditClick(e, id,
                          name, users, eventCount, viewsPerUser, averageTime)}
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

{/* edit on the row */}
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <IconButton
                        disabled={isRDeleted}
                      >
                      <img 
                        src={mainEditIcon}
                        title="Edit this row by clicking here"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                          opacity: (!isRDeleted ? 1 : 0.2) 
                        }} 
                        onClick={e => this.handleEditRowClick(e, id,
                          name, users, eventCount, viewsPerUser, averageTime)}
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

{/* save button on row 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <IconButton
                        disabled={!isRowChanged}
                      >
                      <img 
                        src={mainSaveIcon}
                        title="Save this row by clicking here"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                          opacity: (isRowChanged ? 1 : 0.2) 
                        }} 
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

{/* undo button on row 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <IconButton
                        disabled={!isRowChanged}
                        onClick={e => this.handleUndoRow(e, id)}
                      >
                      <img 
                        src={mainUndoIcon}
                        title="Undo this row by clicking here"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                          opacity: (isRowChanged ? 1 : 0.2) 
                        }} 
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

{/* delete row 
                    <InselTableCellHeightResizer
                      className={classes.table_check_cell}
                      height={rowHeight}
                      setHeight={(height) => this.setState({rowHeight: height})}
                      handleMouseDownRowNS={(e)=>this.handleMouseDownRowNS(e, row.id)}>
                      <IconButton
                        disabled={isRDeleted}
                        onClick={e => this.handleDeleteRow(e, id)}
                      >
                      <img 
                        src={mainDeleteIcon}
                        title="Delete this row by clicking here"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                          opacity: (!isRDeleted ? 1 : 0.2) 
                       }} 
                      />
                      </IconButton>
                    </InselTableCellHeightResizer>

                    */}












                    {/*  
                    <TableCell
                      className={classes.table_row_cell}
                      style={{
                        minWidth: 100,
                        letterSpacing: '0em',
                        fontWeight: 400,
                        lineHeight: '1.5em',
                        color: 'rgb(54, 65, 82)',
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '0.875rem',
                        display: 'table-cell',
                        verticalAlign: 'inherit',
                        textAlign: 'center',
                        padding: 0,
                      }}>
                      
                      <Box>
                        <IconButton
                          aria-label="View"
                          color="primary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            bgcolor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'isVisible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(33, 150, 243)',
                            padding: '12px',
                            fontSize: '1.75rem',
                          }}>
                          <VisibilityTwoTone
                            sx={{
                              userSelect: 'none',
                              width: '1em',
                              height: '1em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Edit"
                          color="secondary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            bgcolor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'isVisible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(103, 58, 183)',
                            padding: '12px',
                            fontSize: '1.75rem',
                          }}>
                          <EditTwoTone
                            sx={{
                              userSelect: 'none',
                              width: '1em',
                              height: '1em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          color="secondary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            backgroundColor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'isVisible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(244, 67, 54)',
                            padding: '5px',
                            fontSize: '1.125rem',
                          }}>
                          <DeleteOutline
                            sx={{
                              userSelect: 'none',
                              width: '0.8em',
                              height: '0.8em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                    */}
                  </TableRow>

                );
              })}
              <TableRow className={classes.table_body_row}>
                <TableCell
                  colSpan={4}
                  style={{
                    padding: 0,
                    margin: 0,
                    borderBottom: '1px solid rgb(229, 234, 239)',
                    borderWidth: '1px medium medium',
                    borderStyle: 'dashed none none',
                    borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
                    borderImage: 'none',
                    color: 'rgb(107, 114, 128)',
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Table
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.paper',
            boxShadow: '0px -2px 4px rgba(0,0,0,0.1)', // Optional: adds shadow to separate pagination
          }}>
          <TableFooter>
            <TableRow>

{/* new button */}
<IconButton
                //disabled={!this.state.rowsWereEdited}
                //disabled={mainDisabled}
                //onClick={e => this.handleNewRow(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
              <img 
                src={mainAddIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  //opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />&nbsp;new row</IconButton>


{/* save all */}    
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                disabled={mainDisabled}
                onClick={e => this.handleSaveAll(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
              <img 
                src={mainSaveIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />Save all</IconButton>

{/* undo all */}     
              <IconButton
                //disabled={!this.state.rowsWereEdited}
                disabled={mainDisabled}
                onClick={e => this.handleUndoAll(e)}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
              <img 
                src={mainUndoIcon}
                style={{ 
                  width: '48px', 
                  height: '48px',
                  opacity: (!mainDisabled ? 1 : 0.2) 
                 }} 
              />&nbsp;Undo all</IconButton>

              <TablePagination
                component="div"
                count={this.state.data.length}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
                labelRowsPerPage="Rows:" // Shorter label
                onPageChange={(event, page) => {
                  event.preventDefault();
                  this.setState({ page });
                }}
                onRowsPerPageChange={event => {
                  this.setState({
                    page: 0,
                    limit: parseInt(event.target.value, 10),
                  });
                }}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 20, 100]}
                sx={{
                  borderTop: '1px solid rgba(224, 224, 224, 1)',
                  overflow: 'hidden',
                  '.MuiTablePagination-toolbar': {
                    minHeight: '40px', // Reduced from 52px
                    paddingLeft: '8px', // Reduced from 16px
                    paddingRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '.MuiTablePagination-spacer': {
                    flex: '1 1 100%',
                    // flex: '0.2', // Reduced flex space
                  },
                  '.MuiTablePagination-selectLabel': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', //'0.875rem',
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginRight: '4px', // added
                  },
                  '.MuiTablePagination-select': {
                    minWidth: '16px',
                    paddingRight: '12px', // Reduced from 24px
                    paddingLeft: '4px', // Reduced from 8px
                    textAlign: 'left',
                    textAlignLast: 'left',
                  },
                  '.MuiTablePagination-displayedRows': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', // Smaller font
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginLeft: '4px',
                    marginRight: '4px',
                  },
                  '.MuiIconButton-root': {
                    padding: '4px', // Reduced from 12px
                    borderRadius: '50%',
                    overflow: 'isVisible',
                    color: 'inherit',
                    transition:
                      'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    '&.Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.26)',
                    },
                  },
                  '.MuiSvgIcon-root': {
                    fontSize: '1.2rem', // Smaller icons
                  },
                  // Make the whole pagination more compact
                  '& .MuiToolbar-root': {
                    gap: '2px',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>


{/* ================================================================================ */}
{/* modal dialog =================================================================== */}
{/* ================================================================================ */}

        {/* Dialog component for the modal */}
        <Dialog 
          width={720}
          maxWidth={720}
          minWidth={720}
          open={this.state.openDialog} 
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Custom backdrop color (darker)
            }
          }}          
          sx={{
            '& .MuiDialog-paper': {
              border: '5px solid #1976d2', // Set border color
              borderRadius: '20px',         // Optional: set border radius for rounded corners
            }
          }}          >
          <DialogTitle
            textAlign={'center'}
          >Sample Modal</DialogTitle>
          <DialogContent>
            <Typography 
              variant="h6"
              textAlign={'center'}
            >Edit the row:</Typography>
            <Table>
              <TableRow>
                <TableCell >Product</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    label="Productname"
                    type="text"
                    value={this.state.dlgName}
                    sx={{ width: '720px' }}
                    helperText="Enter the product here. Don't enter any comments."
                    onChange={(e) => this.handleDialogChange(e, 'dlgName')}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>
                  <TextField
                    label="Users"
                    type="text"
                    value={this.state.dlgUser}
                    helperText="Percentages: enter only values between 0 and 100"
                    onChange={(e) => this.handleDialogChange(e, 'dlgUser')}
                  />
                </TableCell>
                <TableCell>Events</TableCell>
                <TableCell>
                  <TextField
                    label="Events"
                    type="text"
                    value={this.state.dlgEvents}
                    helperText="Count of events must be bigger than 0"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Views</TableCell>
                <TableCell>
                  <TextField
                    label="Views"
                    type="text"
                    value={this.state.dlgViews}
                    helperText="Average of views is a decimal number (format XX.YYYY)"
                  />
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>
                  <TextField
                    label="Time"
                    type="text"
                    value={this.state.dlgTime}
                    helperText="Time format: XXm YYs"
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Checks</TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox1"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox2"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox3"/>
                  <FormControlLabel
                    control={<Checkbox/>}
                    label="Checkbox4"/>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Comments</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    multiline
                    rows={5}
                    label="enter comments here text multiline"
                    sx={{ width: '720px' }}
                    helperText="Enter free comments about your observations"
                  />
                </TableCell>
              </TableRow>
            </Table>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>


      </Paper>
    );
  }
}

ConfigAnnotageRolf.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(ConfigAnnotageRolf, useStyles);
