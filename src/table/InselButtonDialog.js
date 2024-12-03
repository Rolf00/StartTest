import React from 'react';

import { 
  Typography,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton,
  Table,
  TableRow,
  TableCell,
} from '@mui/material';


// TODO new image mgOk48.png ?
import mainIconOk from './imgYes48.png'; 
import mainIconYes from './imgYes48.png'; 
import mainIconNo from './imgNo48.png'; 
import mainIconCancel from './imgCancel48.png'; 

import mainIconQuestion from './imgQuestion96.png'; 


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
      id: id,
      open: open,
      title: title,
      question: question,
      buttonList: buttonList,
    }
  }

  handleOnClick(index)
  {
    //this
    //console.log("handleOnClick", this.props.handleDialogButtons);
    //this.setState({open: false});
    //this.props.handleDialogButtons(index, this.state.id);
  }

  render ()
  {
    // types for button dialog 
    const buttonDialogTypeOk = 0;
    const buttonDialogTypeYesNo = 1;
    const buttonDialogTypeYesNoCancel = 2;
    
    // types of icons for button dialog 
    const buttonDialogTypeNone = 0;
    const buttonDialogTypeInfo = 1;
    const buttonDialogTypeWarning = 2;
    const buttonDialogTypeError = 3;
    
    
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

    const btnList = 
      buttonDialogTypeOk ?  defaultButtonsOk :
      buttonDialogTypeYesNo ?  defaultButtonsYesNo :
      buttonDialogTypeYesNoCancel ?  defaultButtonsYesNoCancel :
      this.state.buttonList;

    //console.log("this.props.dialogName", this.state.id);

    const btnWidth = this.props.buttonWidth ? this.props.buttonWidth : 140;
    const dlgWidth = (btnWidth * btnList.length) + (30 * (btnList.length + 1));
    const open = this.props.open;

    return(
      <Dialog 
        width={dlgWidth}
        maxWidth={dlgWidth}
        minWidth={dlgWidth}
        open={open} 
        // TODO  BackdropProps deprecated
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
        }}          
      >
        {/* 
        <DialogTitle
          textAlign={'center'}
        >{this.props.title}</DialogTitle>
*/}

        <DialogContent>
          <Typography 
            variant="h6"
            textAlign={'center'}
          >

          <Table>
            <TableRow>
              <TableCell 
                //rowSpan={3}
                style={{
                  padding: '0px',
                  fontSize: '24px',
                  textAlign: 'center',
                  borderStyle: 'none',
                  //borderRightStyle: 'solid'
                }}
              >
              <img 
                src={mainIconQuestion}
                style={{ 
                  width: '80px', 
                  height: '80px',
                }}></img>
              </TableCell>
              <TableCell 
                style={{
                  padding: '0px',
                  fontSize: '24px',
                  textAlign: 'center',
                  borderStyle: 'none'
                }}>{this.props.title}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colspan={2}
                style={{
                  padding: '0px',
                  fontSize: '18px',
                  textAlign: 'center',
                  borderStyle: 'none'
                }}>{this.props.question}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colspan={2}
                style={{
                  padding: '0px',
                  fontSize: '18px',
                  textAlign: 'center',
                  borderStyle: 'none'
                }}>
                <IconButton
                  onClick={this.handleOnClick(0)}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold', 
                    width: btnWidth, 
                    height: '52px',
                    borderRadius: '16px',
                    padding: '10px',
                  }}>
                  <img 
                    src={mainIconYes}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      paddingRight: '10px',
                    }} 
                  />
                  Yes
                </IconButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <IconButton
                  onClick={this.handleOnClick(1)}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold', 
                    width: btnWidth, 
                    height: '52px',
                    borderRadius: '16px',
                    padding: '10px',
                  }}>
                  <img 
                    src={mainIconNo}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      paddingRight: '10px',
                    }} 
                  />
                  No
                </IconButton>
                </TableCell>
            </TableRow>
          </Table>
              


{/* 

            <div>{this.props.question}</div>
            <div>

            <IconButton
              onClick={this.handleOnClick(0)}
              style={{
                fontSize: 16,
                fontWeight: 'bold', 
                width: btnWidth, 
                height: '52px',
                borderRadius: '16px',
                padding: '10px',
              }}>
              <img 
                src={mainIconYes}
                style={{ 
                  width: '32px', 
                  height: '32px',
                  paddingRight: '10px',
                }} 
              />
              Yes
            </IconButton>
            &nbsp;
            &nbsp;
            &nbsp;
            <IconButton
              onClick={this.handleOnClick(1)}
              style={{
                fontSize: 16,
                fontWeight: 'bold', 
                width: btnWidth, 
                height: '52px',
                borderRadius: '16px',
                padding: '10px',
              }}>
              <img 
                src={mainIconNo}
                style={{ 
                  width: '32px', 
                  height: '32px',
                  paddingRight: '10px',
                }} 
              />
              No
            </IconButton>

*/}

{/* 
            {btnList.map((btn, btnIndex) => {
              const icon = btn.icon;
              const iconAlign = btn.horizontalAlign;
              const btnWidth = this.props.buttonWidth ? this.props.buttonWidth : 120;
              const caption = iconAlign === 'right' ? 
                btn.caption + `&nbsp;` : 
                `&nbsp;` + btn.caption;
              //const caption = btn.caption;
                
              //console.log("button caption", btn.caption);
              //console.log("button horizontalAlign", btn.horizontalAlign);

              return (
                
                <IconButton
                  //onClick={this.props.handleDialogButtonClicks(btnIndex, this.props.dialogName)}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold', 
                    width: btnWidth, 
                    height: '52px',
                    borderRadius: '16px',
                  }}>
                  {iconAlign === 'right' && 
                    {caption}
                  }
                  <img 
                    src={icon}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                    }} 
                  />
                  {iconAlign === 'left' && 
                    {caption}
                  }
                </IconButton>
              );
            })}
</div>              
*/}

            
          </Typography>
        </DialogContent>
      </Dialog>
    )  
  }
}

//export default withStyles(InselButtonDialog, useStyles);
export default InselButtonDialog;