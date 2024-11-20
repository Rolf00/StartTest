import React from "react";


class RowHeightResizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleMouseDownNS(e)
  {
    let mouseStart = e.clientY;
    let cellHeight = e.target.parentElement.clientHeight;

    const onMouseMoveRowNS = (e) => {
      const newheight = e.clientY - mouseStart + cellHeight;
      this.setState({rowHeight : newheight});
    }

    const onMouseUpRowNS = (e) => {
      document.removeEventListener('mousemove', onMouseMoveRowNS);
      document.removeEventListener('mouseup', onMouseUpRowNS);
      /*document.removeEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
      });      
      */
    };    

    document.addEventListener('mousemove', onMouseMoveRowNS);
    document.addEventListener('mouseup', onMouseUpRowNS);    
    document.addEventListener('selectstart', function(e) {
      //e.preventDefault();
      return false;
    });      
  }

  render() 
  { 
    return (
        <div style={{ 
        display: 'flex', flexDirection: 'column', 
        height: '100%', width: '100%', 
        margin: '0px', padding: '0px'}}>
            <div style={{ 
                display: 'flex', justifyContent: 'top',
                padding: '10px 10px 2px 10px',
                height: '100%', }}>

                {/* TODO : insert the content here ?*/}


            </div>
            <div
                onMouseDown={(e) => this.handleMouseDownRowNS(e)} 
                style={{
                marginBottom: 'auto',
                display: 'flex',
                justifyContent: 'bottom',
                width: '100%',
                height: '5px',
                backgroundColor: '#999',
                cursor: 'row-resize',
                margin: '0px', padding: '0px',
                }}
            ></div>
        </div>
    );
  }
}

export default RowHeightResizer;
 


