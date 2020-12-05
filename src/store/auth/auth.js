import decode from 'jwt-decode'

const state = () => ({
  
  token : '',
  
  isLogin : false,
  
  user : [],
  profile : []
  
})

  const actions = {
      
    setToken({commit}, val){
    
      commit("token", val)
    
    },
    
    setImgProfile({commit}, val){
      commit("setProfilImg", val)

    }
,    
    setProfile({commit}, val){
    
      commit("profil", val)
    
    },
    deleteToken({commit}){
      commit('delete')
    },
    setStatus({commit}, val){
      commit('setStatusCetak', val)
    }
  }
  const getters = {

    token  : (state) => state.token
    
  }
  
  const mutations = {
  
  setStatusCetak(state, val){
    state.profile[0][val] = 'tutup'
  },
  
    token(state,  val){
        
      let user = decode(val)
        
      state.token = val 
      
      state.isLogin = true,
      
      state.user.push(user)
      
    },
    setProfilImg(state, val){
      if(state.profile[0].foto){
        state.profile[0].foto = val
      } else {
        state.profile[0].foto_dosen = val
      }
    },

    delete(state){
      state.token = ''
      state.user = []
    },
    profil(state, val){
      state.profile = val
    }

  }
  export default {
      
    namespaced : true,
    
    state,
    
    actions,
    
    mutations,
    
    getters

  }
  