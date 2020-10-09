import axios from '../../api/axios/axios'

import qs from 'querystring'
import { mapGetters } from 'vuex'

import store from '../../store'
const token = localStorage.getItem('token')

const state = () => ({
    
  data :  [],
  load : false,
  uas : null,
  uts : null,
  krs : null,
  id_mahasiswa : '',
  khs : null,
        
})

  
const actions = {

    dels({commit}, id){

      return new Promise((resolve) => {

          axios.delete(`/admin/mahasiswa/${id}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id)
            axios.delete(`/admin/users/${id}`, {
              
              headers: {
  
                'Authorization': `Bearer ${token}`
                
              },
              
            })
            .then((res) => {
              
              resolve()
            
            })
          
          })
          .catch(err => err)
        
      })
    },
    
    actEdit({commit}, val){
        const {id_mahasiswa, semester} = val

        return new Promise((resolve) => {
          axios.put(`/admin/mahasiswa/${id_mahasiswa}/edit`, qs.stringify({semester})).then(res => {
              commit('edit', val)
              
          }).catch(err => err)
          resolve()
        })
      },
    
    actAdd({commit}, {nama, nim, email, tahun_masuk, jurusan, semester, jenis_kelamin}){ 
      console.log(tahun_masuk)
      const user = {

        username : nim,
        password : nim,
        role : 'mahasiswa'

      }
      const data = {

        nim,
        nama:nama.toUpperCase(),
        foto : 'avatar.jpg',
        email,
        tahun_masuk,
        jurusan,
        jenis_kelamin,
        semester,
        status_krs : 'tutup',
        status_uts : 'tutup',
        status_uas : 'tutup',
        status_khs : 'tutup',
       
        
      }
      console.log(data)
      return new Promise((resolve) => {
        
         axios.post('/admin/users', qs.stringify(user), {
            
          headers : {'Authorization': `Bearer ${token}`
          
        }}).then(res => {
            
          const user_id = res.data.user_id
            
           axios.post('/admin/mahasiswa', qs.stringify({user_id, ...data}), {
              
            headers : {'Authorization': `Bearer ${token}`
            
          }}).then(res => {
              
            commit('addMhs', {...data, user_id})
            
            resolve()
            
          }).catch(err => err)  
          
        }).catch(err => err)
          
        })
      
        
    },
    
   actGetData({commit}, tokens){

        return new Promise((resolve) => {
  

          axios.get('/admin/mahasiswa', {
              
              headers : {'Authorization': `Bearer ${token}`
            
            }})
            .then(res => {
              
              commit('getData', res.data || [])

              resolve()
            
            })
            
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
  
    },
    
    
    
     uas({commit}, val){
      
        
        const data = {
          status_krs : val.krs,
          status_uts : val.uts,
          status_uas : val.uas,
          status_khs : val.khs,
          
        }
      
        console.log(data)
      
        
          axios.put(`/admin/mahasiswa/status/${val.id_mahasiswa}`, data, {
            
          headers : {'Authorization': `Bearer ${token}`
          
        }}).then(res => {
          console.log('berhasil')
          commit('setUas', data)          
        })
    
      
      
       
    },
    khs({commit}, val){
      
        
      const data = {
        status_krs : val.krs,
        status_uts : val.uts,
        status_uas : val.uas,
        status_khs : val.khs,
        
      }
    
      console.log(data)
    
      
        axios.put(`/admin/mahasiswa/status/${val.id_mahasiswa}`, data, {
          
        headers : {'Authorization': `Bearer ${token}`
        
      }}).then(res => {
        console.log('berhasil')
        commit('setKhs', data)          
      })
  
    
    
     
  },
    
    uts({commit, state}, val){

      const data = {
        status_krs : val.krs,
        status_uts : val.uts,
        status_uas : val.uas,
        status_khs : val.khs,
        
      }
      axios.put(`/admin/mahasiswa/status/${val.id_mahasiswa}`, data, {
         
       headers : {'Authorization': `Bearer ${token}`
       
     }}).then(res => {
         
       commit('setUts', data)
   
       
     }).catch(err => err)  
       
    },
    
    krs({commit}, val){

      const id_mhs = val.id_mahasiswa
      const data = {
        status_krs : val.krs,
        status_uts : val.uts,
        status_uas : val.uas,
        status_khs : val.khs,
        
      }
      axios.put(`/admin/mahasiswa/status/${id_mhs}`, data, {
         
       headers : {'Authorization': `Bearer ${token}`
       
     }}).then(res => {
         
      commit('setKrs', data)
   
       
     }).catch(err => err)  
       
    },
    
    // krsSet({commit}, val){

      
    //   commit('setKrsBefore', val)
       
    // },
    // uasSet({commit}, val){

      
    //   commit('setUasBefore', val)
       
    // },
    // utsSet({commit}, val){

      
    //   commit('setUtsBefore', val)
       
    // },
    setLoad({commit}){
      commit('load', '')
    },
    
  
  
}
  
  
const mutations = {
load(state, val){
  state.load = true
},
setKrsBefore(state, val){
  
  state.krs = val
  state.load = false


},
setUasBefore(state, val){
  
  state.uas = val
  state.load = false


},
setUtsBefore(state, val){
  
  state.uts = val
  state.load = false


},
    setUas(state, val){
        console.log(val)
        state.uas = val.status_uas
        state.load = false

      
    },
    
    setKhs(state, val){
      console.log(val)
      state.khs = val.status_khs
      state.load = false

    
  },
    setUts(state, val){
    
  
      state.uts = val.status_uts
      state.load = false

    },
    setKrs(state, val){
    
      state.krs = val.status_krs
      state.load = false

    },
    setId(state, val){
    
      state.id_mahasiswa = val


    },
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

      const index = state.data.findIndex(({id_mahasiswa}) => id_mahasiswa == val.id_mahasiswa )
      
      state.data[index]['semester'] = val.semester

      
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
  




  