import React from 'react';

import { 
  Typography,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton,
} from '@mui/material';


// TODO new image mgOk48.png ?
import mainIconOk from './imgYes48.png'; 
import mainIconYes from './imgYes48.png'; 
import mainIconNo from './imgNo48.png'; 
import mainIconCancel from './imgCancel48.png'; 

const buttonDialogTypeOk = 0;
const buttonDialogTypeYesNo = 1;
const buttonDialogTypeYesNoCancel = 2;

const defaultButtonsOk = [
   { caption: "Close", icon: mainIconOk, horizontalAlign: 'left' }
];

const defaultButtonsYesNo = [
  { caption: "Yes", icon: mainIconYes, horizontalAlign: 'left' },
  { caption: "No", icon: mainIconNo, horizontalAlign: 'left' }
];

const defaultButtonsYesNoCancel = [
  { caption: "Yes", icon: mainIconYes, horizontalAlign: 'left' },
  { caption: "No", icon: mainIconNo, horizontalAlign: 'left' },
  { caption: "Cancel", icon: mainIconCancel, horizontalAlign: 'left' }
];

class InselButtonDialog extends React.Component {

  constructor(props) {
    super(props);

    const {
      id,
      open,
      title, 
      question, 
      buttonList,
      buttonType,
    } = this.props;

    this.state = {
      id: this.props.id,
      open: this.props.open,
      title: this.props.title,
      question: this.props.question,
      buttonList: this.props.buttonList,
    }
  }

  render ()
  {

    const buttons = 
      this.props.buttonType === buttonDialogTypeOk ? defaultButtonsOk :
      this.props.buttonType === buttonDialogTypeYesNo ? defaultButtonsYesNo :
      this.props.buttonType === buttonDialogTypeYesNoCancel ? defaultButtonsYesNoCancel : 
      this.props.buttonList;

    
    this.setState({buttonList: buttons});

    const btnWidth = this.props.buttonWidth ? this.props.buttonWidth : 80;
    const dlgWidth = (btnWidth * buttons.length) + (30 * (buttons.length + 1));
    const open = this.props.open;

    return(
      <Dialog 
        width={dlgWidth}
        maxWidth={dlgWidth}
        minWidth={dlgWidth}
        open={open} 
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Custom backdrop color (darker)
          }
        }}          
        sx={{
          '& .MuiDialog-paper': {
            border: '5px solid #1976d2', // Set border color
            borderRadius: '20px',        // Optional: set border radius for rounded corners
          }
        }}          >
        <DialogTitle
          textAlign={'center'}
        >{this.props.title}</DialogTitle>
        <DialogContent>
          <Typography 
            variant="h6"
            textAlign={'center'}
          >{this.props.question}</Typography>

          //console.log("buttonDialog amp buttons", this.buttons);

          {buttons.map((button, index) => {
              const icon = button.icon;
              const iconAlign = button.horizontalAlign;
              const btnWidth = this.buttonWidth ? this.buttonWidth : 80;
              const caption = iconAlign === 'right' ? 
                button.caption + `&nbsp;` : 
                `&nbsp;` + button.caption;

              <IconButton
              onClick={this.props.handleDialogButtonClicks(index, this.props.dialogName)}
              style={{
              fontSize: 16,
              fontWeight: 'bold', 
              width: {btnWidth}, 
              height: '52px',
              }}
              >
              {iconAlign === 'right' && {caption}}
              <img 
              src={icon}
              style={{ 
              width: '32px', 
              height: '32px',
              }} 
              />
              {iconAlign === 'right' && {caption}}
              </IconButton>
          })}

        </DialogContent>
      </Dialog>
    )  
  }
}

//export default withStyles(InselButtonDialog, useStyles);
export default InselButtonDialog;