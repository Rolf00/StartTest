import React from "react";
import { TableRow, } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import PropTypes, { func } from 'prop-types';
  
import IConst from './IConst';
import ITableCellHeightResizer from './ITableCellHeightResizer';
import IFieldSelection from './IFieldSelection';
import IFieldText from './IFieldText';
import IFieldNumber from './IFieldNumber';
import IFieldDropDown from './IFieldDropDown';
import IFieldChipMenu from './IFieldChipMenu';
import IFieldCheckbox from './IFieldCheckbox';
import IFieldDate from './IFieldDate';
import IFieldSpecialButton from './IFieldSpecialButton';
import IFieldRowEditButton from './IFieldRowEditButton';
import { useStyles } from './styles';

  
class ITableRow  extends React.Component {
  constructor(props) {
    super(props);


    /* props:
    settings={this.props.settings}
    headers={this.props.headers}
    oldRow={thisOldRow}
    rowIndex={rowIndex}
    row={thisRow}
    thisInfo={thisInfo}
    handleMouseDownRowNS={(e, rowid) => this.handleMouseDownRowNS(e, rowid)}
    handleSelectionClickRow={(rowid) => this.handleSelectionClickRow(rowid)}
    handleRowEditButtons={(rowid, action) => this.handleRowEditButtons(rowid, action)}
    handleDataChange={(newvalue, rowid, field) => this.handleDataChange(newvalue, rowid, field)}
    */

    // props
    const {
      settings,
      headers,
      oldRow,
      rowIndex,
      rowId,
      row,
      rowInfo,
    } = this.props;
    
    // state
    this.state = {
      headers: headers,
      rowIndex: rowIndex,
      row: row,
    }

  }

  componentDidMount() {
  }
    
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }
  
  render()
  {
    const rowid = this.props.rowId;

    // main row selection 
    const isRowSelected = this.props.rowInfo.selected;
    
    // get row height
    const rowHeight = this.props.rowInfo.height;

    // to get the background color for the row depending on its state
    const rowState = this.props.rowInfo.state;
    const isRowDeleted = rowState === IConst.rowStateDeleted;
    const isRowInserted = rowState === IConst.rowStateInserted;
    const isRowChanged = rowState === IConst.rowStateEdited || isRowDeleted || isRowInserted;
    const rowBackgroundColor =
      isRowSelected && isRowDeleted ? IConst.rowColorSelDeleted :
      isRowSelected && isRowChanged ? IConst.rowColorSelChanged :
      isRowSelected && isRowInserted ? IConst.rowColorSelInserted :
      isRowSelected ? IConst.rowColorSelected :
      isRowDeleted ? IConst.rowColorDeleted :
      isRowChanged ? IConst.rowColorChanged :
      isRowInserted ? IConst.rowColorInserted : "#FFFFFF";

    return (
      <TableRow
        height={rowHeight}
        style={{
          height: rowHeight,
          backgroundColor: rowBackgroundColor,
        }}
        key={`table-row-${this.props.rowIndex}-${rowid}`} 
      >
      {this.state.headers.map((header) => {

        // edit types
        const isSelectionIcon = header.editType === IConst.editType_SelectionIcon;
        const isTextfield =
          header.editType === IConst.editType_PrimaryKey ||
          header.editType === IConst.editType_Textfield ||
          header.editType === IConst.editType_TextfieldMultiline;
        const isNumber = 
          header.editType === IConst.editType_Integer ||
          header.editType === IConst.editType_Decimal;
        const isDropdown = header.editType === IConst.editType_Dropdown;
        const isCheckbox = header.editType === IConst.editType_Checkbox;
        const isDate = header.editType === IConst.editType_Date;
        const isChip = header.editType === IConst.editType_Chip;
        const isSpecialButton = header.editType === IConst.editType_SpecialButton;
        const isRowEditButton = 
          header.editType === IConst.editType_ButtonEditRow ||
          header.editType === IConst.editType_ButtonEdit ||
          header.editType === IConst.editType_ButtonSave ||
          header.editType === IConst.editType_ButtonUndo ||
          header.editType === IConst.editType_ButtonDelete;

        // TODO :
        const btnHoverWidth = this.props.settings.buttonSizeOnRows + 8; 

        // checking about typos
        const typeFound = (
          isSelectionIcon || isTextfield || isNumber || isDropdown || 
          isCheckbox || isDate || isChip || isSpecialButton || isRowEditButton
        );

        // get fieldname and the value of the field
        const field = header.dataFieldName;
        let tmp = this.state.row[header.dataFieldName];
        // TODO decimals 
        //if (isDecimal) tmp = tmp.toFixed(header.decimalCount);
        const value = tmp;


        return (
          <ITableCellHeightResizer
            height={rowHeight}
            setHeight={(height) => this.setState({rowHeight: height})}
            handleMouseDownRowNS={(e)=>this.props.handleMouseDownRowNS(e, rowid)}
          >

            {isSelectionIcon &&
            <IFieldSelection
              settings={this.props.settings}
              header={header}
              value = {value}
              handleSelectionClickRow={e => this.handleSelectionClickRow(e, rowid)}
            />}

            {isTextfield && 
            <IFieldText
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isNumber &&
            <IFieldNumber
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isDropdown &&
            <IFieldDropDown
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isCheckbox &&
            <IFieldCheckbox
              value={value}
              settings={this.props.settings}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isDate &&
            <IFieldDate
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isChip &&
            <IFieldChipMenu
              value={value}
              header={header}
              rowid={rowid}
              handleDataChange= {e => this.props.handleDataChange(e, rowid, field)}
            />}

            {isSpecialButton &&
            <IFieldSpecialButton
              header = {header}
              onClick = {e => this.props.rowSpecialButtonClick(e, header.editType)}
            />}

            {isRowEditButton &&
            <IFieldRowEditButton
              settings = {this.props.settings}
              rowId={rowid}
              rowState = {rowState}
              header = {header}
              handleRowEditButtonClick = {() => this.props.handleRowEditButtonClick(rowid, header.editType)}
            />}

            {!typeFound && <span>TYPE ERROR</span>}  

          </ITableCellHeightResizer>
        );
      })}
      </TableRow>    
    );
  }
}

ITableRow.propTypes = { classes: PropTypes.object, };

export default withStyles(ITableRow, useStyles);


