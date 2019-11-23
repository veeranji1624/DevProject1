import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {	
	Row,
	Col,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap'
import { updateIdea } from '../../../../redux/actions/ideaActions'
import { Validator, submitValidator, errors } from  '../../../common/Validator'
import FormComponent from '../../../common/FormComponent'
import DocumentUpload from './DocumentUpload'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'
 
class ViewIdea extends Component{
	constructor(props){
		super(props);
		const {
			ideaCode,
			creatorId,
			businessDesc,
			useCase,
			solution,
			customers,
			remarks,
			createdOn,
			problemStmt,
			benefits,
			updatedBy,
      updatedOn,			
			status
		} = this.props.idea;
		this.state = {
      permissionlist: this.props.auth.permissionlist, 
			id: ideaCode,
      useCase: useCase,
			creator: creatorId,
			customers: customers,
			problem: problemStmt,
			benefits: benefits,
			solution: solution,
			businessDesc: businessDesc,
			status: status,
			remarks: remarks,
      createdOn: createdOn,
      updatedOn: updatedOn,
      updatedBy: updatedBy,
			edit: false,
			message: null,
			error: null
		}
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
     console.log(this.state.permissionlist);
	}
  componentDidUpdate(prevProps){
    if(prevProps.message){
      setTimeout(() => {
        this.props.back();
      }, 2000)
    }

    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
        permissionlist: this.props.auth.permissionlist
      })
  
    }
  }
  onChange(e){
    e.preventDefault();
    Validator(e.target);
		this.setState({
			[e.target.name]: e.target.value
		})
	}
  onSubmit(e){
		e.preventDefault();
    submitValidator(e.target);
		let idea = {
      ideaCode: this.state.id,			
			problemStmt: this.state.problem,
			benefits: this.state.benefits,						
			status: this.state.status,
			updatedBy: localStorage.getItem('id'),
			remarks: this.state.remarks,            
      businessDesc: this.state.businessDesc,
      useCase: this.state.useCase,
      solution: this.state.solution,
      customers: this.state.customers,      
		}
    if(errors.valid){
  		this.props.updateIdea(idea, this.props.history);
    }else{
      this.setState({
        error: 'Enter all mandatory fields'
      })
      setTimeout(() => {
        this.setState({
          error: ''
        })
      }, 5000)
    }
  }

  componentDidMount(){
    this.setState({
      permissionlist:this.props.auth.permissionlist
      }) 
    }
  render(){
    const {permissionlist} = this.state;
    let currentPermission;
    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "1.2") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    } 
		return(
			<div className="project-details p-3">
				{!this.state.edit
					?(<Col md="12">
						<i
							className="material-icons pointer cancel-button"
							onClick={() => this.props.cancel()}
						>
							cancel
						</i>
						<h5 className="bold center mb-2">Idea Details</h5>
            <Row>
              <Col md="6">
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Problem statement</span>
                  <span className="label-sm grouped-item">{ this.state.problem }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Use Cases</span>
                  <span className="label-sm grouped-item">{ this.state.useCase }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Benefits</span>
                  <span className="label-sm grouped-item">{ this.state.benefits }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Solution</span>
                  <span className="label-sm grouped-item">{ this.state.solution }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Status</span>
                  <span className="label-sm grouped-item">{ this.state.status }</span>
                </li>
    						<li className="list-group-item">
                  <span className="label-sm bold grouped-item">Created by</span>
                  <span className="label-sm grouped-item">{ this.state.creator }</span>
                </li>    						
              </ul>
              </Col>
              <Col md="6">
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Business Description</span>
                  <span className="label-sm grouped-item">{ this.state.businessDesc }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Customers</span>
                  <span className="label-sm grouped-item">{ this.state.customers }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Created on</span>
                  <span className="label-sm grouped-item">{ this.state.createdOn }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Updated by</span>
                  <span className="label-sm grouped-item">{ this.state.updatedBy }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Modified on</span>
                  <span className="label-sm grouped-item">{ this.state.modifiedOn }</span>
                </li>
                <li className="list-group-item">
                  <span className="label-sm bold grouped-item">Remarks</span>
                  <span className="label-sm grouped-item">{ this.state.remarks }</span>
                </li>
              </ul>
              </Col>
            </Row>
            {(currentPermission.update) ?
            <div className="div">
            <div className="center">
    					 <button
    						className="btn login-button white-text m-2"					
    						onClick={() => this.setState({ edit:!this.state.edit })}
    					>
							 Update
						  </button> 
            </div>
            <hr /> 
            <DocumentUpload idea={this.props.idea.ideaCode} /></div>:null}
					</Col>)
				:(<Form onSubmit={this.onSubmit} className="p-3" style={{position: 'relative'}} noValidate>
						<i
							className="material-icons pointer cancel-button "
							onClick={() => this.setState({ edit:!this.state.edit })}
						>
							cancel
						</i>
					<h5 className="center bold">Update Idea</h5>
					<Row>
						<Col md="6">																				
							<FormComponent
                labelClass="bold label-sm"
                label="Business Description"
                type="text"
                name="businessDesc"
                value={this.state.businessDesc}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Problem Statement"
                type="text"
                name="problem"
                value={this.state.problem}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Solution"
                type="text"
                name="solution"
                value={this.state.solution}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Benefits"
                type="text"
                name="benefits"
                value={this.state.benefits}
                change={this.onChange}
                required={true}
              />
							</Col>
							<Col md="6">
              <FormComponent
                labelClass="bold label-sm"
                label="Use Case"
                type="text"
                name="useCase"
                value={this.state.useCase}
                change={this.onChange}
                required={true}
              />
              <FormComponent
                labelClass="bold label-sm"
                label="Customers"
                type="text"
                name="customers"
                value={this.state.customers}
                change={this.onChange}
              />
							<FormGroup>
								<Label className="label-sm bold">Status</Label>
								<Input
									name="status"
									type="select"
									className="form-control-sm"
									onChange={this.onChange}
									value={this.state.status}
								>
									<option value="New">New</option>
									<option value="Approved">Approved</option>
									<option value="Evolution">Evolution</option>
									<option value="Rejected">Rejected</option>
									<option value="Resubmitted">Resubmitted</option>
								</Input>
							</FormGroup>
              <FormComponent
                labelClass="bold label-sm"
                label="Remarks"
                type="text"
                name="remarks"
                value={this.state.remarks}
                change={this.onChange}
                required={true}
              />
						</Col>
					</Row>
					 <div className="center">
						<button type="submit" className="btn btn-custom">Update</button>
					</div>      
				</Form>)
				}				
				{this.props.msg.message && <Notifier message={this.props.msg.message} />}
				{this.state.error && <ErrorNotifier message={this.state.error} />}
			</div>
		)
  }
}

ViewIdea.propTypes = {
  idea: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateIdea: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  msg: state.idea,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { updateIdea }
)(ViewIdea);