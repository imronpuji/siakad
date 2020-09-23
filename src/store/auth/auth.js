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
    
    setProfile({commit}, val){
    
      commit("profil", val)
    
    },
    deleteToken({commit}){
      commit('delete')
    }
  }
  const getters = {

    token  : (state) => state.token
    
  }
  
  const mutations = {
  
    token(state,  val){
        
      let user = decode(val)
        
      state.token = val 
      
      state.isLogin = true,
      
      state.user.push(user)
      
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
  