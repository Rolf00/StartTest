import React, { Component } from 'react'

class A extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
        }
    }
    handleClick =()=> {
        this.setState({value: 2})
        this.props.setExternalValue('clicked');
    }
    render() {
        const {value} = this.state;
        return (
            <div style={{backgroundColor:'red', color:'white'}} onClick={this.handleClick}>{value}</div>
        )
    }
}

export default A;