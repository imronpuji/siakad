import store from '../../store'
import qs from 'querystring'
import fileDownload from 'js-file-download'
import axios from '../../api/axios/axios'

const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataMakul : [],
    selectedMakul : null 

  })
 
  const actions = {

    actGetDataFile({commit}, data){
        return new Promise((resolve) => {
          axios.get(`/mahasiswa/materi/loadfile/${data.id_materi}`, 
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
        
 
        // console.log('id_mhs', res)
        
        axios.get(`/mahasiswa/makul/${user.semester}/${user.jurusan}`)
        .then((result) => {
        console.log(result)
          commit('getMakul', result.data)
          if(result.data[0] == undefined){
          return false
          } else {
          axios.get(`/mahasiswa/materi/${result.data[0].id_makul}/makul_id`)
          .then((rets) => commit('getData', rets.data))
          }

        })
        
        // axios.get(`/dosen/makul/${res.data[0].id_dosen}/dosen_id`, {
            
        //     headers : {'Authorization': `Bearer ${token}`
          
        //   }})
          // .then(result => {
          // console.log(result)
          //   if(result.data.length > 0){
          //   result.data.map(values => {
          //     axios.get(`/dosen/materi/${values.id_makul}/makul_id`)
          //     .then(results => {
          //     console.log(results)
          //       commit('getData', results.data)
          //       resolve()
              
          //     })
          //     .catch(err => err)
          //   })
            
          //   }
           
          //   commit('getMakul', result.data)
          // })
 
 
 
    },
    
    actGetDataMateri({commit}, val){
    console.log(val)
      axios.get(`/mahasiswa/materi/${val}/makul_id`)
          .then((res) => {
            commit('getData', res.data)
            commit('selectedMakul', val)
          } )
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
      state.dataMakul.push(val.data)
      store.dispatch('components/setLoadFalse')
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
    if(val != ""){
      state.data = val
      store.dispatch('components/setLoadFalse')
    } else {
      state.data = []

      store.dispatch('components/setLoadFalse')
     }

    },
    getMakul(state, val){
    console.log(val[0])
      state.dataMakul = [...val]
      store.dispatch('components/setLoadFalse')

    },
    addMhs(state, val){
      state.dataMhs = [...val]
    },
    selectedMakul(state, val){
    console.log(val)
      state.selectedMakul = val
    },

  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  