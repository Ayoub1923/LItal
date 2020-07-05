import * as types from './type'
import Axios from 'axios';
import {URL} from './baseurl'
import moment from 'moment';


// get alll users
export  function getusersFromApi(){
    return (dispatch) => Axios.get(URL+"app/users")
    .then ((res) => dispatch(getAllUsers(res.data)) )
   
    .catch((error) => alert(error +"user"))
   }
   export const getAllUsers = (payload) => ({
    type: types.GETALLUSERFORMAPI,
    payload,
  });
   
   //user id modification
   export const  updatestate = (id) => ({
     type: types.UPDATESTATE ,
     payload : id
   })
   //delate user
   export function deleteUser(_id){
    return (dispatch) => Axios.delete(URL+`app/delateuser/${_id}`)
    .then ((res) => dispatch(delatUserid(_id)) )
    .catch((error) => alert(error))

   }

   export const delatUserid = (_id) =>({ 
     type : types.DELATEUSERID,
     payload :_id
   })
       // add user
   export function Adduser(x){return (dispatch) => 
    Axios.post(URL+`app/addnewuser`, ({
    
        "first_name": x[0],
        "last_name": x[1],
        "email": x[2],
        "password": x[3],
        "image": x[4],
        "posteOcuper": x[5],
        "role": x[6],
        "dateInscription": moment().format("DD/MM/YYYY") 
      
  }))
   .then( res => console.log(res))
   .catch(err => console.log(err))
   }
   //update user
   export function updatedate(obj){
     console.log("id est " , obj)
    return (dispatch) => 
    Axios.patch(URL+`app/user/${obj.id}`, ({obj

    }))
    .then ((res) => console.log(res) )
    .catch((error) => alert(error))
  
   }

   export const updateUserid = (obj)=>({ 
  type : types.UPDATEUSERID,
  payload :[obj.first_name,obj.last_name,obj.email,obj.password,obj.image,obj.id]
})

/* filter user state */
export const changestateuser = (paylod) =>({

type : types.FILTERUSER,
paylod,

})
 // post sessionstate

//session state 
/*
export function updatesessiondate(x){
  return (dispatch) => 
  Axios.put(URL+`session/${1}`, ({
    "first_name": x[0],
    "last_name": x[1],
    "email": x[2],
    "password": x[3],
    "image": x[4],
    "role": x[5],
    "posteOcuper": x[6],
   
  }))
  .then ((res) => dispatch(sessionstate(x)) )
  .catch((error) => alert(error))
  
 }
*/
export const sessionstate = (payload) => ({

  type : types.USERSESSION,
  payload,
})

// get session state
export  function getsessionstate(){
  return (dispatch) => Axios.get(URL+"nonidiquer")
  .then ((res) => dispatch (sessionstate(Object.values(res.data[0]))))

  
 
  .catch((error) => alert(error))
 }