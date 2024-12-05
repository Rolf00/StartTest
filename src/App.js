import { Grid } from '@mui/material';
import * as React from 'react';
//import React, { useRef } from 'react';

import { A, D, MyClassTableCell, MyTableCell } from './components';

import imgChipStatus1 from './table/imgYes48.png'; 
import imgChipStatus2 from './table/imgYes48.png'; 
import imgChipStatus3 from './table/imgYes48.png'; 
import imgChipStatus4 from './table/imgYes48.png'; 
import imgChipStatus5 from './table/imgYes48.png'; 
import imgChipStatus6 from './table/imgYes48.png'; 


import InselTable from './table/InselTable';

const App = ()=> {
  const [value,setExternalValue] = React.useState('hello world')
  const parentMessage = "Hello from Parent!";
  const user = { name: "John", age: 30 };


  const settings = 
  {
    // header settings
    headerVerticalAlign: 'top',
    initialHeaderHeight: 55,
    initialRowHeight: 25,

    // rows settings
    rowsVerticalAlign: 'top',

    // dialog
    dialogName: 'InselDialog_MainData',

    // resizer options
    resizerEWBackgroundColor: 'transparent',
    resizerNSBackgroundColor: 'transparent',
    resizerSize: 5,
    resizerBorderBottomRightWidth: 1,

    // main button options
    buttonSizeOnRows: 32,
    hasButtonNewRow: false,
    hasButtonSaveAll: false,
    hasButtonUndoAll: false,
    hasButtonExcelAll: true,
    hasButtonExcelSelected: false,
  };
  
  const headers = [
    /*
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
      decimalCount: 0,
      editType: 'selection',
      defaultValue: false,
      dataFieldName: '',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
      //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    */
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
      decimalCount: 0,
      editType: 'selectionIcon',
      defaultValue: false,
      dataFieldName: '',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
    },
    {
      databaseField: "primaryKey",
      headerTitle: "dbID",
      helperText: "",
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
      decimalCount: 0,
      editType: 'primaryKey',
      defaultValue: 'none',
      dataFieldName: 'id',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
    },
    {
      databaseField: "FieldXY",
      headerTitle: "Name",
      helperText: "up to 20 characters only",
      isResizable: true,
      isEditable: true,
      isRequired: true,
      isVisible: true,
      isSortable: true,
      defaultSorting: 'asc',
      width: 180,
      minWidth: 100,
      maxWidth: 300,
      textMaxLength: 20,
      numberMinValue: 0,
      numberMaxValue: 0,
      decimalCount: 0,
      editType: 'textfield',
      defaultValue: 'default field x',
      dataFieldName: 'field1',
      horizontalAlign: 'left',
      dropdownSelection: [],
      hasHeaderMenu: true,
    },
    /*
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
      decimalCount: 0,
      editType: 'textarea',
      defaultValue: 'default field textarea',
      dataFieldName: 'fieldtextarea',
      horizontalAlign: 'left',
      dropdownSelection: [],
      hasHeaderMenu: true,
    },
    */
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
      decimalCount: 0,
      editType: 'textfieldmultiline',
      defaultValue: 'default field textfieldmultiline',
      dataFieldName: 'field2',
      horizontalAlign: 'left',
      dropdownSelection: [],
      hasHeaderMenu: true,
    },
    {
      databaseField: "numbervalue",
      headerTitle: "Count events",
      helperText: "Only values between 0 and 100",
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
      numberMaxValue: 100,
      decimalCount: 0,
      editType: 'integer',
      defaultValue: 0,
      dataFieldName: 'eventCount',
      horizontalAlign: 'right',
      dropdownSelection: [],
      hasHeaderMenu: true,
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
      decimalCount: 3,
      editType: 'decimal',
      defaultValue: 1.1111,
      dataFieldName: 'viewsPerUser',
      horizontalAlign: 'right',
      dropdownSelection: [],
      hasHeaderMenu: true,
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
      databaseField: "",
      headerTitle: "was in hosp.",
      isResizable: true,
      isEditable: false,
      isRequired: false,
      isVisible: true,
      isSortable: false,
      defaultSorting: '',
      width: 90,
      minWidth: 90,
      maxWidth: 120,
      editType: 'checkbox',
      defaultValue: 'none',
      dataFieldName: 'wasInHospital',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: true,
    },
    {
      databaseField: "",
      headerTitle: "Birth",
      isResizable: false,
      isEditable: true,
      isRequired: false,
      isVisible: true,
      isSortable: true,
      defaultSorting: '',
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      editType: 'date',
      defaultValue: 'none',
      dataFieldName: 'birthday',
      hasHeaderMenu: true,
    },
    {
      headerTitle: "Status",
      isResizable: false,
      isEditable: true,
      isRequired: false,
      isVisible: true,
      defaultSorting: '',
      width: 160,
      minWidth: 160,
      maxWidth: 160,
      editType: 'chip',
      defaultValue: '1',
      dataFieldName: 'chipstatus',
      chipList: [
        { id: '1', label: 'Status 1', color: '#FFFFFF', icon: imgChipStatus1, },
        { id: '2', label: 'Status 2', color: '#FF9999', icon: imgChipStatus2, },
        { id: '3', label: 'Status 3', color: '#99FF99', icon: imgChipStatus3, },
        { id: '4', label: 'Status 4', color: '#9999FF', icon: imgChipStatus4, },
        { id: '5', label: 'Status 5', color: '#FF99FF', icon: imgChipStatus5, },
        { id: '6', label: 'Status 6', color: '#99FFFF', icon: imgChipStatus6, },
      ],
      hasHeaderMenu: false,
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
      decimalCount: 0,
      editType: 'btnEdit',
      defaultValue: 'none',
      dataFieldName: '',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
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
      decimalCount: 0,
      editType: 'btnSave',
      defaultValue: 'none',
      dataFieldName: '',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
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
      decimalCount: 0,
      editType: 'btnUndo',
      defaultValue: 'none',
      dataFieldName: '',
      horizontalAlign: 'center',
      dropdownSelection: [],
      hasHeaderMenu: false,
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
  valueGetter: (parmas) => {
    const value = params.getValue('user')
    return `${value.firstname} ${value.lastname}`
  }
  */
  const emptyData = {
    id: null,
    field1: null,
    fieldtextarea: null,
    field2: null,
    dropdownvalue: null,
    name: null,
    moreInfo: null,
    status: null,
    eventCount: null,
    users: null,
    viewsPerUser: null,
    averageTime: null,
    conversions: [],
    wasInHospital: null,
    chipstatus: null,
  };

  const data = [
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
        wasInHospital: false,
        chipstatus: '1',
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
        eventCount: 53,
        users: 142240,
        viewsPerUser: 3.1,
        averageTime: '2m 55s',
        conversions: [
          251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
          640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
          1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
          1854053, 1791831,
        ],
        wasInHospital: true,
        chipstatus: '2',
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
        wasInHospital: true,
        chipstatus: '3',
        
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
        wasInHospital: false,
        chipstatus: '4',

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
        birthday: '1980-10-01', // YYYY-MM-DD
        conversions: [
          52394, 63357, 82800, 105466, 128729, 144472, 172148, 197919, 212302, 278153,
          290499, 249824, 317499, 333024, 388925, 410576, 462099, 488477, 533956, 572307,
          591019, 681506, 653332, 581234, 719038, 783496, 911609, 973328, 1056071,
          1112940,
        ],
        wasInHospital: false,
        chipstatus: '5',

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
        birthday: '1980-10-01', // YYYY-MM-DD
        conversions: [
          15372, 16901, 25489, 30148, 40857, 51136, 64627, 75804, 89633, 100407, 114908,
          129957, 143568, 158509, 174822, 192488, 211512, 234702, 258812, 284328, 310431,
          338186, 366582, 396749, 428788, 462880, 499125, 537723, 578884, 622825,
        ],
        wasInHospital: false,
        chipstatus: '6',

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
        birthday: '1980-10-01', // YYYY-MM-DD
        conversions: [
          70211, 89234, 115676, 136021, 158744, 174682, 192890, 218073, 240926, 308190,
          317552, 279834, 334072, 354955, 422153, 443911, 501486, 538091, 593724, 642882,
          686539, 788615, 754813, 687955, 883645, 978347, 1142551, 1233074, 1278155,
          1356724,
        ],
        wasInHospital: false,
        chipstatus: null,
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
        birthday: '1980-10-01', // YYYY-MM-DD
        conversions: [
          49662, 58971, 78547, 93486, 108722, 124901, 146422, 167883, 189295, 230090,
          249837, 217828, 266494, 287537, 339586, 363299, 412855, 440900, 490111, 536729,
          580591, 671635, 655812, 576431, 741632, 819296, 971762, 1052605, 1099234,
          1173591,
        ],
        wasInHospital: false,
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
        birthday: null, // YYYY-MM-DD
        conversions: [
          29589, 37965, 55800, 64672, 77995, 91126, 108203, 128900, 148232, 177159,
          193489, 164471, 210765, 229977, 273802, 299381, 341092, 371567, 413812, 457693,
          495920, 564785, 541022, 491680, 618096, 704926, 833365, 904313, 974622,
          1036567,
        ],
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
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
        wasInHospital: false,
      },
    ];
  
  return(
    <Grid container >

      <Grid item >
        <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Table with own components</div>
        <InselTable 
          settings={settings}
          headers={headers} 
          primaryKey="id"
          data={data}  
          dialogName="InselDialog_MainData"
        />
        <div style={{ textAlign: 'center'}}>
        <a target="_blank" href="https://icons8.com">Icons are from Icons8.com</a>
        </div>
      </Grid>

    </Grid>
  )
}
export default App