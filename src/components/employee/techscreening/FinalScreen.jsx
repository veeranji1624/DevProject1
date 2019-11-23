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
      feedStatus: this.props.candidate.feedStatus,
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
    const { candId, jobId, contact, skypeId, email, panelName, candName, scrStatus } = this.props.candidate;
    const data = {
      candId,
      jobId,
      contact,
      skypeId,
      email,
      panelName,
      candName,
      scrStatus,
      status: 'Completed',
      updatedBy: localStorage.getItem('id'),
      feedStatus: this.state.feedStatus,
      comment: this.state.comments
    }        
    this.props.updateTsCandidate(data, null, null);
    console.log(data)
    setTimeout(() => {
      this.props.next();
    }, 2500)
  }

  setStatus(status){
    this.setState({
      feedStatus: status
    })
  }

  render(){
    const { feedStatus, comments } = this.state;   
    return(      
      <Card className="p-3 initial-screen">
        <div>
          <p className="bold label-sm center">Interview Status</p>
          <div className="initial-screen-select">
            <span
              onClick={() => this.setStatus('SELECTED')}
              className={`center bold pointer ${feedStatus === 'SELECTED' && 'select'}`}
            >
              Selected
            </span>
            <span
              onClick={() => this.setStatus('REJECTED')}
              className={`center bold pointer ${feedStatus === 'REJECTED' && 'reject'}`}
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