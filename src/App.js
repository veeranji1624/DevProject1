import React, { Component } from "react"
import { Provider } from "react-redux"
import store from "./redux/store/store"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./assets/fonts/ubuntu.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/index.css"
import Index from "./components/home/Index"
import EmpIndex from "./components/employee/EmpIndex"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/employee" component={EmpIndex} />
              <Route path="/" component={Index} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App;
