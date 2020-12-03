

export default [
    {
      _name: 'CSidebarNav',
      _children: [{_name: 'CSidebarNavTitle',_children: ['Dosen']},
        
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
       
      },
      {
                _name: 'CSidebarNavItem',
                name: 'Nilai',
                to: '/dosen/mahasiswa',
                icon: 'cilEnvelopeLetter',
                // items: [
                //   {
                //     name: 'Tugas',
                //     to: '/dosen/nilai-uas'
                //   },
                //   {
                //     name: 'Uts',
                //     to: '/buttons/dropdowns'
                //   },
                //   {
                //     name: 'Uas',
                //     to: '/buttons/button-groups'
                //   },
                //   {
                //     name: 'keaktifan',
                //     to: '/buttons/button-groups'
                //   },
                
                // ]
              },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Materi',
        to: '/dosen/materi',
        icon: 'cil-layers',        
      },
    ],
        
    }
  ]