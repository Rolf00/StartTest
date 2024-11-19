import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox
} from '@mui/material';
import { status_color } from './styles';
import {
  VisibilityTwoTone,
  EditTwoTone,
  DeleteOutline,
} from '@mui/icons-material';

import { green } from '@mui/material/colors';

class ConfigAnnotage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 5,
      data: [
        { id: 1, name: 'John Doe', status: 'In Process' },
        { id: 2, name: 'Esther Doe', status: 'Evaluated' },
        { id: 3, name: 'Michael Moser', status: 'Evaluated' },
        { id: 4, name: 'Tobias Rey', status: 'Evaluated' },
        { id: 5, name: 'Kaspar Status', status: 'In Process' },
        { id: 6, name: 'Flaminio Pinila', status: 'Evaluated' },
        { id: 7, name: 'Rodrigo Meier', status: 'In Process' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
        { id: 8, name: 'Stephan Peres', status: 'Evaluated' },
      ],
    };
  }

  render() {
    const { classes } = this.props;
    const { page, limit } = this.state;
    const data = this.state.data.slice(page * limit, page * limit + limit);
    return (
      <Paper className={classes.paper}>
        <TableContainer
          className={classes.table_container}
          style={{
            height: 350, // Set the max height to allow scrolling after 5 items
            overflowY: 'auto', // Enables vertical scrolling
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#555',
              },
            },
          }}>
          <Table className={classes.table} stickyHeader>
            <TableHead className={classes.table_head}>
              <TableRow className={classes.table_head_row}>
                <TableCell
                  className={classes.table_head_check}
                  style={{ paddingLeft: 5, paddingRight: 0 }}>
                  <Checkbox
                    color_checked={green[400]}
                    color_uncheck={green[600]}
                    size="small"
                  />
                  {/* <StyledCheckbox checked size="small" sx={{ width: 24 }} /> */}
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 0 }}>
                  <TableSortLabel>Products</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                  <TableSortLabel>Status</TableSortLabel>
                </TableCell>
                <TableCell className={classes.table_head_cell}>
                  <TableSortLabel>Action</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.table_body_row}>
              {data.map((row, index) => {
                const { id, name, status } = row;
                return (
                  <TableRow
                    className={classes.table_row}
                    key={`table-row-${index}-${id}`}>
                    <TableCell
                      className={classes.table_check_cell}
                      style={{ paddingRight: 0, paddingLeft: 0 }}>
                      <Checkbox
                        color_checked={green[400]}
                        color_uncheck={green[600]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        <Avatar
                          alt={`Avatar n°${index + 1}`}
                          src={`/images/avatars/avatar_${index}.png`}
                          sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            width: 35,
                            height: 35,
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '1.25rem',
                            lineHeight: 1,
                            overflow: 'hidden',
                            userSelect: 'none',
                            borderRadius: '4px',
                          }}
                        />
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                          }}>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {name}
                          </Box>
                          <Box
                            component="small"
                            sx={{
                              fontSize: '12px',
                              fontWeight: 400,
                            }}>
                            Other info
                          </Box>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingRight: 0, paddingLeft: 5 }}>
                      <Box className={classes.table_box_cell}>
                        <Box
                          className={classes.table_box_cell_circle}
                          style={{ backgroundColor: status_color[status] }}
                        />
                        <Typography
                          className={classes.table_cell_typo}
                          variant="subtitle2">
                          {status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      className={classes.table_row_cell}
                      style={{
                        minWidth: 100,
                        letterSpacing: '0em',
                        fontWeight: 400,
                        lineHeight: '1.5em',
                        color: 'rgb(54, 65, 82)',
                        fontFamily: '"Roboto", sans-serif',
                        fontSize: '0.875rem',
                        display: 'table-cell',
                        verticalAlign: 'inherit',
                        textAlign: 'center',
                        padding: 0,
                      }}>
                      <Box>
                        <IconButton
                          aria-label="View"
                          color="primary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            bgcolor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'visible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(33, 150, 243)',
                            padding: '12px',
                            fontSize: '1.75rem',
                          }}>
                          <VisibilityTwoTone
                            sx={{
                              userSelect: 'none',
                              width: '1em',
                              height: '1em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Edit"
                          color="secondary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            bgcolor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'visible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(103, 58, 183)',
                            padding: '12px',
                            fontSize: '1.75rem',
                          }}>
                          <EditTwoTone
                            sx={{
                              userSelect: 'none',
                              width: '1em',
                              height: '1em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          color="secondary"
                          size="small"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxSizing: 'border-box',
                            backgroundColor: 'transparent',
                            outline: '0px',
                            border: '0px',
                            margin: '0px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            verticalAlign: 'middle',
                            appearance: 'none',
                            textDecoration: 'none',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            borderRadius: '50%',
                            overflow: 'visible',
                            transition:
                              'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'rgb(244, 67, 54)',
                            padding: '5px',
                            fontSize: '1.125rem',
                          }}>
                          <DeleteOutline
                            sx={{
                              userSelect: 'none',
                              width: '0.8em',
                              height: '0.8em',
                              display: 'inline-block',
                              fill: 'currentcolor',
                              flexShrink: 0,
                              transition:
                                'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                              fontSize: '1.3rem',
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className={classes.table_body_row}>
                <TableCell
                  colSpan={4}
                  style={{
                    padding: 0,
                    margin: 0,
                    borderBottom: '1px solid rgb(229, 234, 239)',
                    borderWidth: '1px medium medium',
                    borderStyle: 'dashed none none',
                    borderColor: 'rgb(229, 231, 235) currentcolor currentcolor',
                    borderImage: 'none',
                    color: 'rgb(107, 114, 128)',
                  }}
                />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Table
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.paper',
            boxShadow: '0px -2px 4px rgba(0,0,0,0.1)', // Optional: adds shadow to separate pagination
          }}>
          <TableFooter>
            <TableRow>
              <TablePagination
                component="div"
                count={this.state.data.length}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
                labelRowsPerPage="Rows:" // Shorter label
                onPageChange={(event, page) => {
                  event.preventDefault();
                  this.setState({ page });
                }}
                onRowsPerPageChange={event => {
                  this.setState({
                    page: 0,
                    limit: parseInt(event.target.value, 10),
                  });
                }}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 20, 100]}
                sx={{
                  borderTop: '1px solid rgba(224, 224, 224, 1)',
                  overflow: 'hidden',
                  '.MuiTablePagination-toolbar': {
                    minHeight: '40px', // Reduced from 52px
                    paddingLeft: '8px', // Reduced from 16px
                    paddingRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '.MuiTablePagination-spacer': {
                    flex: '1 1 100%',
                    // flex: '0.2', // Reduced flex space
                  },
                  '.MuiTablePagination-selectLabel': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', //'0.875rem',
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginRight: '4px', // added
                  },
                  '.MuiTablePagination-select': {
                    minWidth: '16px',
                    paddingRight: '12px', // Reduced from 24px
                    paddingLeft: '4px', // Reduced from 8px
                    textAlign: 'left',
                    textAlignLast: 'left',
                  },
                  '.MuiTablePagination-displayedRows': {
                    margin: 0,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.75rem', // Smaller font
                    lineHeight: 1.43,
                    letterSpacing: '0.01071em',
                    marginLeft: '4px',
                    marginRight: '4px',
                  },
                  '.MuiIconButton-root': {
                    padding: '4px', // Reduced from 12px
                    borderRadius: '50%',
                    overflow: 'visible',
                    color: 'inherit',
                    transition:
                      'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    '&.Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.26)',
                    },
                  },
                  '.MuiSvgIcon-root': {
                    fontSize: '1.2rem', // Smaller icons
                  },
                  // Make the whole pagination more compact
                  '& .MuiToolbar-root': {
                    gap: '2px',
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

ConfigAnnotage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(ConfigAnnotage, useStyles);
