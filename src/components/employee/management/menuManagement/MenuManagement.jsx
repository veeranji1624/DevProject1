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
import  {API} from '../../../../utils/routes'
// import { USER_ROLE } from '../../../../utils/routes'
import UserMenuDetails from '../../../aside/UserMenuDetails'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class MenuManagement extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
    permissionlist: this.props.auth.permissionlist,
      //data: [],
      selection: null,
      message: '',
      error: ''
    }
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
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
      selection: item
    })
  }
  back(){
    this.setState({
      selection: false
    })
  }
  componentDidMount(){
      
    axios.get(`${API}/menu/fetch`, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data
        })
      })
    this.setState({
      permissionlist:this.props.auth.permissionlist
      }) 
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection, permissionlist } = this.state;

    let currentPermission;

    for(let x in permissionlist.response.permissions) {
            if(permissionlist.response.permissions[x].groupId == "4.5") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div className={shrink}>
        <Card className="container-card m-2">
          {(currentPermission.create) ?
          <div>
          {!selection?<Link to="/employee/AddMenu">
            <button
              className="btn add-button white-text label-sm"
              style={{position: 'absolute', top: '0px', left: '0px'}} 
            >Add</button>
          </Link>:null}</div>:null}
          {!selection &&<h5 className="bold center pt-2">Menu List</h5>}
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
                return <Col md="3" key={item.menuId} onClick={()=>this.select(item)}>
                  <Card className="p-3 mb-2 shadow pointer">
                    <h6>{`${item.menuName}`}</h6>
                    <h6>{`GroupId: ${item.groupId}`}</h6>
                    {/* <p>{item.groupId}</p> */}
                  </Card>
                </Col>
              })
              :<UserMenuDetails menus={selection} back={this.back} />
            }
          </Row>
        </Card>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

MenuManagement.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(MenuManagement);