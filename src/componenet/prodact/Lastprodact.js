import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Pagination } from "../composant";
import { URL } from '../../action/baseurl'
import { Modal, Button } from 'react-bootstrap';
let datas = []
let message = "n`ont pas indiquer "
function Lastprodact(props) {

  let [data, setdata] = useState([])
  let [valeur, show] = useState(false)
  const [state, setState] = useState({
    totalRecords: "",
    totalPages: "",
    pageLimit: "",
    currentPage: "",
    startIndex: "",
    endIndex: "",
  })
  useEffect(() => {
    Axios.get(URL + "app/Allproduct")
      .then(res => {
      //  if (res.data.length > 15)
          setdata([...res.data.produit].reverse().slice(0, 14))
          console.log("pk " , res)
     //   else
      //    setdata([...res.data].reverse())
      })

      .catch((error) => console.log(error))
  }, [])
  const shows = () => {
    show(true)
  }
  const handleClose = () => {
    show(false)
  }
  const showprodact = (rowsPerPage) => {
    var result = null;
    if (rowsPerPage.length > 0) {
      return result = rowsPerPage.map((el, i) =>
        <><tr>
          <td>{el.id}</td>
          <td>{el.name ? el.name : message }</td>
          <td>{el.reference ? el.name : message  }</td>
          <td><input type="color" value ={el.couleur} disabled></input></td>
          <td>{el.quantite ? el.quantite : message} </td>
          <td>{el.dateajoute ? el.dateajoute : message}</td>

          <td><button onClick={() => shows()} class="bagroundcolortransparent vertcolor"><i class="eye icon"></i></button></td> 
        </tr>

          <Modal show={valeur} onHide={handleClose} dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title" size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Produit id:  {el.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table class="ui blue table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Collection</th>
                    <th>Marque</th>
                    <th>Reference</th>
                    <th>Prix</th>
                    <th>Color</th>
                    <th>Date ajoute</th>
                  </tr></thead><tbody>
                  <tr>
                    <td>{el.id}</td>
                    <td>{el.name ? el.name : message}</td>
                    <td>{el.type ? el.type : message}</td>
                    <td>{el.collection ? el.collection : message}</td>
                    <td>{el.marque ? el.marque : message}</td>
                    <td>{el.reference}</td>
                    <td>{el.prix}</td>
                    <td>{el.color}</td>
                    <td>{el.dateajoute}</td></tr>
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
  rowsPerPage = data.slice(state.startIndex, state.endIndex + 1);
  return (
    <>
    <div className="col-md-2">
    Select affichage
    <select
      className="form-control"
      value={state.pageLimit}
      onChange={e => setState({ pageLimit: parseInt(e.target.value) })
      }
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>
  <br/>
    <div>
      <table class="ui blue table">
        <thead>
          {
            console.log("data", state)}
          <tr><th>Id</th>
            <th>Nom</th>
            <th>Reference</th>
            <th>Couleur</th>
            <th>Quantiter</th>
            <th>Date ajout</th>
            <th>View Detail</th>
          </tr></thead><tbody>
          {/*[...data].reverse().map(el => <><tr>

                        <td>{el.name}</td>
                        <td>{el.color}</td>
                        <td>{el.categorie}</td>
                        <td>{el.image}</td>
                        <td>{el.id}</td>
                    </tr></>)*/
            showprodact(rowsPerPage)}
        </tbody>
      </table>
      <div className="col-xs-12 dispalyflexbettwen">
        <Pagination
          totalRecords={data.length}
          pageLimit={state.pageLimit || 5}
          initialPage={1}
          pagesToShow={5}
          onChangePage={onChangePage}
        />
      </div>
    </div>

    </>
  )
}


export default Lastprodact