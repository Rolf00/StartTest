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
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


//import TableTest from './components/TableTest';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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
  const [name, setName] = useState("Test");
  const [nameError, setNameError] = useState("");
  const [nameClass, setNameClass] = useState("");
  const [textcolor, setTextcolor] = useState('#700');
  const [backgroundcolor, setBackground] = useState('#fdd');
  const [outlinecolor, setOutline] = useState('#070');
  const handleOnLoad = e => {
    // TODO outlineColor: why does it not work?
    name = 'Test';
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

      // set the value of another "Textfield"
      var text2 = document.getElementById("Text2");
      text2.style.backgroundColor = '#dfd';
      text2.value = "Ok";

      // set the value of a "FormLabel"
      var label1 = document.getElementById("Label1");
      label1.innerHTML = "It's ok. Thanks: ..........";

      // set the date
      //var date1 = document.getElementById("DatePicker1");
      //date1.value = dayjs("2024-12-12");
    }
    else
    {
      setNameClass('class.Error');
      setTextcolor('#700');
      setBackground('#fdd');
      setOutline('#700');

      // set the value of another "Textfield"
      var text2 = document.getElementById("Text2");
      text2.style.backgroundColor = '#fdd';
      text2.value = "Wrong";

      // set the value of a "FormLabel"
      var label1 = document.getElementById("Label1");
      label1.innerHTML = "Wrong enter: ..........";

      // set the date
      //var date1 = document.getElementById("DatePicker1");
      //date1.value = dayjs("2000-01-01");
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
      sx={{
        //.MuiInputBase-input MuiOutlinedInput-input css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input
        '& .MuiOutlinedInput-root':
        {
          '& fieldset': 
          {
            borderColor: outlinecolor
          }
        }
      }}
      inputProps={{
      // why does slotProps not work?
      //slotProps.htmlInput={{
        style: {
          color: textcolor,
          backgroundColor: backgroundcolor,
          // TODO outlineColor: why does it not work?
          borderColor: outlinecolor,
        }
      }}
    />
  );
}

/*

sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'green', // Outline color
          },
          '&:hover fieldset': {
            borderColor: 'blue', // Outline color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'red', // Outline color when focused
          },
        },
      }}
*/





const App = ()=> {

  // *************************************************************************
  // for TEXTFIELDs in TABLE
  const [dataHasChanged, setChanged] = useState(false);
  function createData(
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    btnCaption,
    rowtext,
    rowchanged
  ) {
    return { id, name, calories, fat, carbs, protein, btnCaption, rowtext, rowchanged };
  }

  const initialData  = [
    createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0, "Delete", "nice", false),
    createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3, "Ignore", "to", false),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0, "Cancel", "have!!!", false),
  ];
  
  const [data, setData] = useState(initialData);
  const handleOnChangeRowText = (event, rowIndex, columnName) => {
    //setName(event.target.value);
    var ok = true;
    if (columnName === "rowtext")
    {
      // field "rowtext"
      // TODO : do some checks here
      if (event.target.value.length > 10)
      {
        alert("here only 10 letters are allowed!");
        ok = false;
      }
    }
    else if (columnName === "another field")
    {
      // other field "....."
    }
    if (ok)
    {
      const newData = [...data];
      newData[rowIndex][columnName] = event.target.value;
      newData[rowIndex]["rowchanged"] = true;
      setData(newData); 
      setChanged(true);
    }
  };

  const handleSave = () =>
  {
    if (dataHasChanged === true)
    {
      alert("SAVE: data has changed");
    }
    else
    {
      alert("NOTHING TO SAVE: data was not changed");
    }
  }

  const handleCancel = () =>
  {
    if (dataHasChanged === true)
    {
      setData(initialData); 
      alert("Canceling was done successfully");
    }
    else
    {
      alert("Data hasn't changed: nothing to do");
    }
  }

  const saveRow = (rowIndex) => {
    alert("saveRow");
  };

  const cancelRow = (rowIndex) => {
    alert("cancelRow: " + rowIndex);

    data[rowIndex]["rowchanged"] = false;
    data[rowIndex]["rowtext"] = initialData[rowIndex]["rowtext"];
    const newData = data;
    setData(newData); 

    var elm = document.getElementById("id_" + rowIndex);
    elm.value = initialData[rowIndex]["rowtext"]
  };

  const deleteRow = (rowId) => {
    // TODO: a simplier wax to delete a row
    // TODO: why does this not work?

    const newData = data.filter((row) => row.id !== rowId);
    setData(newData); 
    
    /*
    alert("deleteRow: " + index);
    let newData = [];
    for (let i = 0; i< data.length; i++)
    {
      if (i != rowIndex)
      {
        newData = [...newData, createData(
          data[i]["id"],
          data[i]["name"],
          data[i]["calories"],
          data[i]["fat"],
          data[i]["carbs"],
          data[i]["protein"],
          data[i]["btnCaption"],
          data[i]["rowtext"]
        ) ] ;
      }
    }
    setData(newData);
    */
  };

  // *************************************************************************
  
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

  <Grid 
    item
    padding={'20px'}
  >
    <TableContainer component={Paper}>
      <Table sx=
        {{ 
          minWidth: 650,
        }} 
        aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead
          BackgroundColor="#fff"
          sx={{
            '& .MuiTableHead-root':{
              '& .css-1te18qy-MuiTableHead-root':
              {
                color: 'red',
                backgroundColor: '#ddd'
              }
            }
          }}
        >
          <TableRow
            style = {{
                backgroundColor: '#aaa'
            }}
          >
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="center">Button</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">&nbsp;</TableCell>
            <TableCell align="center">&nbsp;</TableCell>
            <TableCell align="center">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell 
                align="right"
                style={{ 
                  color: (row.carbs > 25) ? 'red' : 'black',
                  backgroundColor: (row.carbs > 25) ? '#fdd' : '#ddd' 
                }}
              >{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="center">
                <Button
                  style={{ 
                    color: (row.carbs > 25) ? 'red' : 'black',
                    backgroundColor: (row.carbs > 25) ? '#fdd' : '#ddd', 
                    borderWidth: 1,
                    borderColor: 'black',
                  }}
                >{row.btnCaption}</Button>
              </TableCell>
              <TableCell align="center">
                <TextField
                  id={"id_" + rowIndex}
                  label="Enter a comment"
                  value={row.rowtext}
                  onChange={(e) => handleOnChangeRowText(e, rowIndex, "rowtext")}
                  style={{
                    backgroundColor: (row.carbs > 25) ? '#fdd' : '#ddd', 
                  }}
                ></TextField>
              </TableCell>

              <TableCell align="center">
                <Button 
                  disabled={!row.rowchanged}
                  onClick={(e) => saveRow(rowIndex)}
                  >Save row</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={(e) => cancelRow(rowIndex)}
                  >cancel row</Button>
              </TableCell>
              <TableCell align="center">
                <Button onClick={(e) => deleteRow(row.id)}>delete row</Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={(e) => handleSave()}>Save</Button>
      <Button onClick={(e) => handleCancel()}>Cancel</Button>
    </TableContainer>
  </Grid>


  <Grid padding={'20px'}>
    <TextFieldValidationRolf id="Text1"></TextFieldValidationRolf><br></br>
    <FormLabel id="Label1">Some Text</FormLabel>    
  </Grid>

  <Grid padding={'20px'}>
    <TextField id="Text2"></TextField>
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