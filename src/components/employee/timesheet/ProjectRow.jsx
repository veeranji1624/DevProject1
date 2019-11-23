import React, { Component } from 'react'
 import PropTypes from 'prop-types'
 import { connect } from 'react-redux'
import axios from 'axios';
import { API, SUBMIT_TIMESHEET } from '../../../utils/routes'
import Notifier from '../../aside/Notifier'
import ErrorNotifier from '../../aside/ErrorNotifier'

class ProjectRow extends Component {
  constructor(props){
    console.log("ProjectRow constructor")
    super(props);
      this.state = {
        permissionlist: this.props.auth.permissionlist,
        searchData: {},
        searchTerm: '',
        message: '',
        error: '',
        count: 1
      }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.searchProject = this.searchProject.bind(this);
  }

  componentDidMount(){
    console.log("ProjectRow componentDidMount")
    // localStorage.removeItem(`data${this.props.identity}`)
    // console.log(this.props.identity);
    let save = JSON.parse(localStorage.getItem(`data${this.props.identity}`));    
    if (save){
      this.setState({
        searchData: save
      })
    }
    this.setState({
      permissionlist: this.props.auth.permissionlist
    }) 
    if((Object.keys(this.props.project).length > 0) && (this.state.searchData !== this.props.project) && (this.state.count === 1)){
      this.setState({
        searchData: this.props.project,
        count: this.state.count + 1
      })
    }
       
  }
  componentDidUpdate(prevProps){
  //   console.log("ProjectRow componentDidUpdate")
  //   //  localStorage.removeItem(`data${this.props.identity}`)
  //   //  let project1 = JSON.stringify(this.props.project);
  //   //  console.log(project1);
  //   // console.log(this.props.project);
  //   if((Object.keys(this.props.project).length > 0) && (this.state.searchData !== this.props.project) && (this.state.count === 1)){
  //     this.setState({
  //       searchData: this.props.project,
  //       count: this.state.count + 1
  //     })
  //   }
     if((prevProps.auth !== this.props.auth) ){
       this.setState({
     
        permissionlist: this.props.auth.permisssionlist
      })
 
     }
  }

  searchProject(e){
    const data = {
      projectName: e.target.value
    };    
    axios.post(`${API}/timemanagement/search`, data, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        this.setState({
          searchData: res.data[0]
        })
      })
      .catch(err => {
        console.log(err);
      })
    // this.setState({
    //   searchData: {id: 'QWERTY', name: 'Project 1', task: 'Yes', shift: 'Day', mon: '', tue: '', wed: '', thu: '',fri: '', sat: '', sun: ''},
    //   searchTerm: term
    // })
  }

  onChange(e){
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      ...this.state,
      searchData:{
        ...this.state.searchData,
        [e.target.name]: e.target.value
      }
    })
  }

  onSave(){    
    const data = this.state.searchData;
    let saveableData = JSON.stringify(data);    
    localStorage.setItem(`data${this.props.identity}`, saveableData);
    console.log(localStorage.getItem(`data${this.props.identity}`))
    this.setState({
      message: 'Timesheet Saved'
    })
    setTimeout(() => {
      this.setState({
        message: ''
      })
    }, 5000)
  }  

  onSubmit(){
      console.log(this.state.searchData)
      const { projectName, task, workShift, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = this.state.searchData;      
      const date = new Date();      
      
      const data = {
        empId: localStorage.getItem('id'),        
        projectName,
        task: task,
        workShift: workShift,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        timeDate: date,
        taskHours: 10,
        weekNo: this.props.weekNo,
        projectHours: 10,
        timeRemarks: 'test'
      };      
      axios.post(SUBMIT_TIMESHEET, data, {withCredentials: true})
        .then(res => {
          console.log(res.data);
          this.setState({message: 'Timesheet Submitted'})
          setTimeout(() => {
            this.setState({
              message: ''
            })
          }, 5000)
          localStorage.removeItem(`data${this.props.identity}`)
        })
        .catch(err => {
          console.log(err);
          this.setState({error: 'Submission Failed'})
          setTimeout(() => {
            this.setState({
              error: ''
            })
          }, 5000)
          localStorage.removeItem(`data${this.props.identity}`)
        }) 
  }

  render(){ 
    console.log("ProjectRow render function")
    console.log(this.state.searchData)
    const { searchData, permissionlist } = this.state;
    console.log(searchData.workShift)
    let currentPermission;    

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == '8') {
        currentPermission = permissionlist.permissions[x];
      }
      else{
        console.log('the for loop if condition is false');
      }
    }
    return (
      <tr style={{background: '#ffffcc'}}>
        <td className="center label-sm bold">
          <input
            type="text"
            name="projectName"
            className={`timesheet-input-search search-success`}
            placeholder="Project Name"
            onChange={this.onChange}
            value={searchData.projectName}
          />
        </td>
        <td className="center label-sm bold">
          <input
            className="timesheet-input"
            name="task"
            value={searchData.task}
            onChange={this.onChange} />
        </td>
        <td className="center label-sm bold">
          <select
            className="timesheet-input"
            name="workShift"
            value={searchData.workShift}
            onChange={this.onChange}>
            {/* <option value={searchData.workShift} selected></option> */}
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="sunday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.sunday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            name="monday"
            type="number"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.monday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="tuesday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.tuesday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="wednesday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.wednesday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="thursday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.thursday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="friday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.friday}
          />
        </td>
        <td className="center label-sm bold">
          <input
            type="number"
            name="saturday"
            className={`timesheet-input-day ${this.state.searchData.id? 'search-success' : 'search-fail'}`}
            onChange={this.onChange}
            value={searchData.saturday}
          />
        </td>
        {(currentPermission.create) ?
        <td>
          <span
            className="timesheet-button save-button"
            onClick={this.onSave}>
            Save
          </span>
          </td>
          :null}
        {(currentPermission.create) ?
        <td>
          <span
            className="timesheet-button submit-button"
            onClick={this.onSubmit}>
            Submit
          </span>
          </td>
           :null}
        {this.state.message && <Notifier message={this.state.message} />}
        {this.state.error && <ErrorNotifier message={this.state.error} />}
      </tr>
    )
  }
}

ProjectRow.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(ProjectRow);
