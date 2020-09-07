import axios from 'axios'
const token = localStorage.getItem('token')
// 'https://cors-anywhere.herokuapp.com/apisiakad.hilmimubarok.com'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default  axios.create({
    baseURL: 'https://apisiakad.hilmimubarok.com',
    /* other custom settings */
  });