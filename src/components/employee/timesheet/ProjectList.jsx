import React, { Component } from 'react'
import axios from 'axios'
import {
  Table
} from 'reactstrap'
import dateFns from 'date-fns'
import ProjectRow from './ProjectRow'
import{ API } from '../../../utils/routes'

class ProjectList extends Component{
  constructor(props){
    console.log("ProjectList constructor")
    super(props);
    this.state = {
      data: [],
      rows: null,
      day: this.props.day,
      weekNo: dateFns.getISOWeek(new Date())
    }
    this.loadRows = this.loadRows.bind(this);
  }

  fetchData = () => {
    axios.get(`${API}/timemanagement/fetch`, {withCredentials: true})    
      .then(res => {  
         console.log(res.data)      
        this.setState({
          data: res.data,
          rows: res.data.length
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loadRows(){
    console.log('ProjectList loadRows function')
    console.log(this.state.rows)
    let array = [];
    for(let i = 0;i < this.state.rows;i++){
      array.push(
        <ProjectRow key={i} identity={i} project={this.state.data[i]} weekNo={this.state.weekNo} />
       )
    }
    return array.map(item => {
      return item;
    })
  }

  componentDidUpdate(){
    console.log("ProjectList componentDidUpdate")
    if(this.props.day !== this.state.day){
      this.setState({
        day: this.props.day,
        weekNo: dateFns.getISOWeek(this.state.day)
      })
    }
  }

  componentWillMount(){
    console.log("ProjectList componentWillMount")
    this.fetchData()   
  }

  // componentDidMount(){
  //   console.log("ProjectList componentWillMount")
  //   this.fetchData()
  // }

  render(){
    console.log(this.state.rows)
    console.log("ProjectList render function")
    let weekStart = dateFns.startOfWeek(this.state.day);
    let days = [];
    for(let i = 0; i < 7; i++ ){
      days.push(dateFns.format(dateFns.addDays(weekStart, i), 'D'))
    }    
    return (
      <div>
        <h6 className="center p-2">{dateFns.format(this.state.day, 'MMMM')}</h6>
        <Table className="timesheet-table employee-table">
          <thead className="table-header">
            <tr>              
              <th className="center label-sm bold">Project Name</th>
              <th className="center label-sm bold">Task</th>
              <th className="center label-sm bold">Shift</th>
              <th className="center label-sm bold">Sun<br />{days[0]}</th>
              <th className="center label-sm bold">Mon<br />{days[1]}</th>
              <th className="center label-sm bold">Tue<br />{days[2]}</th>
              <th className="center label-sm bold">Wed<br />{days[3]}</th>
              <th className="center label-sm bold">Thu<br />{days[4]}</th>
              <th className="center label-sm bold">Fri<br />{days[5]}</th>
              <th className="center label-sm bold">Sat<br />{days[6]}</th>              
              <th className="center label-sm bold"></th>
              <th className="center label-sm bold"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows? this.loadRows() :<div className="Center ">Loading....</div>}
          </tbody>
        </Table>
      </div>
    )
    }
}

export default ProjectList;
