import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Row,
  Col,
  Card
} from 'reactstrap'
import {API} from '../../../../utils/routes'
import ADDACCESS from './AddAccess'
 import { getAccess } from '../../../../redux/actions/accessAction'
import { EMPLOYEE_LIST } from '../../../../utils/routes'
import EmployeeDetails from '../../../aside/EmployeeDetails'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'
import MenuDetails from './MenuDetails'

class Menus extends Component {
  constructor(props){
    super(props);
    this.state = {
      data1:  [],
      data: this.props.access.data,
      permissionlist: this.props.auth.permissionlist,
      selection: null,
      selected: null,
      searchTerm: '',
      message: '',
      groupId: null,
      error: ''
    }
     this.getData = this.getData.bind(this);
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidUpdate(prevProps){
    if((prevProps.access !== this.props.access) ){
      this.setState({
        data: this.props.access.data,
        
      })
    }
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
        permissionlist: this.props.auth.permissionlist
      })
  
    }
  }
  select(item){
    this.setState({
      selection: item,
      selected: item.compCode,
      groupId: item.groupId,
      hover: false
    })
  }
  search(e){
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    })
    //this.onSearch(e.target.value)
  }
  onSearch(value){
    let data = {
      compFullName: value
    }
    //this.props.searchCustomer(data);
  }
  back(){
    this.setState({
      selection: false
    })
  }
  getData(){    
    this.props.getAccess();
  }
  componentDidMount(){
     this.getData();
    axios.get(`${API}/menu/fetch`, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        this.setState({
          data1: res.data
        })
      })
      this.setState({
        permissionlist:this.props.auth.permissionlist
        })
        console.log(this.state.data);
  }
  render() {
    console.log(this.state.groupId)
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data1, selection, permissionlist, selected, data} = this.state;

    // console.log(data[x].groupId)
    // console.log(data[x].roleId)
    console.log(this.props.roleId)
    let ACCESS;
    for(let x in data) {
      console.log(data[x].groupId)
    console.log(data[x].roleId)
      if ((data[x].groupId == this.state.groupId) && (data[x].roleId == this.props.roleId)) {
        ACCESS = data[x]
        console.log('if condition is true')
      } else {
        console.log('first if condition for group id false')
      }
    }
    console.log(ACCESS)
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.3") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      // <div className={shrink}>
        <Row>
         {/* <div className={shrink}> */}
        {/* <Card className="container-card m-2"> */}
          {/* {(currentPermission.create)?
          <div>
          {!selection&&<Link to="/employee/add/menu">
            <button
              className="btn add-button white-text label-sm"
              style={{marginLeft: '-15px'}}
            >Add</button>
          </Link>}</div>:null} */}
          {!selection &&<Row><Col md="12"><h5 className="bold center pt-2">Menus List</h5></Col></Row>}
          {!selection && 
          <input
            type="text"
            onChange={this.search}
            value={this.state.searchTerm}
            className="searchfield form-control-sm mr-3"
            placeholder="Search" />} 
            {selection
            ?<i
              onClick={this.back}
              className="material-icons pointer cancel-button">
              cancel
            </i>
            :null} 
            <Col md="12"> 
            <Row className="pt-3" onMouseMove={this.onMouseMove}>
          {
          !selection
            ?
              data1 && data1.map(item => {
              return (
                <Col
                  md="3"
                  key={item.menuId}
                  className={`list flex-around p-0 m-0 mb-2 ${(selected && selected === item.menuId) && 'selected-item'}`}
                  onClick={()=>this.select(item)}
                  // onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                  // onMouseLeave={this.toggleHoverOff}>
                  >
                  <p className="list-item flex-1 center pt-2">{item.menuName}</p>
                   {/* <p className="list-item flex-1">{item.groupId}</p>  */}
                </Col>
              )
            })
           : (ACCESS) ? <MenuDetails  back={this.back} MenuAccess={ACCESS} roleId={this.props.roleId} groupId={this.state.groupId}/> : <ADDACCESS back={this.back} roleId={this.props.roleId} groupId={this.state.groupId} />
          }
          </Row>
          </Col>
        {/* </Card> */}
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
       {/* </div> */}
      </Row>
      // </div>
    )
  }
}

Menus.propTypes = {
  auth: PropTypes.object.isRequired,
  getAccess: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
   access: state.access,
})

export default connect(
  mapStateToProps,
  {getAccess}
)(Menus);

