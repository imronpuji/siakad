import store from '../../store'
import qs from 'querystring'
import _ from 'lodash'
import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataMakul : [],
    makulMalam : [],
    makulPagi : []
  })
 
  const actions = {
      dels({commit}, id){
        return new Promise((resolve) => {

          axios.delete(`/admin/jadwal/${id.id_jadwal}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', id.id_jadwal)
            if(id.kelas == 'A'){
              commit('makulPagi', {nama_makul : id.nama_makul, id_makul :id.id_makul})

            } else {
              commit('makulMalam', {nama_makul : id.nama_makul, id_makul :id.id_makul})

            }
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
        const {selesai, nama_makul, id_makul, mulai, hari, kelas} = val

        const data = {
          makul_id : id_makul,
          mulai,
          kelas,
          selesai,
          hari,
        }

        console.log(data)
        return new Promise((resolve) => {
        axios.post('/admin/jadwal', qs.stringify(data)) 
        .then((res) => {
          commit('addJadwal', {...val, id_jadwal: res.data.id_jadwal})
          commit('deleteMakul', val)
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
            
              const makulPagi = result.data.filter(kelas => kelas.kelas == 'A')
              const makulMalam = result.data.filter(kelas => kelas.kelas == 'B')
              
              const pagi = _.differenceBy(res.data, makulPagi, 'id_makul')
              const malam = _.differenceBy(res.data, makulMalam, 'id_makul')
              
              commit('getMakulPagi', pagi)
              commit('getMakulMalam', malam)
            
              
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
        const index = state.data.findIndex(val => val.id_jadwal == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },
    
    makulMalam(state, val){
      state.makulMalam.push(val)
    },
    
    makulPagi(state, val){
      state.makulPagi.push(val)
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
    getMakulMalam(state, val){
      console.log(val)
      state.makulMalam = [...val]
    },
    getMakulPagi(state, val){
      console.log(val)
      state.makulPagi = [...val]
    },
    
    addMakul(state, val){
      console.log(val)
      state.dataMakul.push(...val)
    },
    deleteMakul(state, vals){
    const {id_makul, kelas} = vals
    if(kelas == "A"){
      const index = state.makulPagi.findIndex(val => val.id_makul == id_makul)
      state.makulPagi.splice(index, 1)
    } else {
      const index = state.makulMalam.findIndex(val => val.id_makul == id_makul)
      state.makulMalam.splice(index, 1)
    }
     
      
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
  