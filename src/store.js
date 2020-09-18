import Vue from 'vue'
import Vuex from 'vuex'
import components from './store/components/component'
import auth from './store/auth/auth'

import admin_mahasiswa from './store/admin/mhs'
import admin_dosen from './store/admin/dosen'
import admin_makul from './store/admin/makul'
import admin_jadwal from './store/admin/jadwal'
import admin_nilai from './store/admin/nilai'


// dosen 
import dosen_nilai from './store/dosen/nilai'
import dosen_materi from './store/dosen/materi'


// mhs
import mhs_materi from './store/mhs/materi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    components,
    auth,
    
    // admin
    admin_mahasiswa,
    admin_dosen,
    admin_makul,
    admin_jadwal,
    admin_nilai,

    // dosen
    dosen_nilai,
    dosen_materi,
    
    // mhs
    mhs_materi
    
  },
  strict: debug,
})