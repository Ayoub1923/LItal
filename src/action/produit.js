import moment from 'moment';
import * as types from './type'
import {URL}  from './baseurl'
import Axios from 'axios';
// post new product
export  function postnewproduct(x,image){
  console.log("add produit",x)
  let  paylod ="" ;
  if(image === undefined)
  paylod = {
    "name": x[0],
    "type":x[1] ,
    "collct":x[2],
    "marque":x[3],
    "ref":x[4],
    "image":   x[5],
    "prix":x[6],
    "quantite":x[7],
    "couleur": x[8],
    "mesure":x[9],
    "dateajoute":moment().format("DD/MM/YYYY"),
    "nombredemodification":0,
    
    "ok":[]
  }
    return (dispatch) => Axios.post(URL+"app/ListeProduit",
paylod
     )
    .then ((res) => dispatch(addproduct(paylod) ) )
   
    .catch((error) => console.log(error +"liste produit post"))
   }
export const addproduct = (paylod) => 
({

    type:types.ADDPRODUCT,
    paylod,

}
)
// get all product from api
export  function getallproductfromapi(){
  return (dispatch) => Axios.get(URL+"app/Allproduct")
  .then (res =>  {console.log(res.data.produit) 
  dispatch(allproductfromapi(res.data.produit))}
  ) 
 
  .catch((error) => alert(error + "liste produit get"))
 }
 export const allproductfromapi = (payload) => ({
  type: types.GETALLPRODUCT,
  payload:payload,
});
 
// update product 
export function updatedateprodact (x,y) {
  console.log("prpos" ,x,y ) 
  return (dispatch) => Axios.patch(URL+"app/ListeProduit/"+x._id,({
    ...x,
    "image":y !== null ? y : x.image,
     "datemodification":moment().format("DD/MM/YYYY"),
     "nombredemodification": x.nombredemodification +1,
   
      })
  )
  .then(res => dispatch(updateproductstate(x)))
  .catch( err => console.log(err + "liste produit patch"))
}
export const updateproductstate = paylod => ({

  type : types.UPDATEPRODUCTSTATE  ,
   paylod,
})

// delate prodact
export function delateproduct(id){
  return (dispatch) => Axios.delete(URL +`app/ListeProduit/${id}`)
  .then(res =>  console.log(res) ,dispatch(delateproductfromstate(id)))
  .catch( err => console.log(err + "liste produit delate"))
}
export const delateproductfromstate = (paylod) => ({
  type : types.DELETEPRODUCTSTATE,
  paylod,
})

// add id  product to state
export const addidproducttostate = (paylod) => ({
  type : types.ADDIDPRODUCTTOSTATE,
  paylod,
})
//filter state
export const changestateprodact= (paylod) => ({
  type: types.FILTERPRODUCT,
  paylod,
})
/*
//get all commentaire
export  function getallcomment(){
  return (dispatch) => Axios.get(URL+"comentair")
  .then (res => dispatch(allcomment(res.data))) 
 
  .catch((error) => alert(error + "liste produit comentair"))
 }
 export const allcomment = (payload) => ({
  type: types.GETCOMENTAIR,
  payload:payload,
});
*/
//sendcomentair
export  function postallcomment(id,z){
  console.log("comentaire",z)
  return (dispatch) => Axios.patch(URL+"app/ListeProduit/"+id,({
 "ok": z }))
  .then (res => console.log(res),
  window.location.reload()
 
  ) 
 
  .catch((error) => alert(error + "liste produit add comentair"))
 }

 //filter by quantite 
 export const  filterbyquantiter = (paylod) =>({
   type : types.FILTERBYQUANTITER,
   paylod
 })