import axios from './api/axios/axios'
const token = localStorage.getItem('token')
import qs from 'querystring'

export const interceptor = () =>{ 
axios.interceptors.request.use(
    config => {
      if(token){
       config.headers = { 
         'Authorization': `Bearer ${token}`,
       }
     }
     console.log(config)
     return config
   },
   error => {
     error
 });
 
 axios.interceptors.response.use((response) => {
   console.log(response)
   return response
 },   function (error) {
   if(error.response.status === 401){
      axios.post('/auth/refreshtoken',
      qs.stringify({id:'2', username:'imron', role : 'admin'}))
      .then( res => console.log(res))
      .catch(err => err)
   }

 });






}
 