import React, { Component } from 'react'
import growth from '../../../assets/img/pro1.png'
import vani from '../../../assets/img/pro2.png'

class Products extends Component{
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
        <h1 className="center blue-text heading m-3">PRODUCTS</h1>
        <div className="flex-block">
          <div className="blog-item pointer center" onClick={this.select}>
            <h4 className="center bold">
              <a
                href="https://www.growthgamut.com"
                className="black-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                GROWTH GAMUT
              </a>
            </h4>
            <img
              src={growth}
              alt="Growth Gamut"
              height="120" 
              width="400"
              style={{marginTop: '50px'}}
            />
          </div>
          <div className="blog-item pointer center" onClick={this.select}>
            <h4 className="center bold">
              <a
                href="http://www.vani.xyz"
                className="black-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                VANI
              </a>
            </h4>
            <img
              src={vani}
              alt="Vani" 
              height="120"
              width="300"
              style={{marginTop: '50px'}}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default Products;