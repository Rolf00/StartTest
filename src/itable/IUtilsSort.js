import IConst from './IConst';

export const getSortFunc = (order, orderBy, headers) => 
{
  // Order = desc, asc orderBy = field
  return order === 'desc' ? 
    (a, b) => descGrid(a, b, orderBy, headers) : 
    (a, b) => -descGrid(a, b, orderBy, headers);
};

export const descGrid = (a, b, orderBy, headers) => 
{
  // sorting rows
  if (orderBy === '') return 0;
  let value_a = a[orderBy];
  let value_b = b[orderBy];
  if (orderBy) 
  {
    const index = headers.map(x => x.dataFieldName).indexOf(orderBy);
    if (index !== -1) 
    {
      const header = headers[index];
      if (header) 
      {
        value_a = getCellValue(header, a, true);
        value_b = getCellValue(header, b, true);
      }
    }
  }
  if (value_b < value_a) { return -1; }
  if (value_b > value_a) { return 1; }
  return 0;
};

export const isDateTime = (type, field) =>
{
  return type === IConst.editType_Date;
}

export const getCellValue = (header, row, sort = false) => 
{
  // get the value of one cell
  if (header === undefined || !header) return '';
  const { dataFieldName, valueGetter, editType } = header;
  if (valueGetter)
  {
    return eval(valueGetter);
  } 
  else 
  {
    if (sort) 
    {
      if (isDateTime(editType, dataFieldName)) 
      {
        try { 
          // TODO is this ok?
          //return parseInt(row[dataFieldName]);
          return Date.parse(row[dataFieldName]);
        }
        catch (error) { return row[dataFieldName]; }
      }
    }
  }

  return row[dataFieldName];
};

export const  getSortRows = (array, cmp) => {
  // sorting rows
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !==  0) return order;
    return  a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getNewSortingList = (sortings, newsorting, field) =>
{
  // adding a new sorting at the first position
  const oldList = [...sortings].filter(s => s.orderByField !== field);
  let finalList = [];
  if (newsorting === IConst.sortingASC || newsorting === IConst.sortingDESC)
  {
    const oneSort = { 
      order: newsorting, 
      orderByField : field };    
    finalList.push(oneSort);

    // we set the new sorting at first position
    finalList = [...finalList, ...oldList];
  }
  else
  {
    finalList = [...oldList];
  }
  return finalList;
}




