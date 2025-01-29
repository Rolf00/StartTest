
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
});
