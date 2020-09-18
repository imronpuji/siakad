import axios from 'axios'
const token = localStorage.getItem('token')
// 'https://cors-anywhere.herokuapp.com/apisiakad.hilmimubarok.com'
export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://1a0cae9fcbf0.ngrok.io'
  
  })