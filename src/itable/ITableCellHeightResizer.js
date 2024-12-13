import React from "react";
import { TableCell } from "@mui/material";
import { withStyles } from 'tss-react/mui';

import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';

import IConst from './IConst';


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
      resizerBackgroundColor,
    } = this.props;
      
    //const horizontalAlign = IConst.getHorizontalAlign(this.props.horizontalAlign);
    //const verticalAlign = IConst.getVerticalAlign(this.props.rowsVerticalAlign);

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
            onMouseEnter={(e) => this.props.handleMouseEnterNS(e)} 
            onMouseLeave={(e) => this.props.handleMouseLeaveNS(e)} 
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

