import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { connect } from 'react-redux'
import { Navbar } from "../composant";
import { Background } from "../composant";
import { Sidebar } from "../composant";
import { Footer } from "../composant";
import {setnewhistoriquefromapi} from '../../action/historiquaction'
import { getallproductfromapi,postallcomment } from '../../action/produit'

let urlid = window.location.search


function Comentaire(props) {

    const [filterdata, setfilterdata] = useState([]);
    const [produit, setproduit] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
const [texeria, settexteria] = useState("")
    const [id, setid] = useState("");
    useEffect(() => {
        props.getallproductfromapi()
        setid(urlid.slice(1, urlid.length))


        return () => {

        }
    }, [])

    useEffect(() => {
        setproduit(props.prod.product.filter(el => el._id == id))
        setfilterdata(produit.filter(el => el.ok))


    }, [props.prod.product])
    useEffect(() => {

        return () => {

        }
    }, [])
    let x = produit.map(el =>el.ok)
    let length = produit.map(el =>el.ok.length)
   function handleChange(event) {   settexteria(event.target.value);  }
   function  sendcomentaire() 
    { let datee=  moment().format("DD/MM/YYYY, h:mm:ss a") //  Date(Date.now()).toString().substring(0, 15)
      let y = {text:texeria,date:datee,user:localStorage.getItem('First_name'),role:localStorage.getItem('role')}
       let  xx= produit.map(el =>el.ok)
       console.log(xx)
       let z = [...xx[0].concat(y)]
      console.log("allvalue", length)
      props.postallcomment(id,z)
      let  tableux =Object.values(produit[0])
    console.log("mon tableux",tableux)
    const data = tableux.splice(0,9);
    let comentaction  = { 
        name: data[1],
        type:data[2],
        collct:data[3],
        marque:data[4],
        ref:data[5],
        image: data[6],
        prix:data[7],
        quantite:data[8],
        couleur: data[9],
        }
 
      props.setnewhistoriquefromapi(comentaction,localStorage.getItem('First_name'),"ajouter comentaire")
    }
    return (
        <>
            {
                console.log("prosuit", x)}
            <Navbar toggleMenu={setIsOpened} />
            <Background setIsOpened={setIsOpened} show={isOpened} />
            <Sidebar show={isOpened} setIsOpened={setIsOpened} />
            <div className="Content">
                {produit.map(el => <>
                    <h4>Produit ID:  {el._id}</h4>
                    <div className="flex-warped">
                        <p>produit name :{el.name}</p>
                        <p>produit  :{el.ref} </p>
                        <p>Image Produit  :<img src={el.image} alt ={el._id + el.name} width="100px" /> </p>
                    </div>
                    <div>{Object(el.ok).map(el => <div>
                        <div class="ui segment">


                        <p>Nom personne : {el.user}</p>
                        <p>Position :{el.role} </p>
                        <p>Comentair :  {el.text}</p>
                        <p>Date comentaire : {moment(el.date, "DD/MM/YYYY,h:mm:ss a").fromNow()}({el.date.substring(0, 10)})</p>
                        </div>

                    </div>
                    )} </div>

                </>)}
                <div></div>
                <span></span>
                <span></span>
                <div class="ui form">
                    <div class="field">
                        <label>Votre Comentaire</label>
                        <textarea rows="2" value={texeria} onChange={handleChange}></textarea>
                    </div>
                    <button class="ui inverted primary submit button" onClick={sendcomentaire}>Ajouter Comentaire</button>
                </div>
            </div>
        </>
    )
}
export default connect((state) => ({
    prod: state.prod,
    useres: state.users
})
    , { getallproductfromapi,postallcomment ,setnewhistoriquefromapi})(Comentaire)
