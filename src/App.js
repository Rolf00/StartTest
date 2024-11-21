import { Grid } from '@mui/material';
import * as React from 'react';
import { A, D, MyClassTableCell, MyTableCell } from './components';



import ConfigAnnotageRolf from './dashboard/components/TableRolf/ConfigAnnotageRolf';

const App = ()=> {
  const [value,setExternalValue] = React.useState('hello world')
  const parentMessage = "Hello from Parent!";
  const user = { name: "John", age: 30 };


  
  return(
    <Grid container >
      <Grid item xs={12}>
      <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Examples A</div>
      <A setExternalValue={setExternalValue}/>
      </Grid>

      <Grid item container xs={12}>
      <Grid item xs>
          <MyTableCell height={100}>
           {value}
          </MyTableCell>
      </Grid>
      <Grid item xs={3}>
          <D height={50} backgroundColor="pink">
           {value}
          </D>
      </Grid>
      <Grid item xs={6}>
          <MyClassTableCell height={100}>
           {value}
          </MyClassTableCell>
      </Grid>
      </Grid>


      <Grid item >
        <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Table with own components</div>
        <ConfigAnnotageRolf />
      </Grid>


    </Grid>
  )
}
export default App