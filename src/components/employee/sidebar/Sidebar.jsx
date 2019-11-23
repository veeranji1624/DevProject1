import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  getCurrentPermissionArray
} from '../../../redux/actions/authAction'

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      permissionlist : this.props.auth.permissionlist,
      dashboard: false,
      crm: false,
      customer: false,
      marketing: false,
      project: false,
      lms: false,
      attendance: false,
      admin: false,
      timeSheet: false,
      screening: false,
      item1: true,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false,
      indicator1: true,
      indicator2: true
    }

    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.toggleCRM = this.toggleCRM.bind(this);
    this.toggleProject = this.toggleProject.bind(this);
    this.toggleLms = this.toggleLms.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.toggleMarketing = this.toggleMarketing.bind(this);
    this.toggleAttendance = this.toggleAttendance.bind(this);
    this.toggleTimeSheet = this.toggleTimeSheet.bind(this);
    this.toggleScreening = this.toggleScreening.bind(this);
    this.toggleItem1 = this.toggleItem1.bind(this);
    this.toggleItem2 = this.toggleItem2.bind(this);
    this.toggleItem3 = this.toggleItem3.bind(this);
    this.toggleItem4 = this.toggleItem4.bind(this);
    this.toggleItem5 = this.toggleItem5.bind(this);
    this.toggleItem6 = this.toggleItem6.bind(this);
    this.testPermission = this.testPermission.bind(this);
  }


  testPermission(){

  }
  toggleDashboard(){
    this.setState({
      dashboard: !this.state.dashboard,
      crm: false,
      project: false,
      admin: false,
      lms: false,
      attendance: false,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }

  toggleCRM(){
    this.setState({
      dashboard: false,
      crm: !this.state.crm,
      project: false,
      admin: false,
      lms: false,
      attendance: false,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
   // this.props.getCurrentPermissionArray({message:'hello'});
  }

  toggleProject(){
    this.setState({
      dashboard: false,
      crm: false,
      project: !this.state.project,
      admin: false,
      lms: false,
      attendance: false,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }

  toggleAdmin(){
    this.setState({
      dashboard: false,
      crm: false,
      project: false,
      admin: !this.state.admin,
      lms: false,
      attendance: false,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false

    })
  }

  toggleLms(){
    this.setState({
      dashboard: false,
      crm: false,
      project: false,
      admin: false,
      lms: !this.state.lms,
      attendance: false,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }

  toggleAttendance(){
    this.setState({
      dashboard: false,
      crm: false,
      project: false,
      admin: false,
      lms: false,
      attendance: !this.state.attendance,
      timeSheet: false,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }

  toggleTimeSheet(){
    this.setState({
      dashboard: false,
      crm: false,
      project: false,
      admin: false,
      lms: false,
      attendance: false,
      timeSheet: !this.state.timeSheet,
      screening: false,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }
  toggleScreening(){
    this.setState({
      dashboard: false,
      crm: false,
      project: false,
      admin: false,
      lms: false,
      attendance: false,
      timeSheet: false,
      screening: !this.state.screening,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }
  toggleMarketing(){
    this.setState({
      customer: false,
      marketing: !this.state.marketing,
      indicator2: !this.state.indicator2,
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }
  toggleItem1(){
    this.setState({
      item1: true,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }
  toggleItem2(){
    this.setState({
      item1: false,
      item2: true,
      item3: false,
      item4: false,
      item5: false,
      item6: false
    })
  }
  toggleItem3(){
    this.setState({
      item1: false,
      item2: false,
      item3: true,
      item4: false,
      item5: false,
      item6: false
    })
  }
  
///
componentDidUpdate(prevProps){
  // console.log(this.props.auth.permissionlist.permissions[0].groupId);
  // console.log(this.props.auth.permissionlist.permissions[1].groupId);
  // console.log(this.props.auth.permissionlist.permissions[2].access);
  // console.log(this.props.auth.permissionlist.permissions[2].permission);
  if(prevProps.auth !== this.props.auth){
    this.setState({
      //data: this.props.customers.data,
      permissionlist:this.props.auth.permisssionlist
    })
  }
  console.log("component did update permissionlist value" + this.state.permissionlist);
}

componentDidMount(){
  this.setState({
    //data: this.props.customers.data,
    permissionlist:this.props.auth.permissionlist
  })
  const permissionlist1 = JSON.stringify(this.permissionlist);
  console.log('component did mount permissionlist value' +  permissionlist1);
}






  ////
  toggleItem4(){
    this.setState({
      item1: false,
      item2: false,
      item3: false,
      item4:  true,
      item5: false,
      item6: false
    })
  }
  toggleItem5(){
    this.setState({
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: true,
      item6: false
    })
  }
  toggleItem6(){
    this.setState({
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      item6: true
    })
  }
  render() {
// here the variable declaration is done taking value from this.state
const {permissionlist}  = this.state;  

//authorization object is required
//  let fromLSAO = localStorage.getItem('AuthorizationObject');
//  let jsonToObjectAO = JSON.parse(fromLSAO);
//  let accessDashboard = jsonToObjectAO.AccessDashboard;
//  let accessDashboardFromRedux = CurrentPermissionObject.AccessDashboard;
//  console.log("value of access dashboard"+ accessDashboard);
//  console.log("value of access dashboard from redux store "+accessDashboardFromRedux );
let accessDashboard
let accessDasMdaw
let accessInnovation
let accessCrm
let accessCrmCustomer
let accessCrmMarketing
let accessCrmMarInquiries
let accessCrmMarLeads
let accessCrmSales
let accessProjects
let accessProProjectDetails
let accessProSmallProjects
let accessProLargeProjects
let accessProServices
let accessAdmin
let accessAdmEmployees
let accessAdmJobposting
let accessLms
let accessLmsDashboard
let accessLmsApprovedby
let accessAttendance
let accessAttViewUpdate
let accessAttApprove
let accessTechScreening
let accessTecAdmin
let  accessTecPanel
let accessTimesheet
let accessAdmRoleManagement
let accessAdmURManagement
let accessAdmMenuManagement
let accessAdmRoleManagement1
    

    for(let x in permissionlist.response.permissions) {
      if(permissionlist.response.permissions[x].groupId == '1') {
         accessDashboard= permissionlist.response.permissions[x].access;
      }
      if(permissionlist.response.permissions[x].groupId == '1.1') {
        accessDasMdaw= permissionlist.response.permissions[x].access;
     }
     if(permissionlist.response.permissions[x].groupId == '1.2') {
      accessInnovation= permissionlist.response.permissions[x].access;
      }
      if(permissionlist.response.permissions[x].groupId == '2') {
      accessCrm = permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '2.1') {
      accessCrmCustomer= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '2.2') {
      accessCrmMarketing= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '2.2.1') {
      accessCrmMarInquiries= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '2.2.2') {
      accessCrmMarLeads= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '2.3') {
      accessCrmSales= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '3') {
      accessProjects= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '3.1') {
      accessProProjectDetails= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '3.2') {
      accessProSmallProjects= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '3.3') {
      accessProLargeProjects= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '3.4') {
      accessProServices= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4') {
      accessAdmin= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4.1') {
      accessAdmEmployees= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4.2') {
      accessAdmJobposting= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4.3') {
      accessAdmRoleManagement= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4.4') {
      accessAdmURManagement= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '4.5') {
    accessAdmMenuManagement= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '5') {
    accessLms= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '5.1') {
    accessLmsDashboard= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '5.2') {
    accessLmsApprovedby= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '6') {
    accessAttendance= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '6.1') {
    accessAttViewUpdate= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '6.2') {
    accessAttApprove= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '7') {
    accessTechScreening= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '7.1') {
    accessTecAdmin= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '7.2') {
    accessTecPanel= permissionlist.response.permissions[x].access;
    }
    if(permissionlist.response.permissions[x].groupId == '8') {
    accessTimesheet= permissionlist.response.permissions[x].access;
    }  
    if(permissionlist.response.permissions[x].groupId == '4.6') {
      accessAdmRoleManagement1= permissionlist.response.permissions[x].access;
      }  
else{
        console.log('the for loop if condition is false');
      }
    }





    let sidebarId = 'no-sidebar';
    if(this.props.show){
      sidebarId = 'sidebar'
    }

console.log(accessProjects)
    return (
      <div id={ sidebarId }>

        <div className="sidebar-block">
          {accessDashboard ?
          <div className = "dive">
          <h6
            className="sidebar-main-item left white-text"
            name="dashboard"
            onClick={this.toggleDashboard}
          >Dashboard</h6>
          {this.state.dashboard ?
            <div className="sidebar-side-items left">
              {accessDasMdaw ? 
              <Link
                to="/employee"
                className="no-dec"
                onClick={this.toggleItem1}>    
                <p className={this.state.item1 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  My Day At Work
                </p>
              </Link>
              : null }
              {accessInnovation ?
              <Link
                to="/employee/ideas"
                className="no-dec"
                onClick={this.toggleItem2}>  
                <p className={this.state.item2 /*&& currentPermission.access*/?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Innovation
                </p>
              </Link>
              : null }
            </div> : null }
           </div> : null }
         {accessCrm ?
         <div>
          <h6
            className="sidebar-main-item left white-text"
            name="crm"
            onClick={this.toggleCRM}>CRM</h6>
          {this.state.crm ?
            <div className="sidebar-side-items left">
              {accessCrmCustomer ?
              <Link
                to="/employee/customers"
                onClick={this.toggleItem1}
                className="no-dec">  
              <p className={this.state.item1  ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>                         Customers
              </p>
              </Link>
              : null }
              {accessCrmMarketing ?
              <p
                className="sidebar-side-item white-text pointer"
                onClick={this.toggleMarketing}>
                <span style={{fontSize: '18px'}}>{this.state.indicator2 ?'+ ':'- '}</span>
                Marketing
              </p>
              :null }
                {this.state.marketing  ?
                  <div>
                    {accessCrmMarInquiries ?
                    <Link
                      to="/employee/inquiries"
                      className="no-dec"
                      onClick={this.toggleItem2}>
                      <p className={this.state.item2  ?'sidebar-side-item selected white-text ml-3':'sidebar-side-item white-text ml-3'}>
                        Inquiries
                      </p>
                    </Link>
                    : null }
                    {accessCrmMarLeads ?
                    <Link
                      to="/employee/marketing"
                      className="no-dec"
                      onClick={this.toggleItem3}>
                      <p className={this.state.item3 ?'sidebar-side-item ml-3 selected white-text':'sidebar-side-item white-text ml-3'}>
                        Leads
                      </p>
                    </Link>
                    : null }
                  </div>
                :null}
                {accessCrmSales ?
              <Link
                to="/employee/sales"
                className="no-dec"
                onClick={this.toggleItem4}>
                <p className={this.state.item4 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Sales
                </p>
              </Link>
              : null }
            </div>
            :null
          }
          </div> : null }
          {accessProjects ?
          <div>
          <h6
            className="sidebar-main-item left white-text"
            name="project"
            onClick={this.toggleProject}  
          >Projects</h6>   
            {this.state.project ?
              <div className="sidebar-side-items left">
                {accessProProjectDetails ?
                <Link
                  to="/employee/projects"
                  className="no-dec"
                  onClick={this.toggleItem1}>  
                  <p className={this.state.item1 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Project Details
                  </p>
                </Link>
                : null }
                {accessProSmallProjects ?
                <Link
                  to="/employee/projects/small"
                  className="no-dec"
                  onClick={this.toggleItem2}>
                  <p className={this.state.item2 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Small Projects
                  </p>
                </Link>
                : null }
                {accessProLargeProjects ?
                <Link
                  to="/employee/projects/large"
                  className="no-dec"
                  onClick={this.toggleItem3}>
                  <p className={this.state.item3 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Large Projects
                  </p>
                </Link>
                : null }
                {accessProServices ?
                <Link
                  to="/employee/services"
                  className="no-dec"
                  onClick={this.toggleItem4}>
                  <p className={this.state.item4 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>Services</p>
                </Link>
                : null }
              </div>
              :null
            }
            </div> : null }
            {accessAdmin ?
            <div>
            <h6
              className="sidebar-main-item left white-text"
              name="admin"
              onClick={this.toggleAdmin}
            >Admin</h6>
            {this.state.admin ?
              <div className="sidebar-side-items left">
                {accessAdmEmployees ?
              <Link
                to="/employee/users"
                onClick={this.toggleItem1}
                className="no-dec">
                <p className={this.state.item ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Employees
                </p>
              </Link>
              : null }
              {accessAdmJobposting ?
              <Link
                to="/employee/jobs"
                onClick={this.toggleItem2}
                className="no-dec">
                <p className={this.state.item2 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Job Posting
                </p>
              </Link>
              : null }
              {accessAdmRoleManagement ?
              <Link
                to="/employee/role"
                onClick={this.toggleItem3}
                className="no-dec">
                <p className={this.state.item3 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Access and Permission Management
                </p>
              </Link>
              : null }
              {accessAdmURManagement ?
              <Link
                to="/employee/user/role"
                onClick={this.toggleItem4}
                className="no-dec">
                <p className={this.state.item4 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  UserRole Management
                </p>
              </Link>
              : null }
              {accessAdmMenuManagement ?
              <Link
                to="/employee/user/menu"
                onClick={this.toggleItem5}
                className="no-dec">
                <p className={this.state.item5 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Menu Management
                </p>
              </Link>
              : null }
              {accessAdmRoleManagement1 ?
              <Link
                to="/employee/role1"
                onClick={this.toggleItem6}
                className="no-dec">
                <p className={this.state.item6 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                  Role Management
                </p>
              </Link>
              : null }
              </div>
            :null}
            </div> : null }
            {accessLms ?
            <div>
            <h6
              className="sidebar-main-item left white-text"
              name="lms"
              onClick={this.toggleLms}
            >LMS</h6>
            {this.state.lms ?
              <div className="sidebar-side-items left">
                {accessLmsDashboard ?
                <Link
                  to="/employee/lms/dashboard"
                  onClick={this.toggleItem1}
                  className="no-dec">
                  <p className={this.state.item1 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Dashboard
                  </p>
                </Link>
                : null }
                {accessLmsApprovedby ?
                <Link
                  to="/employee/lms/manage"
                  onClick={this.toggleItem2}
                  className="no-dec">
                  <p className={this.state.item2 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Approved By
                  </p>
                </Link>
                : null }
              </div>
              :null
            }
            </div> : null }
            {accessAttendance ?
            <div>
            <h6
              className="sidebar-main-item left white-text"
              name="attendance"
              onClick={this.toggleAttendance}
            >Attendance</h6>
            {this.state.attendance ?
              <div className="sidebar-side-items left">
                {accessAttViewUpdate ?
                <Link
                  to="/employee/attendance"
                  onClick={this.toggleItem1}
                  className="no-dec">    
                  <p className={this.state.item1 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    View / Update
                  </p>
                </Link>
                : null }
                {accessAttApprove ?
                <Link
                  to="/employee/attendance/view"
                  onClick={this.toggleItem2}
                  className="no-dec">
                  <p className={this.state.item2 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Approve
                  </p>
                </Link>
                : null }
              </div>
              :null
            }
            </div> : null }
            {accessTechScreening ?
            <div>
            <h6
              className="sidebar-main-item left white-text"
              name="screening"
              onClick={this.toggleScreening}
            >Tech Screening</h6>
            {this.state.screening ?
              <div className="sidebar-side-items left">
                {accessTecAdmin ?
                <Link
                  to="/employee/techscreening"
                  onClick={this.toggleItem1}
                  className="no-dec">    
                  <p className={this.state.item1 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Admin
                  </p>
                </Link>  
                : null }
                {accessTecPanel ?             
                <Link
                  to="/employee/techscreening/panel"
                  onClick={this.toggleItem2}
                  className="no-dec">
                  <p className={this.state.item2 ?'sidebar-side-item selected white-text':'sidebar-side-item white-text'}>
                    Panel
                  </p>
                </Link>
                : null }
              </div>
              :null
            }
            </div> : null }
            {accessTimesheet ?
            <div>
            <Link to="/employee/timesheet" className="no-dec"><h6
              className="sidebar-main-item left white-text"
              name="attendance"
              onClick={this.toggleTimeSheet}
            >Timesheet</h6>
            </Link>
            </div>
            : null }
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  toggle: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
//export default Sidebar;


const mapStateToProps = state => ({
  auth: state.auth
  
})

/*
export default connect(
  mapStateToProps,
  {getCurrentPermissionArray}
)(Sidebar);
*/
export default connect(
  mapStateToProps,
null
)(Sidebar);

