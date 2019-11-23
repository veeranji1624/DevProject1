import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Card,  
  Form,
  Input
} from 'reactstrap'
import { updateTsCandidate } from '../../../redux/actions/tsCandidateActions'
import Notifier from '../../aside/Notifier'

class InitialScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      scrStatus: this.props.candidate.scrStatus,
      comments: this.props.candidate.comment
    }
    this.setStatus = this.setStatus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    e.preventDefault();
    this.setState({
      comments: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const { candId, jobId, contact, skypeId, email, panelName, candName, feedStatus } = this.props.candidate;
    const data = {
      candId,
      jobId,
      contact,
      skypeId,
      email,
      panelName,
      candName,
      feedStatus,
      status: 'WIP',
      updatedBy: localStorage.getItem('id'),
      scrStatus: this.state.scrStatus,
      comment: this.state.comments
    }    
    console.log(data);
    this.props.updateTsCandidate(data, null, null);
  }

  setStatus(status){
    if(status === 'PENDING'){
      this.setState({
        scrStatus: status
      })
    }
  }

  render(){
    const { scrStatus, comments } = this.state;
    return(      
      <Card className="p-3 initial-screen">
        <div>
          <p className="bold label-sm center">Screening Status</p>
          <div className="initial-screen-select">
            <span
              onClick={() => this.setStatus('SELECTED')}
              className={`center bold pointer ${scrStatus === 'SELECTED' && 'select'}`}
            >
              Selected
            </span>
            <span
              onClick={() => this.setStatus('REJECTED')}
              className={`center bold pointer ${scrStatus === 'REJECTED' && 'reject'}`}
            >
              Rejected
            </span>
          </div>
          <Form onSubmit={this.onSubmit}>
            <Input onChange={this.onChange} placeholder="Comments" bsSize="sm" value={comments} />
            <div className="center pt-2">
              <button type="submit" className="btn login-button white-text btn-sm label-sm">Submit</button>
            </div>
          </Form>
        </div>
        {this.props.candidates.message && <Notifier message={this.props.candidates.message} />}
      </Card>
    )
  }
}

InitialScreen.propTypes = {
  candidate: PropTypes.object.isRequired,
  candidates: PropTypes.object.isRequired,
  updateTsCandidate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  candidates: state.tsCandidates
})

export default connect(
  mapStateToProps,
  { updateTsCandidate }
)(withRouter(InitialScreen));