import Materi from '../../views/dosen/materi'
import Mahasiswa from '../../views/dosen/mhs'
import decode from 'jwt-decode'

const getRole = () => {
  const token = localStorage.getItem('token')
  let role = decode(token).data.role

  return role
}

const dosen = [
    {
        name : 'dosen-mahasiswa',
        path : '/dosen/mahasiswa',
        component : Mahasiswa,
        meta :  'dosen',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'dosen'){
              next()
            } else {
              next('*')
            }
        }
    
    },
    {
        name : 'materi',
        path : '/dosen/materi',
        component : Materi,
        meta :  'dosen',
        beforeEnter :  (to, from, next) => {
            if(getRole() == 'dosen'){
              next()
            } else {
              next('*')
            }
        }

    },
]

export default dosen