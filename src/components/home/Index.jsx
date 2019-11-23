import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Navigation from '../common/Navigation'
import Collection from './Collection'
import LoginNavigation from './auth/LoginNavigation'
import EmployeeLogin from './auth/EmployeeLogin'
import Transformation from './main/Transformation'
import Knowledge from './main/Knowledge'
import Products from './main/Products'
import Blogs from './main/Blogs'
import Privacy from './services/Privacy'
import TermsofUse from './services/TermsofUse'
import VaniCollection from './vani/VaniCollection'
//import GrowthGamut from './vani/GrowthGamut'
import Footer from '../common/Footer'
 
class Index extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Navigation} />
        <Route exact path="/" component={Collection} />
        <Route exact path="/login" component={LoginNavigation} />
        <Route exact path="/login" component={EmployeeLogin} />
        <Route exact path="/transformation" component={LoginNavigation} />
        <Route exact path="/transformation" component={Transformation} />
        <Route exact path="/knowledge" component={LoginNavigation} />
        <Route exact path="/knowledge" component={Knowledge} />
        <Route exact path="/vani" component={Navigation} />
        <Route exact path="/vani" component={VaniCollection} />
        <Route exact path="/vani" component={Footer} />
        <Route exact path="/products" component={LoginNavigation} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/blogs" component={LoginNavigation} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/privacy" component={LoginNavigation} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/termsofuse" component={LoginNavigation} />
        <Route exact path="/termsofuse" component={TermsofUse} />
      </div>
    )
  }
}
export default Index;