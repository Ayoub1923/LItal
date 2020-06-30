import React,{useState,useEffect,useRef,createRef} from 'react'
import {connect} from 'react-redux'
import {Navbar, Footer} from "../composant";
import { Background } from "../composant";
import { Pagination } from "../composant";
import { Sidebar } from "../composant";
import {getallhistoriquefromapi ,changestatehistorique,filteraction,filtercolor,Filterdate} from '../../action/historiquaction'
import Historiqueitem from './historiqueitem'
let tabcolor = []
let tabdate = []
 function Historiquecontainer(props) {
    const [isOpened, setIsOpened] = useState(false);
    const [input, setinput] = useState("");
    const [filter_key, set_filter_key] = useState("");
    const [historie, hostorieState] =  useState([])
  
    const [user,setuser]= useState([... new Set(props.hist.map( el => el.couleur))])
  let  select = useRef();
    const [state, setState] = useState({
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
    })
    useEffect(() => {
        props.getallhistoriquefromapi()
      
      }, []);
      useEffect(() => {
        let x =[... new Set(props.hist.map( el => el.couleur))]
        setuser(x)
   console.log( "resived",x)



   
    
   
        
      }, [props.hist])



      function recherche(){
     if (input !== '')
     {
      props.changestatehistorique(input)
     }
     else 
     props.getallhistoriquefromapi()
      }

      function onchange(e){
        setinput(e.target.value)
      }
      const showhistorique = (rowsPerPage) => {
        var result = null;
              if (rowsPerPage.length > 0)
          result = rowsPerPage.reverse().map((el, i) => {
            return <Historiqueitem  key ={i} historique={el}></Historiqueitem>;
          });
        
        return result;
      };
    const changestate = (e) =>
      {let x = e.target.value
        console.log(x)
        set_filter_key(x)
        setTimeout(() => {
        if (x !=="Tous")
        props.filteraction(x)
      
        else
     
        props.getallhistoriquefromapi()

      },500)
    }
      const onChangePage = data => {
        setState({
          pageLimit: data.pageLimit,
          totalPages: data.totalPages,
          currentPage: data.page,
          startIndex: data.startIndex,
          endIndex: data.endIndex
        });
      };
      let rowsPerPage = [];
      rowsPerPage = props.hist.slice(state.startIndex, state.endIndex + 1);
      tabcolor = props.hist.map( el => el.couleur) // de state ver tableux
      tabcolor = [...new Set(tabcolor)]  // effacer les valueur repeter tabcolor 
     
     if( user.length > 0 )
     { document.getElementById("mohamed").style.backgroundColor="red" 
     
     for ( let i=0 ; i<user.length;i++){
        
        console.log(select)
      }
    }
      console.log(user)
      tabdate = props.hist.map( el => el.dateaction) 
      tabdate = [...new Set(tabdate)] 
      const filtercolor = (e) => {
      let x= e.target.value 
      setTimeout(() => {
        console.log(x)
       
      if (x !== "")
      { 
       //let  resulta =  props.hist.filter( (el,i) => el.couleur == x)
        props.filtercolor(x)
      }
      if (x==="")
     
        props.getallhistoriquefromapi()
      })
    }
 const filterdate= (e) => {
   let x = e.target.value;
   if (x !== ""){

     props.Filterdate(x)
   }
   else
   props.getallhistoriquefromapi()
 }
    return (

        <>
        
  <Navbar toggleMenu={setIsOpened} />
  <Background setIsOpened={setIsOpened} show={isOpened} />
  <Sidebar show={isOpened} setIsOpened={setIsOpened} />
  <div className="Content">
  <h3>Historique Letal</h3>
  <div className="">
    <div className="dispalyflexbettwen">

    <div className="col-xs-12 box_change_pagelimit">
    Select affichage
           <select
        className="form-control"
        value={state.pageLimit}
        onChange={e =>setState({ pageLimit: parseInt(e.target.value) })
        }
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
    <div className="col-xs-12 box_change_pagelimit">
 Select Action
        <select
     className="form-control"
     value={filter_key}
     onChange={changestate}
   > 
      <option value=""></option>
      <option value="Tous">TOUS</option>
     <option value="Ajouter">Ajouter</option>
     <option value="Modifier">Modifier</option>
     <option value="suprimer">suprimer</option>
     <option value="commentaire">ajouter comentaire</option>
   </select>
   <select   onChange={filtercolor} >
   <option value="couleur"> couleur</option>
   <option value="">all </option>
    {tabcolor.map((item, key) =>   item ?
      <option key={key} value={item} type="color"  ref={select} id="mohamed">{item} </option> : null
    )
    
  
  
    })

</select>

 <select onChange={filterdate} >
<option value="">date</option>
<option value="">all</option>
{tabdate.map((item,key) => <option key={key} value={item}>{item}</option>)}


 </select>



      
 </div>
 </div>
  </div>
  <span class="ui input">
  <input type="text" placeholder="user,type,prix,color,REF"    onChange={(e) => onchange(e)}></input><button className="ui inverted primary button colorwhitee" onClick={recherche}>Recherche</button>
</span>

  <table class="ui blue table">
   <thead>
     <tr><th>Id</th>
       <th>Nom user</th>
       <th>Nom produit</th>
       <th>Reference</th>
       <th>Date action</th>
       <th>Type action</th>
       <th>Plus de detailes</th>
     </tr></thead><tbody>
    { /* props.hist.map(el => <Historiqueitem historique={el}></Historiqueitem>)*/
      showhistorique(rowsPerPage)
    }
     
    
    
    </tbody>
    </table>
    <div className="col-xs-12 box_pagination_info text-right">
    <p>
    Nombre d'action :   {props.hist.length}  Page {state.currentPage}/{state.totalPages}
    </p>
     </div>
     <div className="col-xs-12 dispalyflexbettwen">
    <Pagination
      totalRecords={props.hist.length}
      pageLimit={state.pageLimit || 5}
      initialPage={1}
      pagesToShow={5}
      onChangePage={onChangePage}
    />
    </div>
 
       </div>
       <Footer/>
        </>
    )
}
const mapStateToProps = (state) => ({
    hist : state.historique
})
const mapDispatchToProps = (dispatch) => ({
    getallhistoriquefromapi: () => dispatch(getallhistoriquefromapi()),
    changestatehistorique : (x) => dispatch(changestatehistorique(x)),
    filteraction :(x) => dispatch(filteraction(x)),
    filtercolor : (x) => dispatch(filtercolor(x)),
    Filterdate : (x) => dispatch(Filterdate(x))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Historiquecontainer)