import decode from 'jwt-decode'

const state = () => ({
  
  token : '',
  
  isLogin : false,
  
  user : []
  
})

  const actions = {
      
    setToken({commit}, val){
    
      commit("token", val)
    
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
    }

  }
  export default {
      
    namespaced : true,
    
    state,
    
    actions,
    
    mutations,
    
    getters

  }
  