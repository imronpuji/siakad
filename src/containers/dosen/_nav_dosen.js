export default [
    {
      _name: 'CSidebarNav',
      _children: [
        
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
        to: '/dosen/mahasiswa',
        icon: 'cil-user',        
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Materi',
        to: '/dosen/materi',
        icon: 'cil-pencil',        
      },
    ],
        
    }
  ]