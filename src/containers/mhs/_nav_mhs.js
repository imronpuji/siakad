export default [
    {

      _children: [{
      
    },
        
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Nilai',
        to: '/mhs/nilai',
        icon: 'cil-pencil',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Materi',
        to: '/mhs/materi',
        icon: 'cil-user',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Mata Kuliah',
        to: '/mhs/kurikulum',
        icon: 'cil-drop',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Transkip Nilai',
        to: '/mhs/transkip',
        icon: 'cil-cursor',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Hasil Belajar',
        to: '/mhs/khs',
        icon: 'cil-star',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Rencana Belajar',
        to: '/mhs/krs',
        icon: 'cil-puzzle',        
      },
    ],
        
    }
  ]