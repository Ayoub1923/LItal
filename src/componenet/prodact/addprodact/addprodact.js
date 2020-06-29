import React, { useState,useRef,useEffect} from 'react'
import { connect } from "react-redux";
import axios from 'axios';
import swal from 'sweetalert';
import {ProgressBar} from  'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* componenet */

import { postnewproduct } from '../../../action/produit'
import {setnewhistoriquefromapi} from '../../../action/historiquaction'
import { Navbar } from "../../composant";
import { Background } from "../../composant";
import { Sidebar } from "../../composant";
import { unmountComponentAtNode } from 'react-dom';
let x = ""
let image=""
function Addprodact(props) {
const [statevalue, setstatevalue] = useState({

   name : null,
     type : null,
Collection : null,
marque: null,
reference:null,
image:null,
prix:null,
quantiter:null,
couleur: null,
mesure:null




  }
  )
  const [staselectedFilete, setselectedFile] = useState(null)
  const contenu = useRef()
  const alertref= useRef("none")
  const file=useRef("none")
  const [isOpened, setIsOpened] = useState(false);
  const [uncheked, setuncheked] = useState();
 const mychekbox = useRef()
  let refinput = {};
  useEffect(() => {
    //alertref.current.style='display : none'
    chekedcondition()
    
    
  }, [])
function unmout()
{
  contenu.current.innerHTML= "<div><h1> Votre Donner A eté ajouter  avec Succeé vous pouvez consulter votre Liste de produit<h1></div>"
}

  function show() {
    if (statevalue.name === null || statevalue.type === null ||  statevalue.prix === null || statevalue.couleur==null  ||statevalue.reference===null || statevalue.quantiter=== null )
    {
    alertref.current.style='display: block'
    console.log( "alert ok",)
    }

  else {
 

    
     if(staselectedFilete !==null)
     {
    
    let name1 = Date.now().toString().substring(0,4)

    let name2 = staselectedFilete[0].name
    image = "http://localhost:3000/imageuplod/"+name1 + "-" +name2
    console.log(image)
     }
     else
     {
     image = undefined
    }
    setTimeout(() => {
      console.log(Object.values(statevalue))
      let x = Object.values(statevalue)
     if (image !== undefined ) 
     x[5] = image 
     props.postnewproduct(x)
 let data  = { name: x[0],
 type:x[1],
 collection:x[2],
 marque:x[3],
 reference:x[4],
 image: x[5],
 prix:x[6],
 quantite:x[7],
 couleur: x[8],
 }
props.setnewhistoriquefromapi(data,props.users[0],'ajoute produit')
swal({
  title: "ajouter un nouvaux Produit?",
  text: "voulez vous ajouter un nouveaux produit!",
  icon: "info",
  buttons: true,
  dangerMode: true,
})
.then((okpressed) => {
  if (okpressed) {
   window.location.reload()
    
  } 
  else {
    unmout()
  }
});
    }, 1000);

     
  }
}
 // extention image
  const  checkMimeType=(event)=>{
    let files = event.target.files 
    let err = []
   const types = ['image/png', 'image/jpeg', 'image/gif']
    for(var x = 0; x<files.length; x++) {
         if (types.every(type => files[x].type !== type)) {  
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }
  // size image
  const checkFileSize=(event)=>{
    let files = event.target.files
    let size = 238000 
    let err = []; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err[x] = files[x].type+'is too large, please pick a smaller file\n';
   }
  };
  for(var z = 0; z<err.length; z++) {// if message not same old that mean has
    // discard selected file
   toast.error(err[z])
   event.target.value = null
  }
  return true;
  }
  // verifier taille et size
 const onChangeHandler=event=>{
   let files = event.target.files
    if(checkMimeType(event) && checkFileSize(event) ){ 
    // si true cherger le state
    setselectedFile(files)
  }
  }
  // send data to server ( uplod image)
 const onClickHandler = () => {
    const data = new FormData()

     
       for(var x = 0; x<staselectedFilete.length; x++) {
        data.append('file', staselectedFilete[x])
      }
      console.log(data , staselectedFilete)
    axios.post("http://localhost:8000/upload", data)
      .then(res => { // then print response status
        toast.success('upload success')
        console.log(res)
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
        console.log(err)
      })
    }
    // togel choix log image
 const chekedcondition = () => 
 { if( mychekbox.current.checked)
 setuncheked(true)
 else
 setuncheked(false)
 }
 // ajoute des contenus
 const updateField = e => {
  setstatevalue({
    ...statevalue,
    [e.target.name]: e.target.value
  });
};
  return (
    <div>
      <Navbar toggleMenu={setIsOpened} />
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened} />
      <div className="Content" ref={contenu}>
      <div class="form-group">
  <ToastContainer />
  </div> 
  <div  ref ={alertref} class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>notifiaction!</strong> Merci de remplire tous les champs obligatoire <span span className="rouge">*</span>
  <button type="button" class="close" data-dismiss="alert" onClick={() => alertref.current.style='display:none'} aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  </div> 
        <h1 className="btncentre">Ajouter nouvaux  Produit</h1>
        <div className="contenaire centret"><br />
          <div className="ui inverted segment">
            <div className="ui form inverted" >
              <div className="three fields">
                <div class="field">
                  <label>Name  <span className="rouge">*</span></label>
                  <p><input  type="text" placeholder="Name" name="name" required onChange={updateField} /></p>
                </div>
                <div class="field">
                  <label>Type  <span className="rouge">* </span></label>
                  <p>  <input  type="text" placeholder="type" required name="type" onChange={updateField}/></p>
                </div>
                <div class="field">
                  <label> Collection</label>
                  <p> <input  type="text" placeholder="Collection" name="Collection" onChange={updateField} /></p>
                </div>
              </div>
              <div className="three fields">
                <div class="field">
                  <label>Marque</label>
                  <p>  <input ref={e => refinput.marque = e}   name="marque" onChange={updateField} type="text" placeholder="Marque" required /></p>
                </div>
                <div class="field">
                  <label>Reference  <span className="rouge">*</span></label>
                  <p>  <input ref={e => refinput.reference = e} name="reference"  onChange={updateField}   type="text" placeholder="Reference" required /></p>
                </div>
                <div class="field">
                  <label>image</label>
                  {uncheked ? <input name="image" type="text" placeholder="URL IMAGE" onChange={updateField} /> :  
             <> <input type="file" class="form-control" multiple onChange={onChangeHandler}/> <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button></>}
           <small> si tu veux telecharger la photo de l'internet clicker sur le</small>       <input class="form-check-input"  ref={mychekbox} onClick={chekedcondition} type="checkbox" value="" id="defaultCheck1"/>
                 

                </div>
              </div>
              <div className="three fields">
                <div class="field">
                  <label>Prix  <span className="rouge"> * </span> </label>
                  <p>  <input ref={e => refinput.prix = e} type="number" min="1" name="prix" placeholder="Prix"  onChange={updateField}  required  /></p>
                </div>
                <div class="field">
                  <label>Quantiter  <span className="rouge">* </span></label>
                  <p>  <input ref={e => refinput.quantiter = e} type="number" name="quantiter" onChange={updateField}    min="1" placeholder="Quantite" onChange={updateField} required /></p>
                </div>
                <div class="field">
                  <label>Couleur  <span className="rouge">(*) </span> </label>
                    <input ref={e => refinput.couleur = e}  className="col-md-8" name="couleur"  onChange={updateField}   type="color"  required />
                </div>
                <div class="field">
    <label>Mesure </label>
    <input ref={e => refinput.couleur = e} className="col-md-8" name="mesure"  onChange=
{updateField}    required /></div>
              </div>
              <div class="row">
      	  <div class="offset-md-3 col-md-6">
         
        
              
              </div>  
        
              </div>
              <div class="field">
                <br></br>
             <input type='button' onClick={() => show()} className="ui inverted primary button col-md-4 colorwhite" value="Add produit"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
const stateup = (state) => {
  return {
    stateprodact: state.prodact,
    users: state.users.usersession
  }
}
export default connect(stateup, { postnewproduct , setnewhistoriquefromapi })(Addprodact);
