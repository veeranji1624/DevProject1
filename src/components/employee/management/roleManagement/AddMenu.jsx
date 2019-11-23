import React, { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { ADD_USER_ROLE } from '../../../../utils/routes'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class AddMenu extends Component {
  constructor() {
    super();
    this.state = {
      menuid:'',
      menuname:'',
      groupid:'',
      message: '',
      error: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }  
  reset(){
    this.setState({
      menuid: '',
      menuname: '',
      groupid: '',
      
    })
  }
  onSubmit(e){
    e.preventDefault();
      let User = {
        menuName: this.state.menuname,
        groupId: this.state.groupid,
      }
      console.log(User);  
      axios.post(
        'http://localhost:1337/menu/create',
          User,
          {withCredentials: true}
        )
        .then(res => {          
          this.setState({message: 'Added Successfully'})
          setTimeout(() => {
            this.props.history.push('employee/user/menu');
          }, 2000)
        })
        .catch(err => {        
          this.setState({
            error: 'Could not create'
          })
        });
        setTimeout(() => {
          this.setState({
            message: '',
            error: ''
          })
        }, 5000);
  }
  render() {
    console.log(this.state);
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    return (
      <div className={shrink}>
        <h5 className="center bold">Add Menu</h5>
          <Container className="card container-card">
            <Link to="/employee/role">
              <i
                className="material-icons pointer"
                style={{position:'absolute', top: '5px', right: '5px', color: '#C00'}}
              >cancel</i>
            </Link>
            <Form onSubmit={this.onSubmit} className="p-3" >
              <Row>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Menu Name</Label>
                  <Input
                    type="text"
                    name="menuname"
                    className="form-control-sm"
                    value={this.state.menuname}
                    onChange={this.onChange}
                    placeholder="Menu Name (required)"
                    required
                  />
              </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label className="bold label-sm">Group Id</Label>
                  <Input
                    type="text"
                    name="groupid"
                    className="form-control-sm"
                    value={this.state.groupid}
                    onChange={this.onChange}
                    placeholder="Group Id (required)"
                    required
                  />
              </FormGroup>
              </Col>
            </Row>
            <div className="center">
              <button type="submit" className="btn mt-3 center login-button white-text">Create Menu</button>
            </div>
          </Form>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    );
  }
}
export default AddMenu;