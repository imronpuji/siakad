import store from '../../store'
import qs from 'querystring'
import _ from 'lodash'
import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataMakul : []
  })
 
  const actions = {
      dels({commit}, id){
        return new Promise((resolve) => {

          axios.delete(`/admin/jadwal/${id.id_makul}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id.id_makul)
            commit('getMakul', [{nama_makul : id.nama_makul, id_makul :id.id_makul}])
            resolve()
          
          })
      })
      },

      actEdit({commit}, val){

        return new Promise((resolve) => {
          axios.put(`/admin/jadwal/${val.id_jadwal}`, qs.stringify(val))
          .then(() => commit('edit', val))
          .catch(err => err)
        })
      },
      actAdd({commit},val ){
        const {selesai, nama_makul, id_makul, mulai, hari} = val

        const data = {
          makul_id : id_makul,
          mulai,
          selesai,
          hari,
        }

        console.log(data)
        return new Promise((resolve) => {
        axios.post('/admin/jadwal', qs.stringify(data)) 
        .then((res) => {
          commit('addJadwal', {...val, id_jadwal: res.data.id_jadwal})
          commit('deleteMakul', id_makul)
          console.log(res)
        })
        .catch(err => err)
        })
      
      },
      actGetData({commit}){
        return new Promise((resolve) => {
          
          axios.get('/admin/jadwal', {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(result => {
            commit('getData', result.data)
            console.log(result)
            axios.get('/admin/makul', {
            
              headers : {'Authorization': `Bearer ${token}`
            
            }})

            .then((res) => {
              const makul = _.differenceBy(res.data, result.data, 'id_makul')
              commit('getMakul', makul)
              resolve()
            })
            
            .catch(err => err)


          
          })
          .catch(err => err)
        })
      },
      actAddMakul({commit}, val){
        commit('addMakul', [val])
      },
      setLoad({commit}){
        commit('setLoading','')
      },

      delJadwal({commit}, id){
        return new Promise((resolve) => {

          axios.delete(`/admin/jadwal/${id}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id)
            commit('deleteMakul', id)
            resolve()
          
          })
      })
      },
      actEditMakul({commit}, val){
        commit('editMakul', val)
        commit('editJadwal', val)
      }

  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.id_makul == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },

    addJadwal(state, val){
      console.log(val)
      state.data.push(val)
      store.dispatch('components/setLoadFalse')

    },
    edit(state, val){
      const index = state.data.findIndex(({id_jadwal}) => id_jadwal == val.id_jadwal )

      state.data[index]['mulai'] = val.mulai
      state.data[index]['selesai'] = val.selesai
      state.data[index]['hari'] = val.hari

      store.dispatch('components/setLoadFalse')


    },
    getData(state, val){
      console.log(val)
      state.data = [...val]
      store.dispatch('components/setLoadFalse')

    },
    getMakul(state, val){
      console.log(val)
      state.dataMakul = [...val]
    },
    addMakul(state, val){
      console.log(val)
      state.dataMakul.push(...val)
    },
    deleteMakul(state, vals){
      const index = state.dataMakul.findIndex(val => val.id_makul == vals)
      state.dataMakul.splice(index, 1)
    },
    editMakul(state, val){
      const index = state.dataMakul.findIndex(({id_makul}) => id_makul == val.id_makul )
      if(index != -1){
        state.dataMakul[index]['nama_makul'] = val.nama_makul
      }
    },
    editJadwal(state, val){
      const index = state.data.findIndex(({id_makul}) => id_makul == val.id_makul )
      if(index != -1){
        state.data[index]['nama_makul'] = val.nama_makul
      }
    }
  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  