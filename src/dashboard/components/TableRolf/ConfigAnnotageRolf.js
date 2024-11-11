import React from 'react';
import PropTypes, { func } from 'prop-types';
import { useStyles } from './styles';
import { withStyles } from 'tss-react/mui';
import styled from 'styled-components';
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
  Checkbox,
  Chip
} from '@mui/material';



import { status_color } from './styles';

// TODO : is this component free ware?
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';


import {
  VisibilityTwoTone,
  EditTwoTone,
  DeleteOutline,
  Label,
} from '@mui/icons-material';

import { green } from '@mui/material/colors';

const RightText = styled.div`
  text-align: right;
  justify-content: right;
`;

const chipcolors = {
  Online: '#0d0',
  Offline: '#d00',
};
const chipcolorsbg = {
  Online: '#dfd',
  Offline: '#fdd',
};


function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
  //const monthName = date.toLocaleDateString('de-DE', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}



function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

// TODO : format numbers : 1.23456 => 1.235 | 1.2 => 1.200
const NumberFormatter = ({ number }) => {
  // Format number with commas and two decimal places for 'en-US'
  //const formattedNumber = number.toLocaleString('en-US', {
  const formattedNumber = number.toLocaleString('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return <span>{formattedNumber}</span>;
}


const dataRolf = [
    {
      id: 4,
      name: 'User Profile Dashboard',
      moreInfo: 'more info about "Dashboard"',
      status: 'Online',
      eventCount: 112543,
      users: 96240,
      viewsPerUser: 4.58756,
      averageTime: '2m 40s',
      conversions: [
        264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126,
        649082, 566792, 723451, 737827, 890859, 935554, 1044397, 1022973, 1129827,
        1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
        1687545, 1581634, 1550291,
      ],
    },
    {
      id: 5,
      name: 'Article Listing - Tech News',
      moreInfo: 'more info about "Listing"',
      status: 'Offline',
      eventCount: 3653,
      users: 142240,
      viewsPerUser: 3.1,
      averageTime: '2m 55s',
      conversions: [
        251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821,
        640744, 504879, 626099, 662007, 754576, 768231, 833019, 851537, 972306,
        1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816, 1577547,
        1854053, 1791831,
      ],
    },
    {
      id: 6,
      name: 'FAQs - Customer Support',
      moreInfo: 'more info about "FAQs"',
      status: 'Online',
      eventCount: 106543,
      users: 15240,
      viewsPerUser: 7.2,
      averageTime: '2m 20s',
      conversions: [
        13671, 16918, 27272, 34315, 42212, 56369, 64241, 77857, 70680, 91093, 108306,
        94734, 132289, 133860, 147706, 158504, 192578, 207173, 220052, 233496, 250091,
        285557, 268555, 259482, 274019, 321648, 359801, 399502, 447249, 497403,
      ],
    },
    {
      id: 7,
      name: 'Product Comparison - Laptops',
      moreInfo: 'more info about "Laptops"',
      status: 'Offline',
      eventCount: 7853,
      users: 32240,
      viewsPerUser: 6.5,
      averageTime: '2m 50s',
      conversions: [
        93682, 107901, 144919, 151769, 170804, 183736, 201752, 219792, 227887, 295382,
        309600, 278050, 331964, 356826, 404896, 428090, 470245, 485582, 539056, 582112,
        594289, 671915, 649510, 574911, 713843, 754965, 853020, 916793, 960158, 984265,
      ],
    },
    {
      id: 8,
      name: 'Shopping Cart - Electronics',
      moreInfo: 'more info about "Electronics"',
      status: 'Online',
      eventCount: 8563,
      users: 48240,
      viewsPerUser: 4.3,
      averageTime: '3m 10s',
      conversions: [
        52394, 63357, 82800, 105466, 128729, 144472, 172148, 197919, 212302, 278153,
        290499, 249824, 317499, 333024, 388925, 410576, 462099, 488477, 533956, 572307,
        591019, 681506, 653332, 581234, 719038, 783496, 911609, 973328, 1056071,
        1112940,
      ],
    },
    {
      id: 9,
      name: 'Payment Confirmation - Bank Transfer',
      moreInfo: 'more info about "Bank"',
      status: 'Offline',
      eventCount: 4563,
      users: 18240,
      viewsPerUser: 2.7,
      averageTime: '3m 25s',
      conversions: [
        15372, 16901, 25489, 30148, 40857, 51136, 64627, 75804, 89633, 100407, 114908,
        129957, 143568, 158509, 174822, 192488, 211512, 234702, 258812, 284328, 310431,
        338186, 366582, 396749, 428788, 462880, 499125, 537723, 578884, 622825,
      ],
    },
    {
      id: 10,
      name: 'Product Reviews - Smartphones',
      moreInfo: 'more info about "Smartphones"',
      status: 'Online',
      eventCount: 9863,
      users: 28240,
      viewsPerUser: 5.1,
      averageTime: '3m 05s',
      conversions: [
        70211, 89234, 115676, 136021, 158744, 174682, 192890, 218073, 240926, 308190,
        317552, 279834, 334072, 354955, 422153, 443911, 501486, 538091, 593724, 642882,
        686539, 788615, 754813, 687955, 883645, 978347, 1142551, 1233074, 1278155,
        1356724,
      ],
    },
    {
      id: 11,
      name: 'Subscription Management - Services',
      moreInfo: 'more info about "Services"',
      status: 'Offline',
      eventCount: 6563,
      users: 24240,
      viewsPerUser: 4.8,
      averageTime: '3m 15s',
      conversions: [
        49662, 58971, 78547, 93486, 108722, 124901, 146422, 167883, 189295, 230090,
        249837, 217828, 266494, 287537, 339586, 363299, 412855, 440900, 490111, 536729,
        580591, 671635, 655812, 576431, 741632, 819296, 971762, 1052605, 1099234,
        1173591,
      ],
    },
    {
      id: 12,
      name: 'Order Tracking - Shipments',
      moreInfo: 'more info about "Shipments"',
      status: 'Online',
      eventCount: 12353,
      users: 38240,
      viewsPerUser: 3.5,
      averageTime: '3m 20s',
      conversions: [
        29589, 37965, 55800, 64672, 77995, 91126, 108203, 128900, 148232, 177159,
        193489, 164471, 210765, 229977, 273802, 299381, 341092, 371567, 413812, 457693,
        495920, 564785, 541022, 491680, 618096, 704926, 833365, 904313, 974622,
        1036567,
      ],
    },
    {
      id: 13,
      name: 'Customer Feedback - Surveys',
      moreInfo: 'more info about "Surveys"',
      status: 'Offline',
      eventCount: 5863,
      users: 13240,
      viewsPerUser: 2.3,
      averageTime: '3m 30s',
      conversions: [
        8472, 9637, 14892, 19276, 23489, 28510, 33845, 39602, 45867, 52605, 59189,
        65731, 76021, 85579, 96876, 108515, 119572, 131826, 145328, 160192, 176528,
        196662, 217929, 239731, 262920, 289258, 315691, 342199, 370752, 402319,
      ],
    },
    {
      id: 14,
      name: 'Account Settings - Preferences',
      moreInfo: 'more info about "Preferences"',
      status: 'Online',
      eventCount: 7853,
      users: 18240,
      viewsPerUser: 3.2,
      averageTime: '3m 15s',
      conversions: [
        15792, 16948, 22728, 25491, 28412, 31268, 34241, 37857, 42068, 46893, 51098,
        55734, 60780, 66421, 72680, 79584, 87233, 95711, 105285, 115814, 127509,
        140260, 154086, 169495, 186445, 205109, 225580, 247983, 272484, 299280,
      ],
    },
    {
      id: 15,
      name: 'Login Page - Authentication',
      moreInfo: 'more info about "Authentication"',
      status: 'Offline',
      eventCount: 9563,
      users: 24240,
      viewsPerUser: 2.5,
      averageTime: '3m 35s',
      conversions: [
        25638, 28355, 42089, 53021, 66074, 80620, 97989, 118202, 142103, 166890,
        193869, 225467, 264089, 307721, 358059, 417835, 488732, 573924, 674878, 794657,
        938542, 1111291, 1313329, 1543835, 1812156, 2123349, 2484926, 2907023, 3399566,
        3973545,
      ],
    },
    {
      id: 16,
      name: 'Promotions - Seasonal Sales',
      moreInfo: 'more info about "Promotions"',
      status: 'Online',
      eventCount: 13423,
      users: 54230,
      viewsPerUser: 7.8,
      averageTime: '2m 45s',
      conversions: [
        241732, 256384, 289465, 321423, 345672, 378294, 398472, 420364, 436278, 460192,
        495374, 510283, 532489, 559672, 587312, 610982, 629385, 654732, 678925, 704362,
        725182, 749384, 772361, 798234, 819472, 846291, 872183, 894673, 919283, 945672,
      ],
    },
    {
      id: 17,
      name: 'Tutorials - How to Guides',
      moreInfo: 'more info about "Tutorials"',
      status: 'Offline',
      eventCount: 4234,
      users: 19342,
      viewsPerUser: 5.2,
      averageTime: '3m 05s',
      conversions: [
        12345, 14567, 16789, 18901, 21023, 23145, 25267, 27389, 29501, 31623, 33745,
        35867, 37989, 40101, 42223, 44345, 46467, 48589, 50701, 52823, 54945, 57067,
        59189, 61301, 63423, 65545, 67667, 69789, 71901, 74023,
      ],
    },
    {
      id: 18,
      name: 'Blog Posts - Tech Insights',
      moreInfo: 'more info about "Blog"',
      status: 'Online',
      eventCount: 8567,
      users: 34234,
      viewsPerUser: 6.3,
      averageTime: '2m 50s',
      conversions: [
        23456, 25678, 27890, 30102, 32324, 34546, 36768, 38980, 41202, 43424, 45646,
        47868, 50080, 52302, 54524, 56746, 58968, 61180, 63402, 65624, 67846, 70068,
        72290, 74502, 76724, 78946, 81168, 83380, 85602, 87824,
      ],
    },
    {
      id: 19,
      name: 'Events - Webinars',
      moreInfo: 'more info about "Webinars"',
      status: 'Offline',
      eventCount: 3456,
      users: 19234,
      viewsPerUser: 4.5,
      averageTime: '3m 20s',
      conversions: [
        123456, 145678, 167890, 190012, 212324, 234546, 256768, 278980, 301202, 323424,
        345646, 367868, 390080, 412302, 434524, 456746, 478968, 501180, 523402, 545624,
        567846, 590068, 612290, 634502, 656724, 678946, 701168, 723380, 745602, 767824,
      ],
    },
    {
      id: 20,
      name: 'Support - Contact Us',
      moreInfo: 'more info about "Support"',
      status: 'Online',
      eventCount: 6734,
      users: 27645,
      viewsPerUser: 3.9,
      averageTime: '2m 55s',
      conversions: [
        234567, 256789, 278901, 301023, 323245, 345467, 367689, 389801, 412023, 434245,
        456467, 478689, 500801, 523023, 545245, 567467, 589689, 611801, 634023, 656245,
        678467, 700689, 722801, 745023, 767245, 789467, 811689, 833801, 856023, 878245,
      ],
    },
    {
      id: 21,
      name: 'Case Studies - Success Stories',
      moreInfo: 'more info about "Success"',
      status: 'Offline',
      eventCount: 4567,
      users: 19345,
      viewsPerUser: 6.1,
      averageTime: '3m 10s',
      conversions: [
        34567, 36789, 38901, 41023, 43145, 45267, 47389, 49501, 51623, 53745, 55867,
        57989, 60101, 62223, 64345, 66467, 68589, 70701, 72823, 74945, 77067, 79189,
        81301, 83423, 85545, 87667, 89789, 91901, 94023, 96145,
      ],
    },
    {
      id: 22,
      name: 'News - Industry Updates',
      moreInfo: 'more info about "Updates"',
      status: 'Online',
      eventCount: 7856,
      users: 34567,
      viewsPerUser: 5.7,
      averageTime: '3m 05s',
      conversions: [
        45678, 47890, 50102, 52324, 54546, 56768, 58980, 61202, 63424, 65646, 67868,
        70080, 72302, 74524, 76746, 78968, 81180, 83402, 85624, 87846, 90068, 92290,
        94502, 96724, 98946, 101168, 103380, 105602, 107824, 110046,
      ],
    },
    {
      id: 23,
      name: 'Forum - User Discussions',
      moreInfo: 'more info about "Discussions"',
      status: 'Offline',
      eventCount: 5678,
      users: 23456,
      viewsPerUser: 4.2,
      averageTime: '2m 40s',
      conversions: [
        56789, 58901, 61023, 63145, 65267, 67389, 69501, 71623, 73745, 75867, 77989,
        80101, 82223, 84345, 86467, 88589, 90701, 92823, 94945, 97067, 99189, 101301,
        103423, 105545, 107667, 109789, 111901, 114023, 116145, 118267,
      ],
    },
  ];

  function renderStatus(status) {
    const colors = {
      Online: '#0d0',
      Offline: '#d00',
    };
    const bgcolors = {
      Online: '#dfd',
      Offline: '#fdd',
    };
    return <Chip 
        label={status} 
        //color={colors[status]} 
        style={{
          color: colors[status],
          backgroundColor: bgcolors[status] 
        }}
        size="small"
         />;
  }

  const hdlCheckboxClickHeader = e => {
    alert("hdlCheckboxClickHeader");
    for (let i = 0; i < dataRolf.length; i++)
    {
      //rows[i]
    }
  }

  function hdlCheckboxClickRow(e, rowIndex, rowId)
  {
    //alert("hdlCheckboxClickRow index=" + rowIndex + ", ID=" + rowId);
    let newvalue = e.target.value;
    let tbl = document.getElementById("mainTableName");
    let allRowsHasSameValue = true;

    for (let i = 0; i < dataRolf.length; i++)
    {
      if (newvalue !== tbl.rows[i][0].selected)
      {
        let allRowsHasSameValue = false;
        break;
      }
    }

    if (allRowsHasSameValue)
    {
      if (newvalue)
      {
        // make "SELECTED" sign in header
      }
      else
      {
        // make "NOT SELECTED" sign in header
      }
    }
    else
    {
      // make "-" sign in header
    }
  }


class ConfigAnnotageRolf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 5,
      data: dataRolf
    };
  }

  render() {
    const dataDays = getDaysInMonth(4, 2024);

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
                  style={{ 
                    paddingLeft: 5, 
                    paddingRight: 0 
                  }}>
                  <Checkbox
                    color_checked={green[400]}
                    color_uncheck={green[600]}
                    onClick={hdlCheckboxClickHeader}
                    size="small"
                  />
                  {/* <StyledCheckbox checked size="small" sx={{ width: 24 }} /> */}
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                  <TableSortLabel>Products</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                  <TableSortLabel>Status</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  // TODO: why this is not working 
                  style={{ 
                    width: 100,
                    paddingLeft: 5, 
                    paddingRight: 5, 
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Users</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ paddingLeft: 5 }}>
                  <TableSortLabel>Event count</TableSortLabel>
                </TableCell>
                <TableCell
                  width={50}
                  className={classes.table_head_cell}
                  style={{ 
                    paddingLeft: 5,
                    textAlign: 'right',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Views per users</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    paddingLeft: 5,
                    paddingRight: 5,
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Average time</TableSortLabel>
                </TableCell>
                <TableCell
                  className={classes.table_head_cell}
                  style={{ 
                    paddingLeft: 5, 
                    textAlign: 'center',
                    verticalAlign: 'bottom'
                  }}>
                  <TableSortLabel>Conversions</TableSortLabel>
                </TableCell>




                {/*  
                <TableCell className={classes.table_head_cell}>
                  <TableSortLabel>Action</TableSortLabel>
                </TableCell>
                */}
              </TableRow>
            </TableHead>
            <TableBody className={classes.table_body_row}>
              {data.map((row, index) => {
                const { 
                  id, name, moreInfo, status, 
                  users, eventCount, viewsPerUser, averageTime,
                  conversions
                } = row;
                return (
                  <TableRow
                    className={classes.table_row}
                    key={`table-row-${index}-${id}`}>
                    <TableCell
                      className={classes.table_check_cell}
                      style={{ paddingRight: 5, paddingLeft: 5 }}>
                      <Checkbox
                        color_checked={green[400]}
                        color_uncheck={green[600]}
                        onClick={(e) => hdlCheckboxClickRow(e, index, id)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        {/*  
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
                        */}
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
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
                              //maxWidth: 100,
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
                            {moreInfo}
                          </Box>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingRight: 0, paddingLeft: 5 }}>
                      {/* 
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
                      */}
                      <Chip 
                        label={status} 
                        style={{
                          color: chipcolors[status],
                          backgroundColor: chipcolorsbg[status] 
                        }}
                        size="small" />
                    </TableCell>














                    {/* TODO: why does textAlign not work??? */}







                    <TableCell
                      className={classes.table_row_cell}
                      style={{ 
                        paddingLeft: 5, 
                        paddingRight: 5,
                        textAlign: 'right',
                        justifyContent: 'right',
                      }}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            width: 80,
                            marginTop: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            boxSizing: 'border-box',
                            scrollHehavior: 'smooth',
                            textAlign: 'right',
                            justifyContent: 'right',
                            marginBlock: 'right',
                          }}>
                          <Box
                            component="p"
                            textAlign='right'
                            justifyContent='right'
                            sx={{
                              fontSize: '14px',
                              fontWeight: 500,
                              color: 'rgb(17, 24, 39)',
                              margin: 0,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              textAlign: 'right',
                              justifyContent: 'right',
                              marginBlock: 'right',
                            }}>
                            
                            {/* TODO: solution Rolf */}
                            <div><RightText>{users}</RightText></div>

                            <div 
                            style={{ 
                                width: '100%', height: '100%', 
                                //textAlign: 'right',
                                justifyContent: 'right',
                              }}>{users}</div>                            
                            
                          </Box>
                          </div>
                      </Box>
                    </TableCell>






                    {/* TODO: do we need 2 elements BOX??? */}
                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
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
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {eventCount}
                          </Box>
                        </div>
                      </Box>
                    </TableCell>

                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
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
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            <NumberFormatter number={viewsPerUser} />
                            {/* {viewsPerUser} */}
                          </Box>
                        </div>
                      </Box>
                    </TableCell>

                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
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
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {averageTime}
                          </Box>
                        </div>
                      </Box>
                    </TableCell>

                    <TableCell
                      className={classes.table_row_cell}
                      style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Box className={classes.table_box_cell}>
                        <div
                          style={{
                            margin: 0,
                            padding: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
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
                              //maxWidth: 100,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                            {/* missing graph */}
                            
    
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={conversions}
        //width={colDef.computedWidth || 100}
        width={100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          dataDays,
        }}
      />
    </div>
    
    

                          </Box>
                        </div>
                      </Box>
                    </TableCell>














                    {/*  
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
                    */}

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

ConfigAnnotageRolf.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(ConfigAnnotageRolf, useStyles);
