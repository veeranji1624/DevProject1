import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GET_HOLIDAYS } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class CompanyHolidays extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      permissionlist: this.props.auth.permissionlist,
      message: '',
      error: ''
    }
    this.showLeaves = this.showLeaves.bind(this);
  }

  componentDidUpdate(prevProps){
    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
      })
 
    }
 
  }
  componentDidMount(){
    axios.get(GET_HOLIDAYS, {withCredentials: true})
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      .catch(err => {
        this.setState({error: 'Error fetching data'})
        setTimeout(() => {this.setState({error: ''})}, 5000)
      })

      this.setState({
        permissionlist:this.props.auth.permissionlist
        });
  }
  showLeaves(){
    return this.state.data&&
      this.state.data.map((item, index) => {
        return(
          <div 
            key={index}
            className="card p-3 m-3">
            <h6 className="bold">Holiday date : {item.phDate}</h6>
            <h6 className="bold">Occasion : {item.occassionName}</h6>
            <h6 className="bold">Day : {item.phDay}</h6>            
          </div>
        )
      }) 
  }
  render() {
    const { permissionlist } = this.state;

    let currentPermission;    


    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "5.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <div style={{position: 'relative'}}>
        {(currentPermission.create) ?
        <Link to="/employee/add/holiday">
          <button className="btn add-button label-sm white-text">Add Holiday</button>
        </Link>:null}
        <h5 className="bold center">Company Holidays</h5>
        {this.showLeaves()}
        {this.state.message&& <Notifier message={this.state.message} />}
        {this.state.error&& <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}

CompanyHolidays.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(CompanyHolidays);