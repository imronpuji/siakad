import store from '../../store'
import qs from 'querystring'

import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],

  })
 
  const actions = {
    dels({commit}, id){
        return new Promise((resolve) => {

          axios.delete(`/dosen/nilai/${id}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id)
            resolve()
          
          })
      })
      },
    
    actEdit({commit}, val){
        const { id_nilai, nilai_angka, nilai_huruf } = val
        const data = {
          nilai_angka,
          nilai_huruf
        }
        return new Promise((resolve) => {
          axios.put(`/dosen/nilai/${id_nilai}`, qs.stringify(data))
          .then(() =>  {
            commit('edit', val)
          } )
          .catch(err => err)
        })
    },
    actAdd({commit},val ){
        const {file, judul, nama_makul, makul_id} = val

        let formData = new FormData()
        formData.append('judul', judul)
        formData.append('file', file)
        formData.append('makul_id', makul_id)
        return new Promise((resolve) => {
        axios.post('/dosen/materi', formData) 
        .then((res) => {
          commit('addData', {judul, nama_makul, file : file.name, id_materi: res.data.id_materi})
        })
        .catch(err => err)
        })
      
    },

    actGetData({commit}){
        return new Promise((resolve) => {
          axios.get(`/dosen/materi`, {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(res => {
            commit('getData', res.data)
            console.log(res)
            resolve()
          
          })
          .catch(err => err)
        })
    },

      actGetDataMakul({commit}){
        const user_id = store.state.auth.user[0].data.id
        console.log(user_id)
        axios.get(`/dosen/dosen/${user_id}/user_id`, {
            
          headers : {'Authorization': `Bearer ${token}`
        
        }}).then((res) => {
        axios.get(`/dosen/makul/${res.data[0].id_dosen}/dosen_id`, {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(result => {
            console.log(result)
            commit('getMakul', result.data)
          })
        })
 
 
      },

      actGetDataMhs({commit}, val){
       
        axios.get(`/dosen/mahasiswa/getbysemester/${val.semester}`, {
            
          headers : {'Authorization': `Bearer ${token}`
        
        }}).then((res) => {
          commit('addMhs', res.data)
          commit('selectedMakul', val)
        }) 
      },


      setLoad({commit}){
        commit('setLoading','')
      }
  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.id_nilai == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },

    addMakul(state, val){
      state.dataMakul.push(val)
      store.dispatch('components/setLoadFalse')
      store.dispatch('admin_jadwal/actAddMakul', val)

    },
    edit(state, val){
      const index = state.data.findIndex(({id_nilai}) => id_nilai == val.id_nilai )

      state.data[index]['nilai_huruf'] = val.nilai_huruf
      state.data[index]['nilai_angka'] = val.nilai_angka


      store.dispatch('components/setLoadFalse')


    },
    addData(state, val){

      console.log(val)
      state.data.push(val)
      store.dispatch('components/setLoadFalse')

    
    },
    getData(state, val){
      state.data = [...val]
      store.dispatch('components/setLoadFalse')

    },
    getMakul(state, val){
      state.dataMakul = [...val]
      store.dispatch('components/setLoadFalse')

    },
    addMhs(state, val){
      state.dataMhs = [...val]
    },
    selectedMakul(state, val){
      state.selectedMakul = val
    },

  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  