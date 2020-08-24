import Nilai from '../../views/mhs/nilai'
import Materi from '../../views/mhs/materi'
import Transkip from '../../views/mhs/transkip'
import Krs from '../../views/mhs/krs'
import Khs from '../../views/mhs/khs'
import Kurikulum from '../../views/mhs/kurikulum'
const getRole = () => {
  const roles = localStorage.getItem('role')
  return roles
}

const mhs = [
    {
        name : 'nilai',
        path : '/mhs/nilai',
        component : Nilai,
        meta :  'mhs',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'mhs'){
              next()
            } else {
              next('*')
            }
        }
    
    },
    {
        name : 'materi',
        path : '/mhs/materi',
        component : Materi,
        meta :  'dosen',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'mhs'){
              next()
            } else {
              next('*')
            }
        }

    },
    {
      name : 'transkip',
      path : '/mhs/transkip',
      component : Transkip,
      meta :  'mhs',
      beforeEnter :  (to, from, next) => {
          if(getRole() == 'mhs'){
            next()
          } else {
            next('*')
          }
      }

  },
  {
    name : 'krs',
    path : '/mhs/krs',
    component : Krs,
    meta :  'mhs',
    beforeEnter :  (to, from, next) => {
        if(getRole() == 'mhs'){
          next()
        } else {
          next('*')
        }
    }

},
{
  name : 'khs',
  path : '/mhs/khs',
  component : Khs,
  meta :  'mhs',
  beforeEnter :  (to, from, next) => {
      if(getRole() == 'mhs'){
        next()
      } else {
        next('*')
      }
  }

},
{
  name : 'kurikulum',
  path : '/mhs/kurikulum',
  component : Kurikulum,
  meta :  'mhs',
  beforeEnter :  (to, from, next) => {
      if(getRole() == 'mhs'){
        next()
      } else {
        next('*')
      }
  }

},
]

export default mhs