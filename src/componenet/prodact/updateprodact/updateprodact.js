import React,{useState,useEffect,useRef} from 'react'
import {  updatedateprodact } from '../../../action/produit'
import { NavLink } from 'react-router-dom';
import { Navbar } from "../../composant";
import axios from 'axios';
import {setnewhistoriquefromapi} from '../../../action/historiquaction'
import {getallproductfromapi} from '../../../action/produit'
import { Background } from "../../composant";
import { connect } from "react-redux";
import { Sidebar } from "../../composant";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
 let x =""  ;
 let image =""
 let urlid = window.location.search
 function Updateprodact(props) {
    const [old, setolde] = useState([]);  
    const [id, setid] = useState("");       
    const [isOpened, setIsOpened] = useState(false);
    const [role, setrole] = useState("");
    const [staselectedFilete, setselectedFile] = useState(null)
    const mychekbox = useRef()
    const [uncheked, setuncheked] = useState();
    const alertref= useRef("none")
    const contenu = useRef()
    useEffect(() => {
      setid(urlid.slice(1, urlid.length))
      props.getallproductfromapi()
    if (old !==undefined)
    {  
       chekedcondition()
     
    }
    return () => {
    
      };
    }, [])

    useEffect(() => {
      console.log("propschangers", props.prod.product);
      let propsproduct =  props.prod.product.filter(el => el.id == id);
      if (propsproduct !== undefined)
      {
      let  tableux =propsproduct[0]
       setolde(tableux)
   
      }
    
      setolde(propsproduct)
     // x = propsproduct[0]
     
   
   
 
  
    }, [props.prod])
    // togel input
 const chekedcondition = () => {
   
 let x = mychekbox.current;
 if (x !==  undefined) {
if( x.checked){
setuncheked(false)
}
else
setuncheked(true)
}
 }
// send file to state
const onChangeHandler=event=>{
    let files = event.target.files
     if(checkMimeType(event) && checkFileSize(event) ){ 
     // si true cherger le state
     setselectedFile(files)
   }
   }
   // chek type image 
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
  // unmout componenet and send to action
    function unmount(){
      if(old[0].name !== "" &&  old[0].type !== "" && old[0].prix!=="" && old[0].couleur!=="" )
      {
      if(staselectedFilete !==null)
      {
     let name1 = Date.now().toString().substring(0,4)
     let name2 = staselectedFilete[0].name
    image = "http://localhost:3000/imageuplod/"+name1 + "-" +name2
     console.log(image)
      }
      else
      {
      image = null
     }

     setTimeout(() => {
      props.updatedateprodact(old[0],image)
     
      props.setnewhistoriquefromapi(old[0],props.users[0],"modification")
    }, 1000);

     

        contenu.current.innerHTML= "<div><h1> Votre Donner A eté modifier avec Succeé<h1></div>"

    }
    else
    alertref.current.style='display: block'
  }
    //uplod iimage to server
    const onClickHandler = () => {
      const data = new FormData()
  
       
         for(var x = 0; x<staselectedFilete.length; x++) {
          data.append('file', staselectedFilete[x])
        }
        console.log(data , staselectedFilete)
      axios.post("http://localhost:8000/upload", data, {
  
  
  
  
      })
        .then(res => { // then print response status
          toast.success('upload success')
          console.log(res)
        })
        .catch(err => { // then print response status
          toast.error('upload fail')
          console.log(err)
        })
      }
    return (
       <>
    <Navbar toggleMenu={setIsOpened} />
   <Background setIsOpened={isOpened} show={isOpened} />
   <Sidebar show={isOpened} setIsOpened={setIsOpened} />
   <div className="Content" ref={contenu}>
     {console.log("produit "  , old)}
     <div  ref ={alertref} class="alert alert-warning alert-dismissible fade show" 
role="alert">
 <strong>notifiaction!</strong> Merci de remplire tous les champs obligatoire <span span 
className="rouge">*</span>
 <button type="button" class="close" data-dismiss="alert" onClick={() => alertref.
current.style='display:none'} aria-label="Close">
   <span aria-hidden="true">&times;</span>
 </button>
 </div> 
   {old.length > 0 ?  <>

    <h3 className="centre-item"> Modifier de produit Numero  {old[0].id}</h3>
    <div class="form-group">
  <ToastContainer />
  </div> 
       <div className="contenaire bagroundgray">
           <br/><br/>
           <div className="ui inverted segment">
       <div  className="row">
           <div className="Name col-sm">
               <label className="col-sm-4">Name</label><span className="rouge">* </span>
               <input  className="col-sm-8" Value={old[0].name} type="text" onChange={(e) => old[0].name= e.target.value}></input>
           </div>
           <div className="Name col-sm">
           <label className="col-sm-4" >Type</label><span className="rouge">* </span>
           
               <input className="col-sm-8" type="text" Value={old[0].type}  onChange={(e) => old[0].type= e.target.value}></input>
           </div>
           <div className="Name col-sm">
           <label  className="col-sm-4"> Collection</label>
               <input  cclassName="col-sm-8" type="text" Value={old[0].collection} onChange={(e) => old[0].collection= e.target.value } ></input>
           </div>
           </div>
           <br/>
           <div className="row">
           <div className="marque col-sm">
           <label className="col-sm-4">Marque</label>
               <input  className="col-sm-8" type="text" Value={old[0].marque}  onChange={(e) => old[0].marque= e.target.value} ></input>
           </div>
           <div className="Reference  col-sm">
           <label className="col-sm-4">Reference</label><span className="rouge">* </span>
               <input className="col-sm-8"  type="text" defaultValue={old[0].reference}  onChange={(e) => old[0].reference = e.target.value}  ></input>
           </div>
           <div className="Image  col-sm">
  <label className="col-sm-4">Image</label>
     { uncheked ? <input className="col-sm-8"  type="text" defaultValue={old[0].image}  onChange={(e) => old[0].image= e.target.value}  ></input> :<>
      <input  type="file" class="form-control"  onChange={onChangeHandler}/><button class="btn btn-success btn-block" onClick={onClickHandler}>Upload</button></>}
       <small>Telecharger la photo </small> <input class="form-check-input"  ref = {mychekbox} onClick={chekedcondition} type="checkbox" 
    value="" id="defaultCheck1"/>
       
  </div>
           </div><br/>
           <div className="row">
    <div className="col-sm-4">
      <label className="col-sm-4" >Prix</label><span className="rouge">* </span>
        <input className="col-sm-8" defaultValue={old[0].prix}  type="text" onChange={(e) => old[0].prix= e.target.value} />
    </div>
    <div class="col-sm-4">
      <label className="col-sm-4">Quantiter</label><span className="rouge">* </span>
       <input  className="col-sm-8" defaultValue={old[0].quantite}  type="number"  onChange={(e) => old[0].quantite= e.target.value}/>
    </div>
    <div class="col-sm-4">
      <label className="col-sm-4">Couleur</label><span className="rouge">* </span>
       <input className="col-sm-8"  defaultValue={old[0].couleur}   type="color" onChange={(e) => old[0].couleur= e.target.value} />
    </div>
  </div>
          <button style={{ marginTop: '30px'}} onClick={unmount} className="ui inverted primary button col-md-4 colorwhite">Update produit </button>
       
        </div>
        </div> </> : " il n'existe pas"}
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    prod: state.prod,
    users: state.users.usersession
})
export default connect(mapStateToProps,{updatedateprodact,setnewhistoriquefromapi,getallproductfromapi})(Updateprodact);