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

import IConst from './IConst'; 


class IDataDialog_First extends React.Component {
  constructor(props) 
  {
    super(props);
  
    const {
      open,
      settings,
      headers, 
      row,
    } = this.props;

    this.state = {
      row: row,
    }
  }


  dataChanged(e, fieldname, editType)
  {
    const rowChanged = this.state.row;
    if (editType == IConst.editType_Date)
    {
      // TODO dates
    }
    else
    {
      rowChanged[fieldname] = e.target.value;
    }
    this.setState({row: rowChanged, mainDisabled: true});
  }

  // prepare the data for each field
  hasError = false;

  firstname_Index = headers.findIndex(r => r.dataFieldName === "firstname");
  lastname_Index = headers.findIndex(r => r.dataFieldName === "lastname");
  age_Index = headers.findIndex(r => r.dataFieldName === "age");
  birthday_Index = headers.findIndex(r => r.dataFieldName === "birthday");
  gender_Index = headers.findIndex(r => r.dataFieldName === "gender");
  diagnosis_Index = headers.findIndex(r => r.dataFieldName === "diagnosis");
  bloodPressure_Index = headers.findIndex(r => r.dataFieldName === "bloodPressure");
  weight_Index = headers.findIndex(r => r.dataFieldName === "weight");
  address_Index = headers.findIndex(r => r.dataFieldName === "address");
  nationality_Index = headers.findIndex(r => r.dataFieldName === "nationality");
  dropdownvalue_Index = headers.findIndex(r => r.dataFieldName === "dropdownvalue");
  lastUpdate_Index = headers.findIndex(r => r.dataFieldName === "lastUpdate");
  dateText = IConst.formatDateTime(
    row.lastUpdate, IConst.format_DateLong_Time24h, props.localization);

  render()
  {
    let field = ""
    let hasError = false;

    field = "firstname";
    hasError = IConst.hasError(row[field], headers[firstname_Index].editType);
    firstname_HelperText = hasError ? headers[firstname_Index].helperText : "";

    field = "lastname";
    hasError = IConst.hasError(row[field], headers[lastname_Index].editType);
    lastname_HelperText = hasError ? headers[lastname_Index].helperText : "";
  
    field = "age";
    hasError = IConst.hasError(row[field], headers[age_Index].editType);
    age_HelperText = hasError ? headers[age_Index].helperText : "";

    field = "birthday";
    hasError = IConst.hasError(row[field], headers[birthday_Index].editType);
    birthday_HelperText = hasError ? headers[birthday_Index].helperText : "";
    
    field = "gender";
    hasError = IConst.hasError(row[field], headers[gender_Index].editType);
    gender_HelperText = hasError ? headers[gender_Index].helperText : "";
    
    field = "diagnosis";
    hasError = IConst.hasError(row[field], headers[diagnosis_Index].editType);
    diagnosis_HelperText = hasError ? headers[diagnosis_Index].helperText : "";

    field = "bloodPressure";
    hasError = IConst.hasError(row[field], headers[bloodPressure_Index].editType);
    bloodPressure_HelperText = hasError ? headers[bloodPressure_Index].helperText : "";
    
    field = "weight";
    hasError = IConst.hasError(row[field], headers[weight_Index].editType);
    weight_HelperText = hasError ? headers[weight_Index].helperText : "";

    field = "address";
    hasError = IConst.hasError(row[field], headers[address_Index].editType);
    address_HelperText = hasError ? headers[address_Index].helperText : "";

    field = "nationality";
    hasError = IConst.hasError(row[field], headers[nationality_Index].editType);
    nationality_HelperText = hasError ? headers[nationality_Index].helperText : "";
    
    field = "dropdownvalue";
    hasError = IConst.hasError(row[field], headers[dropdownvalue_Index].editType);
    dropdownvalue_HelperText = hasError ? headers[dropdownvalue_Index].helperText : "";

    field = "lastUpdate";
    hasError = IConst.hasError(row[field], headers[lastUpdate_Index].editType);
    lastUpdate_HelperText = hasError ? headers[lastUpdate_Index].helperText : "";

    // height of the edit fields, except multilines
    const editHeight = 33;
    const imgSize = this.props.settings.Iconsize;

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

              <TableCell align="left">
                <TextField
                  value={row.firstname}
                  disable={header[firstname_Index].isEditable}
                  label={header[firstname_Index].Title}
                  helperText={firstname_HelperText}
                  onChange={(e) => dataChanged(e, "firstname")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.lastname}
                  disable={header[lastname_Index].isEditable}
                  label={header[lastname_Index].Title}
                  helperText={lastname_HelperText}
                  onChange={(e) => dataChanged(e, "lastname")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.age}
                  type={"number"}
                  disable={header[age_Index].isEditable}
                  label={header[age_Index].Title}
                  helperText={age_HelperText}
                  onChange={(e) => dataChanged(e, "age")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.birthday}
                  disable={header[birthday_Index].isEditable}
                  label={header[birthday_Index].Title}
                  helperText={birthday_HelperText}
                  onChange={(e) => dataChanged(e, "birthday")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" colSpan={2}>
                <TextField
                  value={row.address}
                  disable={header[address_Index].isEditable}
                  label={header[address_Index].Title}
                  helperText={address_HelperText}
                  onChange={(e) => dataChanged(e, "address")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.gender}
                  disable={header[gender_Index].isEditable}
                  label={header[gender_Index].Title}
                  helperText={gender_HelperText}
                  onChange={(e) => dataChanged(e, "gender")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.weight}
                  disable={header[weight_Index].isEditable}
                  label={header[weight_Index].Title}
                  helperText={weight_HelperText}
                  onChange={(e) => dataChanged(e, "weight")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" colSpan={2}>
                <TextField
                  value={row.nationality}
                  disable={header[nationality_Index].isEditable}
                  label={header[nationality_Index].Title}
                  helperText={nationality_HelperText}
                  onChange={(e) => dataChanged(e, "nationality")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left" colSpan={2}>

                dropdown
              </TableCell>
              <TableCell align="left" colSpan={2}>
                <TextField
                  value={row.diagnosis}
                  disable={header[diagnosis_Index].isEditable}
                  label={header[diagnosis_Index].Title}
                  helperText={diagnosis_HelperText}
                  onChange={(e) => dataChanged(e, "diagnosis")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              <TableCell align="left">
                <TextField
                  value={row.bloodPressure}
                  disable={header[bloodPressure_Index].isEditable}
                  label={header[bloodPressure_Index].Title}
                  helperText={bloodPressure_HelperText}
                  onChange={(e) => dataChanged(e, "bloodPressure")}
                  sx={{ '& .MuiInputBase-root': { height: editHeight,  }, }}  />
              </TableCell>
              </TableRow>

              <TableRow colSpan={4}>
                <IFieldReadOnly
                  width={width}
                  value={datevalue}
                />
            </TableRow>
          </Table>

        </DialogContent>
        <DialogActions>
          <IconButton
            className={classes.mainButtons}
            disabled={this.state.mainDisabled}
            onClick={this.props.setDataFromDialog(this.state.row, true)} >
          <img 
            src={imgSaveButton}
            style={{ 
              width: {imgSize}, 
              height: {imgSize},
              opacity: (!this.state.mainDisabled ? 1 : 0.2) 
            }} 
          />Save changes</IconButton>

          <IconButton
            className={classes.mainButtons}
            onClick={this.props.setDataFromDialog(null, false)} >
          <img 
            src={imgUndoButton}
            style={{ 
              width: {imgSize}, 
              height: {imgSize},
            }} 
          />Cancel</IconButton>
        </DialogActions>
      </Dialog>
    )
  }
}

IDataDialog_First.propTypes = { classes: PropTypes.object, };
  
export default withStyles(IDataDialog_First, useStyles);