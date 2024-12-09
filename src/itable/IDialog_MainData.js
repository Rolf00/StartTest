import React from 'react';

import {
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  TextField, 
  MenuItem, 
  FormControl, 
  FormControlLabel,  
  Select, 
} from '@mui/material';


import imgSaveButton from './imgSave48.png'; 
import imgUndoButton from './imgUndo48.png'; 


class InselDialog_MainData extends React.Component {
  constructor(props) 
  {
    super(props);
  
    const {
      open,
      headers, 
      row 
    } = this.props;

    this.state = {
      openEditDialog: open,
      mainDisabled: false,
      headers: headers,
      row: row,
    }
  }

  handleTextfieldChange(e, fieldname)
  {
    // TODO checks
    const rowChanged = this.state.row;
    rowChanged[fieldname] = e.target.value;
    this.setState({row: rowChanged});
    this.setState({mainDisabled: true});
  }

  handleTextfieldNumberChange(e, fieldname)
  {
    // TODO checks
    const rowChanged = this.state.row;
    const number = parseFloat(e.target.value);
    rowChanged[fieldname] = number;
    this.setState({row: rowChanged});
    this.setState({mainDisabled: true});
  }

  handleCheckboxChange(e, fieldname)
  {
    const rowChanged = this.state.row;
    const valueCheck = e.target.value;
    rowChanged[fieldname] = valueCheck;
    this.setState({row: rowChanged});
    this.setState({mainDisabled: true});
  }

  handleDateTimeChange(e, fieldname)
  {
    const rowChanged = this.state.row;
    const value = e.target.value;
    rowChanged[fieldname] = value;
    this.setState({row: rowChanged});
    this.setState({mainDisabled: true});
  }

  render()
  {
    if (this.state.row === null ) 
      // when no row is defined, wwe cannot show anything...
      return (null);

    let index = 0;

    // field1
    index = this.state.headers.findIndex(row => row.dataFieldName === "field1");
    const label_field1 = this.state.headers[index].headerTitle;
    const value_field1 = this.state.row[this.state.headers[index].datafieldName];
    const helperText_field1 = this.state.headers[index].helpertext ?
      this.state.headers[index].helpertext : "";

    // field2
    index = this.state.headers.findIndex(row => row.dataFieldName === "field2");
    const label_field2 = this.state.headers[index].headerTitle;
    const value_field2 = this.state.row[this.state.headers[index].datafieldName];
    const helperText_field2 = this.state.headers[index].helpertext ? 
      this.state.headers[index].helpertext : "";

    // users
    /*
    index = this.state.headers.findIndex(h => h.datafieldName === "users");
    const label_users = this.state.headers[index].headerTitle;
    const value_users = this.state.row[this.state.headers[index].datafieldName];
    const helperText_users = this.state.headers[index].helpertext ? 
      this.state.headers[index].helpertext : "";
      */

    // viewsPerUser
    index = this.state.headers.findIndex(row => row.dataFieldName === "viewsPerUser");
    const label_viewsPerUser = this.state.headers[index].headerTitle;
    const value_viewsPerUser = this.state.row[this.state.headers[index].datafieldName];
    const helperText_viewsPerUser = this.state.headers[index].helpertext ? 
      this.state.headers[index].helpertext : "";

    // dropdownvalue
    index = this.state.headers.findIndex(row => row.dataFieldName === "dropdownvalue");
    const label_dropdownvalue = this.state.headers[index].headerTitle;
    const value_dropdownvalue = this.state.row[this.state.headers[index].datafieldName];
    const helperText_dropdownvalue = this.state.headers[index].helpertext ? 
      this.state.headers[index].helpertext : "";
    const dropdownSelection = this.state.headers[index].dropdownSelection;

    console.log("dropdownSelection", dropdownSelection);

    // datepicker
    // TODO
    //index = this.state.headers.findIndex(h => h.datafieldName === "datepicker");
    //const label_dropdownvalue = this.state.headers[index].headerTitle;
    //const helperText_datefield = this.state.headers[index].helpertext;
    const label_datefield = "TODO : datefield";
    const value_datefield = "01.01.2022";
    const helperText_datefield = "TODO : helpertext";

    return(

      <Dialog 
        open={this.props.open} 
        width={720}
        maxWidth={720}
        minWidth={720}
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
        }}>
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
              <TableCell colSpan={2}>
                <TextField
                  label={label_field1}
                  value={value_field1}
                  fullwidth
                  helperText={helperText_field1}
                  onChange={e => this.handleTextfieldChange(e, 'field1')}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                {/* 
                <TextField
                  label={label_users}
                  value={value_users}
                  fullwidth
                  helperText={helperText_users}
                  onChange={e => this.handleTextfieldNumberChange(e, 'users')}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label={label_viewsPerUser}
                  value={value_viewsPerUser}
                  fullwidth
                  helperText={helperText_viewsPerUser}
                  onChange={e => this.handleTextfieldNumberChange(e, 'viewsPerUser')}
                />
                */}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <TextField
                  label={label_viewsPerUser}
                  value={value_viewsPerUser}
                  fullwidth
                  helperText={helperText_viewsPerUser}
                  onChange={e => this.handleTextfieldNumberChange(e, 'viewsPerUser')}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label={label_datefield}
                  value={value_datefield}
                  fullwidth
                  helperText={helperText_datefield}
                  onChange={e => this.handleDateTimeChange(e, 'datefield')}
                  />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
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
              <TableCell>
                <FormControl
                  // TODO
                  //style={{ width: dropdownWidth, }}
                  //sx={{ m: 1, minWidth: header.minWidth, }}
                >
                  <Select
                    label={label_dropdownvalue}
                    value={value_dropdownvalue}
                    fullwidth
                    helperText={helperText_dropdownvalue}
                    onChange={e => this.handleTextfieldNumberChange(e, "dropdownvalue")}
                    >
                    {dropdownSelection.map((item, itemIndex) =>
                    {
                      const ddId = dropdownSelection[itemIndex].id;
                      const ddValue = dropdownSelection[itemIndex].value;
                      return (
                        <MenuItem 
                          value={ddId}
                        >{ddValue}</MenuItem>
                      );
                      })}
                  </Select> 
                </FormControl>

              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <TextField
                  label={label_field2}
                  value={value_field2}
                  fullwidth
                  helperText={helperText_field2}
                  multiline
                  onChange={e => this.handleTextfieldChange(e, "field2")}
                  rows={5}
                />
              </TableCell>
            </TableRow>
          </Table>

        </DialogContent>
        <DialogActions>
          <IconButton
            //disabled={!this.state.rowsWereEdited}
            disabled={this.state.mainDisabled}
            //onClick={this.props.setDataFromDialog(this.state.row, true)}
            style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}
            >
          <img 
            src={imgSaveButton}
            style={{ 
              width: '36px', 
              height: '36px',
              opacity: (!this.state.mainDisabled ? 1 : 0.2) 
              }} 
          />&nbsp;Save changes</IconButton>

          <IconButton
            //onClick={this.props.setDataFromDialog(null, false)}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
          <img 
            src={imgUndoButton}
            style={{ 
              width: '36px', 
              height: '36px',
              }} 
          />&nbsp;Cancel</IconButton>
        </DialogActions>
      </Dialog>
    )
  }
}

/*
InselDialog_MainData.propTypes = {
    classes: PropTypes.object,
  };
*/
  
export default InselDialog_MainData;
