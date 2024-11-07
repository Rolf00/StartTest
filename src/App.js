import * as React from 'react';
import { Button, Grid } from "@mui/material";
import Dashboard from './dashboard/Dashboard';


// not found:
//import { dataDisplayCustomizations } from './customizations/dataDisplay';
//import { feedbackCustomizations } from './customizations/feedback';


const App = ()=> {

  const parentMessage = "Hello from Parent!";
  const user = { name: "John", age: 30 };

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
  >

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