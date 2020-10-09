import axios from '../../api/axios/axios'

import store from '../../store'


const state = () => ({
    
  data :  [],
        
})

  
const actions = {

    
    actGetData({commit}){

        return new Promise((resolve) => {
          let token = store.state.auth.token
          console.log(token)
            axios.get('/mahasiswa/dosen', {
              
              headers : {'Authorization': `Bearer ${token}`
            
            }})
            .then(res => {
              console.log(res)
              commit('getData', res.data || [])

              resolve()
            
            })
            
          })
    },
    
    setLoadFalse({commit}){
      commit('setLoadTofalse')
    },
    
  
  
}
  
  
const mutations = {

 
    getData(state, val){

      state.data = [...val]
      
      store.dispatch('components/setLoadFalse')


    },
}
  
export default {
      
  namespaced : true,
      
  state,
      
  actions,
      
  mutations,
  
}
  




  