import axios from 'axios'
// 'https://cors-anywhere.herokuapp.com/apisiakad.hilmimubarok.com'
export default axios.create({
    baseURL: 'https://apisiakad.hilmimubarok.com'
    // baseURL: 'https://dacc9b6c47ac.ngrok.io'
 
  })