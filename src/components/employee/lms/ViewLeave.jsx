import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import { API } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class ViewLeave extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      message: '',
      error: ''
    }
    this.showLeaves = this.showLeaves.bind(this);
  }
  componentDidMount(){
    axios.get(`${API}/leavemanagement/select`, {withCredentials: true})
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        this.setState({error: 'Error fetching data'})
        setTimeout(() => {this.setState({error: ''})})
      })
  }
  showLeaves(){
    return this.state.data&&
      this.state.data.map((item, index) => {
        return(
          <div 
            key={index}
            className="card p-3 m-3">
            <Row>
              <Col md="11">{item.leaveDate}</Col>
              <Col md="1"><i className="material-icons leave-icon">close</i></Col>
            </Row>
          </div>
        )
      }) 
  }
  render() {
    let shrink = this.props.sidebar? 'scale': 'no-scale';
    return (
      <div className={shrink}>
        <h4 className="bold center">Manage Leaves</h4>
        <Container className="container-card p-3">
          {this.showLeaves()}
          {this.state.message&& <Notifier message={this.state.message} />}
          {this.state.error&& <ErrorNotifier message={this.state.error} />}
        </Container>
      </div>
    )
  }
}
export default ViewLeave;