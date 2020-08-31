import axios from '../../api/axios/axios'

import qs from 'querystring'

import store from '../../store'

const token = localStorage.getItem('token')

const state = () => ({
    
  data :  [],
        
})

  
const actions = {

    dels({commit}, id){

      return new Promise((resolve) => {

          axios.delete(`/mahasiswa/${id}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id)
            
            resolve()
          
          })
          .catch(err => err)
        
      })
    },
    
    // actEdit({commit}, val){
      //   const {nim, nama, email} = val

      //   return new Promise((resolve) => {
      //     axios.put(`/mahasiswa/${id_mahasiswa}/edit`, qs.stringify({nim, nama, email})).then(res => {
      //         console.log(res)
              
      //     }).catch(err => err)
      //     resolve()
      //   })
      // },
    
    actAdd({commit}, {nama, nim, email}){ 

      const user = {

        username : nim,
        password : nim,
        role : 'mahasiswa'

      }
      const data = {

        nim,
        nama,
        foto : 'avatar.jpg',
        email
        
      }
      return new Promise((resolve) => {
        
         axios.post('/users', qs.stringify(user), {
            
          headers : {'Authorization': `Bearer ${token}`
          
        }}).then(res => {
            
          const user_id = res.data.user_id
            
           axios.post('/mahasiswa', qs.stringify({user_id, ...data}), {
              
            headers : {'Authorization': `Bearer ${token}`
            
          }}).then(res => {
              
            commit('addMhs', {...data, user_id})
            
            resolve()
            
          }).catch(err => err)  
          
        }).catch(err => err)
          
        })
      
        
    },
    
    actGetData({commit}){

        return new Promise((resolve) => {
          
            axios.get('/mahasiswa', {
              
              headers : {'Authorization': `Bearer ${token}`
            
            }})
            .then(res => {
              
              commit('getData', res.data)

              resolve()
            
            })
            .catch(err => err)
          })
    },
    
    setLoadFalse({commit}){
      commit('setLoadTofalse')
    },
    
    actImport({commit}, val){
      
      return new Promise((resolve) => {

        commit('addImport', val)

        resolve()

      })
  
    }
 
  
  
}
  
  
const mutations = {

    deleteSome(state, vals){
        
      const index = state.data.findIndex(val => val.user_id == vals)
        
      state.data.splice(index, 1)
        
      store.dispatch('components/setLoadFalse')

    
    },

    addMhs(state, val){

      state.data.push(val)
            
      store.dispatch('components/setLoadFalse')


    },

    edit(state, val){

      const index = state.data.findIndex(({id}) => id == val.id )
      
      state.data[index]['nama'] = val.nama
      
      state.data[index]['kontak'] = val.kontak
      
      state.data[index]['nim'] = val.nim
      
      store.dispatch('components/setLoadFalse')


    },


    getData(state, val){

      state.data = [...val]
      
      store.dispatch('components/setLoadFalse')


    },

    addImport(state, val){
      state.data.push(...val)

      store.dispatch('components/setLoadFalse')


    }
 
  
}
  
export default {
      
  namespaced : true,
      
  state,
      
  actions,
      
  mutations,
  
}
  




  