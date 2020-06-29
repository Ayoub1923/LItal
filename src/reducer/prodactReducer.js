import * as types from '../action/type'
import { act } from 'react-dom/test-utils'

const init = {
    product: [],
    idproduct: "",
    comment: [],
}

const prodactReducer = (state = init, action) => {
    switch (action.type) {
        case types.ADDPRODUCT:
            console.log("product add ", action.paylod)
            return {
                ...state,
                product: [...state.product, action.paylod]
            }
        case types.GETALLPRODUCT:

            return {
                ...state.product,
                product: action.payload
            }
        case types.DELETEPRODUCTSTATE:

            return {
                ...state,
                product: state.product.filter((el) => el.id !== action.paylod)
            }
        case types.ADDIDPRODUCTTOSTATE:
            console.log("id est", action.paylod)
            return {
                ...state,
                idproduct: action.paylod
            }

        case types.FILTERPRODUCT:
            return {
                ...state,
      "nombredemodification": 21,
      "nombredemodification": 21,
      product: state.product.filter(el => el.name == action.paylod || el.type== action.paylod || el.categorie == action.paylod || el.couleur == action.paylod || el.prix== action.payload  )
            }
        case types.ADDIDPRODUCTTOSTATE:
            return {
                ...state,
                idproduct: action.paylod
            }
        case types.GETCOMENTAIR:
            return {
                ...state,
                comment: action.payload
            }
        case types.FILTERBYQUANTITER:
            console.log("resive",action.paylod )
            if (action.paylod == 10)
            {
            console.log("10")
                return {
                    ...state,
                    product: state.product.filter(el => el.quantite < 10)
                }
            }
            else if (action.paylod == 50)
            {
                return {
                    ...state,
                    product: state.product.filter(el => el.quantite >= 10 && el.quantite < 50)
                }
            }
            else if (action.paylod == 100)
                return {
                    ...state,
                    product: state.product.filter(el => el.quantite >= 50 && el.quantite < 100)
                }
                else if (action.paylod == 200)
                return {
                    ...state,
                    product: state.product.filter(el => el.quantite >= 100 && el.quantite < 200)
                }
 
        default:
            return state
    }
}




export default prodactReducer