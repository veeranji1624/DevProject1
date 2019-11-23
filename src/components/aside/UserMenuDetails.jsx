import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import {API} from '../../utils/routes'
import { EMPLOYEE_UPDATE } from '../../utils/routes'
import Notifier from '../aside/Notifier'
import ErrorNotifier from '../aside/ErrorNotifier'
// const options = [
//     { value: 'Managing Director', label: 'Managing Director' },
//     { value: 'Project Manager', label: 'Project Manager' },
//     { value: 'Admin', label: 'Admin' },
//     { value: 'HR Lead', label: 'HR Lead' },
//     { value: 'Accountant', label: 'Accountant' },
//     { value: 'Project Consultant', label: 'Proiject Consultant' },
//   ];
class UserMenuDetails extends Component{
  constructor(props){
    super(props);
     const {
      groupId,
      menuId,
      menuName,
     } = this.props.menus;
    this.state = {
      permissionlist: this.props.auth.permissionlist, 
      menuid: menuId,
      menuname: menuName,
      groupid: groupId,
      edit: false,
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
 
  }
  onChange(e){
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  onSubmit(e){
    e.preventDefault();
    let emp = {
      menuId: this.state.menuid,
      menuName: this.state.menuname,
      groupId: this.state.groupid,
    }
    console.log(emp);
    axios.post(
      `${API}/menu/update`,
      emp,
      {withCredentials: true}
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          message: 'Updated successfully'
        })
      })
      .catch(err => {
        console.log(err)
        // this.setState({
        //   error: 'Could not update'
          
        // })
      })
      setTimeout(() => {
        this.setState({
          message: '',
          error: ''
        })
      }, 5000)
  }
  
  componentDidMount() {
    this.setState({
      permissionlist:this.props.auth.permissionlist
      });
  }
  render(){
    // const { selectedOption } = this.state;
    console.log(this.props.employee);

    const { permissionlist } = this.state;

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.5") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return(
      <Row>
        {
        !this.state.edit
        ?(<Col md="12">
           {(currentPermission.update) ?
          <i
            className="material-icons edit-button pointer mt-4"
            style={{paddingLeft: '10px'}}
            onClick={()=>this.setState({edit:!this.state.edit})}
          >
            edit
          </i> : null }
          <h5 className="bold pointer center pt-2">Employee Menu Details</h5>
          <Row>
            <Col md="6">
              <h6 className="m-3">Menu ID : 
                <span className="blue-text">
                  { this.state.menuid }
                </span>
              </h6> 
              <h6 className="m-3">Menu Name : 
                <span className="blue-text">
                  { this.state.menuname }
                </span>
              </h6>
              <h6 className="m-3">Group ID : 
                <span className="blue-text">
                  { this.state.groupid }
                </span>
              </h6>
            </Col>
          </Row>
        </Col>)
        :(<Col md="12">
          <h5 className="bold pointer center pt-2">Update Employee Menu Details</h5>
          <Form onSubmit={this.onSubmit} className="p-3">
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Menu ID</Label>
                  <Input
                    name="menuid1"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.menuid}
                  />
                </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Menu Name</Label>
                  <Input
                    name="menuname"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.menuname}
                  />
                </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <Label className="bold label-sm">Group ID</Label>
                  <Input
                    name="groupid"
                    type="text"
                    className="form-control-sm"
                    onChange={this.onChange}
                    value={this.state.groupid}
                  />
                </FormGroup>
                </Col>
              </Row>        
                <div className="center">
                  <button
                    type="submit"
                    className="btn btn-custom"
                  >
                    Update                    
                  </button>
                </div>
            </Form>
          </Col>)}
          {this.state.message? <Notifier message={this.state.message} />: null}
          {this.state.error? <ErrorNotifier message={this.state.error} />: null}
        </Row>
      )
    }
}

UserMenuDetails.propTypes = {
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(UserMenuDetails);
