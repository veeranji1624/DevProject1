import React, { Component } from 'react'

class ProjectDetailsModal extends Component{
  render(){
    return(
      <div className="project-details p-3">
        <i className="material-icons back-button mb-2" onClick={this.props.back}>cancel</i>
        <h6 className="bold">Name: <em>{this.props.project.projectName}</em></h6>
        <h6 className="bold">Status: <em>{this.props.project.status}</em></h6>
        <h6 className="bold">Description: <em>{this.props.project.description}</em></h6>
      </div>
    )
  }
}
export default ProjectDetailsModal;