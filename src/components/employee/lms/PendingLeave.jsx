import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class PendingLeave extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      message: '',
      error: ''
    }
    this.pendingLeaves = this.pendingLeaves.bind(this);
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
  pendingLeaves(){
    return this.state.data&&
      this.state.data.map((item, index) => {
        return (
          <div
            key={index}
            className="card p-3 m-3">
              <h6 className="bold">{item.leaveType}</h6>
              <h6 className="bold">Apllied on : {item.leaveDate}</h6>
              <h6 className="bold">From : {item.fromDate}</h6>
              <h6 className="bold">To : {item.toDate}</h6>
              <h6 className="bold">Status : {item.leaveStatus}</h6>
              <h6 className="bold">Status : {item.approvedBy}</h6>
          </div>
        )
      })
  }
  render() {
    return (
      <div>
      <h5 className="bold center">Pending Applications</h5>
        {this.pendingLeaves()}
        {this.state.message&& <Notifier message={this.state.message} />}
        {this.state.error&& <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}
export default PendingLeave;