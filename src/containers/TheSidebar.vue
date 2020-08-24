<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    class="sidebar"
    @update:show="(value) => $store.dispatch('components/sets', ['sidebarShow', value])">
    
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction v-if="role == 'admin'" flat :content-to-render="$options.nav"/>
    <CRenderFunction v-else-if="role == 'mhs'" flat :content-to-render="$options.navMhs"/>
    <CRenderFunction v-else-if="role == 'dosen'" flat :content-to-render="$options.navDosen"/>
    
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
const role = localStorage.getItem('role')

export default {
  name: 'TheSidebar',
  nav,
  navMhs,
  navDosen,
  data(){
    return {
      role
    }
  },
  computed: {
    show () {
      return this.$store.state.components.sidebarShow 
    },
    minimize () {
      return this.$store.state.components.sidebarMinimize 
    }
  }
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
