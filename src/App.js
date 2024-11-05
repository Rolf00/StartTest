import * as React from 'react';
import { colors, Grid } from "@mui/material";
import { CardCenter } from "./components";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { alpha, styled } from '@mui/material/styles';
import { blue, pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useRef } from "react";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { BorderColor } from "@mui/icons-material";
import DatePickerValue from './components/DatePickerValue';
//import { styled } from '@mui/material/styles';



const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };



export function TextFieldValidationRolf() {
  var isOk = false;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameClass, setNameClass] = useState("");
  const [textcolor, setTextcolor] = useState('');
  const [backgroundcolor, setBackground] = useState('');
  const [outlinecolor, setOutline] = useState('');
  const handleOnLoad = e => {
    // TODO outlineColor: why does it not work?
    name = 'Rolf';
    e.target.value = name;
  };

  const handleOnChange = e => {
    setName(e.target.value);
    isOk = false;
    if (e.target.value === "") 
    {
      setNameError('Empty name');
    } 
    else if (e.target.value.length < 5) 
    {
      setNameError('Name must have at least 5 letters');
    } 
    else if (e.target.value.length > 10) 
    {
      setNameError('Name must have less than 10 letters');
    } 
    else 
    {
      isOk = true;
      setNameError('OK: ' + e.target.value.length + ' letters');
    }
    if (isOk)
    {
      setNameClass('class.Ok');
      setTextcolor('#070');
      setBackground('#dfd');
      setOutline('#070');
    }
    else
    {
      setNameClass('class.Error');
      setTextcolor('#700');
      setBackground('#fdd');
      setOutline('#700');
    }
  };
  return (
    <TextField
      /* required */
      label="Enter 5 to 10 letters"
      value={name}
      onChange={handleOnChange}
      onLoaded={handleOnLoad}
      error={nameError}
      helperText={nameError}
      //color='red'
      inputProps={{
        style: {
          color: textcolor,
          backgroundColor: backgroundcolor,
          // TODO outlineColor: why does it not work?
          outlineColor: outlinecolor,
        }
      }}
    />
  );
}


const App = ()=>{
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
    Hello World!!
  </Grid>


  <Grid padding={'20px'}>
    <TextFieldValidationRolf style="classErr"></TextFieldValidationRolf>
  </Grid>


  <Grid padding={'20px'}>
    <DatePickerValue></DatePickerValue>
  </Grid>
  

  <Grid padding={'20px'}>
    <TextField
      id="filled-multiline-static"
      label="Multiline"
      multiline
      rows={7}
      defaultValue={"Default Value\nLine2\nLine2\n\n\nHow to set the width??"}
      variant="filled"
      width='600px'
    />    
  </Grid>


  <Grid item>
  <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  </Grid>


  <Grid padding={'20px'}>
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel required control={<Checkbox />} label="Required" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
  </Grid>


  <Grid padding={'20px'}>
    <div><FormLabel>RadioGroup from Rolf (TODO: how to add new lines with FormLabel?)</FormLabel></div>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        />
      </RadioGroup>
    </FormControl>    
  </Grid>


  <Grid padding={'20px'}>
    <FormControl fullWidth>
      <FormLabel>TODO: how do declare age? handleChange?</FormLabel>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      /* value={age} */
      label="Age"
      /* onChange={handleChange} */
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>    
  </Grid>


  <Grid padding={'20px'}>
    <div>
      <Switch {...label} defaultChecked />
      <Switch {...label} defaultChecked color="secondary" />
      <Switch {...label} defaultChecked color="warning" />
      <Switch {...label} defaultChecked color="default" />
      <PinkSwitch {...label} defaultChecked />
    </div>
  </Grid>

  <Grid item padding={'20px'}>
    <CardCenter/>
  </Grid>

</Grid>
  )
}
export default App