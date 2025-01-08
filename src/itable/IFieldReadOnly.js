import * as React from 'react';

export default function IFieldReadOnly (props) {
  return(
    <div 
      style={{ 
        padding: '5px 0px', 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: props.horizontalAlign, 
        alignItems: props.verticalAlign,
      }}
    >{props.value}</div>
  );   
}