// Modification
// 01.01.2025 RHE : new implementation

import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from 'tss-react/mui';
import 'react-resizable/css/styles.css';

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
  TextField, 
} from '@mui/material';


import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useStyles } from './AppStyles';

import IConst from './itable/IConst'; 
import IUtils from './itable/IUtils'; 


const StyleDialogBackdrop = { style: { 
  backgroundColor: 'rgba(0, 0, 0, 0.2)'  
}};

const StyleDialogPaper = { style: { 
  borderRadius: '20px',
  backgroundColor: 'transparent', 
}};

const StyleDialogContent = {
  width: "920px",
  maxWidth: '100%',
  border: '3px solid #444444', // Set border color
  borderRadius: '20px',  
  backgroundColor: 'white',
};

class IDialogData_First extends React.Component {
  constructor(props) 
  {
    super(props);
  
    const {
      classes,
      open,
      settings,
      headers, 
      row,
    } = this.props;

    this.state = {
      row: this.props.row,
      mainDisabled: true,
    }

  }

  componentDidMount()
  {
  }


  dataChanged(e, fieldname, editType)
  {
    const rowChanged = this.state.row;
    if (editType === IConst.editType_Date)
    {
      // TODO dates
    }
    else
    {
      rowChanged[fieldname] = e.target.value;
    }
    this.setState({row: rowChanged, mainDisabled: false});
  }

  closeDialog(saveIt)
  {
    if (saveIt)
    {
      // TODO
      //if (this.hasErrors)
      const errorText = IUtils.getRowErrorText(this.props.headers, this.state.row);
      if (errorText !== "")
      {
        // we found errors in the data, thus, we dont allow to save
        this.props.showDataErrorMessage(errorText);
        return;
      }      

      // no errors found, we can save the row
      this.props.handleSubmitModalDialog(this.state.row, saveIt);
    }
    else
    {
      this.props.handleSubmitModalDialog(null, saveIt);
    }
  }

  render()
  {
    const { classes } = this.props;
    const open = true;

    // prepare the data for each field
    const firstname_Index = this.props.headers.findIndex(r => r.dataFieldName === "firstName");

    const lastname_Index = this.props.headers.findIndex(r => r.dataFieldName === "lastName");
    const age_Index = this.props.headers.findIndex(r => r.dataFieldName === "age");
    const birthday_Index = this.props.headers.findIndex(r => r.dataFieldName === "birthday");
    const gender_Index = this.props.headers.findIndex(r => r.dataFieldName === "gender");
    const diagnosis_Index = this.props.headers.findIndex(r => r.dataFieldName === "diagnosis");
    const bloodPressure_Index = this.props.headers.findIndex(r => r.dataFieldName === "bloodPressure");
    const weight_Index = this.props.headers.findIndex(r => r.dataFieldName === "weight");
    const address_Index = this.props.headers.findIndex(r => r.dataFieldName === "address");
    const nationality_Index = this.props.headers.findIndex(r => r.dataFieldName === "nationality");
    const dropdownvalue_Index = this.props.headers.findIndex(r => r.dataFieldName === "dropdownvalue");
    const lastUpdate_Index = this.props.headers.findIndex(r => r.dataFieldName === "lastUpdate");
    const dateText = IUtils.formatDateTime(
      this.props.row.lastUpdate, IConst.format_DateLong_Time24h, this.props.localization);

    let field = ""

    // firstname
    field = this.props.headers[2].dataFieldName;
    //const firstname_hasError = IUtils.hasError(this.state.row[field], this.props.headers[firstname_Index]);
    //const firstname_HelperText = firstname_hasError ? this.props.headers[firstname_Index].helperText : "";

    // lastname
    field = this.props.headers[3].dataFieldName;
    //const lastname_hasError = IUtils.hasError(this.state.row[field], this.props.headers[lastname_Index]);
    //const lastname_HelperText = hasError ? this.state.headers[lastname_Index].helperText : "";
  
    // age
    field = this.props.headers[4].dataFieldName;
    const age_hasError = IUtils.hasError(this.state.row[field], this.props.headers[age_Index]);
    const age_HelperText = age_hasError ? this.props.headers[age_Index].helperText : "";

    // birthday
    field = this.props.headers[5].dataFieldName;
    const birthday_hasError = IUtils.hasError(this.state.row[field], this.props.headers[birthday_Index]);
    const birthday_HelperText = birthday_hasError ? this.props.headers[birthday_Index].helperText : "";
    
    // gender
    field = this.props.headers[6].dataFieldName;
    const gender_hasError = IUtils.hasError(this.state.row[field], this.props.headers[gender_Index]);
    const gender_HelperText = gender_hasError ? this.props.headers[gender_Index].helperText : "";
    
    // diagnosis
    field = this.props.headers[7].dataFieldName;
    const diagnosis_hasError = IUtils.hasError(this.state.row[field], this.props.headers[diagnosis_Index]);
    const diagnosis_HelperText = diagnosis_hasError ? this.props.headers[diagnosis_Index].helperText : "";

    // bloodPressure
    field = this.props.headers[8].dataFieldName;
    const bloodPressure_hasError = IUtils.hasError(this.state.row[field], this.props.headers[bloodPressure_Index]);
    const bloodPressure_HelperText = bloodPressure_hasError ? this.props.headers[bloodPressure_Index].helperText : "";
    
    // weight
    field = this.props.headers[9].dataFieldName;
    const weight_hasError = IUtils.hasError(this.state.row[field], this.props.headers[weight_Index]);
    const weight_HelperText = weight_hasError ? this.props.headers[weight_Index].helperText : "";

    // address
    field = this.props.headers[10].dataFieldName;
    const address_hasError = IUtils.hasError(this.state.row[field], this.props.headers[address_Index]);
    const address_HelperText = address_hasError ? this.props.headers[address_Index].helperText : "";

    // nationality
    field = this.props.headers[11].dataFieldName;
    const nationality_hasError = IUtils.hasError(this.state.row[field], this.props.headers[nationality_Index]);
    const nationality_HelperText = nationality_hasError ? this.props.headers[nationality_Index].helperText : "";
    
    // dropdownvalue
    field = this.props.headers[18].dataFieldName;
    const dropdownvaluehasError = IUtils.hasError(this.state.row[field], this.props.headers[dropdownvalue_Index]);
    const dropdownvalue_HelperText = dropdownvaluehasError ? this.props.headers[dropdownvalue_Index].helperText : "";

    // lastUpdate
    //field = this.props.headers[15].dataFieldName;
    //const lastUpdate_HelperText = hasError ? this.props.headers[lastUpdate_Index].helperText : "";

    // height of the edit fields, except multilines
    const editHeight = 37;
    // TODO common button imagesite
    //const imgSize = this.props.settings.Iconsize;
    //const imgSize = 32;
    const imgSize = this.props.settings.buttonSizeOnRows;


    return(

      <Dialog 
        open={open} 
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Custom backdrop color 
          }
        }}          
        sx={{
          '& .MuiDialog-container': {
            display: 'flex',
            justifyContent: 'center', // Horizontally center the dialog
            alignItems: 'center',      // Vertically center the dialog
          },
          '& .MuiDialog-paper': {
            width: '920px', // Set your custom width here
            maxWidth: '100%', // Ensure it doesn't overflow beyond the screen
            border: '3px solid #444444', // Set border color
            borderRadius: '20px',    
          },
        }}>
        <DialogTitle
          textAlign={'center'}
          >ExampleModal Dialog for editing rows</DialogTitle>

          <DialogContent 
            sx={{ 
              '& .MuiDialogTitle-root+.css-1j8zwea-MuiDialogContent-root': {
                border: 'none',
                padding: '2px 2px'
              }, 
            }}>

          <Table style={{ width: "100%", }} 
            sx={{ verticalAlign: 'top', border: 'none',  }}
          >
            <TableRow>
              <TableCell 
                style={{ textAlign: "left", width: "35%", }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.firstName}
                  disabled={this.props.headers[firstname_Index].isEditable}
                  label={this.props.headers[firstname_Index].headerTitle}
                  //helperText={firstname_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[firstname_Index].dataFieldName,
                    this.props.headers[firstname_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: 'transparent',
                    color: 'black',
                  }, }}/>
              </TableCell>
              <TableCell
                style={{ textAlign: "left", width: "35%", }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.lastName}
                  disabled={this.props.headers[lastname_Index].isEditable}
                  label={this.props.headers[lastname_Index].headerTitle}
                  //helperText={lastname_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[lastname_Index].dataFieldName,
                    this.props.headers[lastname_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: 'transparent',
                    color: 'black',
                  }, }}/>
              </TableCell>
              <TableCell
                style={{ textAlign: "left", width: "15%", }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.age}
                  type={"number"}
                  disabled={!this.props.headers[age_Index].isEditable}
                  label={this.props.headers[age_Index].headerTitle}
                  helperText={age_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[age_Index].dataFieldName,
                    this.props.headers[age_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: age_hasError ? IConst.errorColorBackground : 'transparent',
                    color: age_hasError ? IConst.errorColor : 'black',
                  }, }}
                  />
              </TableCell>
              <TableCell
                style={{ textAlign: "left", width: "15%", }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.birthday}
                  disabled={!this.props.headers[birthday_Index].isEditable}
                  label={this.props.headers[birthday_Index].headerTitle}
                  helperText={birthday_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[birthday_Index].dataFieldName,
                    this.props.headers[birthday_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: birthday_hasError ? IConst.errorColorBackground : 'transparent',
                    color: birthday_hasError ? IConst.errorColor : 'black',
                  }, }}
                  />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.address}
                  disabled={!this.props.headers[address_Index].isEditable}
                  label={this.props.headers[address_Index].headerTitle}
                  helperText={address_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[address_Index].dataFieldName,
                    this.props.headers[address_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: address_hasError ? IConst.errorColorBackground : 'transparent',
                    color: address_hasError ? IConst.errorColor : 'black',
                  }, }}
                  />
              </TableCell>
              <TableCell
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.gender}
                  disabled={!this.props.headers[gender_Index].isEditable}
                  label={this.props.headers[gender_Index].headerTitle}
                  helperText={gender_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[gender_Index].dataFieldName,
                    this.props.headers[gender_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: gender_hasError ? IConst.errorColorBackground : 'transparent',
                    color: gender_hasError ? IConst.errorColor : 'black',
                  }, }}
                />
              </TableCell>
              <TableCell
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.weight}
                  disabled={!this.props.headers[weight_Index].isEditable}
                  label={this.props.headers[weight_Index].headerTitle}
                  helperText={weight_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[weight_Index].dataFieldName,
                    this.props.headers[weight_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: weight_hasError ? IConst.errorColorBackground : 'transparent',
                    color: weight_hasError ? IConst.errorColor : 'black',
                  }, }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.nationality}
                  disabled={!this.props.headers[nationality_Index].isEditable}
                  label={this.props.headers[nationality_Index].headerTitle}
                  helperText={nationality_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[nationality_Index].dataFieldName,
                    this.props.headers[nationality_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: nationality_hasError ? IConst.errorColorBackground : 'transparent',
                    color: nationality_hasError ? IConst.errorColor : 'black',
                  }, }}
                />
              </TableCell>
              <TableCell colSpan={2}
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                dropdown
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.diagnosis}
                  disabled={!this.props.headers[diagnosis_Index].isEditable}
                  label={this.props.headers[diagnosis_Index].headerTitle}
                  helperText={diagnosis_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[diagnosis_Index].dataFieldName,
                    this.props.headers[diagnosis_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: diagnosis_hasError ? IConst.errorColorBackground : 'transparent',
                    color: diagnosis_hasError ? IConst.errorColor : 'black',
                  }, }} />
              </TableCell>
              <TableCell colSpan={2} 
                style={{ textAlign: "left" }}
                sx={{ verticalAlign: 'top', border: 'none', padding: "6px 6px", }}>
                <TextField
                  value={this.state.row.bloodPressure}
                  disabled={!this.props.headers[bloodPressure_Index].isEditable}
                  label={this.props.headers[bloodPressure_Index].headerTitle}
                  helperText={bloodPressure_HelperText}
                  onChange={(e) => this.dataChanged(e, 
                    this.props.headers[bloodPressure_Index].dataFieldName,
                    this.props.headers[bloodPressure_Index].editType)}
                  style={{ width: "100%" }}
                  sx={{ '& .MuiInputBase-root': { 
                    height: editHeight,  
                    backgroundColor: bloodPressure_hasError ? IConst.errorColorBackground : 'transparent',
                    color: bloodPressure_hasError ? IConst.errorColor : 'black',
                  }, }} />
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell colSpan={4}
                style={{ textAlign: "left" }}
                sx={{ 
                  padding: "6px 6px", 
                  '& .MuiInputBase-root': { 
                  height: editHeight,  
                  backgroundColor: bloodPressure_hasError ? IConst.errorColorBackground : 'transparent',
                  color: bloodPressure_hasError ? IConst.errorColor : 'black',
                }, }}                
                >
                <TextField
                  value={dateText}
                  label={this.props.headers[lastUpdate_Index].headerTitle}
                  disabled={true}
                  style={{ width: "100%" }}
                />
              </TableCell>
            </TableRow>
          </Table>

        </DialogContent>

        <DialogActions
          sx={{ 
            '& .MuiDialogActions-root': {
              border: 'none'
            }, 
          }}
        >
          <div style={{display: 'flex', paddingRight: '20px', }}>
          <IconButton
            className={classes.mainButtons}
            disabled={this.state.mainDisabled}
            style={{ 
              justifyContent: "flex-start", flex: 1,
              opacity: (!this.state.mainDisabled ? 1 : 0.2)  }}
            onClick={() => this.closeDialog(true)} >
          <DoneRoundedIcon className={classes.iconButtonStyleGreen}/>Save changes
          </IconButton>

          <IconButton
            className={classes.mainButtons}
            style={{ justifyContent: "flex-end", }}
            onClick={() => this.closeDialog(false)} >
          <CloseRoundedIcon className={classes.iconButtonStyleRed}/>Cancel
          </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

IDialogData_First.propTypes = { classes: PropTypes.object, };
  
export default withStyles(IDialogData_First, useStyles);