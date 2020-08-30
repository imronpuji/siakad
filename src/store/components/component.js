import axios from 'axios'
const state = () => ({
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    fakeUser : [],
    route : [{
      user : "",
      role : '',
    }],
    loading : false,


  })

  const actions = {
      setLoad({commit}){
        commit('setLoading')
      },
      setLoadFalse({commit}){
          commit('setLoadToFalse')
      },
      setDesktop({commit}){
          console.log('lklk')
          commit('toggleSidebarDesktop', 'lol')
      },
      setMobile({commit}){
        console.log('lklk')

        commit('toggleSidebarMobile', 'lol')
      },
      sets({commit}, val){
          commit('set', val)
      },
      getData({commit}){

        axios.get('https://9374077fb635.ngrok.io/products').then(res =>  commit('setFake', res.data.products))
      }
  }
  
  const mutations = {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    setFake(state, val){
      state.fakeUser.push(...val)
    },
    setLoading(state){
      state.loading = true  
    },
    setLoadToFalse(state){
      state.loading = false  
    },
  }
  export default {
      namespaced : true,
      state,
      actions,
      mutations,
  }
  