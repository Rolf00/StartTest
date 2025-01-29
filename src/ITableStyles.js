
export const useStyles = () => ({
  
  itable_container: {
    //width: 'auto',
    //width: '100%',
  },

  itable: {
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    tableLayout: 'fixed',
  },

  itable_head: {
    backgroundColor: 'rgb(231, 231, 231)',
  },

  itable_head_row: {
    color: 'inherit',
    verticalAlign: 'middle',
    outline: '0px',
  },

  itable_body_row: {
    color: 'inherit',
    verticalAlign: 'middle',
    outline: '0px',
  },
  itable_head_cell: {
    backgroundColor: 'rgb(231, 231, 231)',
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 800,
    lineJeight: '1.5rem',
    fontFamily:
      '"__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    padding: '0px',
    margin: '0px',
  },

  itable_head_cellwidthresizer: {
    padding: '0px',
    borderBottomColor: '#AAAAAA',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
  },

  itable_row_cell: {
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 400,
    lineJeight: '1rem',
    fontFamily:
      ' "__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    verticalAlign: 'inherit',
    textAlign: 'left',
    padding: '0px',
    color: 'transparent',
  },

  itable_footerrow: {
    margin: '6px 0px', 
    backgroundColor: 'rgb(231, 231, 231)' 
  },

  // cell resizer NS
  resizerNS_Top: {
    display: 'flex',
    flexDirection: 'column', 
    height: '100%', 
    width: '100%', 
    margin: '0px', 
    padding: '0px',
  },
  resizerNS_Caption: {
    fontFamily:
      '"__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    letterSpacing: '0rem',
    color: 'black',
    height: '100%', 
    margin: '0px 5px',
  },
  resizerNS: {
    marginBottom: 'auto',
    display: 'flex',
    justifyContent: 'bottom',
    width: '100%',
    height: '5px',
    cursor: 'row-resize',
    margin: '0px', 
    padding: '0px',
  },

  // cell resizer EW
  resizerEW_Top: {
    display: 'flex',
    height: '100%',
    padding: '0px',
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
  },

  resizerEW_Menu_Left: {
    flexGrow: 1, 
    maxWidth: '40px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0px',
  },

  resizerEW_Menu_Right: {
    maxWidth: '40px',
    padding: '0px',
  },

  resizerEW_Caption: {
    flexGrow: 1, 
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
  },

  resizerEW: {
    display: 'flex',
    width: '5px',
    padding: '0px',
    backgroundColor: 'transparent',
    borderRightColor: '#BBBBBB',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    cursor: 'col-resize',
    //"&:hover": {
    //  backgroundColor: '#8888FF',
    //},
  },

  // main buttons
  mainButtons: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: '10px',
    height: '40px',
    margin: '6px',
    backgroundColor: '#EEEEEE',
    border: '1px solid #CCCCCC',
    "&:hover": {
      backgroundColor: '#FFFFFF',
      border: '1px solid black',
    },
  },

  // text readonly
  textReadOnly: {
    fontSize: 16,
    "&:hover": {
      backgroundColor: 'lightblue',
      border: '1px solid black',
    },
  },

  // modal dialogs
  idialog: {
    '&:BackdropProps' : { backgroundColor: 'rgba(0, 0, 0, 0.2)',  },
    '&:PaperProps' : { borderRadius: '2px', backgroundColor: 'transparent', }
  },
  iconDialogStyleRed: {
    width: '72px',
    height: '72px',
    color: '#BB6666',
  },
  iconDialogStyleBlue: {
    width: '72px',
    height: '72px',
    color: '#6666BB',
  },


  // mui icon styles 
  iconButtonStyleSelection: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleCheckbox: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleEditRow: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleEditRowStop: {
    width: '28px',
    height: '28px',
    color: '#BB6666',
    marginLeft: '4px',
    marginRight: '4px',
  } ,
  iconButtonStyleSave: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleUndo: {
    width: '28px',
    height: '28px',
    color: '#BB6666',
    marginLeft: '4px',
    marginRight: '4px',
  } ,
  iconButtonStyleDelete: {
    width: '28px',
    height: '28px',
    color: '#BB6666',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleGreen: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleRed: {
    width: '28px',
    height: '28px',
    color: '#BB6666',
    marginLeft: '4px',
    marginRight: '4px',
  },

  // icons of main buttons
  iconMainButtonNewRow: {
    width: '28px',
    height: '28px',
    color: '#BBBB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleSaveAll: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleUndoAll: {
    width: '28px',
    height: '28px',
    color: '#BB6666',
    marginLeft: '4px',
    marginRight: '4px',
  } ,
  iconButtonStyleExcelExport: {
    width: '28px',
    height: '28px',
    color: '#66BB66',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleGrey: {
    width: '28px',
    height: '28px',
    color: '#AAAAAA',
    marginLeft: '4px',
    marginRight: '4px',
  },
  iconButtonStyleGrey_Rotate180: {
    width: '28px',
    height: '28px',
    color: '#999999',
    transform: 'rotate(180deg)',
    marginLeft: '4px',
    marginRight: '4px',
  }
  

});
