import * as types from './type'
import Axios from 'axios';
import {URL} from './baseurl'
import moment from 'moment';
// get all historique from api
export  function getallhistoriquefromapi(){
    return (dispatch) => Axios.get(URL+"historique")
    .then (res => dispatch(allhistoriquefromapi(res.data))) 
   
    .catch((error) => console.log(error))
   }
   export const allhistoriquefromapi = (paylod) => ({
    type: types.GETALLHISTORIQUE,
    paylod,
  });

  //// set new historique from api
  export  function setnewhistoriquefromapi(x,user,action){
    console.log("couleur", x.couleur)
      let paylod = x
    return (dispatch) => Axios.post(URL+"historique",({
      "name": x.name,
      "type":x.type,
      "collection":x.collection,
      "marque":x.marque,
      "reference":x.reference,
      "image": x.image,
      "prix":x.prix,
      "quantite":x.quantite,
      "couleur": x.couleur,
      "useraction":user,
      "dateaction":moment().format("DD/MM/YYYY"),
      "action":action
    })
   
    )
    .then (res => dispatch(setnewhistorique(paylod))) 
   
    .catch((error) => alert(error))
   }
   export const setnewhistorique = (paylod) => ({
    type: types.ADDISTORIQUE,
    paylod,
  });

  //filter state
  export const changestatehistorique = (paylod) => ({

    type: types.FILTERHISTORIQUE,
    paylod,

  })
  export const filteraction=(paylod) => ({

    type: types.FILTEACTION,
    paylod,

  })
  export const filtercolor =(paylod) => ({
   type : types.FilterColor,
   paylod,
  })
  export const Filterdate =(paylod) => ({
    type : types.Filterdate,
    paylod,
  })