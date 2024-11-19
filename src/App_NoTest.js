import * as React from 'react';
import { Button, Grid } from "@mui/material";
//import { MaterialReactTable } from "material-react-table";
import Dashboard from './dashboard/Dashboard';

// imports for dashboard table "DataGrid"
import { DataGrid } from '@mui/x-data-grid';
import { columnsRolf, rowsRolf } from './gridDataRolf';

// customizable tables
import ConfigAnnotage from './dashboard/components/Table/ConfigAnnotage';
import ConfigAnnotageRolf from './dashboard/components/TableRolf/ConfigAnnotageRolf';

//import { DataGrid } from '@mui/x-data-grid';


// not found:
//import { dataDisplayCustomizations } from './customizations/dataDisplay';
//import { feedbackCustomizations } from './customizations/feedback';

import ResizableTableRolf from './ResizableTableRolf';


const columnsRTR = [
  {
    Header: 'Name',
    accessor: 'name',
    canResize: true, // Enable resizing for this column
  },
  {
    Header: 'Age',
    accessor: 'age',
    canResize: true, // Enable resizing for this column
  },
  {
    Header: 'Country',
    accessor: 'country',
    canResize: true, // Enable resizing for this column
  },
];

const dataRTR = [
  { name: 'John', age: 28, country: 'USA' },
  { name: 'Jane', age: 34, country: 'Canada' },
  { name: 'Bob', age: 45, country: 'UK' },
  // Add more rows here
];


function handleMainKeyUp(e) 
{
  //alert("handleMainKeyUp");
  //setKeyPressed(`Key pressed: ${event.key}`);
};      

const App = () => {
  return (
    <div>
      <h1>Resizable Table</h1>
      <ResizableTableRolf columns={columnsRTR} data={dataRTR} />
    </div>
  );
};

export default App