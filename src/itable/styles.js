/* eslint-disable react/react-in-jsx-scope */
import { Checkbox, styled } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

export const useStyles = () => ({
  paper: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(42, 53, 71)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '7px',
    backgroundImage: 'none',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
    border: '1px solid rgb(229, 234, 239)',
  },
  table_container: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    minWidth: '450px',
  },
  table_head: {
    backgroundColor: 'rgb(243, 244, 246)',
  },
  table_head_row: {
    color: 'inherit',
    verticalAlign: 'middle',
    outline: '0px',
  },
  table_body_row: {
    color: 'inherit',
    verticalAlign: 'middle',
    outline: '0px',
  },
  table_head_cell: {
    backgroundColor: 'rgb(243, 244, 246)',
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 800,
    lineJeight: '1.5rem',
    fontFamily:
      '"__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    //verticalAlign: 'inherit',
    //textAlign: 'left',
    height: '100%',
    padding: '0px',
    //borderBottom: '1px solid black',
  },
  table_head_check: {
    width: 30,
    padding: '0px 12px 0px 16px',
    backgroundColor: 'rgb(243, 244, 246)',
  },
  table_check_row: {
    width: 30,
    padding: '0px 12px 0px 16px',
  },
  table_check_cell: {
    width: 30,
    padding: '0px 12px 0px 16px',
    borderWidth: '1px medium medium',
    borderStyle: 'dashed none none',
    borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
    borderImage: 'none',
    color: 'rgb(107, 114, 128)',
  },
  table_row: {},
  table_row_cell: {
    fontSize: '0.75rem',
    letterSpacing: '0rem',
    fontWeight: 400,
    lineJeight: '1rem',
    fontFamily:
      ' "__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    verticalAlign: 'inherit',
    textAlign: 'left',
    padding: '0px',
    //borderBottom: '1px solid rgb(229, 234, 239)',
    //borderWidth: '1px medium medium',
    //borderStyle: 'dashed none none',
    //borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
    //borderImage: 'none',
    //color: 'rgb(107, 114, 128)',
    color: 'transparent',
  },
  table_box_cell: {
    display: 'flex',
    '-moz-box-align': 'center',
    alignItems: 'center',
  },
  table_box_cell_circle: {
    backgroundColor: 'rgb(19, 222, 185)',
    borderRadius: '100%',
    height: '10px',
    width: '10px',
  },
  table_cell_typo: {
    margin: '0px 0px 0px 8px',
    fontSize: '0.75rem',
    fontWeight: 400,
    fontFamily:
      '"__Plus_Jakarta_Sans_a182b8", "__Plus_Jakarta_Sans_Fallback_a182b8", Helvetica, Arial, sans-serif',
    lineHeight: 1.57,
    color: 'rgb(42, 53, 71)',
    textTransform: 'none',
  },
  check: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    outline: '0px',
    border: ' 0px',
    margin: '0px',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    appearance: 'none',
    textDecoration: 'none',
    fontFamily: '"Inter", sans-serif',
    padding: '9px',
    borderRadius: '50%',
    color: 'rgb(107, 114, 128)',
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
    //display: 'flex', 
    //justifyContent: 'top',
    height: '100%', 
    //padding: '5px 5px 0px 5px',
    margin: '5px 5px 0px 5px',
  },
  resizerNS: {
    marginBottom: 'auto',
    display: 'flex',
    justifyContent: 'bottom',
    width: '100%',
    height: '5px',
    paddingBottom: '3px',
    //backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    cursor: 'row-resize',
    margin: '0px', 
    padding: '0px',
    //"&:hover": {
    //  backgroundColor: '#8888FF',
    //}
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
    width: '5px',
    padding: '0px',
    backgroundColor: 'transparent',
    borderRightColor: 'black',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    cursor: 'col-resize',
    "&:hover": {
      backgroundColor: '#8888FF',
    },
  },

  // main buttons
  mainButtons: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: '10px',
    margin: '6px',
    backgroundColor: 'white',
    border: '1px solid white',
    "&:hover": {
      backgroundColor: 'lightblue',
      border: '1px solid black',
    },
  },

  // main buttons
  textReadOnly: {
    fontSize: 16,
    "&:hover": {
      backgroundColor: 'lightblue',
      border: '1px solid black',
    },
  },

});

export const status_color = {
  'In Process': 'rgb(250, 137, 107)',
  Evaluated: 'rgb(19, 222, 185)',
};

// Custom unchecked icon
export function CustomUncheckedIcon(props) {
  return (
    <SvgIcon {...props} fontSize="small" viewBox="0 0 24 24">
      <path d="M17 3a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10zm0 2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
    </SvgIcon>
  );
}

// Custom checked icon (optional - can use Material-UI's default)
export function CustomCheckedIcon(props) {
  return (
    <SvgIcon {...props} fontSize="small" viewBox="0 0 24 24">
      {/* Custom shape for checked state */}
      <path d="M17 3a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h10zm0 2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
      {/* Add the check mark or other shape if needed */}
    </SvgIcon>
  );
}

export const StyledCheckbox = styled(props => (
  <Checkbox
    checkedIcon={<CustomCheckedIcon />}
    // color="default"
    // disableRipple
    icon={<CustomUncheckedIcon />}
    sx={{ '&:hover': { bgcolor: 'transparent' } }}
    {...props}
  />
))(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  outline: 0,
  border: 0,
  margin: 0,
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  textDecoration: 'none',
  fontFamily: '"Inter", sans-serif',
  padding: '9px',
  borderRadius: '50%',
  color: 'rgb(107, 114, 128)',

  '& .MuiSvgIcon-root': {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentcolor',
    flexShrink: 0,
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1.25rem',
  },

  '& .MuiTouchRipple-root': {
    cursor: 'pointer',
    textAlign: 'center',
    color: 'rgb(103, 58, 183)',
    fontSize: '1.75rem',
    fill: 'rgb(103, 58, 183)',
  },

  '& .MuiCheckbox-input': {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    zIndex: 1,
  },
}));
