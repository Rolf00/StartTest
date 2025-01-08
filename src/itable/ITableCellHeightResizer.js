import React from "react";
import { TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';

import { useStyles } from './styles';

class ITableCellHeightResizer extends React.Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() 
  {
    const {
      classes,
      height, 
      children,
      isHeightResizing,
      resizerBackgroundColor,
    } = this.props;

    return (
      <TableCell
        className={classes.table_row_cell}
        style={{ height: height, }}
      >
        <div className={classes.resizerNS_Top} >
          <div className={classes.resizerNS_Caption}>{children}</div>
          <div
            className={classes.resizerNS}
            onMouseDown={(e) => this.props.handleMouseDownRowNS(e)} 
            // we dont want flickering all over each row
            //onMouseEnter={(e) => this.props.handleMouseEnterNS(e)} 
            //onMouseLeave={(e) => this.props.handleMouseLeaveNS(e)} 
            style={{
              backgroundColor: this.props.isHeightResizing ? 
                this.props.resizerBackgroundColor : 'transparent'
            }}
            >
          </div>
        </div>
      </TableCell>
    )
  }
}

ITableCellHeightResizer.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableCellHeightResizer, useStyles);

