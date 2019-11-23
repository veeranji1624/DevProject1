import React, { Component } from 'react'
import axios from 'axios'
import {
  Container,
  Table
} from 'reactstrap'
import ResourceDetails from '../../aside/ResourceDetails'
import { GET_RESOURCES } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'
 
class Resources extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      selection: null,
      message: '',
      error: ''
    }
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
  }
  select(item){
    this.setState({
      selection: item
    })
  }
  back(){
    this.setState({
      selection: false
    })
  }
  componentDidMount(){
    axios.get(GET_RESOURCES)
      .then(res => {
        this.setState({
          data: res.data.data
        })
      })
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection } = this.state;
    return (
      <div className={shrink}>
        <Container className="card container-card">
          <h4 onClick={this.back} className="bold pointer center pt-2">Resource List</h4>
        {
          !selection
          ?(<Table className="employee-table">
            <thead className="table-header">
              <tr>
                <th>Resource ID</th>
                <th>Employee Name</th>
                <th>Company Name</th>
                <th>Project name</th>
                <th>Project SPOC</th>
                <th>Start date</th>
                <th>End date</th>
              </tr>
            </thead>
              {
                data.map(item => {
                  return (
                    <tr className="table-row pointer" key={item.resourceId} onClick={()=>this.select(item)}>
                      <td>{item.empId}</td>
                      <td>{item.empName}</td>
                      <td>{item.description}</td>
                      <td>{item.vacancy}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                })
              }
          </Table>)
          :<ResourceDetails employee={ this.state.selection } />
        }
        </Container>
        {this.state.message? <Notifier message={this.state.message} /> :null}
        {this.state.error? <ErrorNotifier message={this.state.error} /> :null}
      </div>
    )
  }
}
export default Resources;