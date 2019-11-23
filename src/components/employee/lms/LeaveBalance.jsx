import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'reactstrap'
import { LEAVE_BALANCE } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class LeaveBalance extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      message: '',
      error: ''
    }
  }
  componentDidMount(){
    const data = {
      id: localStorage.getItem('id')
    }
    axios.post(LEAVE_BALANCE, data, {withCredentials: true})
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
  render() {
    return (
      <div>
        <h5 className="bold center">Approved Leaves</h5>
        <Card className="p-3 m-3">
          <h6 className="bold">Total Leaves : 18</h6>
          <h6 className="bold">Balance Leaves : {JSON.stringify(this.state.data)}</h6>
        </Card>
        {this.state.message&& <Notifier message={this.state.message} />}
        {this.state.error&& <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}
export default LeaveBalance;