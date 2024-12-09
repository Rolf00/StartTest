import React from "react";
import { TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';

import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';

class ITableCellHeightResizer extends React.Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {

  }
  
  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {
   
  }

  render() 
  {
    const {
      classes,
      id, 
      height, 
      children,
    } = this.props;
      
    return (
      <TableCell
        className={classes.table_row_cell}
        style={{ 
          height: height,
        }}
      >
      <div className={classes.resizerNS_Top} >
        <div className={classes.resizerNS_Caption}>
          {children}
        </div>
        <div
          className={classes.resizerNS}
          onMouseDown={(e) => this.props.handleMouseDownRowNS(e, id)} 
          >
        </div>
      </div>
      </TableCell>
    )
  }
}

ITableCellHeightResizer.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableCellHeightResizer, useStyles);

