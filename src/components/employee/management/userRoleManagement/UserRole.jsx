import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Hover from '../../../aside/Hover'
// import axios from 'axios'
import {
  Row,
  Col,
  Container
} from 'reactstrap'
// import { USER_ROLE } from '../../../../utils/routes'
import UserRoleDetails from '../../../aside/UserRoleDetails'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class UserRole extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[{
      firstName:'Harish',
      lastName:'B',
      primaryrole:'SM',
      secondaryrole:['MD','CM','PM'],
      empid:'1004',
      },
      {
        firstName:'Harish1',
        lastName:'c',
        primaryrole:'MD',
        secondaryrole:['employee','student','HR','Developer'],
        empid:'1005', 
      }
    ],
    permissionlist: this.props.auth.permissionlist,
      // data: [],
      selection: null,
      selected: null,
      searchTerm: '',
      hover: false,
      message: '',
      error: ''
    }
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidUpdate(prevProps){
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
      hover: false
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
      compFullName: value
    }
    //this.props.searchCustomer(data);
  } 
  // item.secondaryrole.map((item) => `${item}.join(' ')`)
  toggleHoverOn(e, item){    
    this.setState({
      hover: true,
      cords:{
        one: item.secondaryrole.join(", ")
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
  back(){
    this.setState({
      selection: false
    })
  }
   componentDidMount(){
  //   let user ={
  //      FirstName : this.state.firstName,
  //      LastName : this.state.lastName,
  //      PrimaryRole: this.state.primaryrole,
  //      Empid : this.state.empid,
  //   }
      //console.log(user);
    // axios.get(USER_ROLE, {withCredentials: true})
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       data: res.data
    //     })
    //   })

    this.setState({
      permissionlist:this.props.auth.permissionlist
      })
   }
  render() {
    let shrink;
    
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection, permissionlist, selected } = this.state;

    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.4") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div className={shrink}>
        <Container className="card container-card">
          {(currentPermission.create) ?
          <div>
          {!selection?<Link to="/employee/add/user/role">
            <button
              className="btn add-button white-text label-sm"
              style={{position: 'absolute', top: '0px', left: '0px'}} 
            >Add</button>
          </Link>:null}</div>:null}
          {this.state.hover && 
          <Hover
            labels={{one: 'Secondary Roles'}}
            cords={this.state.cords}
            mouse={this.state.mouse} />} 
          {!selection &&<h5 className="bold center pt-2">Employee List</h5>}
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
          <Row className="mt-3">
            {
              !selection
              ?data&&data.map(item => {
                return <Col md="3" key={item.empId} 
                className={`list flex-around p-0 m-0 mb-2 ${(selected && selected === item.empID) && 'selected-item'}`}
                onClick={()=>this.select(item)}
                onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                onMouseLeave={this.toggleHoverOff}>
                  <p className="list-item pad mt-2">{`${item.firstName}`} </p>
                  <p className="list-item flex-1 mt-2">PrimaryRole <small>{item.primaryrole}</small></p>
                  <p className="list-item flex-1 mt-2">EmpID<br /> <small>{item.empid}</small></p> 
                </Col>
              })
              :<UserRoleDetails employee={selection} back={this.back} />
            }
          </Row>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

UserRole.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(UserRole);