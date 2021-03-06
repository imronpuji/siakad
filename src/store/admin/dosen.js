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
      actEdit({commit}, data){
        return new Promise((resolve) => { 
          const {id_dosen, nama_dosen, email_dosen, alamat_dosen, no_hp_dosen, niy} = data
          axios.put(`admin/dosen/${data.id_dosen}`, {nama_dosen, email_dosen, alamat_dosen, no_hp_dosen, niy}, {
            headers : {'Authorization': `Bearer ${token}`}
          }).then((res) => commit('edit', data) ).catch(err => err)
          
          resolve()
        })
      },
 
      actAdd({commit}, {niy, email, nama, prodi_dosen, jenis_kelamin_dosen, no_hp, alamat, status_dosen}){
        const user = {

        username : niy,
        password : niy,
        role : 'dosen'

      }
      const fotos = jenis_kelamin_dosen == 'L' ? `https://api.siakad-filkomuniss.com/assets/img/profile/avatar_male.png` :  `https://api.siakad-filkomuniss.com/assets/img/profile/avatar_female.png`

      const data = {

        niy,
        nama_dosen : nama,
        foto_dosen : fotos,
        email_dosen : email,
        prodi_dosen,
        jenis_kelamin_dosen,
        no_hp_dosen : no_hp,
        alamat_dosen : alamat,
        status_dosen
        
      }
      console.log(data)
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
        const index = state.data.findIndex(val => val.user_id == vals.user_id)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')
    },
    addDosen(state, val){
      state.data.unshift(val)
      store.dispatch('components/setLoadFalse')
    },
    edit(state, val){
      const index = state.data.findIndex(({id_dosen}) => id_dosen == val.id_dosen )
      state.data[index]['nama_dosen'] = val.nama_dosen
      state.data[index]['no_hp_dosen'] = val.no_hp_dosen
      state.data[index]['niy'] = val.niy
      state.data[index]['email_dosen'] = val.email_dosen
      state.data[index]['alamat_dosen'] = val.alamat_dosen
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
  