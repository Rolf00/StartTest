export const getSortFunc = (order, orderBy, headers) => {
  // Order = desc, asc orderBy = field
  return order === 'desc' ? 
    (a, b) => descGrid(a, b, orderBy, headers) : 
    (a, b) => -descGrid(a, b, orderBy, headers);
};

export const descGrid = (a, b, orderBy, headers) => 
{
  if (orderBy === '') return 0;
  let value_a = a[orderBy];
  let value_b = b[orderBy];
  if (orderBy) 
  {
    const index = headers.map(x => x.field).indexOf(orderBy);
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

  // TODO 
  return false;
}

export const getCellValue = (header, row, sort = false) => 
{
  if (header === undefined || !header) return '';
  const { dataFieldName, valueGetter, editType } = header;
  if (valueGetter)
  {
    if (sort) 
    {
      if (isDateTime(editType, dataFieldName)) 
      {
        try { return parseInt(row[dataFieldName]); } 
        catch (error) { return row[dataFieldName]; }
      }
    }
    
    const params = {...row, 
      getValue: name => 
      {
        if (row[name] === undefined) return '';
        return row[name];
      },
      getHeader: name => 
      {
        if (header[name] === undefined) return '';
        return header[name];
      },
    };
    return valueGetter(params);
  } 
  else 
  {
    if (sort) 
    {
      if (isDateTime(editType, dataFieldName)) 
      {
        try { return parseInt(row[dataFieldName]);} 
        catch (error) { return row[dataFieldName]; }
      }
    }
  }

  return row[dataFieldName];
};

export const getSortRows = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !==  0) return order;
    return  a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export default IUtilsSort;