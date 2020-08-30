import store from '../../store'

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
        return new Promise((resolve) => { setTimeout(() => {
          commit('addMakul', val)
          resolve()
        }, 2000)})
      },
      actGetData({commit}){
        setTimeout(() => {
          commit('getData', '')
      }, 2000)
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
    getData(state){
      state.data = 
        [{
          "id": "1",
          "nama": "MTK",
          "sks": "2",
          "semester" : "2",
          "id_dosen" : "1",
          "nama_dosen" : "indra"
          },
          {
          "id": "2",
          "nama": "IPA",
          "sks": "2",
          "semester" : "2",  
          "id_dosen" : "2",
          "nama_dosen" : "arif"

          },
          {
          "id": "3",
          "nama": "IPS",
          "sks": "2",
          "semester" : "2",  
          "id_dosen" : "3",
          "nama_dosen" : "indratjid"
            
          }]
      
      store.dispatch('components/setLoadFalse')

    }
  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  