import axios from '../../api/axios/axios'

import qs from 'querystring'

const token = localStorage.getItem('token')

const state = () => ({
    
  data :  [],
        
  loading : false

  
})

  
const actions = {

    refreshToken({commit}){
      alert('hai')
    },
    
    dels({commit}, id){

      return new Promise((resolve) => {

        axios.get('/auth/checkaccess/admin', {

          header : {

            'Authorization' : `Bearer ${token}`
          
          }

        })
        .then(res => {
        
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
        
        return axios.post('/users', qs.stringify(user), {
            
          headers : {'Authorization': `Bearer ${token}`
          
        }}).then(res => {
            
          const user_id = res.data.user_id
            
          return axios.post('/mahasiswa', qs.stringify({user_id, ...data}), {
              
            headers : {'Authorization': `Bearer ${token}`
            
          }}).then(res => {
              
            commit('addMhs', {...data, user_id})
            
          }).catch(err => err)  
          
        }).catch(err => err)
          
        })
        resolve()

    },
    
    actGetData({commit}){

        return new Promise((resolve) => {
          
          axios.get('/auth/checkaccess/admin', {
            
            header : {
              'Authorization' : `Bearer ${token}`
            }

          })
          .then(res => {
            
            axios.get('/mahasiswa', {
              
              headers : {'Authorization': `Bearer ${token}`
            
            }})
            .then(res => {
              
              commit('getData', res.data)
            
            })
            .catch(err => err)
          })
          .catch(err => err)
          

          resolve()
        })
    },
    
    setLoad({commit}){
      commit('setLoading')
    },
    
    actImport({commit}, val){
      commit('addImport', val)
    }
 
  
  
}
  
  
const mutations = {

    deleteSome(state, vals){
        
      const index = state.data.findIndex(val => val.user_id == vals)
        
      state.data.splice(index, 1)
        
      state.loading = false
    
    },

    setLoading(state){

      state.loading = true  

    },

    addMhs(state, val){

      state.data.push(val)
      
      console.log(val)
      
      state.loading = false
    },

    edit(state, val){

      const index = state.data.findIndex(({id}) => id == val.id )
      
      state.data[index]['nama'] = val.nama
      
      state.data[index]['kontak'] = val.kontak
      
      state.data[index]['nim'] = val.nim
      
      state.loading = false

    },

    loadFalse(state){
      state.loading = false
    },

    getData(state, val){

      state.data = [...val]
      
      state.loading = false

    },

    addImport(state, val){
      state.data.push(...val)
    }
 
  
}
  
export default {
      
  namespaced : true,
      
  state,
      
  actions,
      
  mutations,
  
}
  




  