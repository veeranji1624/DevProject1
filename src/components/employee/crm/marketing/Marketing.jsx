import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
import { getLeads, updateLead, searchLeads } from '../../../../redux/actions/leadsActions'
import { refresh } from '../../../common/Validator';
import UpdateForm from './UpdateForm'
import Details from './Details'
import Hover from '../../../aside/Hover'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class Marketing extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.leads.data || [],
      permissionlist: this.props.auth.permissionlist,
      selection: {},
      selected: {},
      hover: false,
      cords: {},
      mouse: {},
      subItem: {},
      searchTerm: '',
      modal: false,
      remarks: '',
      update: false,
      popup: false,
      message: null,
      error: null
    }
    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.back = this.back.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
    this.beforeUpdate = this.beforeUpdate.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.leads !== this.props.leads){
      this.setState({
        data: this.props.leads.data
      })
    }

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
      contactName: value
    }
    this.props.searchLeads(data);
  }
  getData(){
    this.props.getLeads();
  }
  componentDidMount(){
    this.getData()
    this.setState({
      //data: this.props.customers.data,
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
    let data = this.state.data.filter(item => {
      if(item.leadId === this.state.subItem){
        return item;
      }
    })
    data[0].leadReamarks = this.state.remarks;
    this.props.updateLead(data[0], this.props.history);
    this.toggle();
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
  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }
  select(item){
    this.setState({
      selection: item,
      selected: item.leadId,
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
    refresh();
  }
  back(){
    this.setState({
      popup: false
    })
  }
  onDragOver(e){
    e.preventDefault();
  }
  onDragStart(e, item){
    e.dataTransfer.setData('item', item.leadId);
    this.setState({
      subItem: item.leadId
    })
  }
  async onDrop(e, cat){
    let id = e.dataTransfer.getData('item');
    let newData = this.state.data.filter(item => {
      if(item.leadId === parseInt(id, 10)){
        item.leadStatus = cat;
        this.setState({
          subItem: item
        })
      }
      return newData;
    })
    this.setState({
      ...this.state,
      newData
    })
    await this.toggle();
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection, selected, hover, cords, modal, popup, remarks, update, message, error, permissionlist } = this.state;
    
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "2.2.2") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    } 
    
    return (
      <div className={shrink}>
        {popup? <Details detail={this.state.selection} update={this.beforeUpdate} back={this.back} />: null}
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
          <Link to="/employee/marketing/new">
            <button className="btn add-button  label-sm white-text">Add</button>
          </Link></div>:null}
          <h5 className="bold center p-3">
            Leads
          </h5>
          <Row className="p-1">
            <Col
              md="4"
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, 'New')}
              className="card p-2"
            >
              <h6 className="center bold m-2">New</h6>
              {
                 data && data.map(item => {
                  if(item.leadStatus === 'New'){
                  return <ul
                    key={item.leadId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable 
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.leadId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.leadId}</li>
                    <li className="list-item flex-1">{item.organizationName}</li>
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
                  if(item.leadStatus === 'WIP'){
                  return <ul
                    key={item.leadId}
                    onClick={(e) => {this.select(e, item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.leadId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.leadId}</li>
                    <li className="list-item flex-1">{item.organizationName}</li>          
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
              <h6 className="center bold m-2">Completed</h6>
              {
                 data && data.map(item => {
                  if((item.leadStatus !== 'New') && (item.leadStatus !== 'WIP')){
                  return <ul
                    key={item.leadId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.leadId && 'selected-item'} ${item.leadStatus === 'Opportunity' && 'completed-item'}`}
                  >
                    <li className="list-item pad">{item.leadId}</li>
                    <li className="list-item flex-1">{item.organizationName}</li>      
                  </ul>
                  }else{
                    return null;
                  }
                })
              }
            </Col>
          </Row>
        </Container>)
        :(
          <UpdateForm item={selection} back={this.afterUpdate} />
        )}
        {message && <Notifier message={message} />}
        {error && <ErrorNotifier message={error} />}
      </div>
    )
  }
}

Marketing.propTypes = {
  leads: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getLeads: PropTypes.func.isRequired,
  updateLead: PropTypes.func.isRequired,
  searchLeads: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  leads: state.leads,
  errors: state.errors,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getLeads, updateLead, searchLeads }
)(Marketing);