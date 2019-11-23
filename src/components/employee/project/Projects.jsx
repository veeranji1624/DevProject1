import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
import { ALL_PROJECTS, SEARCH_PROJECTS } from '../../../utils/routes'
import ProjectDetails from './ProjectDetails'
import UpdateProjects from '../../aside/UpdateProject'
import Hover from '../../aside/Hover'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'
 
class Projects extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [{projectType: 'Small', projCode: 2}],
      permissionlist: this.props.auth.permissionlist,
      selection: {},
      selected: {},
      hover: false,
      cords: {},
      mouse: {},
      searchTerm: '',
      subItem: {},            
      update: false,
      popup: false,
      message: '',
      error: ''
    }
    this.getData = this.getData.bind(this);    
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.beforeUpdate = this.beforeUpdate.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
  }

  componentDidUpdate(prevProps){
  if((prevProps.auth !== this.props.auth) ){
    this.setState({
   
      permissionlist: this.props.auth.permissionlist
    })

  }
}
  getData(){
    axios.get(ALL_PROJECTS, {withCredentials: true})
    .then(res => {
      this.setState({
        data: res.data
      })
    })
  }
  componentDidMount(){
    this.getData();
    this.setState({
      permissionlist:this.props.auth.permissionlist
      })
  }
  select(item){
    this.setState({
      selection: item,
      popup: true
    })
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
  }
  back(){
    this.setState({
      popup: false
    })
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
    axios.post(SEARCH_PROJECTS, data, {withCredentials: true})
      .then(res => {        
        this.setState({
          data: res.data
        })
      })
  }
  toggleHoverOn(e, item){
    this.setState({
      hover: true,
      cords: {
        one: item.subjectDesc,
        two: item.messageDesc
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
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection, selected, hover, cords, popup, update, message, error, permissionlist } = this.state;
    
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "3.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    } 
    
    
    return (
      <div className={shrink}>
        {popup && <ProjectDetails detail={selection} update={this.beforeUpdate} back={this.back} />}
        {!update?(<Container className="card container-card">
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
          <h5 className="bold pointer center pt-2">Projects and Services</h5>
          <Row>
            <Col
              md="4"
              className="card p-2"
            >
              <h6 className="center bold m-2">Small Projects</h6>
              {
                 data && data.map(item => {
                  if(item.projectType === 'Small'){
                  return <ul
                    key={item.projCode}                    
                    onClick={(e) => this.select(item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
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
            >
              <h6 className="center bold m-2">Large Projects</h6>
              {
                 data && data.map(item => {
                  if(item.projectType === 'Large'){
                  return <ul
                    key={item.projCode}
                    onClick={e => this.select(item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
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
            >
              <h6 className="center bold m-2">Services</h6>
              {
                 data && data.map(item => {
                  if(item.projectType === 'Service'){
                  return <ul
                    key={item.projCode}
                    onClick={(e) => this.select(item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
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
        :<UpdateProjects item={selection} back={this.afterUpdate} />}
        {message && <Notifier message={message} />}
        {error && <ErrorNotifier message={error} />}
      </div>
    )
  }
}

Projects.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Projects);