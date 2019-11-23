/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { getIdea, updateIdea, searchIdea } from '../../../../redux/actions/ideaActions'
import { refresh } from '../../../common/Validator'
import ViewIdea from './ViewIdea'
import Hover from '../../../aside/Hover'
import Notifier from '../../../aside/Notifier'
import ErrorNotifier from '../../../aside/ErrorNotifier'
 
class InnovativeIdea extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.idea.data || [],
      permissionlist: this.props.auth.permissionlist,
      subItem: {},
      selection: null,
      hover: false,
      cords: {},
      mouse: {},
      popup: false,
      searchTerm: '',
      selected: '',
      modal: false,
      message: null,
      error: null
    }
    this.getData = this.getData.bind(this);
    this.select = this.select.bind(this);
    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);    
    this.cancel = this.cancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.toggleHoverOn = this.toggleHoverOn.bind(this);
    this.toggleHoverOff = this.toggleHoverOff.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.idea !== this.props.idea){
      this.setState({
        data: this.props.idea.data
      })
    }

    if((prevProps.auth !== this.props.auth) ){
      this.setState({
     
       permissionlist: this.props.auth.permisssionlist
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
      customers: value
    }
    this.props.searchIdea(data);
  }
  select(item){
    this.setState({
      selection: item,
      selected: item.ideaCode,
      popup: true
    })
  }  
  cancel(){
    this.setState({
      popup: false
    })
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
      if(item.ideaCode === this.state.subItem){
        return item
      }
    })
    data[0].remarks = this.state.remarks;    
    this.props.updateIdea(data[0]);
    this.toggle();
  }
  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }
  componentDidMount(){
    this.getData();
    refresh();
    this.setState({
    permissionlist:this.props.auth.permissionlist
    });
  }
  getData(){
    this.props.getIdea();
  }
  toggleHoverOn(e, item){
    this.setState({
      hover: true,
      cords: {
        one: item.projCode,
        two: item.status
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
  onDragOver(e){
    e.preventDefault();
  }
  onDragStart(e, item){
    e.dataTransfer.setData('item', item.ideaCode);
    this.setState({
      subItem: item.ideaCode
    })
  }
  async onDrop(e, cat){
    let id = e.dataTransfer.getData('item');    
    let newData = this.state.data.filter(item => {
      if(item.ideaCode === parseInt(id, 10)){
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
    console.log(JSON.stringify(permissionlist));
    let shrink;
    this.props.sidebar? shrink = 'scale': shrink =  'no-scale';
    const { data, selection, selected, hover, cords, popup, modal, remarks, permissionlist } = this.state;
    let currentPermission;
    
    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == "1.2") {
        currentPermission = permissionlist.response.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return(
      <div className={shrink}>
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
        {!popup?
        (<Card className="container-card m-2">
          <input
            type="text"
            onChange={this.search}
            value={this.state.searchTerm}
            className="searchfield form-control-sm"
            placeholder="Search" />
          {hover &&
          <Hover
           labels={{one: 'ideaCode', two: 'Remarks'}}
           cords={cords}
           mouse={this.state.mouse} />}
           {(currentPermission.create)? 
           <div className="div">
          <Link to="/employee/new/idea">
            <button
              className="btn add-button white-text label-sm"
              style={{position: 'absolute', top: '0px', left: '0px'}}  
            >Add</button>
          </Link></div>:null}
          <h4
            onClick={ this.back }
            className="pointer center bold pt-2"
          >
            Innovations
          </h4>
          <Row className="p-1">
            <Col
              md="4"
              onDragOver={this.onDragOver}
              onDrop={e => this.onDrop(e, 'New')}
              className="card p-2"
            >
              <h6 className="center bold m-2">New Ideas</h6>
              {
                 data && data.map(item => {
                  if(item.status === 'New'){
                  return <ul
                    key={item.ideaCode}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable 
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.ideaCode && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.ideaCode}</li>
                    <li className="list-item pad">{item.problemStmt}</li>
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
              onDrop={e => this.onDrop(e, 'Evaluation')}
              className="card p-2"
            >
              <h6 className="center bold m-2">Evaluation</h6>
              {
                 data && data.map(item => {
                  if(item.status === 'Evaluation'){
                  return <ul
                    key={item.ideaCode}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.ideaCode && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.ideaCode}</li>
                    <li className="list-item pad">{item.problemStmt}</li>      
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
              <h6 className="center bold m-2">Others</h6>
              {
                 data && data.map(item => {
                  if(item.status !== 'New' && item.status !== 'Evaluation'){
                  return <ul
                    key={item.ideaCode}
                    onClick={() => {this.select(item)}}
                    onMouseEnter={(e) => this.toggleHoverOn(e, item)}
                    onMouseLeave={this.toggleHoverOff}
                    draggable
                    onDragStart={(e) => this.onDragStart(e, item)}
                    className={`list flex-around pointer ${selected && selected === item.saleId && 'selected-item'}`}
                  >
                    <li className="list-item pad">{item.ideaCode}</li>
                    <li className="list-item pad">{item.problemStmt}</li>                
                  </ul>
                  }else{
                    return null;
                  }
                })
              }
            </Col>
            {this.state.message && <Notifier message={this.state.message} />}
            {this.state.error && <ErrorNotifier message={this.state.error} />}
          </Row>
        </Card>)
        :<ViewIdea idea={selection} back={this.back} cancel={this.cancel} />
        }
        {this.props.idea.message && <Notifier message={this.props.idea.message} />}
      </div>
    )
  }
}

InnovativeIdea.propTypes = {
  idea: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getIdea: PropTypes.func.isRequired,
  updateIdea: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  searchIdea: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  idea: state.idea,
  errors: state.errors,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getIdea, updateIdea, searchIdea }
)(InnovativeIdea);