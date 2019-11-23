import React, { Component } from "react"
import { Link } from 'react-router-dom'
import img3 from "../../../assets/img/home-banner2.jpg"
import p3 from "../../../assets/img/partner3.png"
import pro1 from "../../../assets/img/pro1.png"
import pro2 from "../../../assets/img/pro2.png"
import p2 from "../../../assets/img/servicenow.svg"
 
class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      img: img3,
      product: pro1,
      partner: p3,
      text1: true
    };
    this.left = this.left.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        text1: !this.state.text1,
      });
    }, 10000);
    const products = [pro1, pro2];
    const prtnrs = products.length;
    let index_p = 1;
    setInterval(() => {
      this.setState({
        product: products[index_p]
      });
      index_p = (index_p + 1) % prtnrs;
    }, 5000);
    const partners = [p2, p3];
    const partner = partners.length;
    let index_s = 1;
    setInterval(() => {
      this.setState({
        partner: partners[index_s]
      });
      index_s = (index_s + 1) % partner;
    }, 5000);
  }
  left(){
    this.setState({
      text1: !this.state.text1
    })
  }
  visitPage(){
    if(this.state.product === pro1){
      return(
        <a href="http://www.growthgamut.com" rel="noopener noreferrer" target="_blank">
          <img
            src={this.state.product}
            alt="product"
            className="partner-image"
            height="50"
            width="120"
          />
        </a>
      )
    }else{
      return(
        <Link to="/vani">
          <img
            src={this.state.product}
            alt="product"
            className="partner-image"
            height="55"
            width="120"
          />
        </Link>
      )
    }
  }
  render() {
    let imgText;
    if(this.state.text1){
      imgText = <div className="carousel-text-box-two left">
                  <h1 className="carousel-text">
                    Your Digital Experience Powered By Our Innovation and Agility
                  </h1>
                </div>
    }else{
      imgText = <div className="carousel-text-box-two left">
                  <h1 className="carousel-text">Business Realization and Transformation Through Our Nextgen Partners and Solutions</h1>
                </div>
    }
    let link2 = '';
    if(this.state.partner === p2){
      link2 = 'https://www.servicenow.com';
    }else{
      link2 = 'https://www.neotys.com';
    }
    return (
      <div id="carousel">
        {imgText}
        <img className="carousel-image" src={img3} alt="carousel"
          onMouseEnter={this.pause}
        />
        <i className="carousel-left material-icons pointer"
          onClick={this.left}
        >chevron_left</i>
        <i className="carousel-right material-icons pointer"
          onClick={this.left}
        >chevron_right</i>
        <div className="partner-row">
          <div className="partner-item card pointer" md="3">
            <a href="#differentiators">
              <h4 className="bold carousel-head">Products
              </h4>
            </a>
            {this.visitPage()}
          </div>

          <div className="partner-item card pointer" md="3">
            <a href="#services">
              <h4 className="bold carousel-head">Services</h4>
            </a>
            <i className="material-icons services-icon">build</i>
          </div>

          <div className="partner-item card" md="3">
            <a href="#partners">
              <h4 className="bold carousel-head">Partners</h4>
            </a>
            <a href={link2} target="_blank" rel="noopener-noreferrer">
            <img
              src={p3}
              alt="partner"
              className="partner-image"
              height="50"
              width="120"
            />
            </a>
          </div>

          <div className="partner-item card pointer" md="3">
            <a href="#differentiators">
              <h4 className="bold carousel-head">Solutions</h4>
            </a>
            <i className="material-icons services-icon">group_work</i>
          </div>
          
          <div className="partner-item card pointer" md="3">
            {/*<Link to="/blogs">*/}
            <h4 className="bold carousel-head">Knowledge Assets</h4>
            {/*</Link>*/}
            <h5 className="sans">Coming Soon..</h5>
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;