import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Table
} from 'reactstrap'
import { MY_PROJECTS } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class MyProjects extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      selection: null,
      message: '',
      error: ''
    }
    this.select = this.select.bind(this);
  }
  select(item){
    this.setState({
      selection: item
    })
  }
  componentDidMount(){
    let id = {
      emp_id: localStorage.getItem('id')
    }
    axios.post(MY_PROJECTS, id, {withCredentials: true})
      .then(res => {
        this.setState({
          data: res.data[0]
        })
      })
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale' : shrink = 'no-scale';
    const { data, selection } = this.state;
    return (
      <div className={shrink}>
        <h4 className="bold pointer center pt-2">Projects</h4>
        {
          !selection
          ?(<Container className="card container-card">
          <Table className="employee-table">
            <thead className="table-header">
              <tr>
                <th>Company Name</th>
                <th>Project Name</th>
                <th>Project SPOC</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
              {data &&
                data.map(item => {
                  return (
                    <tr key={item.projCode} className="table-row pointer" onClick={()=>this.select(item)}>
                      <td>{item.companyName}</td>
                      <td>{item.projectName}</td>
                      <td>{item.projCustSpoc}</td>
                      <td>{item.status}</td>
                      <td>{item.addedOn}</td>
                    </tr>
                  )
                })
              }
          </Table>
          </Container>)
          : (<div><h1>{selection.company_name}</h1></div>)
        }
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}
export default MyProjects;