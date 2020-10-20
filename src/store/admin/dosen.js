import store from '../../store'
import axios from '../../api/axios/axios'
import qs from 'querystring';
let token = localStorage.getItem('token')
const state = () => ({
    data :  [],
  })

  const actions = {
      dels({commit}, id){

        return new Promise((resolve) => {

            axios.delete(`/admin/dosen/${id.user_id}`, {
              
              headers: {
  
                'Authorization': `Bearer ${token}`
                
              },
              
            })
            .then((res) => {
             
              commit('deleteSome', id)
              axios.delete(`admin/users/${id.user_id}`, {
              
                headers: {
    
                  'Authorization': `Bearer ${token}`
                  
                },
                
              })
              .then((res) => {
                               
                resolve()
              
              })

              

              // axios.get(`/admin/makul/${id.id_dosen}/dosen_id`, {
            
              //   headers: {
    
              //     'Authorization': `Bearer ${token}`
                  
              //   },
                
              // })
              // .then((res) => {
              //   res.data.map((val) => {
              //     axios.delete(`/admin/jadwal/${val.id_makul}`, {
            
              //       headers: {
        
              //         'Authorization': `Bearer ${token}`
                      
              //       },
                    
              //     }).then(res => console.log(res))
              //   })
              //   axios.delete(`/admin/makul/${id.id_dosen}/dosen_id`, {
            
              //     headers: {
      
              //       'Authorization': `Bearer ${token}`
                    
              //     },
                  
              //   })
              //   .then((res) => {
                 
              //     resolve()
                
              //   })
              //   console.log(res)
              //   resolve()
              
              // })
            
            })
        })
      },
      actEdit({commit}, id){
        return new Promise((resolve) => { setTimeout(() => {
          commit('edit', id)
          resolve()
        }, 2000)})
      },
 
      actAdd({commit}, {niy, email, nama, prodi, jenis_kelamin, no_hp, alamat, status}){
        const user = {

        username : niy,
        password : niy,
        role : 'dosen'

      }
      const data = {

        niy,
        nama,
        foto : null,
        email,
        prodi,
        jenis_kelamin,
        no_hp,
        alamat,
        status
        
      }
      return new Promise((resolve) => {
        
         axios.post('/admin/users', qs.stringify(user), {
            
          headers : {'Authorization': `Bearer ${token}`
          
        }}).then(res => {
            
          const user_id = res.data.user_id
            
           axios.post('/admin/dosen', qs.stringify({user_id, ...data}), {
              
            headers : {'Authorization': `Bearer ${token}`
            
          }}).then(res => {
              
            commit('addDosen', {...data, user_id})
            
            resolve()
            
          }).catch(err => err)  
          
        }).catch(err => err)
          
        })
      
      },
      actGetData({commit}){
        return new Promise((resolve) => {
          
         return  axios.get('/admin/dosen', {
              
              headers : {'Authorization': `Bearer ${token}`
            
            }})
            .then(res => {
              
              commit('getData', res.data)
              resolve()

            })
            .catch(err => err)
          
          })
      },

  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.user_id == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')
    },
    addDosen(state, val){
      state.data.push(val)
      store.dispatch('components/setLoadFalse')
    },
    // edit(state, val){
    //   const index = state.data.findIndex(({user_id}) => user_id == val.user_id )
    //   state.data[index]['nama'] = val.nama
    //   state.data[index]['kontak'] = val.kontak
    //   state.data[index]['niy'] = val.nik
    //   store.dispatch('components/setLoadFalse')
    // },
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
  