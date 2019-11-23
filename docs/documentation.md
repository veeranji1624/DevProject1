Documentation for Health Junction front end React code. Created on July 27...
___
###Software Versions
#####Node.js : version 8.11.1
[Website](https://nodejs.org/en/)

#####npm : starting version was 5.6 but was upgraded to 6.2.0 because of bugs.
[Website](https://www.npmjs.com/)

#####create-react-app : version 1.5.2
[Website](https://reactjs.org/)
	
#####create-react-native-app : version 1.0.0
[Website](http://www.reactnative.com/)
___

###Dependencies

####React Dependencies

The details of all these dependencies can be found at `https://www.npmjs.com/package/*package-name*`

`axios :- version 0.18.0`
`bootstrap :- version 4.1.3`
`history :- version 4.7.2`
`prop-types :- version 15.6.2`
`react :- version 16.4.1`
`react-dom :- version 16.4.1`
`react-google-login :- version 3.2.1`
`react-redux :- version 5.0.7`
`react-router :- version 4.3.1`
`react-router-dom :- version 4.3.1`
`react-router-redux :- version 4.0.8`
`react-scripts :- version 1.1.4`
`reactstrap :- version 6.3.1`
`redux :- version 4.0.0`
`redux-logger :- version 3.0.6`
`redux-thunk :- version 2.3.0`
___

###React Installation

React was installed through the `create-react-app` CLI through the command,

`create-react-app health_junction`

(create react app do not allow spaces or capital letters in the folder name)

now move in to the project folder:

`cd health_junction`

and start the project in a server

`npm start`

he project will open in `http://localhost:3000`

####Installing Dependencies
`create-react-app` comes with all the basic React necessities. react, react-scripts and react-dom are all preinstalled. This package itself is enough for small applications.

However, for large applications, additional modules are required for optimal performance.
___

#####axios

axios is a micro library made espicially for making AJAX requests.

`npm install --save axios`

Now, the application is capable of making HTTP requests through axios.

#####importing axios

`import axios from 'axios'`
___
#####bootstrap

Bootstrap is a UI framework used to style the document.
It is lightweight and highly customizible. This package will take care of all the basic page layouts and CSS.
However, Bootstrap is not recommended for react projects because it uses jQuery.

`npm install --save bootstrap`

#####importing bootstrap
`import 'bootstrap/dist/css/bootstrap.min.css'`
___
#####History
history is used to redirect the front end after verificatins or validations. For all sorts of auto redirections, history should be used.

`npm install --save 'history'`

#####Importing History
`import History from 'history'`
___
#####PropTypes
Proptypes library is used to keep track and map all the props that are passed to a rect component from redux so that they can be accessed properly.

`npm install --save prop-types`

#####importing PropTypes
`import PropTypes from 'prop-types'`
___
#####React
Includes the react library. Installed with `create-react-app`.

#####importing React
`import React from 'react'`.
___
#####ReactDOM
Loads the react virtual DOM. Only used in `index.js`.

#####importing ReactDOM
`import ReactDOM from 'react-dom'`.
___
#####react-google-login
A google authentication library to connect to the google api and authenticate users based on their google accounts.

`npm install --save react-google-login`.

#####importing react-google-login
`import GoogleLogin from 'react-google-login'`
___
#####React-redux

Connects both the react and redux libraries. Allows react components to communicate with redux and redux parts to communicate with react.

`npm install --save react-redux`

#####importing React-redux
`import {connect} from 'react-redux'`
___
#####react-router
react router is the base building block. It provides API for creating routing solution. It is extended by `react-router-dom` which uses `react-router` by default.
___
#####react-router-dom
react-router-dom allows the creation and assignment of new routes in react components. It also supports storing components states in the browser history. Itis built on top of `react-router`.

`npm install --save react-router-dom`

Here, the react-router-dom package is installed through npm (node package manager). The --save ensures that the package is downloaded as a dependency and logs it in the `package.json` file as an asset.

#####importing react-router-dom

An installed library should be imported in a component inorder to use it.

`import { BrowserRouter, Route } from 'react-router-dom'`
___
#####react-router-redux
react-router-redux offers so called "controlled router", bound to redux store. State changes (navigation) could be controlled by dispatching redux actions as well as by clicking on links.

`npm install --save react-router-redux`

#####importing react-router-redux

`import { syncHistoryWithStore, routerReducer } from 'react-router-redux'`
___
#####react-scripts

This package includes scripts and configuration used by Create React App. It is used to start the development server.
___
#####Reactstrap
If bootstrap is not recommended, why still use it? One answer. Reactstrap. Reactstrap is a react library which provides bootstrap services to react without using jQuery. But it still requires bootstrap code to function. Therefore, both bootstrap and reactstrap has to be installed.

`npm install --save bootstrap`
`npm install --save reactstrap`

#####importing reactstrap
Inorder to use reactstrap, bootstrap should be imported first.

`import 'bootstrap/dist/css/bootstrap.min.css'`
`import {Container, Row, Col} from 'reactstrap'`
___
#####Redux

Redux is a state management library.This library will be storing all our application 
state within its store.

`npm install --save redux`

#####importing redux

`import { Provider } from 'redux'`
___
#####redux-logger

A logging technology for redux. Makes it possible to log different actions and states during development.

#####importing redux-logger

`import { logger } from 'redux-logger'`
___
#####Redux-thunk

Redux thunk is a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function. 
It is used to dispatch appropriate actions according to requirement.

`npm install --save redux-thunk`

#####importing redux-thunk

`import thunk from 'redux-thunk'`
___

####Folder structure
The client side folder structure is as ahown below,

`client (root folder)`
`.....public`
`..........index.html`
`.....src`
`..........index.js`
`..........App.js`
`..........components`
`..........containers`
`..........redux`
`...............store`
`...............reducers`
`...............actions`
`..........assets`
`...............img`
`...............css`
`..........utils`
`.....package.json`
`.....package.lock.json`

___
####Data flow

The data flow will be unidirectional...

`component => event => action creator =>`|
`component <= store <= reducer <= action`|
___
#####React-Redux integration

* The components are the interactive parts of the application. They could have a local state or directly access the application state from the redux store.
`constructor(){`
  `this.state = { user? : false }`
  `}`
  ___
  
* The components which access the store directly are called containers and are stored in a seperate folder.
  ___
* When the user interacts with the containers, an event will be triggered.
`<button onClick={this.changeColor}>Color picker</button>`
  ___
* Each events within the containers will call a purticular action.
`changeColor(){`
`this.props.colorChangerAction(selectedColor);`
`}`
  ___
* Actions are calles by a pure function also called action creator. An action will have a type and in most cases, they will also carry some form of data. Actions are also responsible for making backend and api calls.
  ___
* Once the action has completed its purpose, it will dispatch the data to the reducer.
`const colorChangerAction = (selectedColor) =>` 
`dispatch => ({`
  `type: GET_COLOR,`
  `data: selectedColor`
  `});`
  ___
* Reducer recieves the dispatched data from action and then feeds it to the store as the new state. Reducer is a pure function that takes in the action.
`export default function (state, action){`
  `switch(action.type){`
    `case GET_COLOR:`
      `return action.data`
    `default:`
      `return state`
  `}`
`}`
  ___
* The store holds as the application data as an object tree. When it recieves the data from the reducer, the data is stored as the new state.This is the only way to change the state of the application.
  `const store = createStore(`
  `rootReducer, initialState, applyMiddleware()`
  `);`
  ___
* Inorder to pass the new state to the container, the container should import the connect method from the react-redux library.
`import { connect } from react-redux;`
  ___
* By using the connect method, the store will pass the state as props and can be accessed as `this.props` from within the container.
  `const mapStateToProps = (state) => {`
  `color: state.selectedColor`
  `}`
  ___
* This new props can the be set to the component state or can be used directly to alter the view as per requirement.
  `<Panel color={this.props.color} />`
  or
  `componentWillRecieveProps(nextProps){`
  `if(nextProps.selectedColor) {`
  `this.setState({ color:  nextProps.selectedColor });`
  `}`
  `}`
___
####AJAX requests

GET requests through axios

conditions:
react port :3000
express port :5000
path : `'/'`

making an AJAX request from the Register component, and storing it in the component state,

initial state: 
`this.state = {users: []}`

axios request,

`axios.get('/')`
`.then(response =>{`
`this.setState({users: response.data})`
`})`
`.catch(err => console.log(err));`

accessing the values from state,

`{this.state.users.map(user =>`
`return <h4 key={user.id}>{user.name}</h4>)}`

In this way, the database values are stored and displayed in the browser through react.

####React Native Dependencies
		
`expo :- version 27.0.1`
`react :- version 16.3.1`
`react-native :- version 0.55.2`
`react-vector-icons :- version 4.6.0`
`react-navigation :- 2.9.2`