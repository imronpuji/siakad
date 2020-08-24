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
          commit('addMhs', val)
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
        const index = state.data.findIndex(val => val.nim == vals)
        state.data.splice(index, 1)
        state.loading = false
    },
    setLoading(state){
        state.loading = true     
    },
    addMhs(state, val){
      state.data.push(val)
      state.loading = false
    },
    edit(state, val){
      const index = state.data.findIndex(({user_id}) => user_id == val.user_id )
      state.data[index]['nama'] = val.nama
      state.data[index]['kontak'] = val.kontak
      state.data[index]['nim'] = val.nim
      state.loading = false

    },
    getData(state){
      state.data = 
        [{
          "nim": "1231345",
          "nama": "Imron",
          "kontak": "098765654654",
          "photo" : "no photo",
          "user_id" : "1"
          },
          {
          "nim": "1231398",
          "nama": "Dani",
          "kontak": "098765654654",
          "photo" : "no photo",
          "user_id" : "2"
      
          },
          {
          "nim": "1231356",
          "nama": "Wili",
          "kontak": "098765654654",
          "photo" : "no photo",
          "user_id" : "3"
      
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
  