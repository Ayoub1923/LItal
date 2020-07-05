import React, { useEffect, useState } from 'react'
import { getallproductfromapi,changestateprodact,filterbyquantiter} from '../../action/produit'
import { connect } from "react-redux";

/*component */
import { Footer } from '../composant'
import Productitem from './Productitem'
import { Navbar } from "../composant";
import { Background } from "../composant";
import { Pagination } from "../composant";
import { Sidebar } from "../composant";
function Allproduct(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [input, setinput] = useState("");
  const [state, setState] = useState({
    totalRecords: "",
    totalPages: "",
    pageLimit: "",
    currentPage: "",
    startIndex: "",
    endIndex: "",
  })
  useEffect(() => {
    props.getallproductfromapi()
    console.log(props.stateprodact)
  }, []);
  function recherche(){
    if (input !== '')
    {
     props.changestateprodact(input)
    }
    else 
    props.getallproductfromapi()
     }
  const showprodact = (rowsPerPage) => {
    var result = null;
          if (rowsPerPage.length > 0)
      result = rowsPerPage.map((el, i) => {
        return <Productitem product={el} com={el.ok} key={i}  />;
      });
    
    return result;
  };
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
  rowsPerPage = props.prod.product.slice(state.startIndex, state.endIndex + 1)

 const  filterquantiter = (e) => {
 let quantiter = e.target.value;
 if(quantiter !== "")
 props.filterbyquantiter(quantiter)
 else
 props.getallproductfromapi()
 }
  return (
    <>
    <div>
      <Navbar toggleMenu={setIsOpened} />
      <Background setIsOpened={setIsOpened} show={isOpened} />
      <Sidebar show={isOpened} setIsOpened={setIsOpened} />
      <div className="Content">
        <h3>Gestion des Produit Lital</h3>
        <div className="row dispalyflexbettwen">
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
      Select Quantiter
           <select
        className="form-control"
        value={state.quantiterstock}
        onChange={filterquantiter
        }
       >
         <option value=""> </option>
        <option value={10}> 
       Quantiter &gt;10 </option>
        <option value={50}> Quantiter &lt;&#x3D; 10  &gt;50</option>
        <option value={100}>Quantiter &lt;&#x3D; 50  &gt;100 </option>
        <option value={200}>Quantiter &lt;&#x3D; 100  &gt;200</option>
        <option value={300}>Quantiter &lt;&#x3D;200</option>
      </select>
    </div>
        </div>
        <span class="ui input">
        <input type="text"  className=" col-md-4"   placeholder="name,type,categorie,prix,couleur" onChange={(e) => setinput(e.target.value)}></input><button className="ui inverted primary button colorwhitee" onClick={recherche}>Recherche</button>
        </span>
        { props.prod.product.length > 0 ?  <>
        <table class="ui blue table">
          <thead>
            <tr><th>id</th>
              <th>Nom</th>
              <th>Reference</th>
              <th>Couleur</th>
              <th>Quantiter</th>
              <th>Image</th>
              <th>Comentaire</th>
              <th>Action</th>
            </tr></thead><tbody>
             {/* props.prod.map(el => <Productitem product={el}></Productitem>)*/}
                    {     showprodact(rowsPerPage)          }
          </tbody>
        </table> </> : 
     <h1>vous n'avez pas encore de produit</h1> }
        <div className="col-xs-12 box_pagination_info text-right">
          <p>
          Nombre de produit: {props.prod.product.length} page  {state.currentPage}/{state.totalPages}
          </p>
        </div>
        <div className="col-xs-12 dispalyflexbettwen">
          <Pagination
            totalRecords={props.prod.product.length}
            pageLimit={state.pageLimit || 5}
            initialPage={1}
            pagesToShow={5}
            onChangePage={onChangePage}
          />
        
        </div>
       
      </div>
      <p className="marginletf30"><a href="/Addprodact">  <button className="ui inverted primary button ">Ajouter Nouvaux produit</button></a></p>
  
     
          </div>


<>
<Footer />
</>
</>
  )
}
const mapStateToProps = (state) => ({
  prod: state.prod
})

const mapDispatchToProps = (dispatch) => ({
  getallproductfromapi: () => dispatch(getallproductfromapi()),
  changestateprodact:(x) => dispatch(changestateprodact(x)),
  filterbyquantiter: (x) => dispatch(filterbyquantiter(x))
})

export default connect(mapStateToProps, mapDispatchToProps)(Allproduct)
