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
      name: 'Materi',
      to: '/mahasiswa/materi',
      icon: 'cil-user',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Transkip Nilai',
      to: '/mahasiswa/nilai',
      icon: 'cil-user',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'KHS',
      to: '/mahasiswa/khs',
      icon: 'cil-user',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'KRS',
      to: '/mahasiswa/krs',
      icon: 'cil-user',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Kurikulum',
      to: '/mahasiswa/kurikulum',
      icon: 'cil-user',        
    },
  ],
      
  }
]