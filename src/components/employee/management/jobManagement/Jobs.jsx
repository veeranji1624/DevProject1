import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Col,
  Card
} from 'reactstrap'
import { GET_CAREERS } from '../../../../utils/routes'
import JobDetails from '../../../aside/JobDetails'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class Jobs extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      permissionlist: this.props.auth.permissionlist,
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
    const data = {domain:['Technology', 'Consulting', 'Sales', 'Support']};
    axios.post(
        GET_CAREERS,
        data,
        {withCredentials: true}
      )
      .then(res => {
        this.setState({
          data: res.data
        })
      })
      this.setState({
        permissionlist:this.props.auth.permissionlist
        }) 
  }
  render() {
    const { data, selection, permissionlist } = this.state;
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';

    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "4.2") {
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
          {!selection?<Link to="/employee/add/job">
            <button
              className="btn add-button white-text label-sm"
            >Add</button>
          </Link>:null}</div>:null}
          {!selection &&<h5 className="bold center pt-2">Job List</h5>}
          {selection
            ?<i
              onClick={this.back}
              className="material-icons cancel-button pointer">
              cancel
            </i>
            :null}
          <Row>
        {
          !selection
          ?data&&data.map(item => {
            return <Col md="3" key={item.jobCode} onClick={()=>this.select(item)}>
              <Card className="p-3 mb-2 shadow pointer">
                <h6>{item.jobRole}</h6>
                <p>{item.domain}</p>
              </Card>
            </Col>
          })
          :<JobDetails job={this.state.selection} back={this.back} />
        }
        </Row>
        </Container>
        {this.state.message? <Notifier message={this.state.message} />: null}
        {this.state.error? <ErrorNotifier message={this.state.error} />: null}
      </div>
    )
  }
}

Jobs.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(Jobs);
