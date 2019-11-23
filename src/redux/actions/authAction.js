import axios from 'axios'
import {
  AUTHENTICATE_USER,
  GET_ERRORS,
  GET_CURRENT_PERMISSION_ARRAY
} from './types'
import { EMPLOYEE_LOGIN , API} from '../../utils/routes'


export const authenticateUser = ( userData ) => {
    return dispatch => { 
      axios.post(`${API}/employee/login`,userData)
      .then(res => {
        console.log(res.data);
       const permissionlist = res.data;
        if(res.status === 200){
          const {firstName, lastName, empId, designation} = permissionlist.response.employee;
          console.log(firstName)
          localStorage.setItem('username', `${firstName} ${lastName}`);
          localStorage.setItem('id', empId);
          localStorage.setItem('role', designation);

          // const permissionlist = {
          //   isAuthenticated: false,
          //   name: "Aaaa Bbbb",
          //   emailId: "abc@gmail.com",
          //    "roles": ["MD", "SM"],
          //   primaryRole: "MD",
          //      permissions:[{
          //         groupId:222,
          //         access:true,
          //         create:true,
          //         view:true,
          //         update:true,
          //         delete:true
          //       },
          //       {
          //         groupId:212,
          //         access:false
          //       },
          //       {
          //         groupId:211,
          //         access:true,
          //         create:false,
          //         view:true,
          //         update:false,
          //         delete:true

          //       }]
          //     }
               
          /* backend response */
        
          //   const permissionlist = {
          //   "result": {
          //     "employee": {
          //       "empId": 4,
          //       "empType": "software",
          //       "email": "lavanya1@gmail.com",
          //       "mobileNumber": 56785800000,
          //       "firstName": "lavanya",
          //       "middleName": "kjh",
          //       "lastName": "asdf",
          //       "dob": null,
          //       "genderType": "female",
          //       "designation": "wryj",
          //       "primaryRole": "MD",
          //       "empCreatorId": null,
          //       "emailVerifyCode": "",
          //       "emailVerifyStatus": 1,
          //       "createdOn": null,
          //       "empActiveStatus": "Active",
          //       "dateOfJoin": null,
          //       "projectStatus": 3,
          //       "percentage": 87
          //     },
          //     "roles": [
          //       {
          //         "roleId": "MD",
          //         "roleName": "Managing Director",
          //         "roleDesc": "about manager"
          //       }
          //     ],
          //     "permissions": [
          //       {
          //         "accId": 2,
          //         "roleId": "MD",
          //         "menuId": 1,
          //         "access": false,
          //         "permission": true
          //       },
          //       {
          //         "accId": 3,
          //         "roleId": "MD",
          //         "menuId": 3,
          //         "access": true,
          //         "permission": "4"
          //       }
          //     ]
          //   }
          // }
        

              let currentPermission;
              //  let allRoles = permissionlist.roleName;
              //  let primaryRole = permissionlist.roleId;
              
              // let currentRole = primaryRole;
              // let permissionlist  = JSON.parse(permissionlist1);
               console.log(permissionlist)
              // console.log('all Roles ' + allRoles);
              // console.log('primary role' + primaryRole);
              // const permissionlist2 = JSON.stringify(permissionlist);
              // console.log('permissionlist value is' + permissionlist2);

              // for(let x in permissionlist.permissions) {

              //   if(permissionlist.permissions[x].role == currentRole) {
              //     currentPermission = permissionlist.permission[x];
              //   }
              // }


              console.log('currentpermission value is ' + currentPermission);
              dispatch({
                type: AUTHENTICATE_USER,
                payload: permissionlist
              });

            }else{
              console.log(res.data);
              dispatch({
                 type: GET_ERRORS,
                payload: {error: 'else if errer'}
               })
             }
          })
          .catch(err => {
            console.log(err);
            dispatch({
              type: GET_ERRORS,
              payload: {error: 'catch errror'}
            })
          })
        }
      }
      
    