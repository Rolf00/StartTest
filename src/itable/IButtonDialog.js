import React from 'react';

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";


import IConst from './IConst';
import { Typography } from '@mui/material';

class IButtonDialog extends React.Component {
  constructor(props) {
    super(props);

    const {
      id,
      open,
      title,
      question,
      buttonList,
      buttonDialogListType, 
      dialogIconType,
      buttonWidth
    } = this.props;
  }

  handleClick(index)
  {
    // close the dialog  => return the index of the pressed button, and the dialog id
    this.props.handleDialogButtons(index, this.props.id);
  }

  render ()
  {
    /*
    const buttons = 
      this.props.buttonDialogListType === IConst.buttonDialogTypeOk ?  
        IConst.defaultButtonsOk :
      this.props.buttonDialogListType === IConst.buttonDialogTypeYesNo ?  
        IConst.defaultButtonsYesNo :
      this.props.buttonDialogListType === IConst.buttonDialogTypeYesNoCancel ?  
        IConst.defaultButtonsYesNoCancel :
        this.props.buttonList;
        */

        // TODO

    const buttons = IConst.defaultButtonsYesNo;
    const colCount = Math.max(...buttons.map((item) => item.X));
    const rowCount = Math.max(...buttons.map((item) => item.Y));
  

    const col = [];
    for (let c = 0; c < colCount; c++) col.push(c);
  
    const row = [];
    for (let r = 0; r < rowCount; r++) row.push(r);
  
    // TODO
    //const buttonWidth = this.props.buttonWidth;
    const imageWidth = 60;
    const iconSize = 36;
    const buttonWidth = 120;
    const spaceWidth = 10;
    const entireWidth = (colCount * buttonWidth) + ((colCount + 1) * spaceWidth) + imageWidth;
    const open = this.props.open;

    // TODO 
    const title = "Undoing all rows";
    const question = "Do you really want to undo all changes?";
  

    return(
      <Dialog 
        width={entireWidth}
        maxWidth={entireWidth}
        minWidth={entireWidth}
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
        }}>

        <DialogContent>
        <Grid container direction="row" spacing={2}>
        <Grid item
          style={{
            display: 'flex',
            alignItems: 'center'          
          }}> 
          <img 
            src={IConst.imgDialogIconQuestion}
            style={{ width: imageWidth, height: imageWidth, }}/>
        </Grid>

        <Grid item direction="column" spacing={2} align="center">

        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6" >{question}</Typography>
        </Grid>

        <Grid item>
        <Table style={{ width: entireWidth}}>
          {row.map((rowIndex) => (
            <TableRow key={rowIndex}>
              {col.map((colIndex) => {
                const btnIndex = buttons.findIndex(
                  (b) => b.X === colIndex + 1 && b.Y === rowIndex + 1
                );
                if (btnIndex === -1) {
                  return (
                    <TableCell
                      key={rowIndex + 10 * colIndex}
                      style={{ border: "0px", padding: "0px", margin: "0px" }}
                    ></TableCell>
                  );
                } else {
                  const button = buttons[btnIndex];
                  const caption = button.caption;
                  const align = button.horizontalAlign;
                  const icon = button.icon;
                  return (
                    <TableCell
                      key={rowIndex + 10 * colIndex}
                      style={{ border: "0px", padding: "5px 5px", margin: "0px" }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => this.handleClick(btnIndex)}
                        style={{
                          width: buttonWidth,
                          height: "48px",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent:
                            align === "right" ? "flex-end" : "flex-start",
                        }}
                        sx={{
                          border: "1px solid #aaaaaa",
                          backgroundColor: "#eeeeee",
                          "&:Hover": {
                            border: "1px solid #555555",
                            backgroundColor: "#ddddff",
                          },
                        }}
                      >
                        <img src={icon}
                          style={{ width: iconSize, height: iconSize}}/ >
                        {caption}
                      </IconButton>
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </Table>
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