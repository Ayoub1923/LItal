import * as types from '../action/type'


const init = []

const historiqueReducer = (state = init, action) => {
    switch (action.type) {
        case types.GETALLHISTORIQUE:
            console.log("historiqu", action.paylod)
            return action.paylod
        case types.ADDISTORIQUE:
            return [action.paylod, ...state]
        case types.FILTERHISTORIQUE:
            let x = state;
            console.log(action.paylod)
            console.log(x)
            if (action.paylod !== '')
                return state.filter(el => el.name == action.paylod || el.useraction == action.paylod || el.type == action.paylod || el.prix == action.paylod || el.couleur == action.paylod || el.reference == action.paylod)
        case types.FILTEACTION: {
            console.log(action.paylod)
            if (action.paylod == 'Ajouter')
                return state.filter(el => el.action == "ajoute produit")
            else if (action.paylod == 'Modifier')
                return state.filter(el => el.action == "modification")
            else if (action.paylod == 'suprimer')
                return state.filter(el => el.action == "produit suprimer")
            else return state
        }
        case types.FilterColor:
              if (action.paylod !=="")
            return  state.filter(el => el.couleur == action.paylod)
            else return state
            case types.Filterdate:
                if (action.paylod !=="") 
                return state.filter(el => el.dateaction == action.paylod)
                else return state
        default:
            return state


    }

}

export default historiqueReducer