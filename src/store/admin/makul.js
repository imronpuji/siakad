import store from '../../store'
import qs from 'querystring'

import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
  })
 
  const actions = {
      dels({commit}, id){
        return new Promise((resolve) => { setTimeout(() => {
          commit('deleteSome', id)
          resolve()
        }, 2000)})
      },
      actEdit({commit}, id){
        return new Promise((resolve) => { setTimeout(() => {
          commit('edit', id)
          resolve()
        }, 2000)})
      },
      actAdd({commit}, val){
        
      },
      actGetData({commit}){
        return new Promise((resolve) => {
          
          axios.get('/makul', {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(res => {
            
            commit('getData', res.data)

            resolve()
          
          })
          .catch(err => err)
        })
      },
      setLoad({commit}){
        commit('setLoading','')
      }
  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.id == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },

    addMakul(state, val){
      state.data.push(val)
      store.dispatch('components/setLoadFalse')

    },
    edit(state, val){
      const index = state.data.findIndex(({id}) => id == val.id )

      state.data[index]['nama'] = val.nama
      console.log(index)
      state.data[index]['sks'] = val.sks
      state.data[index]['semester'] = val.semester
      state.data[index]['id_dosen'] = val.id_dosen
      state.data[index]['nama_dosen'] = val.nama_dosen

      store.dispatch('components/setLoadFalse')


    },
    getData(state, val){
      state.data = [...val]
      
      store.dispatch('components/setLoadFalse')

    }
  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  