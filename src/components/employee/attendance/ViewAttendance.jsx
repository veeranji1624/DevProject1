import React, { Component } from 'react'
import axios from 'axios'

class ViewAttendance extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      message: '',
      error: ''
    }
  }
  componentDidMount(){
    axios.get('http://localhost:5000:selectemp')
      .then(res => {
        this.setState({
          user: res.data.data
        })
      })
  }
  render() {
    const date = `${this.props.date.getFullYear()}-${this.props.date.getMonth()+1}-${this.props.date.getDate()}`;
    const future = +this.props.date > +new Date();
    console.log(this.props.date, future)
    return (
      <div className="attendance-backdrop">
        <div className="attendance-main-card">
          <i className="material-icons cancel-button pointer" onClick={this.props.back}>cancel</i>
          <p className="mb-3 ml-5">Date : <span>{date}</span></p>
          <p className="mb-3 ml-5">Attendance Status : <span className="green">
            {this.props.absent? 'Absent': future? 'NA' :'Present'}</span></p>
          {!this.props.absent &&
          <p className="bold mb-3 ml-5">Time In : <span>{this.props.timeData? this.props.timeData: 'NA'}</span></p>}
          {!this.props.absent &&
          <p className="bold mb-3 ml-5">Time Out : <span>6:00</span></p>}
          
        </div>
      </div>
    )
  }
}
export default ViewAttendance;