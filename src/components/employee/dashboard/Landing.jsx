import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getEmployeeDetails } from '../../../redux/actions/employeeAction'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class Landing extends Component{
  constructor(){
    super();
    this.state = {
      data: {},
      message: '',
      error: ''
    }
  }
  componentDidMount(){
    let user = {
      empid: localStorage.getItem('id')
    }
    this.props.getEmployeeDetails(user);
  }
  render(){
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return(
      <div className={shrink}>
        <Container className="card container-card">
          <Row>
            <Col md="4">
                <div className="card p-2 mt-3">
                <h5 className="bold center">Reports</h5>
                <hr />
              </div>
            </Col>
            <Col md="4">
              <div className="card p-2 mt-3">
                <h5 className="center bold">Tasks To Do</h5>
                <hr />
              </div>
            </Col>
            <Col md="4">
              <div className="card p-2 mt-3">
                <h5 className="center bold">Approvals</h5>
                <hr />
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

Landing.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  employee: state.data,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getEmployeeDetails },
)(Landing);