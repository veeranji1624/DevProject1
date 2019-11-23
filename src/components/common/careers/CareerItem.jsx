import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Card,
  Row,
  Col
} from 'reactstrap'
import CareerForm from './CareerForm'
import { GET_CAREERS } from '../../../utils/routes'
 
class CareerItem extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      selection: null
    }
    this.select = this.select.bind(this);
  }
  select(item){
    this.setState({
      selection: item
    })
  }
  componentDidMount(){
    const data = { domain: this.props.domain }
    axios.post(
      GET_CAREERS,
      data,
      {withCredentials: true}
    )
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }
  render(){
    const { data, selection } = this.state;
    return (
      <div className="center">
        <h5 className=" dark-blue-text center col-md-12">Current Openings | <span className="dark-blue-text">{this.props.domain}</span></h5>
        <Card className="m-2 p-4 shadow">
          <div className="right">
            <span className="close" onClick={this.props.back}>x</span>
          </div>
          <Row>
          {
            !selection
            ?data&&data.map(item => {
              return <Col md="3" sm="6" key={item.jobCode} onClick={()=>this.select(item)}>
                <Card className="pt-2 center mb-2 shadow pointer">
                  <h6>{item.jobRole}</h6>
                  <p>{item.location}</p>
                  <p>{item.domain}</p>
                </Card>
              </Col>
            })
            :<Col md="12" className="center"><CareerForm job={this.state.selection} /></Col>
          }
          </Row>
        </Card>
      </div>
    )
  }
}

CareerItem.propTypes = {
  domain: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired
}
export default CareerItem;
