export default [
  {
    _name: 'CSidebarNav',
    _children: [
    {
      _name: 'CSidebarNavTitle',
      _children: ['Mahasiswa']
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
      name: 'Materi',
      to: '/mahasiswa/materi',
      icon: 'cilBook',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Nilai',
      to: '/mahasiswa/nilai',
      icon: 'cilEnvelopeLetter',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Kurikulum',
      to: '/mahasiswa/kurikulum',
      icon: 'cil-layers',        
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Data Dosen',
      to: '/mahasiswa/dosen',
      icon: 'cil-user',        
    },
    
 
  ],
      
  }
]