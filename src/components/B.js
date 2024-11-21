import React, { useState } from 'react';

const B =()=> {
    const [value,setValue] = useState('B')

    return (
        <div style={{backgroundColor:'green', height:'100%'}}>{value}</div>
    )
}
export default B;