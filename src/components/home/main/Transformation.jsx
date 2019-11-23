import React, { Component } from 'react'

class Papers extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      selection: false
    }
    this.select = this.select.bind(this);
  }
  select(){
    this.setState({
      selection: !this.state.selection
    })
  }
  render(){
    return(
      <div className="blogs container">
        <h1 className="center blue-text heading m-3">TRANSFORMATION</h1>
        <div className="flex-block">
          <div className="blog-item pointer" onClick={this.select}>

          </div>
          <div className="blog-item pointer" onClick={this.select}>
              
          </div>
        </div>
      </div>
    )
  }
}
export default Papers;