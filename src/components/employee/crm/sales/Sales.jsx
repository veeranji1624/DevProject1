/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
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
  getSales,
  updateSales,
  searchSales
} from '../../../../redux/actions/salesActions'
import { refresh } from '../../../common/Validator'
import UpdateForm from './UpdateForm'
import Details from './Details'
import Hover from '../../../aside/Hover'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'

class Sales extends Component {
  constructor(props){
    super(props);
    this.state = {
      //permissionlist: this.props.auth.permissionlist,
      data: this.props.sales.data || [{
        saleId: 1,
        customerName: 'Axis',
        status: 'New'
      }],
      permissionlist: this.props.auth.permissionlist,
      subItem: {},
      selection: {},
      selected: {},
      searchTerm: '',
      hover: false,
      cords: {},
      mouse: {},
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
    if(prevProps.sales !== this.props.sales){
      this.setState({
        data: this.props.sales.data
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
      customerName: value
    }
    this.props.searchSales(data);
  }
  componentDidMount(){
    this.getData();
    refresh();
    this.setState({
    permissionlist:this.props.auth.permissionlist
    })
  }
  getData(){
    this.props.getSales();
  }
  onChange(e){
    e.preventDefault();
    this.setState({
      remarks: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const data = this.state.data.filter(item => {
      if(item.saleId === this.state.subItem){
        return item;
      }
    })
    data[0].remarks = this.state.remarks;
    this.props.updateSales(data[0]);
    this.toggle();
  }
  toggleHoverOn(e, item){
    this.setState({
      hover: true,
      cords: {
        one: item.customerContactName,
        two: item.remarks
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
      selected: item.saleId,
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
    e.dataTransfer.setData('item', item.saleId);
    this.setState({
      subItem: item.saleId
    })
  }
  async onDrop(e, cat){
    let id = e.dataTransfer.getData('item');
    console.log(id);
    let newData = this.state.data.filter(item => {
      if(item.saleId === parseInt(id, 10)){
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
  render() {
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink = 'no-scale';
    const { data, selection, selected, hover, cords, modal, remarks, popup, update, permissionlist } = this.state;
    
    let currentPermission
    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "2.3") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    } 
    
    
    return (
      <div className={shrink}>
        {popup? <Details detail={selection} update={this.beforeUpdate} back={this.back} />: null}
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
           labels={{one: 'CC Name', two: 'Remarks'}}
           cords={cords}
           mouse={this.state.mouse} />}
           {(currentPermission.create)?
           <div>
          <Link to="/employee/sales/new">
            <button className="btn add-button label-sm white-text">Add</button>
          </Link></div>:null}
          <h5 className="bold center p-3">
            Sales Summary
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
                  if(item.status === 'New'){
                  return <ul
                    key={item.saleId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable 
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.saleId}</li>
                    <li className="list-item flex-1">{item.customerName}</li>
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
                  if(item.status === 'WIP'){
                  return <ul
                    key={item.saleId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.saleId}</li>
                    <li className="list-item flex-1">{item.customerName}</li>    
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
                  if((item.status !== 'New') && (item.status !== 'WIP')){
                  return <ul
                    key={item.saleId}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'} ${item.status === 'Won' && 'completed-item'}`}
                  >
                    <li className="list-item pad">{item.saleId}</li>
                    <li className="list-item flex-1">{item.customerName}</li>                
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
        {this.state.message && <Notifier message={this.state.message} />}
        {this.state.error && <ErrorNotifier message={this.state.error} />}
      </div>
    )
  }
}

Sales.propTypes = {
  getSales: PropTypes.func.isRequired,
  updateSales: PropTypes.func.isRequired,
  searchSales: PropTypes.func.isRequired,
  sales: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  sales: state.sales,
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getSales, updateSales, searchSales }
)(Sales);