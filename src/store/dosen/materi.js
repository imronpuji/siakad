import store from '../../store'
import qs from 'querystring'
import fileDownload from 'js-file-download'
import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataMakul : [],

  })
 
  const actions = {
    dels({commit}, id){
        return new Promise((resolve) => {

          axios.delete(`/dosen/materi/${id}`, {
            
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
        const { id_materi, file, judul } = val
        let formData = new FormData()
        formData.append('judul', judul)
        formData.append('file', file)
 
        return new Promise((resolve) => {
          axios.put(`/dosen/materi/${id_materi}`, formData)
          .then(() =>  {
            commit('edit', val)
          } )
          .catch(err => err)
        })
    },
    actAdd({commit},val ){
        const {file, judul, nama_makul, makul_id, sks, semester} = val

        let formData = new FormData()
        formData.append('judul', judul)
        formData.append('file', file)
        formData.append('makul_id', makul_id)
        return new Promise((resolve) => {
        axios.post('/dosen/materi', formData) 
        .then((res) => {
          commit('addData', {judul, nama_makul, file : file.name, id_materi: res.data.id_materi, sks, semester})
        })
        .catch(err => err)
        })
      
    },

    actGetDataFile({commit}, data){
        return new Promise((resolve) => {
          axios.get(`/dosen/materi/loadfile/${data.id_materi}`, 
            {
              responseType: 'blob',
            }
            )
          .then(res => {
          if(res.status == 201){
            alert('maaf file tidak tersedia')
          } else {
            fileDownload(res.data, data.file);
          }
 
            resolve()
          
          })
          .catch(err => err)
        })
    },
    
    actGetData({commit}){
        const user = store.state.auth.profile[0]
     
        axios.get(`/dosen/makul/${user.id_dosen}/dosen_id`, {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(result => {
          console.log(result)
            if(result.data.length > 0){
            result.data.map(values => {
              axios.get(`/dosen/materi/${values.id_makul}/makul_id`)
              .then(results => {
              console.log(results)
              if(results.data.length > 0){
                commit('getData', results.data)
              } 
                resolve()
              
              })
              .catch(err => err)
            })
            
            }
           
            commit('getMakul', result.data)
          })
 
 
    },

    

    setLoad({commit}){
        commit('setLoading','')
    },
    
  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.id_materi == vals)
        state.data.splice(index, 1)
    
        store.dispatch('components/setLoadFalse')

    },

    addMakul(state, val){
      state.dataMakul.push(val)
      store.dispatch('components/setLoadFalse')
      store.dispatch('admin_jadwal/actAddMakul', val)

    },
    edit(state, val){
      const index = state.data.findIndex(({id_materi}) => id_materi == val.id_materi )
      console.log(val.file)
      state.data[index]['judul'] = val.judul
      state.data[index]['file'] = val.judul


      store.dispatch('components/setLoadFalse')


    },
    addData(state, val){
      console.log(val)
      state.data.push(val)
      store.dispatch('components/setLoadFalse')
     

    
    },
    getData(state, val){
    console.log(val)
      if(val == undefined){
        state.data = []
      store.dispatch('components/setLoadFalse')
      } else {
      state.data = val
      store.dispatch('components/setLoadFalse')
      }

    },
    getMakul(state, val){
      if(val[0] == undefined){
        state.dataMakul = []
        store.dispatch('components/setLoadFalse')
      } else {
        state.dataMakul = [...val]
        store.dispatch('components/setLoadFalse')
      }

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
  