import React,{useState,useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Modal,Button } from 'react-bootstrap';
import {addidproducttostate,delateproduct} from '../../action/produit'
import {setnewhistoriquefromapi} from '../../action/historiquaction'
import swal from 'sweetalert';
let message = "n`ont pas indiquer "
 function Productitem(props) {
  let [valeur , show] = useState(false)
  function delate(){

  swal({
    title: "suprimer Produit "+ props.product.name + "?",
    text: ` voulez vous vriment suprimer le  produit!  `,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((okpressed) => {
    if (okpressed) {
      props.delateproduct(props.product._id)
      let action = "produit suprimer"
      let x  = { name: props.product.name,
        type:props.product.type,
        collct:props.product.collct,
        marque:props.product.marque,
        ref:props.product.ref,
        image: props.product.image,
        prix:props.product.prix,
        quantite:props.product.quantite,
        couleur: props.product.color,
        }
        props.setnewhistoriquefromapi(x,props.users[0],action)
    
     swal("Done!", "le produit a eté suprimer!", "success")
    .then((okpressed) => {
     window.location.reload()

    })
      
    } 
    else {
      swal("votre donnee a eté sauvez 😅 	😅")
    }
  });
  }
  function update(){
    props.addidproducttostate(props.product.id)
    
    }
    const shows = () => {
      show(true)
    }
  const  handleClose = () => {
      show(false)
    }
    const testcom = () => {
      console.log(props.com.map(el => el.name))
    }
   let x = Object(props.com)
    return (
        <>
<tr style={{verticalAlign: "middle"}}>
     <td>{props.product._id.slice(20,24)}</td>
     <td>{props.product.name ?props.product.name :message}</td>
     <td>{props.product.ref?props.product.ref: message}</td>
   
     <td ><input type="color" value={props.product.couleur } disabled title={props.product.couleur}/></td>
     <td>{props.product.quantite}</td>
     <td className="alignitem"><img src= {props.product.image} alt={props.product.name + props.product._id} width="100px"/></td>
    
     <td><a href={'comentaire?' + props.product._id}><i class="facebook messenger icon"></i>{x.length}</a></td>
     <td > <div className="flex-bettwen"><button onClick={()=>delate() } class="bagroundcolortransparent colorred"><i class="trash icon"></i></button>{" "}

<a href={'/update-produit?' + props.product._id}> <button onClick={() => update()} class=" bagroundcolortransparent coloryellow" ><i class="edit icon"></i>
</button> </a>  <button onClick={() => shows()} class="bagroundcolortransparent vertcolor" ><i class="eye icon"></i></button></div> </td>
 </tr>


 <Modal show={valeur} onHide={handleClose} dialogClassName="modal-100w" animation = {true}
        aria-labelledby="example-custom-modal-styling-title" size="xl">
       <Modal.Header closeButton>
   <Modal.Title>Transaction numero {props.product.id}</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <table class="ui blue table">
    <thead>
    <tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Collection</th>
    <th>Marque</th>
    <th>Reference</th>
    <th>Image</th>
    <th>Prix</th>
    <th>Color</th>
    <th>Mesur</th>
    <th>Date ajoute</th>
    <th>Date Modification</th>
   </tr></thead><tbody>
       <tr>
<td>{props.product.name}</td>
<td>{props.product.type}</td> 
<td>{props.product.collct}</td>
<td>{props.product.marque}</td>
<td>{props.product.ref}</td>
<td className="alignitem"><img src={props.product.image}  alt={"produit" + props.product.name + "id " + props.product.id} width="100px"/></td>
<td>{props.product.prix}</td>

<td ><input type="color" value={props.product.couleur } disabled/></td>
    <td>{props.product.mesure ? props.product.mesure :message}</td>
<td>{props.product.dateajoute}</td>
<td>{props.product.datemodification ? props.product.datemodification : "produit n'est pas modifier"}</td>
</tr>
  </tbody>
  </table>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
       </Modal.Footer>
     </Modal>
        </>
    )
}
 
  const mapStateToProps = (state) => ({
  users: state.users.usersession
});

export default connect(mapStateToProps,{delateproduct,addidproducttostate,setnewhistoriquefromapi})(Productitem);