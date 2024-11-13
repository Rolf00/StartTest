import * as React from 'react';
import { Button, Grid } from "@mui/material";
import Dashboard from './dashboard/Dashboard';

// imports for dashboard table "DataGrid"
import { DataGrid } from '@mui/x-data-grid';
import { columnsRolf, rowsRolf } from './gridDataRolf';

// customizable tables
import ConfigAnnotage from './dashboard/components/Table/ConfigAnnotage';
import ConfigAnnotageRolf from './dashboard/components/TableRolf/ConfigAnnotageRolf';


// not found:
//import { dataDisplayCustomizations } from './customizations/dataDisplay';
//import { feedbackCustomizations } from './customizations/feedback';


function handleMainKeyUp(e) 
{
  //alert("handleMainKeyUp");
  //setKeyPressed(`Key pressed: ${event.key}`);
};      

const App = ()=> {

  const parentMessage = "Hello from Parent!";
  const user = { name: "John", age: 30 };


  const handleOnClick = e => {
    // TODO
    // show selectioncont  
  }

  return(


  <Grid
    container
    direction="column"
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      // when spacing between grid rows is needed
      // height: window.innerHeight
    }}
    //onKeyUp={e => handleMainKeyUp(e)}
  >

  <Grid item>
  <div style={{
      paddingTop: 20,
      fontSize:20,
      fontWeight:'bold',
      }}>Customizable Table created by Waldo.</div>
    <div>
    <ConfigAnnotage/>
    </div>
  </Grid>


  <Grid item>
  <div style={{
      paddingTop: 20,
      fontSize:20,
      fontWeight:'bold',
      }}>Customizable Table created by Rolf.</div>
    <div>
    <ConfigAnnotageRolf/>
    </div>
  </Grid>


  <Grid 
    item
    padding={'20px'}
  >
    <div style={{
      paddingTop: 20,
      fontSize:20,
      fontWeight:'bold',
      }}>Table example Dashboards created by Rolf.</div>
    <div>
      <DataGrid
        id="DataGridRolf"
        checkboxSelection
        columnHeaderHeight={25}
        sx={{ 
          '& .MuiDataGrid-columnHeaders': { 
            backgroundColor: "#ddd" 
        }}} 
        rowHeight={25}
        rows={rowsRolf}
        rowsPerPageOptions={[2]}
        columns={columnsRolf}
        initialState={{
          pagination: { paginationModel: { pageSize: 2,  page: 0 } },
        }}        
        pageSizeOptions={[2, 4, 6, 8, 10, 
          { value: 1000, label: '1,000' }, 
          { value: -1, label: 'All' }]}
        pagination
        //disableColumnSorting        
      >
      </DataGrid>
    </div>
    <div><Button 
      onclick={handleOnClick}>show selected
      </Button></div>
  </Grid>

  <Grid 
    item
    padding={'20px'}
  >
    Table example Dashboards.
  </Grid>

  <Grid 
    item
    padding={'20px'}
  >
    <Dashboard
      parentMessage={parentMessage}
      userInfo={user}
    ></Dashboard>
  </Grid>

  </Grid>
  )
}
export default App