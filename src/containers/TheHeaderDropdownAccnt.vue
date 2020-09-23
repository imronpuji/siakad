<template>
<div>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    
    <CDropdownDivider/>
    <CDropdownItem @click="test">
      <CIcon name="cil-shield-alt" /> account
    </CDropdownItem>
    <CDropdownItem @click="del">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>

  <sweet-modal ref="modalChangeUser">

      <div>

        <FormulateForm v-model="formValues" @submit="buat" name="buat">

          <CRow>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="Username" type="text" name="username" validation="required"/>
            </CCol>
            <CCol sm="6" class="mt-3">
              <FormulateInput placeholder="Password" type="password" name="password" validation="required"/>
            </CCol>
          </CRow>

           <CRow>
            <CCol sm="12" class="mt-3">
              <b-button type="submit" class="w-100">Buat</b-button>
            </CCol>
          </CRow>

        </FormulateForm>

      </div>

    </sweet-modal>
    <div class="overlay" v-if="load">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
          
        <div>
          Loading..
        </div>  
      </div>
  </div>
</template>

<script>
import axios from '../api/axios/axios' 
import qs from 'query-string'

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      formValues : {},
      itemsCount: 42,
      load : false,
    }
  },
  methods : {
    test (){
      this.$refs.modalChangeUser.open()
    },
    buat(){
      this.$refs.modalChangeUser.close()
      this.load = true
      const id = this.$store.state.auth.user[0].data.id
      const role = this.$store.state.auth.user[0].data.role

      const username = this.formValues.username
      const password = this.formValues.password
      axios.put(`/auth/changepassword/${id}`, qs.stringify({username, password}))
      .then(res => {
 
          axios.post(`/auth/refreshtoken`, qs.stringify({id, role, username}))
          .then(result => {
            this.load = false
            console.log(result)
            localStorage.setItem('token', result.data.token)
            this.$store.dispatch('auth/setToken', result.data.token)
      })
      })
      .catch(err => this.load = false)
    },
    del(){
     localStorage.removeItem('token')
     this.$router.push('/pages')
     this.$store.dispatch('auth/deleteToken')
    }
  }
}
</script>

<style lang="scss">
  .c-icon {
    margin-right: 0.3rem;
  }
  .overlay {
      background: rgba(255, 255, 255, 0.582);
      position : absolute;
      height : 100%;
      top : 0;
      width : 100%;
      left : 0;
      display : flex;
      justify-content: center;
      align-items: center;
    }
    .spinner-border {
      color : #9c9c9c;
      height: 80px;
      width: 80px;
      z-index: 99;
    }
</style>