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

import InselConstants from './InselConstants';

class InselButtonDialog extends React.Component {
  constructor(props) {
    super(props);
  
    const {
      id: id,
      open: open,
      title: title,
      question: question,
      dialogIconType: dialogIconType,
      buttonList: buttonList,
      buttonType : buttonDialogType,
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
    //console.log("handleOnClick", this.props.handleDialogButtons);
    this.setState({open: false});
    this.props.handleDialogButtons(index, this.state.id);
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

    const btnList = 
    buttonDialogTypeOk ?  InselConstants.defaultButtonsOk :
    buttonDialogTypeYesNo ?  InselConstants.defaultButtonsYesNo :
    buttonDialogTypeYesNoCancel ?  InselConstants.defaultButtonsYesNoCancel :
      this.state.buttonList;
  
    console.log("Dialog btnList", btnList);

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
              rowSpan={2}
              valign="middle"
              style={{
                padding: '10px',
                textAlign: 'center',
                borderStyle: 'none'
              }}
            >
              <img 
                src={InselConstants.mainIconQuestion}
                style={{ 
                  width: '50px', 
                  height: '50px',
                }}/>
            </TableCell>

            <TableCell 
              style={{
                padding: '10px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                borderStyle: 'none'
              }}>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 'bold', 
                  padding: '5px 10px',
                  textAlign: 'center',
                }}>{this.props.title}</div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 'bold', 
                  padding: '5px 10px',
                  textAlign: 'center',
                }}>{this.props.question}</div>

              <div
                style={{
                  fontSize: 36,
                  fontWeight: 'bold', 
                  padding: '5px 10px',
                  textAlign: 'center',
                }}>
                <IconButton
                  onClick={() => this.handleOnClick(0)}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold', 
                    width: btnWidth, 
                    height: '52px',
                    borderRadius: '16px',
                    padding: '5px 10px',
                  }}>
                  <img 
                    src={InselConstants.mainIconYes}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                    }} 
                  />
                  Yes
                </IconButton>
                &nbsp;
                &nbsp;
                &nbsp;
                <IconButton
                  onClick={() => this.handleOnClick(1)}
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold', 
                    width: btnWidth, 
                    height: '52px',
                    borderRadius: '16px',
                    padding: '5px 10px',
                  }}>
                  <img 
                    src={InselConstants.mainIconNo}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      paddingRight: '10px',
                    }} 
                  />
                  No
                </IconButton>

                </div>
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