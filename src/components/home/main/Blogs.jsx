import React, { Component } from 'react'

class Blogs extends Component{
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
      <React.Fragment>
      <div className="blogs container">
        <h1 className="center blue-text heading m-3">BLOGS</h1>
        <div className="flex-block">
          <div className="blog-item pointer" onClick={this.select}>
              <h4 className="center bold">
                Coming Soon
              </h4>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default Blogs;