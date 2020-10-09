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

          axios.delete(`/admin/makul/${id}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id)
            store.dispatch('admin_jadwal/delJadwal', id)
            resolve()
          
          })
      })
      },
      actEdit({commit}, val){
        const { nama_makul, dosen_id, id_makul, sks, semester } = val
        const data = {
          nama_makul,
          sks,
          semester,
          dosen_id
        }
        return new Promise((resolve) => {
          axios.put(`/admin/makul/${id_makul}`, qs.stringify(data))
          .then(() =>  {
            commit('edit', val)
            store.dispatch('admin_jadwal/actEditMakul', val)
          } )
          .catch(err => err)
        })
      },
      actAdd({commit},val ){
        const {dosen_id, nama_makul, sks, semester, nama, jurusan, id_makul} = val

        const data = {
          dosen_id : dosen_id,
          nama_makul : nama_makul.toUpperCase(),
          sks,
          semester,
          jurusan,
          id_makul
        }
        const dataMakul = {
          dosen_id : dosen_id,
          nama_makul : nama_makul.toUpperCase(),
          sks,
          semester,
          jurusan,
          id_makul,
          nama
        }

        console.log(data)
        return new Promise((resolve) => {
        axios.post('/admin/makul', qs.stringify(data)) 
        .then((res) => commit('addMakul', {...dataMakul, id_makul}))
        .catch(err => err)
        })
      
      },
      actGetData({commit}){
        return new Promise((resolve) => {
          
          axios.get('/admin/makul', {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(res => {
            const result = res.data.map(val => {
              if(val.nama == null){
                val['nama'] = 'dosen removed'
                return val

              } else {
                return val
              }
            })
            console.log(result)
            commit('getData', result)

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
        const index = state.data.findIndex(val => val.id_makul == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },

    addMakul(state, val){
      state.data.push(val)
      store.dispatch('components/setLoadFalse')
      store.dispatch('admin_jadwal/actAddMakul', val)

    },
    edit(state, val){
      const index = state.data.findIndex(({id_makul}) => id_makul == val.id_makul )

      state.data[index]['nama_makul'] = val.nama_makul

      state.data[index]['sks'] = val.sks
      state.data[index]['semester'] = val.semester
      state.data[index]['dosen_id'] = val.dosen_id
      state.data[index]['nama'] = val.nama

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
  