import React, { Component } from 'react'
import axios from 'axios'
import dateFns from 'date-fns'
import {
  Card
} from 'reactstrap'
import { API } from '../../../utils/routes'
import ProjectList from './ProjectList'

class Timesheet extends Component {
  constructor(){
    super();
    this.state = {
      data: [{project_name: 'Project 1'}, {project_name: 'Project 2'}],
      selection: {},
      day: new Date(),
      message: '',
      error: ''
    }
  }  

  nextWeek = () => {
    let newDay = dateFns.addDays(this.state.day, 7);
    this.setState({
      day: newDay
    })
  }

  prevWeek = () => {
    let newDay = dateFns.addDays(this.state.day, -7);
    this.setState({
      day: newDay
    })
  }

  render() {
    console.log(this.state.selection);
    console.log(this.state.day);
    let shrink = this.props.sidebar? 'scale': 'no-scale';    
    return (
      <div className={shrink}>
        <Card className="details-card mb-3 p-5 m-3 left shadow">
          <h5 className="pointer bold center pt-2">
            Timesheet
          </h5>
          <div className="time-flex">
            <span
              onClick={this.prevWeek}
              className="timesheet-toggler">
              &larr; Previous Week
            </span>
            <span
              onClick={this.nextWeek}
              className="timesheet-toggler">
              Next Week &rarr;
            </span>
          </div>
          <hr />
          <ProjectList project={this.state.selection} day={this.state.day} />
        </Card>
      </div>
    )
  }
}

export default Timesheet;