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
      openEditDialog: this.props.open,
      mainDisabled: false,
      row: row,
    }

    console.log("constructor this.state.row", this.props.row);

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
    /*
    index = this.props.headers.findIndex(h => h.datafieldName === "field1");
    const helperText_field1 = this.props.headers[index].helpertext;
    // field2
    index = this.props.headers.findIndex(h => h.datafieldName === "field2");
    const helperText_field2 = this.props.headers[index].helpertext ? this.props.headers[index].helpertext : "";
    // users
    index = this.props.headers.findIndex(h => h.datafieldName === "users");
    const helperText_users = this.props.headers[index].helpertext ? this.props.headers[index].helpertext : "";
    // viewsPerUser
    index = this.props.headers.findIndex(h => h.datafieldName === "viewsPerUser");
    const helperText_viewsPerUser =this.props.headers[index].helpertext ? this.props.headers[index].helpertext : "";
    // dropdownvalue
    index = this.props.headers.findIndex(h => h.datafieldName === "dropdownvalue");
    const helperText_dropdownvalue = this.props.headers[index].helpertext ? this.props.headers[index].helpertext : "";
    const headerdropdownvalue = this.props.headers[index].dropdownSelection;
    // datepicker
    // TODO
    //index = this.props.headers.findIndex(h => h.datafieldName === "datepicker");
    //const helperText_datefield = this.props.headers[index].helpertext;
    const helperText_datefield = "TODO : helpertext";
    */

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
              <TableCell colSpan={3}>
                <TextField
                  label="Productname"
                  type="text"
                  value={value_field1}
                  sx={{ width: '720px' }}
                  helperText={helperText_field1}
                  onChange={e => this.handleTextfieldChange(e, 'field1')}
                />
              </TableCell>
            </TableRow>
{/* 
            <TableRow>
              <TableCell>
                <TextField
                  label="Users"
                  type="text"
                  value={row["users"]}
                  helperText={helperText_users}
                  onChange={e => this.handleTextfieldNumberChange(e, 'users')}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Events"
                  type="text"
                  value={this.state.row["viewsPerUser"]}
                  helperText={helperText_viewsPerUser}
                  onChange={e => this.handleTextfieldNumberChange(e, 'viewsPerUser')}
                  />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <TextField
                  label="Views"
                  type="text"
                  value={row["viewsPerUser"]}
                  helperText={helperText_viewsPerUser}
                  onChange={e => this.handleTextfieldNumberChange(e, 'viewsPerUser')}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Time"
                  type="text"
                  value={this.state.row["datefield"]}
                  helperText={helperText_datefield}
                  onChange={e => this.handleDateTimeChange(e, 'datefield')}
                  //helperText={this.props.headers["datefield"].helpertext}
                  />
              </TableCell>
            </TableRow>

            <TableRow>
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
              <TableCell>
                <FormControl
                  // TODO
                  //style={{ width: dropdownWidth, }}
                  //sx={{ m: 1, minWidth: header.minWidth, }}
                >
                  <Select
                    //labelId="demo-simple-select-isRequired-label"
                    //label="select example"
                    //minWidth={100}
                    value={this.state.row["dropdownvalue"]}
                    onChange={e => this.handleTextfieldNumberChange(e, "dropdownvalue")}
                    helperText={helperText_dropdownvalue}

                    //style={{ width: header.width, }}
                    >
                    {headerdropdownvalue.dropdownSelection.map((item, itemIndex) =>
                    {
                      const ddId = headerdropdownvalue.dropdownSelection[itemIndex].id;
                      const ddValue = headerdropdownvalue.dropdownSelection[itemIndex].value;
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
                  multiline
                  value={this.state.row["field2"]}
                  onChange={e => this.handleTextfieldChange(e, "field2")}
                  rows={5}
                  label="enter comments here text multiline"
                  sx={{ width: '720px' }}
                  helperText={helperText_field2}
                />
              </TableCell>
            </TableRow>
            */}

          </Table>

        </DialogContent>
        <div>
          <IconButton
            //disabled={!this.state.rowsWereEdited}
            disabled={this.state.mainDisabled}
            onClick={e => this.handleCloseDialog(true)}
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
            onClick={e => this.handleCloseDialog(false)}
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
        </div>
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
