import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import { DataTables, DataTablesServer } from 'vue-data-tables'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueFormulate from '@braid/vue-formulate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import vSelect from 'vue-select'
import { Service } from 'axios-middleware';
import axios from './api/axios/axios' 
import axiosIntance from 'axios' 
import qs from 'querystring'
import decode from 'jwt-decode'
import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
import VueDataTables from 'vue-data-tables'
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect)
Vue.use(VueSweetalert2);
locale.use(lang)
Vue.use(ElementUI)
Vue.use(DataTables)
Vue.use(DataTablesServer)
Vue.use(VueFormulate)

// import DataTables and DataTablesServer together
Vue.use(VueDataTables)
Vue.use(SweetModal)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(CoreuiVue)

Vue.config.performance = true



new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App,
  },

  created(){
    const error = () => this.$swal("connecting...")

    const tokens = localStorage.getItem('token')
    const profile = localStorage.getItem('profile')
    
      if(tokens){
        store.dispatch('auth/setToken', tokens)

      }
      if(profile != undefined){
        store.dispatch('auth/setProfile', JSON.parse(profile))
        
        if(store.state.auth.profile[0]['id_mahasiswa'] != undefined){
          axios.get(`/refresh?token=${tokens}`)
          .then((res) => {
          const profileCv = JSON.parse(profile)
          console.log(res)
          profileCv[0]['status_uas'] = res.data.status_uas
          profileCv[0]['status_uts'] = res.data.status_uts
          profileCv[0]['status_krs'] = res.data.status_krs
          profileCv[0]['status_khs'] = res.data.status_khs
          localStorage.setItem('profile', profileCv)
            store.dispatch('auth/setProfile', profileCv)
          })
          .catch(err => err)
        }

      }
    
    const service = new Service(axios);
    
    var username = '', role = '', id = ''
   
    service.register({  
      
      onRequest(config) {
        
        let token = store.state.auth.token
        
        if(token){
          
          config.headers['Authorization'] = `Bearer ${token}`
        
        }
        
        return config; 
      
      },

      onSync(promise) {
        console.log(promise)
        return promise;

      },

      onResponse(response) {
        console.log(response)
        return response;

      },
      
      onResponseError(responseError) {
      
        const token = store.state.auth.user[0].data
         
        if(token){
          
          id = token.id
          
          username = token.username
          
          role = token.role
        }
        
        const data = {
          
          id,
          
          username,
          
          role
        }
 
        if(responseError.toJSON().message == 'Network Error'){
          error()
          store.dispatch('components/setLoadFalse')
          router.push('/')
          return responseError
      
        }

        if(responseError.response.status == 401){
          
          return axios.post('/auth/refreshtoken', qs.stringify(data))
          
          .then(res => {
            
            console.log(res)
            
            responseError.response.config.headers['Authorization'] = 'Bearer ' + res.data.token;
            
            store.dispatch('auth/setToken', res.data.token)
            
            localStorage.setItem('token', res.data.token)
                                
            console.log(responseError)
            
            return responseError            
          
          })
        
        }
   
         
        else {
          
          return responseError
          
        } 
      }
    });
  },
})
