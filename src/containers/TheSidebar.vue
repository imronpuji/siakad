<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    class="sidebar"
    @update:show="(value) => $store.dispatch('components/sets', ['sidebarShow', value])">
    
    <!-- <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="cil-pencil" 
        size="custom-size" 
        :height="25" 
        viewBox="0 0 586 334"
      />
    </CSidebarBrand> -->

    <CRenderFunction v-if="$store.state.auth.user[0].data.role == 'admin'" flat :content-to-render="$options.nav"/>
    <CRenderFunction v-else-if="$store.state.auth.user[0].data.role == 'mahasiswa'" flat :content-to-render="$options.navMhs"/>
    <CRenderFunction v-else-if="$store.state.auth.user[0].data.role == 'dosen'" flat :content-to-render="$options.navDosen"/>
    
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.dispatch('components/sets', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import navMhs from './mhs/_nav_mhs'
import navDosen from './dosen/_nav_dosen'
import decode from 'jwt-decode'

export default {
  name: 'TheSidebar',
  nav,
  navMhs,
  navDosen,

  computed: {
    show () {
      return this.$store.state.components.sidebarShow 
    },
    minimize () {
      return this.$store.state.components.sidebarMinimize 
    }
  },

}
</script>
<style lang="scss">
  .sidebar {
    background: rgb(62, 148, 235) !important;
    .d-md-down-none {
      background: rgb(62, 148, 235) !important;
    }
  }

</style>
