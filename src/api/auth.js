import axios from 'axios'
const token = localStorage.getItem('token')
// 'https://cors-anywhere.herokuapp.com/apisiakad.hilmimubarok.com'
export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/7747f868cace.ngrok.io'

})