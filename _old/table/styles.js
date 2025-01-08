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
    verticalAlign: 'inherit',
    textAlign: 'left',
    padding: '6px 16px',
    borderBottom: '1px solid rgb(229, 234, 239)',
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
    padding: '3px 16px',
    // color: 'rgb(42, 53, 71)',
    borderBottom: '1px solid rgb(229, 234, 239)',
    borderWidth: '1px medium medium',
    borderStyle: 'dashed none none',
    borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
    borderImage: 'none',
    color: 'rgb(107, 114, 128)',
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
