import React, { Component } from "react"
import { Route } from 'react-router-dom'
import Navigation from "./sidebar/Navigation"
import Sidebar from "./sidebar/Sidebar"
import Landing from './dashboard/Landing'
import MyProjects from './dashboard/MyProjects'
import MyProfile from './dashboard/MyProfile'
import EditProfile from './dashboard/EditProfile'
import InnovativeIdea from './dashboard/idea/InnovativeIdea'
import NewIdea from './dashboard/idea/NewIdea'
import AddInquiry from './crm/marketing/inquiries/AddInquiry'
import Projects from './project/Projects'
import ProjectDetails from './project/ProjectDetails'
import SmallProjects from './project/SmallProjects'
import LargeProjects from './project/LargeProjects'
import Services from './project/Services'
import AddProject from './project/AddProject'
import Resources from './project/Resources'
import AddResource from './project/AddResource'
import AddUser from './management/userManagement/AddUser'
import Customers from './customer/Customers'
import AddCustomer from './customer/AddCustomer'
import Employees from './management/userManagement/Employees'
import Jobs from './management/jobManagement/Jobs'
import AddJob from './management/jobManagement/AddJob'
import Roles from './management/roleManagement/Roles'
import Roles1 from './management/roleManagement1/Roles'
import AddRoles1 from './management/roleManagement1/AddRole'
import AddRole from './management/roleManagement/AddRole'
import Menu from './management/roleManagement/Menus'
import AddMenu1 from './management/roleManagement/AddMenu'
import UserRole from './management/userRoleManagement/UserRole'
import AddUserRole from './management/userRoleManagement/AddUserRole'
import LmsDashboard from './lms/LmsDashboard'
import AddHoliday from './lms/AddHoliday'
import ViewLeave from './lms/ViewLeave'
import Attendance from './attendance/Attendance'
import Sales from './crm/sales/Sales'
import AddNewSales from './crm/sales/AddNewSales'
import Marketing from './crm/marketing/Marketing'
import AddNewMarketing from './crm/marketing/AddNewMarketing'
import Inquiries from './crm/marketing/inquiries/Inquiries'
import Timesheet from './timesheet/Timesheet'
import ChangePassword from './dashboard/idea/ChangePassword'
import TsAdmin from './techscreening/TsAdmin'
import TsPanel from './techscreening/TsPanel'
import AddJobs from './techscreening/AddJobs'
import AddCandidate from './techscreening/AddCandidate'
import AddPanel from './techscreening/AddPanel'
import ViewJobs from './techscreening/ViewJobs'
import ViewCandidates from './techscreening/ViewCandidates'
import ViewPanel from './techscreening/ViewPanel'
import CandidateInterview from './techscreening/CandidateInterview'
import TechReports from './techscreening/TechReports'
import MenuManagement from "./management/menuManagement/MenuManagement"
import AddMenu from "./management/menuManagement/AddMenu"
class Collection extends Component {
  constructor(){
    super();
    this.state = {
      sidebar: true,
      message: ''
    }
    this.sidebarToggler = this.sidebarToggler.bind(this);
  }
  sidebarToggler(){
    this.setState((prevState) => {
      return {
        sidebar: !prevState.sidebar
      }
    })
  }
  render() {
    return (
      <div className="nav-pad">
        <Navigation toggle={this.sidebarToggler} />
        <Sidebar toggle={this.sidebarToggler} show={this.state.sidebar} />
        <Route
          exact
          path="/employee"
          render={props => <Landing {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/myprojects"
          render={props => <MyProjects {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/myprofile"
          render={props => <MyProfile {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/profile/edit"
          render={props => <EditProfile {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/ideas"
          render={props => <InnovativeIdea {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/new/idea"
          render={props => <NewIdea {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/edit/password"
          render={props => <ChangePassword {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/projects"
          render={props => <Projects {...props} sidebar={this.state.sidebar} />}  
        />
        <Route
          exact
          path="/employee/projectlist"
          render={props => <ProjectDetails {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/projects/small"
          render={props => <SmallProjects {...props} sidebar={this.state.sidebar} />}  
        />
        <Route
          exact
          path="/employee/projects/large"
          render={props => <LargeProjects {...props} sidebar={this.state.sidebar} />}  
        />
        <Route
          exact
          path="/employee/services"
          render={props => <Services {...props} sidebar={this.state.sidebar} />}  
        />
        <Route
          exact
          path="/employee/add/project"
          render={props => <AddProject {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/resources"
          render={props => <Resources {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/resource"
          render={props => <AddResource {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/customer"
          render={props => <AddCustomer {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/customers"
          render={props => <Customers {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/user"
          render={props => <AddUser {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/users"
          render={props => <Employees {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/job"
          render={props => <AddJob {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/jobs"
          render={props => <Jobs {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/role"
          render={props => <Roles {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/role1"
          render={props => <Roles1 {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/role1"
          render={props => <AddRoles1 {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/role"
          render={props => <AddRole {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/menus"
          render={props => <Menu {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/menu"
          render={props => <AddMenu1 {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/user/role"
          render={props => <UserRole {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/user/role"
          render={props => <AddUserRole {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/user/menu"
          render={props => <MenuManagement {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/AddMenu"
          render={props => <AddMenu {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/lms/dashboard"
          render={props => <LmsDashboard {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/add/holiday"
          render={props => <AddHoliday {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/lms/manage"
          render={props => <ViewLeave {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/attendance"
          render={props => <Attendance {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/sales"
          render={props => <Sales {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/sales/new"
          render={props => <AddNewSales {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/inquiries"
          render={props => <Inquiries {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/inquiry/add"
          render={props => <AddInquiry {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/marketing"
          render={props => <Marketing {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/marketing/new"
          render={props => <AddNewMarketing {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/timesheet"
          render={props => <Timesheet {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening"
          render={props => <TsAdmin {...props} sidebar={this.state.sidebar} />}
        />        
        <Route
          exact
          path="/employee/techscreening/panel"
          render={props => <TsPanel {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/addjob"
          render={props => <AddJobs {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/addcandidate"
          render={props => <AddCandidate {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/addpanel"
          render={props => <AddPanel {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/viewjobs"
          render={props => <ViewJobs {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/viewcandidates"
          render={props => <ViewCandidates {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/viewpanel"
          render={props => <ViewPanel {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/interviews"
          render={props => <CandidateInterview {...props} sidebar={this.state.sidebar} />}
        />
        <Route
          exact
          path="/employee/techscreening/reports"
          render={props => <TechReports {...props} sidebar={this.state.sidebar} />}
        />
      </div>
    );
  }
}
export default Collection;