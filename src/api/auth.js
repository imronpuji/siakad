import axios from 'axios'
const token = localStorage.getItem('token')
// 'https://cors-anywhere.herokuapp.com/apisiakad.hilmimubarok.com'
export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/f74247528eb8.ngrok.io'

})