import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Menus from './Menus'
import axios from 'axios'
import {
  Container,
  Row,
  Col
} from 'reactstrap'
// import {
//   getCustomers,
//   updateCustomer,
//   searchCustomer
// } from '../../../redux/actions/customerAction'
import {API} from '../../../../utils/routes'
import CustomerDetails from '../../../aside/CustomerDetails'
import Hover from '../../../aside/Hover'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class Roles extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
     roleId: null,
     permissionlist: this.props.auth.permissionlist,
      selection: null,
      selected: null,
      searchTerm: '',
      hover: false,
      cords: {},
      mouse: {},
      message: '',
      error: ''
    }
   // this.getData = this.getData.bind(this);
    this.select = this.select.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.back = this.back.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
  }
  componentDidUpdate(prevProps){
    console.log(this.props.auth);
    // if((prevProps.customers !== this.props.customers) ){
    //   this.setState({
    //     data: this.props.customers.data,
        
    //   })
    // }
   
      if((prevProps.auth !== this.props.auth) ){
        this.setState({
       
         permissionlist: this.props.auth.permisssionlist
        })
   
      }
   
   
   
  }
  select(item){
    this.setState({
      selection: item,
      selected: item.compCode,
      roleId: item.roleId,
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

  toggleHoverOn(e, item){    
    this.setState({
      hover: true,
      cords:{
        one: item.compFullName,
        two: item.compRemarks
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
      selection: null
    });
    //this.getData();
  }
//   getData(){    
//     this.props.getCustomers();
//   }
  componentDidMount(){
    // this.getData();
    axios.get(`${API}/role/fetch`) 
    .then(response => {
      this.setState({
        data : response.data
      })
      console.log(this.state.data)
    })
    .catch(error => {
      console.log(error)
    })
    this.setState({
      //data: this.props.customers.data,
      permissionlist:this.props.auth.permissionlist
    })
  }
  render() {
     let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    console.log(this.props);

    const { selection, selected, data, message, error, permissionlist} = this.state; 
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
       <div className={shrink}>
        <Container className="card container-card">
      <Row>
          {this.state.hover && 
          <Hover
            labels={{one: 'Problem Statement', two: 'Use case'}}
            cords={this.state.cords}
            mouse={this.state.mouse} />}

        {/* {(currentPermission.create)? 
          <div className = "dive">
          {!selection&&<Link to="/employee/add/role">
         
          <button
              className="btn add-button white-text label-sm"
              style={{position: 'absolute', top: '0px', left: '0px'}}  
            >Add</button>
          </Link>}</div>:null} */}
          {!selection &&<Row><Col md="12"><h5 onClick={ this.back } className="pointer bold center mb-4 pt-2 mr-10">
            Roles List
          </h5></Col></Row>}
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
          :null }
          <Col md="12">
          <Row className="pt-3" onMouseMove={this.onMouseMove}>
          {
          !selection
            ?
              data && data.map(item => {
              return (
                <Col
                  md="3"
                  key={item.roleId}
                  className={`list flex-around p-0 m-0 mb-2 ${(selected && selected === item.roleId) && 'selected-item'}`}
                  onClick={()=>this.select(item)}
                  onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                  onMouseLeave={this.toggleHoverOff}>
                  <p className="list-item flex-1 center pt-2">{`${item.roleId} (${item.roleName})`}</p>
                  {/* <p className="list-item flex-1">{item.primaryRole}</p> */}
                </Col>
              )
            })
           :<Menus roleId={this.state.roleId}/>  
          }
          </Row> 
          </Col>          
          {message && <Notifier message={message} />}
          {error && <ErrorNotifier message={error} />}
        {/* </Container> */}
      {/* </div> */}
      </Row>
     </Container>
   </div>
    )
  }
}

Roles.propTypes = {
  //getCustomers: PropTypes.func.isRequired,
  //updateCustomer: PropTypes.func.isRequired,
  //searchCustomer: PropTypes.func.isRequired,
  //customers: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  //customers: state.customers,
  errors: state.errors,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(Roles);