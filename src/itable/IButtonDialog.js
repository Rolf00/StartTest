import React from 'react';

import { 
  Dialog, 
  DialogContent, 
  Grid,
  Button
} from '@mui/material';

import IConst from './IConst';

class IButtonDialog extends React.Component {
  constructor(props) {
    super(props);

    const {
      id,
      open,
      title,
      question,
      buttonList,
      dialogButtonListType, 
      dialogIconType
    } = this.props;

    this.state = {
      id: id,
      open: open,
      title: title,
      question: question,
      buttonList: buttonList,
      dialogButtonListType: dialogButtonListType,
      dialogIconType : dialogIconType
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
    const btnList = 
      this.state.buttonType === IConst.buttonDialogTypeOk ?  IConst.defaultButtonsOk :
      this.state.buttonType === IConst.buttonDialogTypeYesNo ?  IConst.defaultButtonsYesNo :
      this.state.buttonType === IConst.buttonDialogTypeYesNoCancel ?  IConst.defaultButtonsYesNoCancel :
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
        <DialogContent>



        <Grid container direction="row" spacing={2}>
        <Grid item
          style={{
            display: 'flex',
            alignItems: 'center'          
          }}
        > 
          <img 
            src={IConst.imgDialogIconQuestion}
            style={{ width: '48px', height: '48px', }}/>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid alignItems
              style={{
                fontSize: 24,
                fontWeight: 'bold', 
                padding: '5px 10px',
                textAlign: 'center',
              }}
            >{this.props.title}</Grid>

            <Grid item
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                padding: '5px 10px',
                textAlign: 'center',
              }}
            >{this.props.question}</Grid>

            <Grid item>
              {/*
              {btnList.map((btn, btnIndex) => {
                const icon = btn.icon;
                const iconWidth = 32;
                const iconAlign = btn.horizontalAlign;
                const btnWidth = this.props.buttonWidth ? this.props.buttonWidth : 120;
                const caption = btn.caption;
                const flexAlign = iconAlign === 'left' ? "flex-start" : "flex-end";
                return (
                  
                  <Button
                    variant="outlined"
                    onClick={() => this.handleOnClick({btnIndex})}
                    startIcon={iconAlign === 'left' &&
                      <img src={icon} sx={{ width: {iconWidth}, height: {iconWidth} }}/>
                    }
                    endIcon={iconAlign === 'right' &&
                      <img src={icon} sx={{ width: {iconWidth}, height: {iconWidth} }}/>
                    }
                    sx={{ ml: 2, textTransform: 'none' }}
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold', 
                      width: {btnWidth}, 
                      height: '52px',
                      borderRadius: '10px',
                      padding: '1px 10px',
                      justifyContent: {flexAlign},
                    }}>{btn.caption}</Button>
                );
              })}







                */}

              <Button
                variant="outlined"
                onClick={() => this.handleOnClick(0)}
                startIcon={
                  <img src={IConst.imgIconYes} 
                    sx={{ width: 32, height: 32 }}/>
                }
                sx={{ ml: 2, textTransform: 'none' }}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold', 
                  width: btnWidth, 
                  height: '52px',
                  borderRadius: '16px',
                  padding: '1px 10px',
                  justifyContent: "flex-start"
                }}>
                <img 
                  src={IConst.imgIconYes}
                  style={{ 
                    width: '32px', 
                    height: '32px',
                    padding: '1px 10px',
                  }} 
                />
                Yes
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.handleOnClick(1)}
                startIcon={IConst.imgIconNo}
                sx={{ ml: 2, textTransform: 'none' }}
                style={{
                  fontSize: 16,
                  fontWeight: 'bold', 
                  width: btnWidth, 
                  height: '52px',
                  borderRadius: '16px',
                  padding: '1px 10px',
                  justifyContent: "flex-start"
                }}>
                <img 
                  src={IConst.imgIconNo}
                  style={{ 
                    width: '32px', 
                    height: '32px',
                    padding: '1px 10px',
                  }} 
                />
                No
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>



        </DialogContent>
      </Dialog>
    )  
  }
}

//export default withStyles(InselButtonDialog, useStyles);
export default IButtonDialog;