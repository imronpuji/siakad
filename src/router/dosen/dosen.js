import Materi from '../../views/dosen/materi'
import Mahasiswa from '../../views/dosen/mhs'

const getRole = () => {
  const roles = localStorage.getItem('role')
  return roles
}


const dosen = [
    {
        name : 'mahasiswa',
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