import React, { useEffect, useRef, useState } from "react";
import PropTypes, { func } from 'prop-types';
import { withStyles } from 'tss-react/mui';
import 'react-resizable/css/styles.css';

import { Typography } from '@mui/material';
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

import IConst from './IConst';
import { useStyles } from './styles';
import { 
  iconDialogStyleBlue, 
  iconDialogStyleRed,
  } from './IStyles';


const StyleDialogBackdrop = { style: { 
  backgroundColor: 'rgba(0, 0, 0, 0.2)'  
}};

const StyleDialogPaper = { style: { 
  borderRadius: '20px',
  backgroundColor: 'transparent', 
}};

const StyleDialogContent = {
  border: '3px solid #444444', // Set border color
  borderRadius: '20px',  
  backgroundColor: 'white',
};

class IDialogButton extends React.Component {
  constructor(props) {
    super(props);

    const {
      classes,
      buttonDialogId,
      buttonDialogOpen,
      buttonDialogTitle,
      buttonDialogQuestion,
      buttonDialogButtons,
      buttonDialogListType, 
      buttonDialogIconType,
      buttonDialogHorizontalAlign,
      buttonDialogSizeType,
      buttonDialogButtonWidth
    } = this.props;
  }
  
  handleClick(index)
  {
    // close the dialog  => return the index of the pressed button, and the dialog id
    this.props.handleDialogButtons(index, this.props.id);
  }

  calculateText(measureHeight)
  {
    /*
    const rect = containerRef.current.getBoundingClientRect();
    if (measureHeight)
    {
      return rect.height;
    }
    else
    {
      return rect.width;
    }
    */
  }

  render ()
  {
    const { classes } = this.props;
  
    const buttons = 
      this.props.buttonDialogListType === IConst.buttonDialogTypeOk ?  
        IConst.defaultButtonsOk :
      this.props.buttonDialogListType === IConst.buttonDialogTypeYesNo ?  
        IConst.defaultButtonsYesNo :
      this.props.buttonDialogListType === IConst.buttonDialogTypeYesNoCancel ?  
        IConst.defaultButtonsYesNoCancel :
        this.props.buttonDialogButtons;

    const title = this.props.buttonDialogTitle;
    const question = this.props.buttonDialogQuestion;

    const questionLines = question.split("\n");

    const MainIcon = 
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Info ? InfoRoundedIcon :
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Question ? HelpRoundedIcon :
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Stop ?  ErrorRoundedIcon : null;

    const mainIconStyle = 
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Info ? iconDialogStyleBlue :
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Question ? iconDialogStyleBlue :
      this.props.buttonDialogIconType === IConst.buttonDialogIconType_Stop ?  iconDialogStyleRed : null;

    const buttonWidth = this.props.buttonDialogButtonWidth;

    const colCount = Math.max(...buttons.map((item) => item.X));
    const rowCount = Math.max(...buttons.map((item) => item.Y));
    const col = [];
    for (let c = 0; c < colCount; c++) col.push(c);
    const row = [];
    for (let r = 0; r < rowCount; r++) row.push(r);

    
    const spaceWidth = 10;
    const imageWidth = 96;
    const iconSize = 36;
    const open = true;

    // TODO window size
    //const entireMaxWidth = window.innerWidth * 80 / 100;    // 80 %
    //const entireMaxHeight = window.innerHeight * 80 / 100;  // 80 %
    let entireMaxWidth = 1200;
    let entireMaxHeight = 960;

    let entireMinWidth = 100;
    let entireMinHeight = 100;
    let textWidth = entireMaxWidth;
    let textHeight = entireMaxHeight;
    
    if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_ButtonWidths)
    {
      // calculated from the length of all buttons horizontally aligned
      entireMaxWidth = (colCount * buttonWidth) + ((colCount + 1) * spaceWidth) + imageWidth;
    }
    else if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_ParentWidth80Percent)
    { 
      // fixed width from window 80 percent
      entireMinWidth = entireMaxWidth;
    }
    else if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_ParentHeight80Percent)
    { 
      // fixed height from parent in percentage
      entireMinHeight = entireMaxHeight;
    }
    else if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_Parent80Percent)
    {
      // fixed width and height from parent in percentage
      entireMinWidth = entireMaxWidth;
      entireMinHeight = entireMaxHeight;
    }
    else if (this.props.buttonDialogSizeType === IConst.dialogSizeTypes_CalculateFromText)
    {
      // fixed width and height from parent in percentage
      entireMinWidth = entireMaxWidth;
      entireMinHeight = entireMaxHeight;
    }
    /*
    // TODO : special calculations for dialog dimension in casr of long text
    else if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_Width_TextHeight )
    {
      // fixed width | height from text
      entireMinWidth = entireMaxWidth;
      textHeight = this.calculateText(question, true);
      if (textHeight > entireMaxHeight) textHeight = entireMaxHeight;
    }
    else if (this.props.buttonDialogSizeType === IConst.buttonDialogSizeType_Height_TextWidth )
    {
      // fixed height | width from text
      entireMinHeight = entireMaxHeight;
      textWidth = this.calculateText(question, false);
      if (textWidth > entireMaxWidth) textWidth = entireMaxWidth;
    }
      */
    
    // TODO
    // <Typography ref={containerRef}



    return(
      <Dialog 
        maxWidth={entireMaxWidth}
        minWidth={entireMinWidth}
        maxHeight={entireMaxHeight}
        minHeight={entireMinHeight}
        open={open} 
        BackdropProps={StyleDialogBackdrop}         
        PaperProps={StyleDialogPaper}>

        <DialogContent style={StyleDialogContent}>
        <Grid container direction="row" spacing={2}>
        <Grid item
          style={{
            display: 'flex',
            alignItems: 'center'          
          }}> 
          <MainIcon style={mainIconStyle}/>
        </Grid>

        <Grid item direction="column" spacing={2} align="center">

        <Grid item>
          <Typography 
            variant="h5"
            style={{
              maxHeight: textHeight,
              maxWidth: textWidth,
              textAlign: this.props.buttonDialogHorizontalAlign
            }}
          >{title}</Typography>
        </Grid>

        <Grid item>
          {questionLines.map((question, qIndex) => (
          <Typography 
            key={`buttonDialog-Lines${qIndex}`}
            variant="h6" 
            style={{ textAlign: this.props.buttonDialogHorizontalAlign }}
          >{question}</Typography>
          ))}
        </Grid>

        <Grid item>
        <Table>
          {row.map((rowIndex) => (
            <TableRow 
              key={`buttonDialog-TableRow${rowIndex}`}
            >
              {col.map((colIndex) => {
                const btnIndex = buttons.findIndex(
                  (b) => b.X === colIndex + 1 && b.Y === rowIndex + 1
                );
                if (btnIndex === -1) {
                  return (
                    <TableCell
                      key={`buttonDialog-row${rowIndex}-column${colIndex}`}
                      style={{ border: "0px", padding: "0px", margin: "0px" }}
                    ></TableCell>
                  );
                } else {
                  const button = buttons[btnIndex];
                  const caption = button.caption;
                  const align = button.horizontalAlign;
                  const ButtonIcon = button.icon;
                  const iconStyle = button.iconStyle;
                  return (
                    <TableCell
                      key={`buttonDialog-row${rowIndex}-column${colIndex}`}
                      style={{ border: "0px", padding: "5px 5px", margin: "0px" }}>
                      <IconButton
                        size="small"
                        className={classes.mainButtons}
                        onClick={() => this.handleClick(btnIndex)}
                        style={{
                          width: buttonWidth,
                          display: "flex",
                          // TODO ButtoDialog align buttons
                          //justifyContent: align === "right" ? "flex-end" : "flex-start",
                          justifyContent: "flex-start",
                        }}>
                        <ButtonIcon style={iconStyle}/>
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


IDialogButton.propTypes = { classes: PropTypes.object, };
  
export default withStyles(IDialogButton, useStyles);