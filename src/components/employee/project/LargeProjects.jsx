//  eslint-disable
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import {
  getProjects,
  updateProject,
  searchProjects
} from '../../../redux/actions/projectActions'
import { ALL_PROJECTS, SEARCH_PROJECTS, UPDATE_PROJECT } from '../../../utils/routes'
import { refresh } from '../../common/Validator';
import LargeProjectDetails from './LargeProjectDetails'
import UpdateProject from '../../aside/UpdateProject'
import Hover from '../../aside/Hover'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class LargeProjects extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      permissionlist: this.props.auth.permissionlist,
      subItem: {},
      selecion: null,
      selected: {},
      hover: false,
      cords: {},
      mouse: {},
      searchTerm: '',
      update: false,
      popup: false,
      modal: false,
      remarks: '',      
      message: null,
      error: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.getData = this.getData.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.beforeUpdate = this.beforeUpdate.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
  }
  // componentDidUpdate(prevProps){
  //   if(prevProps.projects !== this.props.projects){
  //     this.setState({ data: this.props.projects.data })
  //   }
  // }
  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
        permissionlist: this.props.auth.permissionlist
      })
  
    }
  }
  search(e){
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
    this.onSearch(e.target.value)
  }
  onSearch(value){
    let data = {
      projectName: value
    }
    //this.props.searchProjects(data);
    axios.post(SEARCH_PROJECTS, data, {withCredentials: true})
      .then(res => {        
        this.setState({
          data: res.data
        })
      })
  }
  getData(){
    //this.props.getProjects();
    axios.get(ALL_PROJECTS, {withCredentials: true})
    .then(res => {
      this.setState({
        data: res.data
      })
    })
  }
  componentDidMount(){
    this.getData()
    this.setState({
      permissionlist:this.props.auth.permissionlist
      })
  }
  onChange(e){
    this.setState({
      remarks: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const data = this.state.data.filter(item => {
      if(item.projCode === this.state.subItem){
        return item;
      }
    })
    data[0].comment = this.state.remarks;
    //this.props.updateSales(data[0])
    axios.post(UPDATE_PROJECT, data[0], {withCredentials: true})
      .then(res => {        
        this.setState({
          message: 'Updated successfully'
        })
      })
      .catch(res => {        
        this.setState({
          error: 'Could not update'
        })
      })
      setTimeout(() => {
        this.setState({
          message: null,
          error: null
        })
      }, 2000)
    this.toggle();
  }
  toggleHoverOn(e, item){
    this.setState({
      hover: true,
      cords: {
        one: item.projectType,
        two: item.projCode
      },
      mouse: {
        x: e.screenX,
        y: e.screenY
      }
    })
  }
  toggleHoverOff(){
    this.setState({
      hover: false
    })
  }
  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }
  onDragOver(e){
    e.preventDefault();
  }
  select(item){
    this.setState({
      selection: item,
      selected: item.projCode,
      popup: true
    })
  }
  onDragStart(e, item){
    e.dataTransfer.setData('item', item.projCode);
    this.setState({
      subItem: item.projCode
    })
  }
  async onDrop(e, cat){
    let id = e.dataTransfer.getData('item');
    let newData = this.state.data.filter(item => {
      if(item.projCode === parseInt(id, 10)){
        item.status = cat;
      }
      return newData;
    })
    this.setState({
      ...this.state,
      newData
    })
    await this.toggle();
  }
  beforeUpdate(){
    this.setState({
      update: true
    })
  }
  afterUpdate(){
    this.setState({
      update: false
    })
    this.getData();
    refresh();
  }
  back(){
    this.setState({
      popup: false
    })
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink = 'no-scale';
    const { data, selection, selected, hover, cords, modal, popup, remarks, update, message, error, permissionlist } = this.state;
    
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "3.3") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    } 
    
    return (
      <div className={shrink}>
        {popup && <LargeProjectDetails detail={selection} update={this.beforeUpdate} back={this.back} />}
        <Modal isOpen={modal} toggle={this.toggle}>        
          <ModalHeader toggle={this.toggle}>Confirm changes?</ModalHeader>
          <ModalBody>
            <Form className="p-3" onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="bold label-sm">Remarks</Label>
                <Input name="remarks" onChange={this.onChange} value={remarks} />
              </FormGroup>
              <FormGroup className="center">
                <button type="submit" className="btn login-button white-text">Submit</button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {!update
        ?(<Container className="card container-card">
          <input          
            type="text"
            onChange={this.search}
            value={this.state.searchTerm}
            className="searchfield form-control-sm"
            placeholder="Search" />
          {hover &&
          <Hover
            cords={cords}
            labels={{one: 'Subject', two: 'Message'}}
            mouse={this.state.mouse} />}
            {(currentPermission.create)?
            <div>
          <Link to="/employee/add/project">
            <button className=" btn add-button white-text label-sm">Add</button>
          </Link></div>:null}
          <h5 className="bold pointer center pt-2">Large Projects</h5>
          <Row>
          <Col
              md="4"
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, 'New')}
              className="card p-2"
            >
              <h6 className="center bold m-2">New</h6>
              {
                 data && data.map(item => {
                  if((item.projectType === 'Large') && (item.status === 'New')){
                  return <ul
                    key={item.projCode}
                    onClick={() => this.select(item)}
                    draggable
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.projectName}</li>
                    <li className="list-item pad">{item.location}</li>
                  </ul>
                  }else{
                    return null;
                  }
                })
              }       
            </Col>            
            <Col
              md="4"
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, 'WIP')}
              className="card p-2"
            >
              <h6 className="center bold m-2">Work in progress</h6>
              {
                 data && data.map(item => {
                  if((item.projectType === 'Large') && (item.status === 'WIP')){
                  return <ul
                    key={item.projCode}
                    onClick={() => this.select(item)}
                    draggable
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.projectName}</li>
                    <li className="list-item pad">{item.location}</li>
                  </ul>
                  }else{
                    return null;
                  }
                })
              }
            </Col>
            <Col
              md="4"
              className="card p-2"
              onDrop={e => this.onDrop(e, 'Complete')}
              onDragOver={this.onDragOver}
            >
              <h6 className="center bold m-2">Others</h6>
              {
                 data && data.map(item => {
                  if((item.projectType === 'Large') && (item.status !== 'New') && (item.status !== 'WIP')){
                  return <ul
                    key={item.projCode}
                    onClick={() => this.select(item)}
                    draggable
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.projectName}</li>
                    <li className="list-item pad">{item.location}</li>
                  </ul>
                  }else{
                    return null;
                  }
                })
              }
            </Col>
          </Row>
        </Container>)
        :<UpdateProject item={selection} back={this.afterUpdate} />
        }
        {message? <Notifier message={message} /> :null}
        {error? <ErrorNotifier message={error} /> :null}
      </div>
    )
  }
}

LargeProjects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  searchProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired, 
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getProjects, updateProject, searchProjects }
)(LargeProjects);