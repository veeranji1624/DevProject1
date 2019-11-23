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
import { getInquiries, updateInquiry, searchInquiries } from '../../../../../redux/actions/inquiryActions'
import { refresh } from '../../../../common/Validator'
import Details from './Details'
import UpdateInquiry from './UpdateInquiry'
import Hover from '../../../../aside/Hover'
import Notifier from '../../../../aside/Notifier'
import ErrorNotifier from '../../../../aside/ErrorNotifier'

class Inquiries extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.contacts.data,
      permissionlist: this.props.auth.permissionlist,
      selection: {},
      selected: null,
      subItem: {},
      modal: false,
      hover: false,
      cords: {},
      mouse: {},
      searchTerm: '',
      remarks: '',
      popup: false,
      update: false,
      message: '',
      error: ''
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
    if(prevProps.contacts !== this.props.contacts){
      this.setState({
        data: this.props.contacts.data
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
    this.onSearch(e.target.value);
  }
  onSearch(value){
    console.log(value);
    let data = {
      contactName: value
    }
    this.props.searchInquiries(data);
  }
  onChange(e){
    this.setState({
      remarks: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const data = this.state.data.filter(item => {
      if(item.inquiryId === this.state.subItem){
        return item;    
      }      
    });
    data[0].inqRemarks = this.state.remarks;    
    this.props.updateInquiry(data[0]);
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
      selected: item.inquiryId,
      popup: true
    })
  }
  beforeUpdate(){
    this.setState({
      update: true,
    })
  }
  afterUpdate(){
    this.setState({
      update: false,
    })
    this.getData();
    refresh();
  }
  back(){
    this.setState({
      back: !this.state.back,
      popup: false
    })
  }
  onDragOver(e){
    e.preventDefault();
  }
  onDragStart(e, item){
    e.dataTransfer.setData('item', item.inquiryId);
    this.setState({
      subItem: item.inquiryId
    })
  }
  async onDrop(e, cat){
    let id = e.dataTransfer.getData('item');
    let newData = this.state.data.filter(item => {
      if(item.inquiryId === parseInt(id, 10)){        
        item.inqStatus = cat;                
      }      
      return newData;
    })
    this.setState({
      ...this.state,
      newData
    })
    await this.toggle();
  }
  componentDidMount(){
    this.getData();
    this.setState({
      //data: this.props.customers.data,
      permissionlist:this.props.auth.permissionlist
    })
  }
  getData(){
    this.props.getInquiries();
  }
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';    
    const { data, selection, selected, modal, hover, cords, remarks, popup, update, message, error, permissionlist } = this.state;
    
    let currentPermission;

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "2.2.1") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    

    return (
      <div className={shrink}>
        {popup? <Details inquiry={selection} update={this.beforeUpdate} back={this.back} />: null}
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
        {!update?
        (<Container className="card container-card">
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
            <div className="div">
          <Link to="/employee/inquiry/add">
            <button className="btn add-button white-text label-sm">Add</button>
          </Link></div>:null}
          <h5 className="pointer bold center pt-2">Inquiries</h5>
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
                  if(item.inqStatus === 'New'){
                  return <ul
                    key={item.inquiryId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable 
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around ${selected && selected === item.inquiryId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.inquiryId}</li>
                    <li className="list-item flex-1">{item.subjectDesc}</li>
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
                  if(item.inqStatus === 'WIP'){
                  return <ul
                    key={item.inquiryId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around ${selected && selected === item.inquiryId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.inquiryId}</li>
                    <li className="list-item flex-1">{item.subjectDesc}</li>    
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
                  if((item.inqStatus !== 'New') && (item.inqStatus !== 'WIP')){
                  return <ul
                    key={ item.inquiryId }
                    onClick={() => { this.select(item) }}
                    onMouseEnter={ (e) => this.toggleHoverOn(e, item) }
                    onMouseLeave={ this.toggleHoverOff }
                    draggable
                    onDragStart={ (e) => this.onDragStart(e, item) }
                    className={ `list flex-around ${selected && selected === item.inquiryId && 'selected-item'} ${item.inqStatus === 'Complete' && 'completed-item'}` }
                  >
                    <li className="list-item pad">{ item.inquiryId }</li>
                    <li className="list-item flex-1">{ item.subjectDesc }</li>     
                  </ul>
                  }else{
                    return null;
                  }
                })
              }
            </Col>
          </Row>          
        </Container>)
        :<UpdateInquiry inquiry={selection} update={this.beforeUpdate} back={this.afterUpdate} />}
        {message? <Notifier message={message} /> :null}
        {error? <ErrorNotifier message={error} /> :null}
      </div>
    )
  }
}

Inquiries.propTypes = {
  inquiries: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getInquiries: PropTypes.func.isRequired,
  updateInquiry: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  searchInquiries: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  contacts: state.inquiries,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getInquiries, updateInquiry, searchInquiries }
)(Inquiries);