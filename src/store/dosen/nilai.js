import store from '../../store'
import qs from 'querystring'
import _ from 'lodash'
import axios from '../../api/axios/axios'
import router from '../../router'
const token = localStorage.getItem('token')
const state = () => ({
    data :  [],
    dataMakul : [],
    dataMhs : [],
    selectedMakul : [],
    deletedMhs : []
  })
 
  const actions = {
      dels({commit}, val){
        return new Promise((resolve) => {

          axios.delete(`/dosen/nilai/${val.id_nilai}`, {
            
            headers: {

              'Authorization': `Bearer ${token}`
              
            },
            
          })
          .then((res) => {
           
            commit('deleteSome', val.id_nilai)
            commit('addMhsMakul', val)
            resolve()
          
          })
      })
      },
      actEdit({commit}, val){
        const { id_nilai, nilai_angka, nilai_huruf } = val
        const data = {
          nilai_angka,
          nilai_huruf
        }
        return new Promise((resolve) => {
          axios.put(`/dosen/nilai/${id_nilai}`, qs.stringify(data))
          .then(() =>  {
            commit('edit', val)
          } )
          .catch(err => err)
        })
      },
      actAdd({commit},values ){
        
        const [{nama, nama_makul, nim, makul_id}] = values
        
        //The percent that we want to get.
        //i.e. We want to get 50% of 120.
        const absensi = (val, persen) => {
          var percentToGet = persen;
           
          //Calculate the percent.
          var percent = (percentToGet / 100) * val * 100;
          //Alert it out for demonstration purposes.
          return percent
        
        }
        
        
        const persen = (val, persen) => {
          var percentToGet = persen;
         
          var percent = (percentToGet / 100) * val
        
          return percent
        
        }
        
        const data = values.map(({makul_id, mahasiswa_id, tugas_1, tugas_2, tugas_3, tugas_4, absen, keaktifan, uts, uas}) => {
          const absensis = absensi(parseInt(absen) / 16, 15)
          const tugass = persen((parseInt(tugas_1) + parseInt(tugas_2) + parseInt(tugas_3) + parseInt(tugas_4)) / 4, 30)
         
          const utss = persen(parseInt(uts), 20)
          const uass = persen(parseInt(uas), 25)
          const aktifann = persen(parseInt(keaktifan), 10)
        
        const angka = tugass + utss + uass + absensis + aktifann
        
        if(angka.toFixed(2) > 80 && angka.toFixed(2) <= 100){
 
        
            return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'A', bobot:'4.00'  }
        
        } else if(angka.toFixed(2) > 75 && angka.toFixed(2) <= 80){
                return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'AB', bobot:'3.50'  }
        
        
        } else if(angka.toFixed(2) > 70 && angka.toFixed(2) <= 75){
          
                  return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'B', bobot:'3.00'  }
        
        
        } else if(angka.toFixed(2) > 65 && angka.toFixed(2) <= 70){
        
                return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'BC', bobot:'2.50'  }
        
        } else if(angka.toFixed(2) > 60 && angka.toFixed(2) <= 65){
        
        
                    return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'C', bobot:'2.00'  }
        
        
        } else if(angka.toFixed(2) > 55 && angka.toFixed(2) <= 60){
            
                return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'LULUS', huruf:'CD', bobot:'1.50'  }
        
        } else if(angka.toFixed(2) > 50 && angka.toFixed(2) <= 55){
            
                return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'MENGULANG', huruf:'D', bobot:'1.00'  }
        
        } else if(angka.toFixed(2) >= 0 && angka.toFixed(2) <= 50){
            
                    return {makul_id,  mahasiswa_id, keaktifan : parseInt(keaktifan).toFixed(2) ,skor : angka.toFixed(2), absen : parseInt(absensis).toFixed(2), tugas : tugass.toFixed(2), uts : utss.toFixed(2), uas : uass.toFixed(2), keterangan : 'MENGULANG', huruf:'E', bobot:'0.00'  }
        
        } 
        
        })


        const [newData] = data
        console.log(newData)
        return new Promise((resolve) => {
        axios.post('/dosen/nilai', qs.stringify(newData)) 
        .then((res) => {
          commit('addData', {...newData,nama, nim, nama_makul, id_nilai: res.data.id_nilai})
          commit('deleteMhs', {nim, id_makul:makul_id})
        })
        .catch(err => err)
        })
      
      },
      actGetData({commit}){
        return new Promise((resolve) => {
          axios.get(`/dosen/nilai`, {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(res => {
            commit('getData', res.data)
            console.log(res)
            resolve()
          
          })
          .catch(err => err)
        })
        

  
      },

      actGetDataMakul({commit}){
        const user = store.state.auth.profile[0]


        axios.get(`/dosen/makul/${user.id_dosen}/dosen_id`, {
            
            headers : {'Authorization': `Bearer ${token}`
          
          }})
          .then(result => {
            console.log(result)
            commit('getMakul', result.data)
          })
 
 
      },

      actGetDataMhs({commit}, val){
       
        axios.get(`/dosen/mahasiswa/getbysemester/${val.jurusan}/${val.semester}`, {
            
          headers : {'Authorization': `Bearer ${token}`
        
        }}).then(({data}) => {
          const newData = data.map(values => {
            return {...values, id_makul : val.id_makul}
          })
          
          commit('addMhs', newData)
          commit('selectedMakul', val)
        }) 
      },


      setLoad({commit}){
        commit('setLoading','')
      }
  }
  
  const mutations = {
    deleteSome(state, vals){
        const index = state.data.findIndex(val => val.id_nilai == vals)
        state.data.splice(index, 1)
        store.dispatch('components/setLoadFalse')

    },

    addMakul(state, val){
      state.dataMakul.push(val)
      store.dispatch('components/setLoadFalse')
      store.dispatch('admin_jadwal/actAddMakul', val)

    },
    edit(state, val){
      const index = state.data.findIndex(({id_nilai}) => id_nilai == val.id_nilai )

      state.data[index]['nilai_huruf'] = val.nilai_huruf
      state.data[index]['nilai_angka'] = val.nilai_angka


      store.dispatch('components/setLoadFalse')


    },
    addData(state, val){

      console.log(val)
      state.data.push(val)
      state.dataMhs = []
      store.dispatch('components/setLoadFalse')

    
    },
    getData(state, val){
      state.data = [...val]
      store.dispatch('components/setLoadFalse')

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
      if(val.length > 0){
        const newData = state.data.map(values =>  { return {id_makul: values.id_makul, id_mahasiswa : values.id_mahasiswa}} )

      const dataMakul = newData.filter(values =>  { return values.id_makul == val[0]['id_makul'] } )
      const data = _.differenceBy(val, dataMakul, 'id_mahasiswa') 

      
      state.dataMhs = data
      } else {
      
      
      state.dataMhs = []
      }
      
      
    },
    addMhsMakul(state, val){
      console.log(val)
  
        state.dataMhs = []
      },
    deleteMhs(state, vals){
    
      const index = state.dataMhs.findIndex(val => val.nim == vals.nim)
      state.dataMhs.splice(index, 1)
      state.deletedMhs = vals
    
  
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
  