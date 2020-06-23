import axios from 'axios'

export function login() {
  return (dispatch) => {
    axios.get("http://localhost:3000/users").then(response => {
      dispatch(getData(response.data))
    })
  }
}

export function getData(item) {
  return {
    type: "getusers",
    item
  }
}