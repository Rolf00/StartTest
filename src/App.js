import { Grid } from '@mui/material';
import * as React from 'react';
//import React, { useRef } from 'react';

import { A, D, MyClassTableCell, MyTableCell } from './components';



import ConfigAnnotageRolf from './dashboard/components/TableRolf/ConfigAnnotageRolf';

const App = ()=> {
  const [value,setExternalValue] = React.useState('hello world')
  const parentMessage = "Hello from Parent!";
  const user = { name: "John", age: 30 };


  
  return(
    <Grid container >

      {/* 
      <Grid item xs={12}>
      <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Example Column resizer *1*</div>

      <div style={{
        height: '120px', width: '250px', backgroundColor: 'black',
        display: 'flex'}}>
      <div style={{float: 'right', width: '20px', backgroundColor: 'green', height: '100%', padding: '0px', }}>
        <span>X</span>
      </div>
      <div style={{
        overflow: 'hidden', backgroundColor: '#ddd', height: '100%', paddin: '0px', 
        //textAlign: 'center'
        
        display: 'flex', 
        flexDirection: 'column',
        alignSelf: 'flex-end',
        //justifyContent: 'center', 
        //alignItems: 'center',
        }}>
	      Text main div jasdkl a jdakls jdlaskj alskdj alksdj 
      </div>
      </div>
      </Grid>

      <Grid item xs={12}>
      <div style={{ paddingTop: 30, fontSize: 24, fontWeight: 'bold'}}>Example Column resizer *2*</div>

      <div style={{height: '120px', width: '250px', backgroundColor: 'black', display: 'flex'}}>
      <div style={{flexGrow: 1, backgroundColor: 'green', height: '100%', padding: '0px', }}>
        Text main div jasdkl a jdakls jdlaskj alskdj alksdj
      </div>
      <div style={{backgroundColor: '#ddd', height: '100%', width: '20px'}}>
	      
      </div>
      </div>
      </Grid>
      */}

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