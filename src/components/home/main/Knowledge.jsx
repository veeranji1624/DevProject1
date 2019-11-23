import React, { Component } from 'react'

class Studies extends Component{
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
        <h1 className="center blue-text heading m-3">KNOWLEDGE</h1>
        <div className="flex-block">
          <div className="blog-item pointer" onClick={this.select}>
              <h4 className="center bold">
                Use Cases
              </h4>
          </div>
          <div className="blog-item pointer" onClick={this.select}>
              <h4 className="center bold">
                Solutions
              </h4>
          </div>
          <div className="blog-item pointer" onClick={this.select}>
              <h4 className="center bold">
                Benefits
              </h4>
          </div>
        </div>
      </div>
    )
  }
}
export default Studies;