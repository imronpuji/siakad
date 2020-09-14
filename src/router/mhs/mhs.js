import Nilai from '../../views/mhs/nilai'
import Materi from '../../views/mhs/materi'
import Transkip from '../../views/mhs/transkip'
import Krs from '../../views/mhs/krs'
import Khs from '../../views/mhs/khs'
import Kurikulum from '../../views/mhs/kurikulum'
import decode from 'jwt-decode'

const getRole = () => {
  const token = localStorage.getItem('token')
  let role = decode(token).data.role

  return role
}
const mhs = [
    {
        name : 'nilai',
        path : '/mahasiswa/nilai',
        component : Nilai,
        meta :  'mhs',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'mahasiswa'){
              next()
            } else {
              next('*')
            }
        }
    
    },
    {
        name : 'mhs-materi',
        path : '/mahasiswa/materi',
        component : Materi,
        meta :  'dosen',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'mahasiswa'){
              next()
            } else {
              next('*')
            }
        }

    },
    {
      name : 'transkip',
      path : '/mahasiswa/transkip',
      component : Transkip,
      meta :  'mahasiswa',
      beforeEnter :  (to, from, next) => {
          if(getRole() == 'mahasiswa'){
            next()
          } else {
            next('*')
          }
      }

  },
  {
    name : 'krs',
    path : '/mahasiswa/krs',
    component : Krs,
    meta :  'mahasiswa',
    beforeEnter :  (to, from, next) => {
        if(getRole() == 'mahasiswa'){
          next()
        } else {
          next('*')
        }
    }

},
{
  name : 'khs',
  path : '/mahasiswa/khs',
  component : Khs,
  meta :  'mahasiswa',
  beforeEnter :  (to, from, next) => {
      if(getRole() == 'mahasiswa'){
        next()
      } else {
        next('*')
      }
  }

},
{
  name : 'kurikulum',
  path : '/mahasiswa/kurikulum',
  component : Kurikulum,
  meta :  'mahasiswa',
  beforeEnter :  (to, from, next) => {
      if(getRole() == 'mahasiswa'){
        next()
      } else {
        next('*')
      }
  }

},
]

export default mhs