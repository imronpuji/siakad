import Mahasiswa from '../../views/admin/mhs'
import Nilai from '../../views/admin/nilai'
import Makul from '../../views/admin/makul'
import Jadwal from '../../views/admin/jadwal'
import Dosen from '../../views/admin/dosen'
import decode from 'jwt-decode'
const getRole = () => {
  const token = localStorage.getItem('token')
  let role = decode(token).data.role

  return role
}
const Page404 = () => import('@/views/pages/Page404')


const admin = [
    {
        name : 'mahasiswa',
        path : '/admin/mahasiswa',
        component : Mahasiswa,
        meta :  'admin',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'admin'){
              next()
            } else {
              next('*')
            }
        }
    
    },
    {
        name : 'dosen',
        path : '/admin/dosen',
        component : Dosen,
        meta :  'admin',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'admin'){
              next()
            } else {
              next('*')
            }
        }

    },
    {
        name : 'jadwal-kuliah',
        path : '/admin/jadwal-kuliah',
        component : Jadwal,
        meta :  'admin',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'admin'){
              next()
            } else {
              next('*')
            }
        }
    },
    {
        name : 'mata-kuliah',
        path : '/admin/mata-kuliah',
        component : Makul,
        meta :  'admin',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'admin'){
              next()
            } else {
              next('*')
            }
        }
    },
    {
      name : 'nilai',
      path : '/admin/nilai',
      component : Nilai,
      meta :  'admin',
      beforeEnter :  (to, from, next) => {
          if(getRole() == 'admin'){
            next()
          } else {
            next('*')
          }
      }
  },
    
    {
        path : '/dashboard/*',
        name : 'dashboard',
        component :Page404,
        meta : 'admin',
        
    },
    {
        path : '/admin/*',
        name : 'error',
        component :Page404,
   
        meta : {
          rule : null
        } 
    },
]

export default admin