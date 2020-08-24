import Vue from 'vue'
import Vuex from 'vuex'
import components from './store/components/component'
import admin_mahasiswa from './store/admin/mhs'
import admin_dosen from './store/admin/dosen'
import admin_makul from './store/admin/makul'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    components,
    admin_mahasiswa,
    admin_dosen,
    admin_makul
  },
  strict: debug,
})