const state = () => ({
    data :  [],
        loading : false
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
        state.loading = false
    },
    setLoading(state){
        state.loading = true     
    },
    addMakul(state, val){
      state.data.push(val)
      state.loading = false
    },
    edit(state, val){
      const index = state.data.findIndex(({id}) => id == val.id )
      state.data[index]['nama'] = val.nama
      console.log(index)
      state.data[index]['sks'] = val.sks
      state.data[index]['semester'] = val.semester
      state.data[index]['id_dosen'] = val.id_dosen

      state.loading = false

    },
    getData(state){
      state.data = 
        [{
          "id": "1",
          "nama": "MTK",
          "sks": "2",
          "semester" : "2",
          "id_dosen" : "1"
          },
          {
          "id": "2",
          "nama": "IPA",
          "sks": "2",
          "semester" : "2",  
          "id_dosen" : "2"
      
          },
          {
          "id": "3",
          "nama": "IPS",
          "sks": "2",
          "semester" : "2",  
          "id_dosen" : "3"
      
          }]
      
      state.loading = false

    }
  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  